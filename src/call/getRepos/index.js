import React from "react";
import { Query } from "react-apollo";
import { GET_REPO } from "./getRepos";
import Repos from "../../components/repos";
import { Spinner } from "evergreen-ui";

export const GetRepos = props => {
  let arrRepo = [];
  const variables = {
    cursor: null
  };

  return (
    <>
      <Query query={GET_REPO} variables={variables}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <Spinner />;
          }

          const { pageInfo } = data.viewer.repositories;

          console.log();

          arrRepo = arrRepo.concat(data.viewer.repositories.nodes);

          if (pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                return Object.assign({}, prev, fetchMoreResult);
              }
            });
          }

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
