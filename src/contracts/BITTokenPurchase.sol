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
 * @title BITTokenPurchase
 * @dev Smart contract for purchasing BIT tokens with USDT/USDC
 */
contract BITTokenPurchase is ReentrancyGuard, Ownable {
    address public receiverWallet;
    address public bitToken;
    address public usdtToken;
    address public usdcToken;
    
    uint256 public pricePerBIT = 1080000000000000; // $0.00108 in USDT/USDC (18 decimals) per BIT (9 decimals)
    uint256 public minimumPurchase = 100000 * 10**9; // 100,000 BIT minimum (9 decimals)
    
    bool public paused;
    
    event TokensPurchased(
        address indexed buyer,
        address indexed paymentToken,
        uint256 usdAmount,
        uint256 bitAmount,
        uint256 timestamp
    );
    
    event ReceiverWalletUpdated(address indexed oldWallet, address indexed newWallet);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    constructor(
        address _bitToken,
        address _usdtToken,
        address _usdcToken,
        address _receiverWallet
    ) {
        bitToken = _bitToken;
        usdtToken = _usdtToken;
        usdcToken = _usdcToken;
        receiverWallet = _receiverWallet;
    }
    
    /**
     * @dev Purchase BIT tokens with USDT or USDC
     * @param paymentToken Address of payment token (USDT or USDC)
     * @param usdAmount Amount of USD to pay (in token decimals - 18 for USDT/USDC BEP20)
     */
    function purchaseBIT(address paymentToken, uint256 usdAmount) external nonReentrant whenNotPaused {
        require(
            paymentToken == usdtToken || paymentToken == usdcToken,
            "Invalid payment token"
        );
        require(usdAmount > 0, "Amount must be greater than 0");
        
        // Calculate BIT tokens to receive
        // usdAmount is in 18 decimals (USDT/USDC BEP20)
        // pricePerBIT is in 18 decimals per BIT
        // Result needs to be in 9 decimals (BIT decimals)
        uint256 bitAmount = (usdAmount * 10**9) / pricePerBIT;
        
        require(bitAmount >= minimumPurchase, "Amount below minimum purchase");
        require(
            IERC20(bitToken).balanceOf(address(this)) >= bitAmount,
            "Insufficient BIT tokens in contract"
        );
        
        // Transfer USDT/USDC from buyer to receiver wallet
        require(
            IERC20(paymentToken).transferFrom(msg.sender, receiverWallet, usdAmount),
            "Payment transfer failed"
        );
        
        // Transfer BIT tokens to buyer
        require(
            IERC20(bitToken).transfer(msg.sender, bitAmount),
            "BIT transfer failed"
        );
        
        emit TokensPurchased(msg.sender, paymentToken, usdAmount, bitAmount, block.timestamp);
    }
    
    /**
     * @dev Calculate BIT tokens for given USD amount
     * @param usdAmount Amount in USD (with 18 decimals for USDT/USDC BEP20)
     * @return Amount of BIT tokens (with 9 decimals)
     */
    function calculateBITAmount(uint256 usdAmount) external view returns (uint256) {
        return (usdAmount * 10**9) / pricePerBIT;
    }
    
    /**
     * @dev Update receiver wallet address
     * @param _newReceiver New receiver wallet address
     */
    function updateReceiverWallet(address _newReceiver) external onlyOwner {
        require(_newReceiver != address(0), "Invalid address");
        address oldWallet = receiverWallet;
        receiverWallet = _newReceiver;
        emit ReceiverWalletUpdated(oldWallet, _newReceiver);
    }
    
    /**
     * @dev Update BIT token price
     * @param _newPrice New price per BIT (in wei)
     */
    function updatePrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Price must be greater than 0");
        uint256 oldPrice = pricePerBIT;
        pricePerBIT = _newPrice;
        emit PriceUpdated(oldPrice, _newPrice);
    }
    
    /**
     * @dev Update minimum purchase amount
     * @param _newMinimum New minimum purchase (in BIT tokens with decimals)
     */
    function updateMinimumPurchase(uint256 _newMinimum) external onlyOwner {
        minimumPurchase = _newMinimum;
    }
    
    /**
     * @dev Pause/unpause the contract
     */
    function togglePause() external onlyOwner {
        paused = !paused;
    }
    
    /**
     * @dev Withdraw BIT tokens from contract
     * @param amount Amount to withdraw
     */
    function withdrawBIT(uint256 amount) external onlyOwner {
        require(
            IERC20(bitToken).transfer(owner(), amount),
            "Withdrawal failed"
        );
    }
    
    /**
     * @dev Emergency withdrawal of any ERC20 token
     * @param token Token address
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        require(
            IERC20(token).transfer(owner(), amount),
            "Emergency withdrawal failed"
        );
    }
}
