
export const setRole = (component, contract, roleObj) => {
  contract.deployed()
  .then((instance) => {
    instance.setRole(roleObj[0], roleObj[1], {from: component.state.accountMain})
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
  .then((instance) => {
    console.log('instance: ' + instance)

    instance.getHash(hashObj[0], hashObj[1], hashObj[2], hashObj[3])
    .then( hash => {
      console.log('hash: ' + hash)
      component.setState({hash: hash})
      instance.commissionUnit(hash, {from: component.state.accountMain})
      .then( () => {
        instance.unitExists(hash)
        .then( (exists) => {
          console.log('unitExists: ' + exists)
        })
      })
    })

  })
}

//export default getHash, setRole
