const hre = require("hardhat");

async function main() {
  const CricinshotsEnergy = await hre.ethers.getContractFactory("CricinshotsEnergyToken");
  const energyToken = await CricinshotsEnergy.deploy();

  await energyToken.deployed();
  console.log("Cricinshots Energy Token deployed to:", energyToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});