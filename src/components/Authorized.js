import React, { Component } from 'react';

import Auth from '../modules/Auth';

export default class Authorized extends Component {
  constructor() {
    super();

    this.state = {
      data: null
    }

    fetch('http://localhost:3001/authorized',
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
      .then(response => response.text())
      .then(result => {
        this.setState({ data: result });
      })

  }

  render() {
    return (
      <div>
        <h2>Authorized Page</h2>
        {
          this.state.data ? this.state.data : "You aren't authorized to view this page"
        }
      </div>
    );
  }
}
