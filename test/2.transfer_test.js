const transfer = artifacts.require("Transfer");

contract("transfer", async (accounts) => {
    try {
        console.log("account = ", accounts[0]);
        let instance = await transfer.deployed();
        console.log("instance.address = ",instance.address);
    } catch (e) {
        console.error(e)
    }
});