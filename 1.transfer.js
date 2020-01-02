const Transfer = artifacts.require("Transfer");
module.exports = async (callback) => {
    try {
        let instance = await Transfer.at("0xabD1cc0AFB56323D8949cb59EDA6ee540Dc5Af53");
        // let instance = await Transfer.deployed();
        let address = await instance.address;
        // console.log("instance =  ",instance);
        // await instance.setA(16);
        // 获取方法的返回值
        let a = await instance.getA.call();
        console.log("a = ", a.toNumber());
        let accounts = await web3.eth.getAccounts();
        // accounts.forEach(account => {
        //     console.log("accout", account);
        // });
        let eth = await web3.eth.getBalance(address);//获取该token的以太坊余额
        console.log("eth = ", web3.utils.fromWei(eth,"ether"));
        // await web3.eth.sendTransaction(
        //     {
        //         from: accounts[2],
        //         to: instance.address,
        //         value: web3.utils.toWei('8', "ether")
        //     });
        let token = await instance.balanceOf.call("0x435BcAC8b4C2E69027633d61376C58e1bFA56D92");
        console.log("token = ",  token.toNumber());
        // console.log("token = ",  token);
        // let gas = await instance.balanceOf.estimateGas(address);
        // console.log("gas = ",  gas);
    } catch (e) {
        console.log("e = " + e.stack);
        callback(e)
    }
    callback();
};