import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Authorized from './components/Authorized';

import Auth from './modules/Auth';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: Auth.getUsername()
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    Auth.logIn(username, password, (result) => {
      if (result.success) {
        this.setState({ username: result.userData.username });
      }
    });
  }

  logout(e) {
    e.preventDefault();

    Auth.logout(() => {
      this.setState({ username: Auth.getUsername() });
    });
  }

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        <nav>
          {
            username ?
              (<span>{username} <a href="#" onClick={this.logout}>Log Out</a></span>) :
              (
                <span>
                  <input id="username" type="text" placeholder="username" />
                  <input id="password" type="password" placeholder="password" />
                  <button onClick={this.login}>Log In</button>
                </span>
              )
          } &nbsp;
          <a href="/">Home</a> &nbsp;
          <a href="/authorized">Authorized Page</a>
        </nav>
        <Router>
          <div id="main-content">
            <Route path="/" exact={true} component={Home} />
            <Route path="/authorized" component={Authorized} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
