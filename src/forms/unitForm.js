import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

import * as client from '../utils/contractClient.js'


export default class UnitForm extends Component {
  state = {
    serial: '',
    submittedSerial: '',
    gtin: '',
    submittedGtin: '',
    ph1: '',
    submittedPh1: '',
    ph2: '',
    submittedPh2: '',
    hash: '',
    unitManager: this.props.unitManager,
    web3: this.props.web3,
    activeAccount: this.props.activeAccount,
    verify: this.props.verify,
    verifyResults: '',
    statusOptions: [ {key: "pending", value: "pending", text: "Pending"},
                     {key: "receive", value: "receive", text: "Receive"},
                     {key: "transit", value: "transit", text: "Transit"},
                     {key: "dispense", value: "dispense", text: "Dispense"} ],
    unitStatus: '',
    submittedUnitStatus: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handlePackageSubmit = () => {
    const { serial, gtin, ph1, ph2, unitStatus } = this.state
    this.setState({ submittedSerial: serial, submittedGtin: gtin, submittedPh1: ph1, submittedPh2:ph2, submittedUnitStatus: unitStatus })

    // is this is a new commission or simply verification?
    // if(this.state.verify) {
    //   client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
    //   .then( () => client.verifyCommission(this, this.state.unitManager, this.state.hash))
    // } else {
      switch(this.state.unitStatus) {
        case 'pending':
          client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
          .then( () => client.commissionUnit(this, this.state.unitManager, this.state.hash))
          break
        case 'receive':
          client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
          .then( () => client.receiveUnit(this, this.state.unitManager, this.state.hash))
          break
        case 'transit':
          client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
          .then( () => client.shipUnit(this, this.state.unitManager, this.state.hash))
          break
        case 'dispense':
          client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
          .then( () => client.dispenseUnit(this, this.state.unitManager, this.state.hash))
          break
        default:
          break
      }
      // if(this.state.unitStatus === 'active') {
      //   client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
      //   .then( () => client.commissionUnit(this, this.state.unitManager, this.state.hash))
      // } else if(this.state.unitStatus === 'transit') {
      //   client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
      //   .then( () => client.shipUnit(this, this.state.unitManager, this.state.hash))
      // } else if(this.state.unitStatus === 'recieve') {
      //   client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
      //   .then( () => client.shipUnit(this, this.state.unitManager, this.state.hash))
      // } else if(this.state.unitStatus === 'dispense') {
      //   client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
      //   .then( () => client.shipUnit(this, this.state.unitManager, this.state.hash))
      // }
    }

  render() {
    const { serial, gtin, ph1, ph2, unitStatus } = this.state

    return (
      <div className="ui main text container">
        <h2>Unit Form:</h2>
        <Form onSubmit={this.handlePackageSubmit}>
          <Form.Input label="Serial Number" name="serial" value={serial} onChange={this.handleChange} />
          <Form.Input label="GTIN" name="gtin" value={gtin} onChange={this.handleChange} />
          <Form.Input label="PH1" name="ph1" value={ph1} onChange={this.handleChange} />
          <Form.Input label="PH2" name="ph2" value={ph2} onChange={this.handleChange} />
          <Form.Dropdown placeholder="Select Status" name="unitStatus" value={unitStatus} fluid selection options={this.state.statusOptions} onChange={this.handleChange}/>
          <Button type="submit">Submit</Button>
        </Form>
        <div className="hash">
          <p>{this.state.hash}</p>
          <p>{this.state.verifyResults}</p>
        </div>
      </div>
    )
  }
}
