import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GetUser } from "./call/getUser";
import { GetRepos } from "./call/getRepos";
import { GetLanguages } from "./call/getLanguages";
import { GetReposPagination } from "./call/repoPagination";
import { Layout } from "antd";

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

class App extends Component {
  render() {
    return (
      <Layout>
        <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <GetUser />
            </header>
            <GetRepos />
            <GetLanguages />
            <GetReposPagination />
          </div>
        </ApolloProvider>
      </Layout>
    );
  }
}

export default App;
