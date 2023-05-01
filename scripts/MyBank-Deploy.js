const { ethers } = require("hardhat");

const main = async () => {

  const deployer = await ethers.getSigner();
  const myBank = await ethers.getContractFactory("MyBank", deployer);
try{
  console.log("deploying contract...")
  const myBankContract = await myBank.deploy();

  console.log("tx", myBankContract.deployTransaction.hash);
  await myBankContract.deployTransaction.wait(1);

  console.log("succesfully deployed to:", myBankContract.address);

}catch(e){
  console.error(e)
}



}

main().then(()=> process.exit(1)).catch((e) => {
  console.error(e);
  process.exit(0);
})