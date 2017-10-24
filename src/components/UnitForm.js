import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default UnitForm extends Component {
  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Serial Number" name="serial" value={serial} onChange={this.handleChange} />
        <Form.Input label="GTIN" name="gtin" value={gtin} onChange={this.handleChange} />
        <Form.Input label="PH1" name="ph1" value={ph1} onChange={this.handleChange} />
        <Form.Input label="PH2" name="ph2" value={ph2} onChange={this.handleChange} />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
