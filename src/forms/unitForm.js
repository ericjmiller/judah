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
    verifyResults: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handlePackageSubmit = () => {
    const { serial, gtin, ph1, ph2 } = this.state
    this.setState({ submittedSerial: serial, submittedGtin: gtin, submittedPh1: ph1, submittedPh2:ph2 })

    // is this is a new commission or simply verification?
    if(this.state.verify) {
      client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
      .then( () => client.verifyCommission(this, this.state.unitManager, this.state.hash))
    } else {
      client.getHash(this, this.state.unitManager, [this.state.serial, this.state.gtin, this.state.ph1, this.state.ph2])
      .then( () => client.commissionUnit(this, this.state.unitManager, this.state.hash))
    }
  }

  render() {
    const { serial, gtin, ph1, ph2 } = this.state

    return (
      <div className="ui main text container">
        <h2>Unit Form:</h2>
        <Form onSubmit={this.handlePackageSubmit}>
          <Form.Input label="Serial Number" name="serial" value={serial} onChange={this.handleChange} />
          <Form.Input label="GTIN" name="gtin" value={gtin} onChange={this.handleChange} />
          <Form.Input label="PH1" name="ph1" value={ph1} onChange={this.handleChange} />
          <Form.Input label="PH2" name="ph2" value={ph2} onChange={this.handleChange} />
          <Button type='submit'>Submit</Button>
        </Form>
        <div className="hash">
          <p>{this.state.hash}</p>
          <p>{this.state.verifyResults}</p>
        </div>
      </div>
    )
  }
}
