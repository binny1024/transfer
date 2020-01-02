const Transfer = artifacts.require("Transfer3");
module.exports = async (callback) => {
    try {
        // 实例化一个已存在的合约
        let instance = await Transfer.at("0x8aDe7f58f806de0Ea48d139fAE7711F4103Ffe04");
        // let instance = await Transfer.at("0xdd82e403206c6C9E808cE7c9f53B2db96f3c4E88");
        // let instance = await Transfer.at("0xf81cBbCE94d06478543b9435f6BBeEB1CC098103");
        // let instance = await Transfer.deployed();

        // 获得合约的地址
        let address = await instance.address;
        // console.log("instance =  ",instance);
        // await instance.setA(16);


        // 获取方法的返回值,使用call 调用方法,取值
        let a = await instance.getA.call();
        console.log("a = ", a);

        //使用为eb3接口获取当前接电的所有账户地址
        let accounts = await web3.eth.getAccounts();
        // accounts.forEach(account => {
        //     console.log("accout", account);
        // });

        //获取 地址的 以太坊余额
        let eth = await web3.eth.getBalance(address);//获取该token的以太坊余额
        console.log("eth = ", web3.utils.fromWei(eth, "ether"));

        // 转账操作
        // await web3.eth.sendTransaction(
        //     {
        //         from: accounts[2],
        //         to: instance.address,
        //         value: web3.utils.toWei('8', "ether")
        //     });

        // 获取代币余额
        let token = await instance.balanceOf.call(accounts[0]);
        console.log("转账前:token ", accounts[0] + " = " + token.toNumber());
        token = await instance.balanceOf.call(address);
        console.log("转账前:token ", address + " = " + token.toNumber());

        var BN = web3.utils.BN;
        // await instance.transfer(address, accounts[0], new BN(2));
        await instance.transfer(accounts[0], address, new BN(2));
        // 获取代币余额
        token = await instance.balanceOf.call(accounts[0]);
        console.log("转账后,token = ", accounts[0]+" = "+token.toNumber());
        token = await instance.balanceOf.call(address);
        console.log("转账后:token ", address + " = " + token.toNumber());

    } catch (e) {
        console.log("e = " + e.stack);
        callback(e)
    }
    callback();
};