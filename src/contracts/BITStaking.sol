// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function decimals() external view returns (uint8);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
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
 * @dev Contract module which provides a basic access control mechanism.
 */
abstract contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(msg.sender);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
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
 * @title BITStaking
 * @dev Smart contract for staking BIT tokens with multiple pool options
 */
contract BITStaking is ReentrancyGuard, Ownable {
    address public bitToken;
    
    uint256 public constant UNSTAKE_FEE = 2; // 2%
    uint256 public constant EARLY_UNSTAKE_FEE = 10; // 10% additional
    
    struct StakingPool {
        uint256 lockDays;
        uint256 apy;
        uint256 minStake;
        uint256 totalStaked;
        bool active;
    }
    
    struct Stake {
        uint256 amount;
        uint256 poolId;
        uint256 startTime;
        uint256 endTime;
        uint256 apy;
        bool active;
    }
    
    mapping(uint256 => StakingPool) public stakingPools;
    mapping(address => Stake[]) public userStakes;
    mapping(address => uint256) public userTotalStaked;
    
    uint256 public poolCount;
    
    event Staked(
        address indexed user,
        uint256 indexed poolId,
        uint256 amount,
        uint256 startTime,
        uint256 endTime
    );
    
    event Unstaked(
        address indexed user,
        uint256 indexed stakeId,
        uint256 amount,
        uint256 rewards,
        uint256 fees,
        bool isEarly
    );
    
    event RewardsClaimed(
        address indexed user,
        uint256 amount
    );
    
    constructor(address _bitToken) {
        bitToken = _bitToken;
        
        // Initialize staking pools (all values in 9 decimals)
        // Pool 0: 180 days, 12% APY, min 100,000 BIT
        stakingPools[0] = StakingPool({
            lockDays: 180,
            apy: 12,
            minStake: 100000 * 10**9,
            totalStaked: 0,
            active: true
        });
        
        // Pool 1: 240 days, 18% APY, min 500,000,000 BIT
        stakingPools[1] = StakingPool({
            lockDays: 240,
            apy: 18,
            minStake: 500000 * 10**9,
            totalStaked: 0,
            active: true
        });
        
        // Pool 2: 365 days, 25% APY, min 1,000,000 BIT
        stakingPools[2] = StakingPool({
            lockDays: 365,
            apy: 25,
            minStake: 1000000 * 10**9,
            totalStaked: 0,
            active: true
        });
        
        poolCount = 3;
    }
    
    /**
     * @dev Stake BIT tokens in a pool
     * @param poolId Pool ID to stake in
     * @param amount Amount to stake (9 decimals)
     */
    function stake(uint256 poolId, uint256 amount) external nonReentrant {
        require(poolId < poolCount, "Invalid pool");
        require(stakingPools[poolId].active, "Pool not active");
        require(amount >= stakingPools[poolId].minStake, "Below minimum stake");
        
        StakingPool storage pool = stakingPools[poolId];
        
        // Transfer tokens from user to contract
        require(
            IERC20(bitToken).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        uint256 endTime = block.timestamp + (pool.lockDays * 1 days);
        
        // Create stake
        userStakes[msg.sender].push(Stake({
            amount: amount,
            poolId: poolId,
            startTime: block.timestamp,
            endTime: endTime,
            apy: pool.apy,
            active: true
        }));
        
        pool.totalStaked += amount;
        userTotalStaked[msg.sender] += amount;
        
        emit Staked(msg.sender, poolId, amount, block.timestamp, endTime);
    }
    
    /**
     * @dev Unstake tokens from a stake
     * @param stakeId Index of stake in user's stakes array
     */
    function unstake(uint256 stakeId) external nonReentrant {
        require(stakeId < userStakes[msg.sender].length, "Invalid stake ID");
        Stake storage userStake = userStakes[msg.sender][stakeId];
        require(userStake.active, "Stake not active");
        
        bool isEarly = block.timestamp < userStake.endTime;
        uint256 rewards = calculateRewards(msg.sender, stakeId);
        
        // Calculate fees
        uint256 baseFee = (userStake.amount * UNSTAKE_FEE) / 100;
        uint256 earlyFee = isEarly ? (userStake.amount * EARLY_UNSTAKE_FEE) / 100 : 0;
        uint256 totalFees = baseFee + earlyFee;
        
        uint256 principal = userStake.amount - totalFees;
        uint256 totalReturn = principal + rewards;
        
        // Update state
        stakingPools[userStake.poolId].totalStaked -= userStake.amount;
        userTotalStaked[msg.sender] -= userStake.amount;
        userStake.active = false;
        
        // Transfer tokens back to user
        require(
            IERC20(bitToken).transfer(msg.sender, totalReturn),
            "Transfer failed"
        );
        
        emit Unstaked(msg.sender, stakeId, principal, rewards, totalFees, isEarly);
    }
    
    /**
     * @dev Calculate current rewards for a stake
     * @param user User address
     * @param stakeId Stake ID
     * @return Reward amount
     */
    function calculateRewards(address user, uint256 stakeId) public view returns (uint256) {
        require(stakeId < userStakes[user].length, "Invalid stake ID");
        Stake memory userStake = userStakes[user][stakeId];
        
        if (!userStake.active) return 0;
        
        uint256 timeStaked = block.timestamp - userStake.startTime;
        uint256 daysStaked = timeStaked / 1 days;
        
        // Calculate rewards: (amount * APY * days) / (365 * 100)
        uint256 rewards = (userStake.amount * userStake.apy * daysStaked) / (365 * 100);
        
        return rewards;
    }
    
    /**
     * @dev Get all stakes for a user
     * @param user User address
     * @return Array of stakes
     */
    function getUserStakes(address user) external view returns (Stake[] memory) {
        return userStakes[user];
    }
    
    /**
     * @dev Calculate total rewards for all active stakes
     * @param user User address
     * @return Total rewards
     */
    function getTotalRewards(address user) external view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < userStakes[user].length; i++) {
            if (userStakes[user][i].active) {
                total += calculateRewards(user, i);
            }
        }
        return total;
    }
    
    /**
     * @dev Add or update staking pool
     * @param poolId Pool ID (use poolCount for new pool)
     * @param lockDays Lock period in days
     * @param apy APY percentage
     * @param minStake Minimum stake amount
     */
    function setStakingPool(
        uint256 poolId,
        uint256 lockDays,
        uint256 apy,
        uint256 minStake
    ) external onlyOwner {
        if (poolId >= poolCount) {
            poolCount = poolId + 1;
        }
        
        stakingPools[poolId] = StakingPool({
            lockDays: lockDays,
            apy: apy,
            minStake: minStake,
            totalStaked: stakingPools[poolId].totalStaked,
            active: true
        });
    }
    
    /**
     * @dev Toggle pool active status
     * @param poolId Pool ID
     */
    function togglePool(uint256 poolId) external onlyOwner {
        require(poolId < poolCount, "Invalid pool");
        stakingPools[poolId].active = !stakingPools[poolId].active;
    }
    
    /**
     * @dev Emergency withdraw (owner only)
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(
            IERC20(bitToken).transfer(owner(), amount),
            "Withdrawal failed"
        );
    }
}
