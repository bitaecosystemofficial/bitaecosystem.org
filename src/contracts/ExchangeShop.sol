// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract ExchangeShop {
    IERC20 public bitToken;
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string description;
        uint256 price; // Price in BIT tokens (with 9 decimals)
        address merchant;
        uint256 stock;
        bool active;
        string category;
        string imageUrl;
    }

    struct Exchange {
        address buyer;
        uint256 itemId;
        uint256 price;
        uint256 timestamp;
        string txHash;
    }

    mapping(uint256 => Item) public items;
    mapping(uint256 => Exchange[]) public itemExchanges;
    mapping(address => uint256[]) public userPurchases;
    uint256 public nextItemId;

    event ItemListed(
        uint256 indexed id,
        string name,
        uint256 price,
        address indexed merchant,
        uint256 stock
    );
    
    event ItemUpdated(
        uint256 indexed id,
        uint256 price,
        uint256 stock,
        bool active
    );
    
    event ItemExchanged(
        address indexed buyer,
        uint256 indexed itemId,
        string itemName,
        uint256 price,
        address indexed merchant,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _bitToken) {
        bitToken = IERC20(_bitToken);
        owner = msg.sender;
    }

    function listItem(
        string memory name,
        string memory description,
        uint256 price,
        uint256 stock,
        string memory category,
        string memory imageUrl
    ) external {
        require(price > 0, "Price must be greater than 0");
        require(stock > 0, "Stock must be greater than 0");

        items[nextItemId] = Item({
            id: nextItemId,
            name: name,
            description: description,
            price: price,
            merchant: msg.sender,
            stock: stock,
            active: true,
            category: category,
            imageUrl: imageUrl
        });

        emit ItemListed(nextItemId, name, price, msg.sender, stock);
        nextItemId++;
    }

    function updateItem(
        uint256 itemId,
        uint256 price,
        uint256 stock,
        bool active
    ) external {
        Item storage item = items[itemId];
        require(item.merchant == msg.sender, "Not item owner");
        
        if (price > 0) item.price = price;
        item.stock = stock;
        item.active = active;

        emit ItemUpdated(itemId, item.price, stock, active);
    }

    function exchangeItem(uint256 itemId) external {
        Item storage item = items[itemId];
        require(item.price > 0, "Item not found");
        require(item.active, "Item not active");
        require(item.stock > 0, "Out of stock");

        // Transfer BIT tokens from buyer to merchant
        require(
            bitToken.transferFrom(msg.sender, item.merchant, item.price),
            "Token transfer failed"
        );

        // Decrease stock
        item.stock--;

        // Record exchange
        Exchange memory newExchange = Exchange({
            buyer: msg.sender,
            itemId: itemId,
            price: item.price,
            timestamp: block.timestamp,
            txHash: ""
        });

        itemExchanges[itemId].push(newExchange);
        userPurchases[msg.sender].push(itemId);

        emit ItemExchanged(
            msg.sender,
            itemId,
            item.name,
            item.price,
            item.merchant,
            block.timestamp
        );
    }

    function getItem(uint256 itemId) external view returns (Item memory) {
        return items[itemId];
    }

    function getItemExchanges(uint256 itemId) external view returns (Exchange[] memory) {
        return itemExchanges[itemId];
    }

    function getUserPurchases(address user) external view returns (uint256[] memory) {
        return userPurchases[user];
    }

    function getTotalItems() external view returns (uint256) {
        return nextItemId;
    }
}
