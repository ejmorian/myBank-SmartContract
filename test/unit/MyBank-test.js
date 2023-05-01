const {expect, assert} = require("chai");
const { ethers } = require("hardhat");

describe("MyBank", () => {
    let deployer, user, myBank, token;

    before(async () => {
        //Initiate Accounts
        deployer = await ethers.getSigner();
        user = await ethers.getSigner(1);

        //getContractFactory
        const tokenFactory = await ethers.getContractFactory("Token", deployer);
        const myBankFactory = await ethers.getContractFactory("MyBank", deployer);

        //deploy contracts
        token = await tokenFactory.deploy();
        await token.deployTransaction.wait(1);

        myBank = await myBankFactory.deploy();
        await token.deployTransaction.wait(1);
    })

    it("check deployer balance", async () => {
        const deployerBalance = await token.balanceOf(deployer.address)

        console.log(deployerBalance.toString());

        assert.equal(deployerBalance.toString()/1e18, "100");
    })

    it("contract can receive ERC20", async () => {
        await token.transfer(myBank.address, ethers.utils.parseEther("60"));
        assert.equal((await token.balanceOf(myBank.address)).toString()/1e18, "60");

    })

    it("deployer can withdraw the ERC20 token", async () => {
        const deployerBalance = await token.balanceOf(deployer.address);
        const contractBalance = await token.balanceOf(myBank.address);

        console.log(deployerBalance.toString()/1e18);
        console.log(contractBalance.toString().toString()/1e18)

        await myBank.withdraw(token.address, ethers.utils.parseEther("60"))
        console.log((await token.balanceOf(deployer.address)).toString()/1e18)
    })

    it("NOT deployer can NOT withdraw ERC20 Token", async () => {

        const userBankContract = await ethers.getContractAt("MyBank", myBank.address, user);
        console.log(userBankContract.address)

        await token.transfer(myBank.address, ethers.utils.parseEther("55"));
        await expect( userBankContract.withdraw(token.address, ethers.utils.parseEther("40"))).to.be.revertedWith("Permission Denied")
    })
})