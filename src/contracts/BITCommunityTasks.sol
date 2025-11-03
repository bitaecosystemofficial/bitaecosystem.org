// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IERC20
 * @dev Interface for ERC20 token standard
 */
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title ReentrancyGuard
 * @dev Contract module that helps prevent reentrant calls to a function
 */
abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    
    uint256 private _status;
    
    constructor() {
        _status = _NOT_ENTERED;
    }
    
    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

/**
 * @title Ownable
 * @dev Contract module which provides a basic access control mechanism
 */
abstract contract Ownable {
    address private _owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor() {
        _transferOwnership(msg.sender);
    }
    
    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }
    
    function owner() public view virtual returns (address) {
        return _owner;
    }
    
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
    
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }
    
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * @title BITCommunityTasks
 * @dev Manages community task completion and rewards for BIT token ecosystem
 */
contract BITCommunityTasks is Ownable, ReentrancyGuard {
    IERC20 public bitToken;
    bool public rewardsEnabled;
    
    struct Task {
        string taskId;
        uint256 reward;
        uint256 activationDate;
        bool isActive;
        string category; // 'check-in', 'social', 'events', 'webinar', 'forum'
    }
    
    struct UserTask {
        bool completed;
        uint256 completedAt;
        bool linkVisited;
        uint256 linkVisitedAt;
        uint256 unlockTime; // Time when task becomes available (for check-ins)
    }
    
    // Mapping: taskId => Task
    mapping(string => Task) public tasks;
    
    // Mapping: user => taskId => UserTask
    mapping(address => mapping(string => UserTask)) public userTasks;
    
    // Mapping: user => total completed tasks
    mapping(address => uint256) public userCompletedTasks;
    
    // Mapping: user => total rewards earned (historical)
    mapping(address => uint256) public userTotalRewards;
    
    // Mapping: user => check-in streak
    mapping(address => uint256) public userCheckInStreak;
    
    // Mapping: user => last check-in timestamp
    mapping(address => uint256) public userLastCheckIn;
    
    // Mapping: user => category => pending rewards
    mapping(address => mapping(string => uint256)) public userCategoryRewards;
    
    // Mapping: user => category => completed tasks count
    mapping(address => mapping(string => uint256)) public userCategoryCompletedTasks;
    
    // Array of all task IDs
    string[] public taskIds;
    
    event TaskCreated(string taskId, uint256 reward, uint256 activationDate, string category);
    event TaskCompleted(address indexed user, string taskId, uint256 reward);
    event LinkVisited(address indexed user, string taskId, uint256 timestamp);
    event CheckInStreakUpdated(address indexed user, uint256 newStreak);
    event CategoryRewardsClaimed(address indexed user, string category, uint256 amount);
    event BITTokenUpdated(address indexed tokenAddress);
    event RewardsToggled(bool enabled);
    event TaskUnlocked(address indexed user, string taskId, uint256 unlockTime);
    
    constructor(address _bitToken) {
        require(_bitToken != address(0), "Invalid BIT token address");
        bitToken = IERC20(_bitToken);
        rewardsEnabled = true;
    }
    
    function _createTask(
        string memory _taskId,
        uint256 _reward,
        uint256 _activationDate,
        string memory _category
    ) internal {
        tasks[_taskId] = Task({
            taskId: _taskId,
            reward: _reward,
            activationDate: _activationDate,
            isActive: true,
            category: _category
        });
        taskIds.push(_taskId);
        
        emit TaskCreated(_taskId, _reward, _activationDate, _category);
    }
    
    function createTask(
        string memory _taskId,
        uint256 _reward,
        uint256 _activationDate,
        string memory _category
    ) external onlyOwner {
        _createTask(_taskId, _reward, _activationDate, _category);
    }
    
    // Batch create tasks (only owner)
    function createTasksBatch(
        string[] memory _taskIds,
        uint256[] memory _rewards,
        uint256[] memory _activationDates,
        string[] memory _categories
    ) external onlyOwner {
        require(
            _taskIds.length == _rewards.length &&
            _rewards.length == _activationDates.length &&
            _activationDates.length == _categories.length,
            "Array lengths must match"
        );
        
        for (uint256 i = 0; i < _taskIds.length; i++) {
            _createTask(_taskIds[i], _rewards[i], _activationDates[i], _categories[i]);
        }
    }
    
    function markLinkVisited(string memory _taskId) external nonReentrant {
        Task memory task = tasks[_taskId];
        require(task.isActive, "Task is not active");
        require(!userTasks[msg.sender][_taskId].completed, "Task already completed");
        
        // Check unlock status for check-in tasks
        if (keccak256(bytes(task.category)) == keccak256(bytes("check-in"))) {
            UserTask storage userTask = userTasks[msg.sender][_taskId];
            if (userTask.unlockTime == 0) {
                require(
                    keccak256(bytes(_taskId)) == keccak256(bytes("day-1")),
                    "Must start with Day 1"
                );
                userTask.unlockTime = block.timestamp;
            } else {
                require(block.timestamp >= userTask.unlockTime, "Task not yet unlocked");
            }
        } else {
            // For other categories, check activation date
            require(
                task.activationDate == 0 || block.timestamp >= task.activationDate,
                "Task not yet active"
            );
        }
        
        userTasks[msg.sender][_taskId].linkVisited = true;
        userTasks[msg.sender][_taskId].linkVisitedAt = block.timestamp;
        
        emit LinkVisited(msg.sender, _taskId, block.timestamp);
    }
    
    function completeTask(string memory _taskId) external nonReentrant {
        Task storage task = tasks[_taskId];
        require(task.isActive, "Task is not active");
        require(!userTasks[msg.sender][_taskId].completed, "Task already completed");
        
        UserTask storage userTask = userTasks[msg.sender][_taskId];
        
        // Check unlock status
        if (keccak256(bytes(task.category)) == keccak256(bytes("check-in"))) {
            // For check-in tasks, verify unlock time
            if (userTask.unlockTime == 0) {
                // First check-in for this user
                require(
                    keccak256(bytes(_taskId)) == keccak256(bytes("day-1")),
                    "Must complete Day 1 first"
                );
                userTask.unlockTime = block.timestamp;
            } else {
                require(block.timestamp >= userTask.unlockTime, "Task not yet unlocked");
            }
            
            // Update check-in streak
            userCheckInStreak[msg.sender]++;
            userLastCheckIn[msg.sender] = block.timestamp;
            emit CheckInStreakUpdated(msg.sender, userCheckInStreak[msg.sender]);
            
            // Unlock next check-in task (24 hours from now)
            string memory nextTaskId = getNextCheckInTask(_taskId);
            if (bytes(nextTaskId).length > 0) {
                userTasks[msg.sender][nextTaskId].unlockTime = block.timestamp + 24 hours;
                emit TaskUnlocked(msg.sender, nextTaskId, block.timestamp + 24 hours);
            }
        } else {
            // For other categories, check activation date
            require(
                task.activationDate == 0 || block.timestamp >= task.activationDate,
                "Task not yet available"
            );
        }
        
        // Mark task as completed
        userTask.completed = true;
        userTask.completedAt = block.timestamp;
        userCompletedTasks[msg.sender]++;
        userCategoryCompletedTasks[msg.sender][task.category]++;
        
        // Add reward to category pending rewards (not auto-transfer)
        userCategoryRewards[msg.sender][task.category] += task.reward;
        userTotalRewards[msg.sender] += task.reward;
        
        emit TaskCompleted(msg.sender, _taskId, task.reward);
    }
    
    // Helper function to get next check-in task ID
    function getNextCheckInTask(string memory _currentTaskId) internal pure returns (string memory) {
        bytes memory taskIdBytes = bytes(_currentTaskId);
        
        // Extract day number from "day-X" format
        uint256 dayNumber = 0;
        bool foundDash = false;
        for (uint256 i = 0; i < taskIdBytes.length; i++) {
            if (taskIdBytes[i] == "-") {
                foundDash = true;
                continue;
            }
            if (foundDash && taskIdBytes[i] >= "0" && taskIdBytes[i] <= "9") {
                dayNumber = dayNumber * 10 + uint8(taskIdBytes[i]) - 48;
            }
        }
        
        if (dayNumber >= 30) {
            return ""; // No next task after day 30
        }
        
        // Return next day task ID
        dayNumber++;
        if (dayNumber < 10) {
            return string(abi.encodePacked("day-", uint8(48 + dayNumber)));
        } else {
            uint8 tens = uint8(48 + (dayNumber / 10));
            uint8 ones = uint8(48 + (dayNumber % 10));
            return string(abi.encodePacked("day-", tens, ones));
        }
    }
    
    function claimCategoryRewards(string memory _category) external nonReentrant {
        require(rewardsEnabled, "Rewards are not enabled");
        require(isCategoryComplete(msg.sender, _category), "Category not complete");
        
        uint256 pendingRewards = userCategoryRewards[msg.sender][_category];
        require(pendingRewards > 0, "No rewards to claim");
        
        userCategoryRewards[msg.sender][_category] = 0;
        _claimReward(pendingRewards);
        
        emit CategoryRewardsClaimed(msg.sender, _category, pendingRewards);
    }
    
    function isCategoryComplete(address _user, string memory _category) public view returns (bool) {
        uint256 totalTasks = 0;
        uint256 completedTasks = userCategoryCompletedTasks[_user][_category];
        
        // Count total tasks in category
        for (uint256 i = 0; i < taskIds.length; i++) {
            if (keccak256(bytes(tasks[taskIds[i]].category)) == keccak256(bytes(_category))) {
                totalTasks++;
            }
        }
        
        return completedTasks == totalTasks && totalTasks > 0;
    }
    
    function _claimReward(uint256 amount) internal {
        require(bitToken.balanceOf(address(this)) >= amount, "Insufficient contract balance");
        require(bitToken.transfer(msg.sender, amount), "Token transfer failed");
    }
    
    function isTaskCompleted(address _user, string memory _taskId) external view returns (bool) {
        return userTasks[_user][_taskId].completed;
    }
    
    function isLinkVisited(address _user, string memory _taskId) external view returns (bool) {
        return userTasks[_user][_taskId].linkVisited;
    }
    
    function getUserTaskInfo(address _user, string memory _taskId) 
        external 
        view 
        returns (
            bool completed,
            uint256 completedAt,
            bool linkVisited,
            uint256 linkVisitedAt,
            uint256 unlockTime
        ) 
    {
        UserTask memory userTask = userTasks[_user][_taskId];
        return (
            userTask.completed,
            userTask.completedAt,
            userTask.linkVisited,
            userTask.linkVisitedAt,
            userTask.unlockTime
        );
    }
    
    function getTaskInfo(string memory _taskId) 
        external 
        view 
        returns (string memory taskId, uint256 reward, uint256 activationDate, bool isActive, string memory category) 
    {
        Task memory task = tasks[_taskId];
        return (
            task.taskId,
            task.reward,
            task.activationDate,
            task.isActive,
            task.category
        );
    }
    
    function getUserStats(address _user) 
        external 
        view 
        returns (uint256 completedTasks, uint256 totalRewards, uint256 checkInStreak) 
    {
        return (
            userCompletedTasks[_user],
            userTotalRewards[_user],
            userCheckInStreak[_user]
        );
    }
    
    function getCategoryPendingRewards(address _user, string memory _category) 
        external 
        view 
        returns (uint256) 
    {
        return userCategoryRewards[_user][_category];
    }
    
    function getAllTaskIds() external view returns (string[] memory) {
        return taskIds;
    }
    
    function setTaskActive(string memory _taskId, bool _isActive) external onlyOwner {
        tasks[_taskId].isActive = _isActive;
    }
    
    function updateTaskActivationDate(string memory _taskId, uint256 _newActivationDate) external onlyOwner {
        tasks[_taskId].activationDate = _newActivationDate;
    }
    
    function updateBITToken(address _newBITToken) external onlyOwner {
        require(_newBITToken != address(0), "Invalid BIT token address");
        bitToken = IERC20(_newBITToken);
        emit BITTokenUpdated(_newBITToken);
    }
    
    function toggleRewards(bool _enabled) external onlyOwner {
        rewardsEnabled = _enabled;
        emit RewardsToggled(_enabled);
    }
    
    function withdrawTokens(address _token, uint256 _amount) external onlyOwner {
        require(IERC20(_token).transfer(owner(), _amount), "Token transfer failed");
    }
    
    function getContractBalance() external view returns (uint256) {
        return bitToken.balanceOf(address(this));
    }
}
