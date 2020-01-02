const transfer3 = artifacts.require("Transfer3");
var BN = web3.utils.BN;
module.exports = async function(deployer) {
   await deployer.deploy(transfer3,new BN("2000000"));
};
