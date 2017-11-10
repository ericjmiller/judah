import React, { Component } from 'react'
import { Icon, Header } from 'semantic-ui-react'
import UnitForm from '../forms/unitForm'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'


export default class Dispenser extends Component {
  state = {
    web3: null,
    unitManager: null,
    hash: '',
    accountMain: this.props.accountMain,
    activeAccount: this.props.activeAccount,
    commissionExists: '',
    unitForm: null
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

    this.setState({unitForm: (<UnitForm
                                unitManager={this.state.unitManager}
                                web3={this.state.web3}
                                activeAccount={this.state.activeAccount}
                                verify={true}
                              />) })
  }

  render () {
    return (
      <div className="ui text main container">
        <Header as='h2' icon textAlign='center'>
          <Icon name='barcode' circular />
          <Header.Content>
            Dispenser
          </Header.Content>
        </Header>
        {this.state.unitForm}
      </div>
    )
  }
}
