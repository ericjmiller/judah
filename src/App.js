import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UnitManager from '../build/contracts/UnitManager.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
//import './css/pure-min.css'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      role: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
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

  render() {
    return (
      <div className="App">
        <Menu>
          <Menu.Item header>Our Company</Menu.Item>
          <Menu.Item header>Our Company</Menu.Item>
        </Menu>
        <nav className="ui fixed pointing secondary menu">
            <a className="logo header item">MEDCHAIN</a>
            <a href="#"
              className="item"
              onClick={() => this.setState({role: "Manufacturer"})}
              >Manufacturer</a>
            <a href="#"
              className="item"
              onClick={() => this.setState({role: "Packager"})}
              >Packager</a>
            <a href="#"
              className="item"
              onClick={() => this.setState({role: "Dispenser"})}
              >Dispenser</a>
        </nav>

        <main className="ui main text container">
          {this.state.role}
        </main>
      </div>
    );
  }
}

export default App
