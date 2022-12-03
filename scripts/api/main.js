const express = require("express");
const {ContractActions} = require("../contractActions");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const apikey = "contractskey";
// const TestPublicAddress = process.env.TEST_PUBLIC_ADDRESS;

app.get("/test", (req, res) => {
    res.send("Working");
})

/*const sampleRequest = {
    key: apikey,
    address: TestPublicAddress,
    amount: 2
}*/
app.post("/mintToken", async (req, res) => {
    try {
        let data = req.body
        if (data.key === apikey && data.address && data.amount) {
            if (ContractActions.balanceOf(data.address) !== null || ContractActions.balanceOf(data.address) !== undefined) {
                await ContractActions.mint(data.address,data.amount);
                res.json({
                    cet:Number(await ContractActions.balanceOf(data.address))
                })
            }
            else {
                res.status(400).json({
                    message:"No balance/address found"
                })
            }

        }
        else {
            res.status(400).json({
                message:"Something is wrong in your data",
            })
        }
    } catch (err) {
        console.info(err);
    }
})

app.post("/getBalance",async (req,res)=>{
    try {
        let data = req.body;
        console.info(Number(await ContractActions.balanceOf(data.address)));
        let response = {
            cet:Number(await ContractActions.balanceOf(data.address))
        }
        res.json(response);
    }catch (err){
        console.error(err)
    }
})
const init = async () => {
    await ContractActions.init();
    if (ContractActions.cet) {
        console.log("Token initialised");
    } else {
        console.error("Token not initialised");
        throw new Error("Token not initialised");
    }
    app.listen(8121)
    console.log("app listening 8121");
}

init();

