
export const setRole = (component, contract, roleObj) => {
  contract.deployed()
  .then( (instance) => {
    console.log(roleObj[0], roleObj[1], 'from: ' + component.state.accountMain)
    instance.setRole(roleObj[0], roleObj[1], {from: component.state.accountMain})
    // instance.setRole(roleObj[0], roleObj[1], {from: component.state.web3.eth.accounts[0]})
    .then( () => {
      instance.getRole(roleObj[0])
      .then( (role) => {
        console.log('role: ' + role)
        component.setState({returnedRole: role})
      })
    })
  })
}

export const getHash = (component, contract, hashObj) => {
  contract.deployed()
  .then( (instance) => {
    console.log('instance: ' + instance)

    instance.getHash(hashObj[0], hashObj[1], hashObj[2], hashObj[3])
    .then( hash => {
      console.log('hash: ' + hash)
      console.log('activeAddress: ' + component.props.activeAccount)
      console.log('accounts[0]: ' + component.state.web3.eth.accounts[0])
      console.log('contractAddress: ' + contract.address)
      component.setState({hash: hash})
      instance.commissionUnit(hash, {from: component.state.accountMain})
      // instance.commissionUnit(hash, {from: component.state.activeAccount})
      // instance.commissionUnit(hash, {from: component.state.web3.eth.accounts[0]})
      .then( () => {
        instance.unitExists(hash)
        .then( (exists) => {
          console.log('unitExists: ' + exists)
        })
      })
    })

  })
}

export const commissionUnit = (component, contract, hash) => {
  contract.deployed()
  .then( (instance) => {
    instance.commissionUnit(hash, {from: component.state.accountMain})
    .then( () => {
      instance.unitExists(hash)
      .then( (exists) => {
        console.log('unitExists: ' + exists)
      })
    })
  })
}

export const verifyCommission = (component, contract, hash) => {
  contract.deployed()
  .then( (instance) => {
    instance.unitExists(hash)
    .then( (exists) => {
      component.setState({commissionExists: exists})
    })
  })
}
