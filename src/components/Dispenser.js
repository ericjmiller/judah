import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'
import * as client from '../utils/contractClient.js'


export default class Dispenser extends Component {
  state = {
    web3: null,
    serial: '',
    submittedSerial: '',
    gtin: '',
    submittedGtin: '',
    ph1: '',
    submittedPh1: '',
    ph2: '',
    submittedPh2: '',
    role: '',
    submittedRole: '',
    unitManager: null,
    hash: '',
    accountMain: this.props.accountMain
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
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
  }


  // form field changes
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  // set role: should only be set to 5 (dispensary) in this component
  handleRoleSubmit = () => {
    const { role } = this.state
    this.setState({submittedRole: role})

    client.setRole(this, this.state.unitManager, [this.state.web3.eth.accounts[0], parseInt(role, 10)])
  }

  // form submit: verify commissioned unit
  handlePackageSubmit = () => {
    const { serial, gtin, ph1, ph2 } = this.state
    this.setState({ submittedSerial: serial, submittedGtin: gtin, submittedPh1: ph1, submittedPh2:ph2 })

    console.log(this.state.web3)
    client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
    client.verifyCommission(this, this.state.unitManager, this.state.hash)
  }

  render () {
    const { serial, gtin, ph1, ph2, role } = this.state

    return (
      <div className="container">
        <h1>Dispenser</h1>
        <Form onSubmit={this.handleRoleSubmit}>
          <Form.Input label="Role" name="role" value={role} onChange={this.handleChange} />
          <Button type='submit'>Set Role</Button>
        </Form>
        <Form onSubmit={this.handlePackageSubmit}>
          <Form.Input label="Serial Number" name="serial" value={serial} onChange={this.handleChange} />
          <Form.Input label="GTIN" name="gtin" value={gtin} onChange={this.handleChange} />
          <Form.Input label="PH1" name="ph1" value={ph1} onChange={this.handleChange} />
          <Form.Input label="PH2" name="ph2" value={ph2} onChange={this.handleChange} />
          <Button type='submit'>Submit</Button>
        </Form>
        <div className="hash">
          <p>{this.state.commissionExist}</p>
        </div>
      </div>
    )
  }
}
