import React, { Component } from 'react'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'
import * as client from '../utils/contractClient.js'

export default class Manufacturer extends Component {
  state = {
    web3: '',
    unitManager: null,
    hashArray: [],
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
      })


      this.instantiateContract()
      //client.getHashArray(this, this.state.unitManager)
      client.getHashArrayLength(this, this.state.unitManager)
      .then( len => {
        this.setState({arrayLength: len.toString(10)})
      })
      .then( len => {
        for(let i = 0; i < len; i++) {
          
        }
      })
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

  render () {
    return (
      <div className="ui main text container">
        <h1>Manufacturer</h1>
        <p>{this.state.hashArray}</p>
        <p>{this.state.arrayLength}</p>
      </div>
    )
  }
}
