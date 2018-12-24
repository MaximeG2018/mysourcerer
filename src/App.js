import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import GitInfo from "./pages/gitInfos";
import Home from "./pages/home";

const APP_NAME = "mySourcerer.app";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      user: null
    };
    this.searchUser = this.searchUser.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  searchUser = user => {
    this.setState({ user, isConnected: true });
  };

  goBack() {
    this.setState({ isConnected: false });
  }

  render() {
    const { isConnected } = this.state;
    return (
      <Router>
        <>
          {!isConnected ? (
            <Route
              exact
              path="/"
              render={props => {
                return <Home {...props} userChange={this.searchUser} />;
              }}
            />
          ) : (
            <Route
              exact
              path="/"
              render={props => {
                return (
                  <GitInfo
                    {...props}
                    user={this.state.user}
                    goBack={this.goBack}
                  />
                );
              }}
            />
          )}
        </>
      </Router>
    );
  }
}

export default App;
