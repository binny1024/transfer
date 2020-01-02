const transfer = artifacts.require("Transfer");

contract("Transfer", async (accounts) => {
    try {
        console.log("account = ", accounts[0]);
        let instance = await transfer.deployed();
        // let address = await  instance.address;
        let a = await instance.getA();
        // console.log("instance.address = ",address );
        console.log("instance.a = ",a );
    } catch (e) {
        console.error(e)
    }
});