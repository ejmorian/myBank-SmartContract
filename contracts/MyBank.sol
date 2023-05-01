// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//can recieve ERC20 tokens
//can recieve ERC721 tokens

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyBank {
    address private immutable owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission Denied");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function withdraw(address _erc20, uint256 _amount) public onlyOwner {
        address _to = msg.sender;

        IERC20(_erc20).transfer(_to, _amount);
    }
}
