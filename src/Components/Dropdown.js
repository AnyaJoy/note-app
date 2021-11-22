import React, { Component } from 'react'

import Dropdown from 'react-css-dropdown'
import 'react-css-dropdown/dist/index.css'

class Example extends Component {
  constructor() {
    super()
    this.state = {
      options: [
        { name: 'Option 1', value: '1234' },
        { name: 'Option 2', value: '5678' },
        { name: 'Option 2', value: '91011' }
      ],
    //   handleSelect: (value: string) => console.log(value)
    }
  }
  render() {
    return <Dropdown {...this.state.props} />
  }
}