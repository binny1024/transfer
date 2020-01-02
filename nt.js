const Transfer = artifacts.require("Transfer");
const Transfer3 = artifacts.require("Transfer3");
module.exports = async (callback) => {
    try {
        let instance = await Transfer.at("0xabD1cc0AFB56323D8949cb59EDA6ee540Dc5Af53");
        let instance3 = await Transfer3.at("0x5bFeC55f4e54192B612aeaC55948Fb3d7c77d62E");
        // let instance = await Transfer.deployed();
        // let instance3 = await Transfer3.deployed();
        let address = await instance.address;
        let address3 = await instance3.address;
        // console.log("instance =  ",instance);
        // console.log("instance3 =  ",instance3);
        // await instance.setA(16);
        // 获取方法的返回值
        let a = await instance.getA.call();
        console.log("a = ", a.toNumber());
        let a3 = await instance3.getA.call();
        console.log("a3 = ", a3.toNumber());
        let accounts = await web3.eth.getAccounts();
        // accounts.forEach(account => {
        //     console.log("accout", account);
        // });
        let eth = await web3.eth.getBalance(address);//获取该token的以太坊余额
        let eth3 = await web3.eth.getBalance(address3);//获取该token的以太坊余额
        console.log("eth = ", web3.utils.fromWei(eth,"ether"));
        console.log("eth = ", web3.utils.fromWei(eth3,"ether"));
        // await web3.eth.sendTransaction(
        //     {
        //         from: accounts[2],
        //         to: instance.address,
        //         value: web3.utils.toWei('8', "ether")
        //     });
        // await web3.eth.sendTransaction(
        //     {
        //         from: accounts[2],
        //         to: instance3.address,
        //         value: web3.utils.toWei('33', "ether")
        //     });
        let token = await instance.balanceOf.call("0x435BcAC8b4C2E69027633d61376C58e1bFA56D92");
        let token3 = await instance3.balanceOf.call("0x435BcAC8b4C2E69027633d61376C58e1bFA56D92");
        console.log("token = ",  token.toNumber());
        // console.log("token3 = ",  token3.toNumber());
        // console.log("token = ",  token);
        // let gas = await instance.balanceOf.estimateGas(address);
        // console.log("gas = ",  gas);
    } catch (e) {
        console.log("e = " + e.stack);
        callback(e)
    }
    callback();
};