const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {ContractActions} = require('./contractActions');
require('dotenv').config();

const port = process.env.PORT;
const TestPublicAddress = process.env.TEST_PUBLIC_ADDRESS;

async function main() {

    app.listen(port, (_) => console.log(`Contract server listening on port ${port}`));

    // Run tests
    await runTests();
}

async function runTests() {
    // Test minting, burning and balanceOf
    await ContractActions.balanceOf(TestPublicAddress);
    await ContractActions.mint(TestPublicAddress,1);
    await ContractActions.balanceOf(TestPublicAddress);
    await ContractActions.burn(TestPublicAddress,1);
    await ContractActions.balanceOf(TestPublicAddress);
}

main();
