var Purchase = artifacts.require("./Purchase.sol");
var Publish = artifacts.require("./Publish.sol");

module.exports = function(deployer) {
  deployer.deploy(Purchase);
  deployer.deploy(Publish);
};
