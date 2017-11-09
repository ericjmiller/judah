import React, { Component } from 'react'
import { Button, Form, Icon, Header } from 'semantic-ui-react'

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
    address: '',
    submittedAddress: '',
    unitManager: null,
    hash: '',
    accountMain: this.props.accountMain,
    activeAccount: this.props.activeAccount
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

  // set role: should only be set to 3 (packager) in this component
  // TODO: force role to packager or restrict input
  // handleRoleSubmit = () => {
  //   const { address, role } = this.state
  //   this.setState({submittedAddress: address, submittedRole: role})
  //
  //   client.setRole(this, this.state.unitManager, [address, parseInt(role, 10)])
  // }

  // form submit: commission unit
  handlePackageSubmit = () => {
    const { serial, gtin, ph1, ph2 } = this.state
    this.setState({ submittedSerial: serial, submittedGtin: gtin, submittedPh1: ph1, submittedPh2:ph2 })

    console.log(this.state.web3)
    client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
    .then( () => client.commissionUnit(this, this.state.unitManager, this.state.hash)
    )
  }

  render () {
    const { serial, gtin, ph1, ph2, address, role } = this.state

    return (
      <div className="ui main text container">
        <Header as='h2' icon textAlign='center'>
          <Icon name='qrcode' circular />
          <Header.Content>
            Packager
          </Header.Content>
        </Header>
        <Form onSubmit={this.handlePackageSubmit}>
          <Form.Input label="Serial Number" name="serial" value={serial} onChange={this.handleChange} />
          <Form.Input label="GTIN" name="gtin" value={gtin} onChange={this.handleChange} />
          <Form.Input label="PH1" name="ph1" value={ph1} onChange={this.handleChange} />
          <Form.Input label="PH2" name="ph2" value={ph2} onChange={this.handleChange} />
          <Button type='submit'>Submit</Button>
        </Form>
        <div className="hash">
          <p>{this.state.hash}</p>
        </div>
      </div>
    )
  }
}
