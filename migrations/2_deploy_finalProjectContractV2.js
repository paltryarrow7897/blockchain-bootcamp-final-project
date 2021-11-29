const finalProjectContractV2 = artifacts.require("finalProjectContractV2");

module.exports = function(deployer) {
  deployer.deploy(finalProjectContractV2, 50, 60, 2);
}