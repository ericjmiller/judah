var UnitManager = artifacts.require("./UnitManager.sol");

module.exports = function(deployer) {
  // deployer.deploy(UnitManager)
  let hash = ''
  let arrayLength = 0
  deployer
  // .then( () => {
  //   return UnitManager.new()
  // })
  .then( instance => {
    let x = UnitManager.deployed()
    return x
  })
  .then( instance => {
    instance.setRole(web3.eth.accounts[1], 3, {from: web3.eth.accounts[0]})
    return instance
  })
  .then ( instance => {
    instance.setRole(web3.eth.accounts[2], 5, {from: web3.eth.accounts[0]})
    return instance
  })
  .then( instance => {
    instance.getRole(web3.eth.accounts[1])
    .then ( role => {
      console.log('account1 role: ' + role)
    })
    return instance
  })
  .then( instance => {
    instance.getRole(web3.eth.accounts[2])
    .then ( role => {
      console.log('account2 role: ' + role)
    })
    return instance
  })
  .then ( instance => {
    instance.getHash("f", "f", "f", "f")
    .then ( hash => {
      console.log('hash: ' + hash)
      instance.commissionUnit(hash, {from: web3.eth.accounts[1]})
      .then ( () => {
        instance.unitExists(hash, {from: web3.eth.accounts[0]})
        .then( exists => {
          console.log('unit exists: ' + exists)
          instance.hashArrayLength()
          .then( length => {
            console.log('hashArrayLength: ' + length)
            instance.getHashArray(0)
            .then( val => {
              console.log('array value at 0: ' + val)
            })
          })
        })
      })
    })
    return instance
  })
  .then ( instance => {
    instance.getHash("a", "a", "a", "a")
    .then ( hash => {
      console.log('hash: ' + hash)
      instance.commissionUnit(hash, {from: web3.eth.accounts[1]})
      .then ( () => {
        instance.unitExists(hash, {from: web3.eth.accounts[0]})
        .then( exists => {
          console.log('unit exists: ' + exists)
          instance.hashArrayLength()
          .then( length => {
            console.log('hashArrayLength: ' + length)
            instance.getHashArray(1)
            .then( val => {
              console.log('array value at 1: ' + val)
            })
          })
        })
      })
    })
    return instance
  })
  .then( () => {
    console.log('network id: ' + web3.version.network)
  })
};
