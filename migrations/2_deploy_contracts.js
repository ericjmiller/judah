var UnitManager = artifacts.require("./UnitManager.sol");

module.exports = function(deployer) {
  deployer.deploy(UnitManager);
};
