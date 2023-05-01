const { ethers } = require("hardhat");

const main = async () => {

  const deployer = await ethers.getSigner();
  const myBank = await ethers.getContractFactory("Token", deployer);

  console.log("deploying contract...")
  const myBankContract = await myBank.deploy();

  console.log("tx", myBankContract.deployTransaction.hash);
  await myBankContract.deployTransaction.wait(1);

  console.log("succesfully deployed to:", myBankContract.address);


// console.log((await myBankContract.balanceOf(deployer.address)).toString()/1e18);

// const user = await ethers.getSigner(1);

// await myBankContract.transfer(user.address, ethers.utils.parseEther("60"));

// console.log((await myBankContract.balanceOf(user.address)).toString()/1e18);
// console.log((await myBankContract.balanceOf(deployer.address)).toString()/1e18);

}

main().then(()=> process.exit(1)).catch((e) => {
  console.error(e);
  process.exit(0);
})