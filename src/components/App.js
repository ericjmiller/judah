import React, { Component } from 'react'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'
import Dispenser from './Dispenser'
import Manufacturer from './Manufacturer'
import Packager from './Packager'
import Nav from './Nav'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    activeItem: null,
    activeScreen: null,
    activeAccount: null
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
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const unitManager = contract(UnitManager)
    unitManager.setProvider(this.state.web3.currentProvider)

//    // Declaring this for later so we can chain functions on SimpleStorage.
//    var unitManagerInstance
//
//    // Get accounts.
//    this.state.web3.eth.getAccounts((error, accounts) => {
//      unitManager.deployed().then((instance) => {
//        unitManagerInstance = instance
//
//        // Stores a given value, 5 by default.
//        return simpleStorageInstance.set(5, {from: accounts[0]})
//      }).then((result) => {
//        // Get the value from the contract to prove it worked.
//        return simpleStorageInstance.get.call(accounts[0])
//      }).then((result) => {
//        // Update state with the result.
//        return this.setState({ storageValue: result.c[0] })
//      })
//    })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name})
    if (name === 'manufacturer') this.setState({activeScreen: <Manufacturer />})
    else if (name === 'packager') this.setState({activeScreen: <Packager />})
    else this.setState({activeScreen: <Dispenser />})
  }


  render() {
    // const { activeItem } = this.state.activeItem

    return (
      <div className="App">
        <Nav
          handleItemClick={this.handleItemClick}
          activeItem={this.state.activeItem}
        />

        <div className="ui main text container">
          {this.state.activeAccount}
        </div>
        <div className="ui main text container">
          {this.state.activeScreen}
        </div>
      </div>
    );
  }
}

export default App
