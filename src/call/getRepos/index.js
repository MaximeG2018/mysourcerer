import React from "react";
import { Query } from "react-apollo";
import { GET_REPO } from "./getRepos";
import Repos from "../../components/repos";
import { Spinner } from "evergreen-ui";

export const GetRepos = props => {
  return (
    <>
      <Query query={GET_REPO}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          let arrRepo = [];
          data.viewer.repositories.nodes.forEach(item => {
            arrRepo.push(item);
          });

          return (
            <>
              <Repos repoList={arrRepo} />
            </>
          );
        }}
      </Query>
    </>
  );
};
