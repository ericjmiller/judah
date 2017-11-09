import React, { Component } from 'react'
import { Button, Form, Icon, Header } from 'semantic-ui-react'
import UnitForm from '../forms/unitForm'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'
import * as client from '../utils/contractClient.js'


export default class Dispenser extends Component {
  state = {
    web3: null,
    unitManager: null,
    hash: '',
    accountMain: this.props.accountMain,
    activeAccount: this.props.activeAccount,
    unitForm: null,
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

    // setup unit form after all web3 variables are set
    this.setState({unitForm: (<UnitForm unitManager={this.state.unitManager} web3={this.state.web3} activeAccount={this.state.activeAccount} verify={false} />) })
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
        {this.state.unitForm}
      </div>
    )
  }
}
