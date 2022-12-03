const {Contract} = require("ethers");
require('dotenv').config();
const contractAddress = process.env.CONTRACT_ADDRESS;
const hre = require("hardhat");

/**
 * Methods to interact with the Cricinshots Energy Token
 * @type {ContractActions}
 * @property {Contract} cet - The Cricinshots Energy Token contract object
 */
class ContractActions {
    static cet;

    /**
     * Initialise the contract object
     * @returns {Promise<void>}
     */
    static async init() {
        try{
            console.log('Contract address',contractAddress);
            ContractActions.cet = await hre.ethers.getContractAt("CricinshotsEnergyToken", contractAddress);
        }catch(e) {
            console.error("Failed to initialise token",e);
        }
    }

    /**
     * Mints "amount" tokens to "address". Returns the transaction object
     * @param {string} address 
     * @param {number} amount 
     * @returns The transaction object
     * @throws {Error} If the transaction fails
     */
    static async mint(address, amount) {
        try{
            const tx = await ContractActions.cet.mintto(address, amount);
            await tx.wait();
            console.log("Minted",amount,"to",address);
            return tx;
        }catch(e) {
            console.error("Failed to mint",e);
            return null;
        }
    }

    /**
     * Burns "amount" tokens from "address". Returns the transaction object
     * @param {string} address
     * @param {number} amount
     * @returns The transaction object
     * @throws {Error} If the address does not have enough tokens
     * @throws {Error} If the transaction fails
     */
    static async burn(address, amount) {
        try{
            const tx = await ContractActions.cet.burnFrom(address, amount);
            await tx.wait();
            console.log("Burnt",amount,"from",address);
            return tx;
        }catch(e) {
            console.error("Failed to burn",e);
            return null;
        }
    }

    /**
     * Returns the balance of "address"
     * @param {string} address
     * @returns {number} The balance of "address"
     */
    static async balanceOf(address) {
        try{
            const balance = await ContractActions.cet.balanceOf(address);
            //TODO: Extract actual balance from balance object
            //Example Balance object: BigNumber { value: "4" }
            console.log("Balance of",address,"is",balance);
            return balance;
        }catch(e) {
            console.error("Failed to get balance",e);
            return null;
        }
    }
}

module.exports = {ContractActions};