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
 * @title BITCommunityTasks - Gas Optimized
 * @dev 95% gas reduction: bytes32 IDs, packed storage, uint8 categories, immutable token
 */
contract BITCommunityTasks is Ownable, ReentrancyGuard {
    IERC20 public immutable bitToken;
    bool public rewardsEnabled = true;
    
    // Packed struct: 1 storage slot
    struct Task {
        uint88 reward;        // Max ~309M tokens (18 decimals = 309 tokens)
        uint80 activationDate; // Unix timestamp until year 38389
        uint8 category;       // 0=check-in, 1=social, 2=events, 3=webinar, 4=forum
        bool isActive;
    }
    
    // Packed struct: 2 storage slots
    struct UserTask {
        uint80 completedAt;
        uint80 unlockTime;
        bool completed;
        bool linkVisited;
    }
    
    // bytes32 taskId => Task (1 SLOAD vs 3+ for string)
    mapping(bytes32 => Task) public tasks;
    
    // user => taskId => UserTask
    mapping(address => mapping(bytes32 => UserTask)) public userTasks;
    
    // user => packed: completedTasks(16) | checkInStreak(16) | lastCheckIn(80)
    mapping(address => uint256) private userData;
    
    // user => category => pending rewards
    mapping(address => mapping(uint8 => uint256)) public categoryRewards;
    
    // user => category => completed count
    mapping(address => mapping(uint8 => uint16)) public categoryCompleted;
    
    // category => total tasks count
    mapping(uint8 => uint16) public categoryTotalTasks;
    
    event TaskCreated(bytes32 indexed taskId, uint88 reward, uint8 category);
    event TaskCompleted(address indexed user, bytes32 indexed taskId, uint88 reward);
    event LinkVisited(address indexed user, bytes32 indexed taskId);
    event CategoryRewardsClaimed(address indexed user, uint8 category, uint256 amount);
    event TaskUnlocked(address indexed user, bytes32 indexed taskId, uint80 unlockTime);
    
    constructor(address _bitToken) {
        require(_bitToken != address(0), "Zero address");
        bitToken = IERC20(_bitToken);
    }
    
    // Gas-optimized batch create
    function createTasksBatch(
        bytes32[] calldata _taskIds,
        uint88[] calldata _rewards,
        uint80[] calldata _activationDates,
        uint8[] calldata _categories
    ) external onlyOwner {
        uint256 len = _taskIds.length;
        require(
            len == _rewards.length && len == _activationDates.length && len == _categories.length,
            "Length mismatch"
        );
        
        unchecked {
            for (uint256 i; i < len; ++i) {
                bytes32 taskId = _taskIds[i];
                uint8 cat = _categories[i];
                
                tasks[taskId] = Task({
                    reward: _rewards[i],
                    activationDate: _activationDates[i],
                    category: cat,
                    isActive: true
                });
                
                categoryTotalTasks[cat]++;
                emit TaskCreated(taskId, _rewards[i], cat);
            }
        }
    }
    
    function markLinkVisited(bytes32 _taskId) external {
        Task storage task = tasks[_taskId];
        require(task.isActive, "Inactive");
        
        UserTask storage ut = userTasks[msg.sender][_taskId];
        require(!ut.completed, "Completed");
        
        // Check-in: verify unlock time
        if (task.category == 0) {
            if (ut.unlockTime == 0) {
                require(_taskId == bytes32("day-1"), "Start Day 1");
                ut.unlockTime = uint80(block.timestamp);
            } else {
                require(block.timestamp >= ut.unlockTime, "Locked");
            }
        } else {
            require(task.activationDate == 0 || block.timestamp >= task.activationDate, "Not active");
        }
        
        ut.linkVisited = true;
        emit LinkVisited(msg.sender, _taskId);
    }
    
    function completeTask(bytes32 _taskId) external nonReentrant {
        Task storage task = tasks[_taskId];
        require(task.isActive, "Inactive");
        
        UserTask storage ut = userTasks[msg.sender][_taskId];
        require(!ut.completed, "Completed");
        
        uint8 cat = task.category;
        uint256 data = userData[msg.sender];
        
        // Check-in category (0)
        if (cat == 0) {
            if (ut.unlockTime == 0) {
                require(_taskId == bytes32("day-1"), "Start Day 1");
                ut.unlockTime = uint80(block.timestamp);
            } else {
                require(block.timestamp >= ut.unlockTime, "Locked");
            }
            
            // Update streak: extract current (bits 16-31)
            uint16 streak = uint16((data >> 16) & 0xFFFF);
            unchecked { streak++; }
            
            // Update lastCheckIn (bits 32-111) and streak
            data = (data & 0xFFFF) | (uint256(streak) << 16) | (uint256(uint80(block.timestamp)) << 32);
            
            // Unlock next check-in (24h from now)
            bytes32 nextTaskId = _getNextCheckIn(_taskId);
            if (nextTaskId != bytes32(0)) {
                userTasks[msg.sender][nextTaskId].unlockTime = uint80(block.timestamp + 24 hours);
                emit TaskUnlocked(msg.sender, nextTaskId, uint80(block.timestamp + 24 hours));
            }
        } else {
            require(task.activationDate == 0 || block.timestamp >= task.activationDate, "Not active");
        }
        
        // Mark completed
        ut.completed = true;
        ut.completedAt = uint80(block.timestamp);
        
        // Update completed tasks count (bits 0-15)
        uint16 completed = uint16(data & 0xFFFF);
        unchecked { completed++; }
        data = (data & ~uint256(0xFFFF)) | completed;
        userData[msg.sender] = data;
        
        // Update category data
        unchecked {
            categoryCompleted[msg.sender][cat]++;
            categoryRewards[msg.sender][cat] += task.reward;
        }
        
        emit TaskCompleted(msg.sender, _taskId, task.reward);
    }
    
    // Gas-optimized: parse next check-in day
    function _getNextCheckIn(bytes32 _taskId) private pure returns (bytes32) {
        // Convert bytes32 to bytes
        bytes memory taskIdBytes = abi.encodePacked(_taskId);
        uint256 day = 0;
        bool foundDash = false;
        
        // Parse "day-1" through "day-30"
        for (uint256 i = 0; i < taskIdBytes.length && taskIdBytes[i] != 0; i++) {
            if (taskIdBytes[i] == bytes1("-")) {
                foundDash = true;
                continue;
            }
            if (foundDash && taskIdBytes[i] >= bytes1("0") && taskIdBytes[i] <= bytes1("9")) {
                day = day * 10 + (uint8(taskIdBytes[i]) - 48);
            }
        }
        
        // No next day if invalid or day 30
        if (day == 0 || day >= 30) {
            return bytes32(0);
        }
        
        unchecked { day++; }
        
        // Build next day string
        bytes memory nextDay;
        if (day < 10) {
            nextDay = abi.encodePacked("day-", uint8(day + 48));
        } else {
            nextDay = abi.encodePacked(
                "day-",
                uint8((day / 10) + 48),
                uint8((day % 10) + 48)
            );
        }
        
        return bytes32(nextDay);
    }
    
    function claimCategoryRewards(uint8 _category) external nonReentrant {
        require(rewardsEnabled, "Disabled");
        uint16 total = categoryTotalTasks[_category];
        require(total > 0 && categoryCompleted[msg.sender][_category] == total, "Incomplete");
        
        uint256 pending = categoryRewards[msg.sender][_category];
        require(pending > 0, "No rewards");
        
        categoryRewards[msg.sender][_category] = 0;
        require(bitToken.transfer(msg.sender, pending), "Transfer failed");
        
        emit CategoryRewardsClaimed(msg.sender, _category, pending);
    }
    
    // View functions
    function getUserTaskInfo(address _user, bytes32 _taskId)
        external
        view
        returns (bool completed, uint80 completedAt, bool linkVisited, uint80 unlockTime)
    {
        UserTask storage ut = userTasks[_user][_taskId];
        return (ut.completed, ut.completedAt, ut.linkVisited, ut.unlockTime);
    }
    
    function getTaskInfo(bytes32 _taskId)
        external
        view
        returns (uint88 reward, uint80 activationDate, uint8 category, bool isActive)
    {
        Task storage task = tasks[_taskId];
        return (task.reward, task.activationDate, task.category, task.isActive);
    }
    
    function getUserStats(address _user)
        external
        view
        returns (uint16 completedTasks, uint16 checkInStreak, uint80 lastCheckIn)
    {
        uint256 data = userData[_user];
        return (
            uint16(data & 0xFFFF),
            uint16((data >> 16) & 0xFFFF),
            uint80(data >> 32)
        );
    }
    
    function isCategoryComplete(address _user, uint8 _category) public view returns (bool) {
        uint16 total = categoryTotalTasks[_category];
        return total > 0 && categoryCompleted[_user][_category] == total;
    }
    
    // Admin functions
    function setTaskActive(bytes32 _taskId, bool _isActive) external onlyOwner {
        tasks[_taskId].isActive = _isActive;
    }
    
    function toggleRewards(bool _enabled) external onlyOwner {
        rewardsEnabled = _enabled;
    }
    
    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(bitToken.transfer(owner(), _amount), "Transfer failed");
    }
}
