var Migrations = artifacts.require("./Migrations.sol")
var UnitManager = artifacts.require("./UnitManager.sol")

module.exports = function(deployer) {
  deployer.deploy(Migrations)
  deployer.deploy(UnitManager)
};
