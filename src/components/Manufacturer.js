import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'
import * as client from '../utils/contractClient.js'

export default class Manufacturer extends Component {
  state = {
    web3: '',
    unitManager: null,
    hashArray: [],
    table: [],
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
      })


      this.instantiateContract()

      // get all hashes and present in table
      client.getHashArrayLength(this, this.state.unitManager)
      .then( len => {
        this.setState({arrayLength: len.toString(10)})
      })
      .then( len => {
        console.log('for loop starts: ' + this.state.arrayLength)
        for(let i = 0; i < this.state.arrayLength; i++) {
          console.log(i)
          client.getHashArrayValue(this, this.state.unitManager, i)
          .then( val => {
            this.setState({hashArray: this.state.hashArray.concat(val)})
            this.setState({table: this.state.table.concat(
              <Table.Row>
                <Table.Cell>{val}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            )})
          })
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
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hash</Table.HeaderCell>
              <Table.HeaderCell>F2</Table.HeaderCell>
              <Table.HeaderCell>F2</Table.HeaderCell>
              <Table.HeaderCell>F4</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="hashTable">
            {this.state.table}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
