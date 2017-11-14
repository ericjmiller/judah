import React, { Component } from 'react'
import { Table, Grid, Segment, Divider, Icon, Header } from 'semantic-ui-react'
import UnitForm from '../forms/unitForm'

import UnitManager from '../../build/contracts/UnitManager.json'
import getWeb3 from '../utils/getWeb3'
import * as client from '../utils/contractClient.js'

export default class Manufacturer extends Component {
  state = {
    web3: '',
    unitManager: null,
    hashArray: [],
    table: [],
    unitArray: [],
    status: ["Pending", "Active", "Transit", "Dispensed" ],
    gridText: '',
    unitForm: null,
    accountMain: this.props.accountMain,
    activeAccount: this.props.activeAccount,
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
            console.log('val: ' + val)
            this.setState({hashArray: this.state.hashArray.concat(val)})

            client.getUnitValue(this, this.state.unitManager, this.state.hashArray[i])
            .then( res => {
              console.log('res: ' + res)
              this.setState({unitArray: this.state.unitArray.concat(res)})
              this.setState({table: this.state.table.concat(
                <Table.Row key={i} onClick={() => this.rowClick(val)}>
                  <Table.Cell>{val}</Table.Cell>
                  <Table.Cell>{this.state.status[res[1].toString()]}</Table.Cell>
                  <Table.Cell>{res[2]}</Table.Cell>
                </Table.Row>
              )})
            })
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

    this.setState({unitForm: (<UnitForm
                                unitManager={this.state.unitManager}
                                web3={this.state.web3}
                                activeAccount={this.state.activeAccount}
                                verify={false}
                              />) })
  }

  rowClick = (val) => {
    this.setState({gridText: val})
  }

  render () {
    return (
      <div>
        <div className="ui text main container">
          <Header as='h2' icon textAlign='center'>
            <Icon name='factory' circular />
            <Header.Content>
              Manufacturer
            </Header.Content>
          </Header>
        </div>
        <Grid columns={2} relaxed>
          <Grid.Column>
            <Segment basic>
              <Table selectable compact="very" size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Hash</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Custodian</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="hashTable">
                  {this.state.table}
                </Table.Body>
              </Table>
              <h1>{this.state.gridText}</h1>
            </Segment>
          </Grid.Column>
          <Divider vertical>Or</Divider>
          <Grid.Column>
            <Segment basic>
              {this.state.unitForm}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
