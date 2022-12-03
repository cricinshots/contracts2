// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

//TODO: remove at time of deployment
import "hardhat/console.sol";

/// @custom:security-contact aditya@cricinshots.com
contract CricinshotsEnergyToken is ERC20, ERC20Burnable, Pausable, Ownable, ERC20Permit {

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE`, and `PAUSER_ROLE` to the
     * account that deploys the contract.
     */
    constructor()
        ERC20("Cricinshots Energy Token", "CET")
        ERC20Permit("Cricinshots Energy Token")
    {}

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC20Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC20Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev See {ERC20-_beforeTokenTransfer}.
     *
     * Requirements:
     *
     * - the contract must not be paused.
     */

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     * - the contract must not be paused.
     * 
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens that will be minted.
     */
    function mintto (address to, uint256 amount) public onlyOwner {
        console.log("Minting %s tokens to %s", amount, to);
        _mint(to, amount);
    }

    /**
     * @dev Destroys `amount` tokens from the passed account.
     * Can only be called by the owner.
     * @param account The account whose tokens will be destroyed.
     * @param amount The amount that will be burnt.
     */
    function burnFrom(address account, uint256 amount) public override onlyOwner{
        console.log("Burning %s tokens from %s", amount, account);
        super.burnFrom(account, amount);
    }

    /**
     * @dev See {IERC20-allowance}.
     * @param account The account that owns the tokens.
     * @return The remaining number of tokens that `spender` will be
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        console.log("Balance of %s is %s", account, super.balanceOf(account));
        return super.balanceOf(account);
    }
}