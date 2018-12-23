import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GetUser } from "../call/getUser";
import { GetRepos } from "../call/getRepos";
import { GetLanguages } from "../call/getLanguages";
import { GetCommit } from "../call/getCommit";
import { Layout } from "antd";
import { Row, Col } from "antd";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",

  request: operation => {
    const { REACT_APP_TOKEN } = process.env;
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        Authorization: `Bearer ${REACT_APP_TOKEN}`
      }
    }));
  }
});

class GitInfo extends Component {
  render() {
    return (
      <>
        <Layout>
          <ApolloProvider client={client}>
            <div className="App">
              <header className="App-header">
                <GetUser />
              </header>
              <h1>Repositories</h1>
              <GetRepos />
              <h1>Commit</h1>
              <Row>
                <Col span={12} offset={6}>
                  <GetCommit />
                </Col>
              </Row>
              <Row>
                <h1>Languages</h1>
                <GetLanguages />
              </Row>
            </div>
          </ApolloProvider>
        </Layout>
      </>
    );
  }
}
export default GitInfo;