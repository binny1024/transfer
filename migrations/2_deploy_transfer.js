const transfer = artifacts.require("Transfer");

module.exports = async function(deployer) {
   await deployer.deploy(transfer);
};
