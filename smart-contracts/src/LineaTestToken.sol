// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LineaTestToken is ERC20, Ownable {

    address payable public adminAddress;

    constructor(address payable _adminAddress) ERC20("LineaTestToken", "LTT") Ownable(msg.sender) {
        adminAddress = _adminAddress;
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mintTokensForUser() public payable {
        require(msg.value > 1, "Not enough ETH sent");
        _mint(msg.sender, msg.value);
    }

    function withdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available to withdraw");

        (bool sent, ) = adminAddress.call{value: contractBalance}("");
        require(sent, "Failed to transfer Ether");
    }

    function updateAdminAddress(address payable _newAdmin) external onlyOwner {
        adminAddress = _newAdmin;
    }
}