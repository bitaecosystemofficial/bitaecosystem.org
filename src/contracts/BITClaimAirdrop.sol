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
 * @dev Manages daily check-ins, social tasks, webinar and event rewards
 */
contract BITClaimAirdrop is Ownable, ReentrancyGuard {
    IERC20 public immutable bitToken;

    // Constants
    uint256 public constant DAILY_REWARD = 150e18; // 150 BIT per day
    uint256 public constant TOTAL_DAYS = 45;
    uint256 public constant SOCIAL_TOTAL_REWARD = 500e18; // 500 BIT for all social tasks
    uint256 public constant WEBINAR_BASE_REWARD = 150e18; // 150 BIT base
    uint256 public constant WEBINAR_GUEST_REWARD = 500e18; // 500 BIT per guest
    uint256 public constant WEBINAR_INVITER_BONUS = 350e18; // 350 BIT per guest invited
    uint256 public constant EVENT_BASE_REWARD = 150e18; // 150 BIT base
    uint256 public constant EVENT_GUEST_REWARD = 500e18; // 500 BIT per guest
    uint256 public constant EVENT_INVITER_BONUS = 350e18; // 350 BIT per guest invited
    uint8 public constant TOTAL_SOCIAL_TASKS = 8;

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

    // Webinar/Event Data
    struct TaskReward {
        uint256 baseReward;
        uint256 guestBonus;
        uint256 totalReward;
        bool approved;
        bool claimed;
        uint8 guestCount;
    }
    mapping(address => TaskReward) public webinarRewards;
    mapping(address => TaskReward) public eventRewards;

    // Events
    event DailyCheckIn(address indexed user, uint256 day, uint256 timestamp);
    event DailyRewardsClaimed(address indexed user, uint256 amount);
    event SocialTaskCompleted(address indexed user, uint8 taskId);
    event SocialRewardsClaimed(address indexed user, uint256 amount);
    event WebinarRewardApproved(address indexed user, uint256 baseReward, uint256 guestBonus, uint8 guestCount);
    event WebinarRewardClaimed(address indexed user, uint256 amount);
    event EventRewardApproved(address indexed user, uint256 baseReward, uint256 guestBonus, uint8 guestCount);
    event EventRewardClaimed(address indexed user, uint256 amount);

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

    // ========== WEBINAR FUNCTIONS ==========

    function approveWebinarReward(
        address _user,
        uint8 _guestCount
    ) external onlyOwner {
        TaskReward storage reward = webinarRewards[_user];
        require(!reward.approved, "Already approved");

        reward.baseReward = WEBINAR_BASE_REWARD;
        reward.guestBonus = WEBINAR_INVITER_BONUS * _guestCount;
        reward.totalReward = reward.baseReward + reward.guestBonus;
        reward.guestCount = _guestCount;
        reward.approved = true;

        emit WebinarRewardApproved(_user, reward.baseReward, reward.guestBonus, _guestCount);
    }

    function claimWebinarReward() external nonReentrant {
        TaskReward storage reward = webinarRewards[msg.sender];
        
        require(reward.approved, "Not approved");
        require(!reward.claimed, "Already claimed");

        reward.claimed = true;

        require(bitToken.transfer(msg.sender, reward.totalReward), "Transfer failed");
        emit WebinarRewardClaimed(msg.sender, reward.totalReward);
    }

    function getWebinarRewardStatus(address _user) external view returns (
        uint256 baseReward,
        uint256 guestBonus,
        uint256 totalReward,
        bool approved,
        bool claimed,
        uint8 guestCount
    ) {
        TaskReward storage reward = webinarRewards[_user];
        return (
            reward.baseReward,
            reward.guestBonus,
            reward.totalReward,
            reward.approved,
            reward.claimed,
            reward.guestCount
        );
    }

    // ========== EVENT FUNCTIONS ==========

    function approveEventReward(
        address _user,
        uint8 _guestCount
    ) external onlyOwner {
        TaskReward storage reward = eventRewards[_user];
        require(!reward.approved, "Already approved");

        reward.baseReward = EVENT_BASE_REWARD;
        reward.guestBonus = EVENT_INVITER_BONUS * _guestCount;
        reward.totalReward = reward.baseReward + reward.guestBonus;
        reward.guestCount = _guestCount;
        reward.approved = true;

        emit EventRewardApproved(_user, reward.baseReward, reward.guestBonus, _guestCount);
    }

    function claimEventReward() external nonReentrant {
        TaskReward storage reward = eventRewards[msg.sender];
        
        require(reward.approved, "Not approved");
        require(!reward.claimed, "Already claimed");

        reward.claimed = true;

        require(bitToken.transfer(msg.sender, reward.totalReward), "Transfer failed");
        emit EventRewardClaimed(msg.sender, reward.totalReward);
    }

    function getEventRewardStatus(address _user) external view returns (
        uint256 baseReward,
        uint256 guestBonus,
        uint256 totalReward,
        bool approved,
        bool claimed,
        uint8 guestCount
    ) {
        TaskReward storage reward = eventRewards[_user];
        return (
            reward.baseReward,
            reward.guestBonus,
            reward.totalReward,
            reward.approved,
            reward.claimed,
            reward.guestCount
        );
    }

    // ========== ADMIN FUNCTIONS ==========

    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(bitToken.transfer(owner(), _amount), "Transfer failed");
    }

    function getContractBalance() external view returns (uint256) {
        return bitToken.balanceOf(address(this));
    }
}
