import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Nav extends Component {
  render () {
    return (
      <Menu stackable>
        <Menu.Item header>MEDCHAIN</Menu.Item>

        <Menu.Item
          name='manufacturer'
          active={this.props.activeItem === 'manufacturer'}
          onClick={this.props.handleItemClick}
          >
            Manufacturer
        </Menu.Item>

        <Menu.Item
          name='packager'
          active={this.props.activeItem === 'packager'}
          onClick={this.props.handleItemClick}
          >
            Packager
        </Menu.Item>

        <Menu.Item
          name='dispenser'
          active={this.props.activeItem === 'dispenser'}
          onClick={this.props.handleItemClick}
          >
            Dispenser
        </Menu.Item>
      </Menu>
    )
  }
}
