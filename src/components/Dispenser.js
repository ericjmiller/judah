import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'


export default class Dispenser extends Component {
  state = {
    web3: null,
    serial: '',
    gtin: '',
    ph1: '',
    ph2: '',
    submittedSerial: '',
    submittedGtin: '',
    submittedPh1: '',
    submittedPh2: '',
    unitManager: null,
    hash: ''
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        activeAccount: results.web3.eth.accounts[0]
      })


      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const unitManager = contract(UnitManager)
    unitManager.setProvider(this.state.web3.currentProvider)

    this.setState({unitManager: unitManager})
    console.log(this.state.unitManager)

  //   var unitManagerInstance
   //
  //  // Get accounts.
  //  this.state.web3.eth.getAccounts((error, accounts) => {
  //    unitManager.deployed().then((instance) => {
  //      unitManagerInstance = instance
   //
  //      return unitManagerInstance.setRole()
  //    })
//
//        // Stores a given value, 5 by default.
//        return simpleStorageInstance.set(5, {from: accounts[0]})
//      }).then((result) => {
//        // Get the value from the contract to prove it worked.
//        return simpleStorageInstance.get.call(accounts[0])
//      }).then((result) => {
//        // Update state with the result.
//        return this.setState({ storageValue: result.c[0] })
//    })
  }


  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { serial, gtin, ph1, ph2 } = this.state

    this.setState({ submittedSerial: serial, submittedGtin: gtin, submittedPh1: ph1, submittedPh2:ph2 })

    var unitManagerInstance

    console.log(this.state.web3)
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log('accounts: ' + accounts)
      this.state.unitManager.deployed().then((instance) => {
        console.log('instance: ' + instance)
        unitManagerInstance = instance

        return unitManagerInstance.getHash(this.state.submittedSerial, this.state.submittedGtin,
          this.state.submittedPh1, this.state.submittedPh2).then( result => {
            console.log('hash: ' + result)
            this.setState({hash: result})
          })
      })
    })
  }

  render () {
    const { serial, gtin, ph1, ph2 } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Serial Number" name="serial" value={serial} onChange={this.handleChange} />
        <Form.Input label="GTIN" name="gtin" value={gtin} onChange={this.handleChange} />
        <Form.Input label="PH1" name="ph1" value={ph1} onChange={this.handleChange} />
        <Form.Input label="PH2" name="ph2" value={ph2} onChange={this.handleChange} />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
