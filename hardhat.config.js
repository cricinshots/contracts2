require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
 defaultNetwork: "liberty",
 networks: {
   hardhat: {
   },
   liberty: {
     url: "https://liberty10.shardeum.org/",
     chainId: 8080,
     accounts:[privateKey]
   },
 },
 solidity: {
 version: "0.8.9",
 settings: {
   optimizer: {
     enabled: true
   }
  }
 },
 paths: {
   sources: "./contracts",
   tests: "./test",
   cache: "./cache",
   artifacts: "./artifacts"
 },
 mocha: {
   timeout: 20000
 }
};