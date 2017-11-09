
export const setRole = (component, contract, roleObj) => {
  contract.deployed()
  .then( instance => {
    console.log(roleObj[0], roleObj[1], 'from: ' + component.state.activeAccount)
    // instance.setRole(roleObj[0], roleObj[1], {from: component.state.accountMain})
    instance.setRole(roleObj[0], roleObj[1], {from: String(component.state.activeAccount)})
    .then( () => {
      instance.getRole(roleObj[0])
      .then( (role) => {
        console.log('role: ' + role)
        component.setState({returnedRole: role})
      })
    })
  })
}

//export const getHash = (component, contract, hashobj) => {
//  contract.deployed()
//  .then( (instance) => {
//    console.log('instance: ' + instance)
//
//    instance.gethash(hashobj[0], hashobj[1], hashobj[2], hashobj[3], {from: component.state.activeaccount})
//    .then( hash => {
//      console.log('hash: ' + hash)
//      console.log('activeaddress: ' + component.props.activeaccount)
//      console.log('accounts[0]: ' + component.state.web3.eth.accounts[0])
//      console.log('contractaddress: ' + contract.address)
//      component.setstate({hash: hash})
//    })
//  })
//}

export const getHash = (component, contract, hashobj) => {
  return new Promise((resolve, reject) => {
    contract.deployed()
    .then( instance => {
      console.log('instance: ' + instance)
      instance.getHash(hashobj[0], hashobj[1], hashobj[2], hashobj[3], {from: component.state.activeAccount})
      .then( hash => {
        console.log('hash: ' + hash)
        console.log('activeAddress: ' + component.state.activeAccount)
        console.log('accounts[0]: ' + component.state.web3.eth.accounts[0])
        console.log('contractaddress: ' + contract.address)
        resolve(component.setState({hash: hash}))
      })
    })
  })
}

export const commissionUnit = (component, contract, hash) => {
  console.log('hash sent to function: ' + hash)
  contract.deployed()
  .then( instance => {
    instance.commissionUnit(hash, {from: String(component.state.activeAccount)})
    .then( () => {
      instance.unitExists(hash)
      .then( (exists) => {
        console.log('hash sent: ' + hash)
        console.log('unitExists: ' + exists)
      })
    })
  })
}

export const verifyCommission = (component, contract, hash) => {
  contract.deployed()
  .then( instance => {
    instance.unitExists(hash, {from: String(component.state.activeAccount)})
    .then( (exists) => {
      console.log('exists: ' + exists)
      component.setState({commissionExists: exists})
    })
  })
}

export const getHashArrayLength = (component, contract) => {
  return new Promise((resolve, reject) => {
    contract.deployed()
    .then( instance => {
      instance.hashArrayLength()
      .then( len => {
        console.log('array length: ' + len)
        resolve(len)
      })
    })
  })
}

export const getHashArrayValue = (component, contract, index) => {
  return new Promise((resolve, reject) => {
    contract.deployed()
    .then( instance => {
      instance.getHashArray(index)
      .then( val =>  {
        console.log('index: ' + index + '  ;  value: ' + val)
        resolve(val)
      })
    })
  })
}

export const getUnitValue = (component, contract, hash) => {
  return new Promise((resolve, reject) => {
    contract.deployed()
    .then( instance => {
      instance.units(hash)
      .then( res => {
        console.log(res)
        resolve(res)
      })
    })
  })
}
