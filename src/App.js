import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Row, Col } from "antd";

import GitInfo from "./pages/gitInfos";

class App extends Component {
  render() {
    return (
      <>
        <GitInfo />
      </>
    );
  }
}

export default App;
