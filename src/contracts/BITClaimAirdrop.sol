// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "Reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

abstract contract Ownable {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "Not owner");
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

/**
 * @title BITClaimAirdrop
 * @dev Manages daily check-ins, social tasks, and event-based rewards
 */
contract BITClaimAirdrop is Ownable, ReentrancyGuard {
    IERC20 public immutable bitToken;

    // Constants
    uint256 public constant DAILY_REWARD = 150e18; // 150 BIT per day
    uint256 public constant TOTAL_DAYS = 45;
    uint256 public constant SOCIAL_TOTAL_REWARD = 500e18; // 500 BIT for all social tasks
    uint8 public constant TOTAL_SOCIAL_TASKS = 8;

    // Event Types
    enum EventType { Webinar, Presentation }

    // Event Management
    struct EventInfo {
        string title;
        string description;
        string eventLink;
        uint256 startTime;
        uint256 endTime;
        uint256 rewardPerAttendee;
        EventType eventType;
        bool isActive;
    }

    uint256 public eventCounter;
    mapping(uint256 => EventInfo) public events;
    mapping(uint256 => mapping(address => bool)) public eventAttendance;
    mapping(uint256 => mapping(address => bool)) public eventRewardClaimed;
    mapping(uint256 => mapping(address => uint8)) public eventReferrals;

    // Daily Check-in Data
    struct DailyCheckIn {
        uint256 lastCheckInDay;
        uint256 totalDays;
        uint256 firstCheckInTimestamp;
        bool claimed;
    }
    mapping(address => DailyCheckIn) public dailyCheckIns;

    // Social Tasks Data (8 tasks)
    struct SocialTasks {
        uint8 completedCount;
        bool claimed;
        mapping(uint8 => bool) taskCompleted; // taskId => completed
    }
    mapping(address => SocialTasks) public socialTasks;

    // Events
    event DailyCheckIn(address indexed user, uint256 day, uint256 timestamp);
    event DailyRewardsClaimed(address indexed user, uint256 amount);
    event SocialTaskCompleted(address indexed user, uint8 taskId);
    event SocialRewardsClaimed(address indexed user, uint256 amount);
    event EventCreated(uint256 indexed eventId, string title, EventType eventType, uint256 startTime);
    event EventDeactivated(uint256 indexed eventId);
    event AttendanceValidated(uint256 indexed eventId, address indexed user, uint8 guestCount);
    event EventRewardClaimed(uint256 indexed eventId, address indexed user, uint256 amount);

    constructor(address _bitToken) {
        require(_bitToken != address(0), "Zero address");
        bitToken = IERC20(_bitToken);
    }

    // ========== DAILY CHECK-IN FUNCTIONS ==========

    function checkIn() external nonReentrant {
        DailyCheckIn storage userCheckIn = dailyCheckIns[msg.sender];
        
        if (userCheckIn.firstCheckInTimestamp == 0) {
            // First check-in
            userCheckIn.firstCheckInTimestamp = block.timestamp;
            userCheckIn.lastCheckInDay = 1;
            userCheckIn.totalDays = 1;
            emit DailyCheckIn(msg.sender, 1, block.timestamp);
            return;
        }

        require(!userCheckIn.claimed, "Already claimed all rewards");
        require(userCheckIn.totalDays < TOTAL_DAYS, "Already completed 45 days");

        uint256 daysSinceFirst = (block.timestamp - userCheckIn.firstCheckInTimestamp) / 1 days;
        uint256 expectedDay = userCheckIn.totalDays + 1;
        
        require(daysSinceFirst >= userCheckIn.totalDays, "Too early to check in");
        require(daysSinceFirst < expectedDay + 1, "Missed check-in window");

        userCheckIn.lastCheckInDay = expectedDay;
        userCheckIn.totalDays = expectedDay;

        emit DailyCheckIn(msg.sender, expectedDay, block.timestamp);
    }

    function claimDailyRewards() external nonReentrant {
        DailyCheckIn storage userCheckIn = dailyCheckIns[msg.sender];
        
        require(userCheckIn.totalDays == TOTAL_DAYS, "Must complete all 45 days");
        require(!userCheckIn.claimed, "Already claimed");

        userCheckIn.claimed = true;
        uint256 totalReward = DAILY_REWARD * TOTAL_DAYS; // 6,750 BIT

        require(bitToken.transfer(msg.sender, totalReward), "Transfer failed");
        emit DailyRewardsClaimed(msg.sender, totalReward);
    }

    function getDailyCheckInStatus(address _user) external view returns (
        uint256 totalDays,
        uint256 lastCheckInDay,
        uint256 firstCheckInTimestamp,
        bool claimed,
        bool canCheckIn,
        uint256 nextCheckInTime
    ) {
        DailyCheckIn storage userCheckIn = dailyCheckIns[_user];
        totalDays = userCheckIn.totalDays;
        lastCheckInDay = userCheckIn.lastCheckInDay;
        firstCheckInTimestamp = userCheckIn.firstCheckInTimestamp;
        claimed = userCheckIn.claimed;

        if (firstCheckInTimestamp == 0) {
            canCheckIn = true;
            nextCheckInTime = block.timestamp;
        } else if (userCheckIn.totalDays < TOTAL_DAYS && !userCheckIn.claimed) {
            uint256 daysSinceFirst = (block.timestamp - firstCheckInTimestamp) / 1 days;
            canCheckIn = daysSinceFirst >= userCheckIn.totalDays;
            nextCheckInTime = firstCheckInTimestamp + (userCheckIn.totalDays * 1 days);
        } else {
            canCheckIn = false;
            nextCheckInTime = 0;
        }
    }

    // ========== SOCIAL TASKS FUNCTIONS ==========

    function completeSocialTask(uint8 _taskId) external nonReentrant {
        require(_taskId < TOTAL_SOCIAL_TASKS, "Invalid task ID");
        
        SocialTasks storage userTasks = socialTasks[msg.sender];
        require(!userTasks.taskCompleted[_taskId], "Task already completed");
        require(!userTasks.claimed, "Already claimed rewards");

        userTasks.taskCompleted[_taskId] = true;
        userTasks.completedCount++;

        emit SocialTaskCompleted(msg.sender, _taskId);
    }

    function claimSocialRewards() external nonReentrant {
        SocialTasks storage userTasks = socialTasks[msg.sender];
        
        require(userTasks.completedCount == TOTAL_SOCIAL_TASKS, "Must complete all social tasks");
        require(!userTasks.claimed, "Already claimed");

        userTasks.claimed = true;

        require(bitToken.transfer(msg.sender, SOCIAL_TOTAL_REWARD), "Transfer failed");
        emit SocialRewardsClaimed(msg.sender, SOCIAL_TOTAL_REWARD);
    }

    function getSocialTaskStatus(address _user) external view returns (
        uint8 completedCount,
        bool claimed,
        bool[8] memory tasksCompleted
    ) {
        SocialTasks storage userTasks = socialTasks[_user];
        completedCount = userTasks.completedCount;
        claimed = userTasks.claimed;
        
        for (uint8 i = 0; i < TOTAL_SOCIAL_TASKS; i++) {
            tasksCompleted[i] = userTasks.taskCompleted[i];
        }
    }

    function isSocialTaskCompleted(address _user, uint8 _taskId) external view returns (bool) {
        return socialTasks[_user].taskCompleted[_taskId];
    }

    // ========== EVENT MANAGEMENT FUNCTIONS ==========

    function createEvent(
        string memory _title,
        string memory _description,
        string memory _eventLink,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _rewardPerAttendee,
        EventType _eventType
    ) external onlyOwner returns (uint256) {
        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_rewardPerAttendee > 0, "Reward must be greater than 0");

        uint256 eventId = eventCounter++;
        
        events[eventId] = EventInfo({
            title: _title,
            description: _description,
            eventLink: _eventLink,
            startTime: _startTime,
            endTime: _endTime,
            rewardPerAttendee: _rewardPerAttendee,
            eventType: _eventType,
            isActive: true
        });

        emit EventCreated(eventId, _title, _eventType, _startTime);
        return eventId;
    }

    function deactivateEvent(uint256 _eventId) external onlyOwner {
        require(_eventId < eventCounter, "Invalid event ID");
        events[_eventId].isActive = false;
        emit EventDeactivated(_eventId);
    }

    function validateAttendee(uint256 _eventId, address _user, uint8 _guestCount) external onlyOwner {
        require(_eventId < eventCounter, "Invalid event ID");
        require(_user != address(0), "Invalid user address");
        require(!eventAttendance[_eventId][_user], "Already validated");

        eventAttendance[_eventId][_user] = true;
        eventReferrals[_eventId][_user] = _guestCount;

        emit AttendanceValidated(_eventId, _user, _guestCount);
    }

    function batchValidateAttendees(
        uint256 _eventId, 
        address[] calldata _users, 
        uint8[] calldata _guestCounts
    ) external onlyOwner {
        require(_eventId < eventCounter, "Invalid event ID");
        require(_users.length == _guestCounts.length, "Array length mismatch");

        for (uint256 i = 0; i < _users.length; i++) {
            if (!eventAttendance[_eventId][_users[i]]) {
                eventAttendance[_eventId][_users[i]] = true;
                eventReferrals[_eventId][_users[i]] = _guestCounts[i];
                emit AttendanceValidated(_eventId, _users[i], _guestCounts[i]);
            }
        }
    }

    function claimEventReward(uint256 _eventId) external nonReentrant {
        require(_eventId < eventCounter, "Invalid event ID");
        require(events[_eventId].isActive, "Event not active");
        require(block.timestamp >= events[_eventId].endTime, "Event not ended yet");
        require(eventAttendance[_eventId][msg.sender], "Not validated as attendee");
        require(!eventRewardClaimed[_eventId][msg.sender], "Already claimed");

        EventInfo memory eventInfo = events[_eventId];
        uint8 guestCount = eventReferrals[_eventId][msg.sender];
        
        // Base reward + guest bonus (350 BIT per guest for webinars)
        uint256 reward = eventInfo.rewardPerAttendee;
        if (eventInfo.eventType == EventType.Webinar && guestCount > 0) {
            reward += (350e18 * guestCount);
        }

        require(bitToken.balanceOf(address(this)) >= reward, "Insufficient contract balance");

        eventRewardClaimed[_eventId][msg.sender] = true;
        require(bitToken.transfer(msg.sender, reward), "Transfer failed");

        emit EventRewardClaimed(_eventId, msg.sender, reward);
    }

    // ========== VIEW FUNCTIONS ==========

    function getEvent(uint256 _eventId) external view returns (
        string memory title,
        string memory description,
        string memory eventLink,
        uint256 startTime,
        uint256 endTime,
        uint256 rewardPerAttendee,
        EventType eventType,
        bool isActive
    ) {
        require(_eventId < eventCounter, "Invalid event ID");
        EventInfo memory e = events[_eventId];
        return (e.title, e.description, e.eventLink, e.startTime, e.endTime, e.rewardPerAttendee, e.eventType, e.isActive);
    }

    function getActiveEvents() external view returns (uint256[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < eventCounter; i++) {
            if (events[i].isActive) {
                activeCount++;
            }
        }

        uint256[] memory activeEventIds = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < eventCounter; i++) {
            if (events[i].isActive) {
                activeEventIds[index] = i;
                index++;
            }
        }

        return activeEventIds;
    }

    function getUserEventStatus(uint256 _eventId, address _user) external view returns (
        bool validated,
        bool claimed,
        uint8 guestCount,
        uint256 potentialReward
    ) {
        validated = eventAttendance[_eventId][_user];
        claimed = eventRewardClaimed[_eventId][_user];
        guestCount = eventReferrals[_eventId][_user];
        
        if (validated && !claimed && _eventId < eventCounter) {
            EventInfo memory eventInfo = events[_eventId];
            potentialReward = eventInfo.rewardPerAttendee;
            if (eventInfo.eventType == EventType.Webinar && guestCount > 0) {
                potentialReward += (350e18 * guestCount);
            }
        }
    }

    // ========== ADMIN FUNCTIONS ==========

    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(bitToken.transfer(owner(), _amount), "Transfer failed");
    }

    function getContractBalance() external view returns (uint256) {
        return bitToken.balanceOf(address(this));
    }
}
