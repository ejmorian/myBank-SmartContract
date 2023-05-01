// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyBank {
    address private immutable owner;
    mapping(address => uint) balance;

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission Denied");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function approve(
        address _token,
        uint256 _amount
    ) internal returns (bool success) {
        return IERC20(_token).approve(address(this), _amount);
    }

    function deposit(address _token, uint256 _amount) external {
        require(approve(_token, _amount), "Approval Request Failed.");

        require(
            IERC20(_token).transferFrom(msg.sender, address(this), _amount),
            "Deposit Transfer Failed."
        );

        balance[_token] += _amount;
    }

    function withdraw(address _token, uint256 _amount) external onlyOwner {
        address _to = msg.sender;
        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "Insufficient Balance."
        );
        require(
            IERC20(_token).transfer(_to, _amount),
            "Withdraw Transfer Failed."
        );
        balance[_token] -= _amount;
    }

    function withdrawAll(address _token) external onlyOwner {
        address _to = msg.sender;
        uint256 _amount = balance[_token];

        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "Insufficient Balance."
        );
        require(
            IERC20(_token).transfer(_to, _amount),
            "Withdraw Transfer Failed."
        );

        balance[_token] = 0;
    }

    function checkBalance(address _token) external view returns (uint256) {
        return balance[_token];
    }
}
