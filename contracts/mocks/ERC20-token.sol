//SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint256 private _totalSupply = 100 * 1e18;

    constructor() ERC20("Token", "TKN") {
        _mint(msg.sender, _totalSupply);
    }
}
