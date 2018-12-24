import React from "react";
import { Query } from "react-apollo";
import { GET_REPO } from "./getRepos";
import Repos from "../../components/repos";
import { Spinner } from "evergreen-ui";

export const GetRepos = ({ user }) => {
  let arrRepo = [];
  const variables = {
    cursor: null,
    login: user
  };

  return (
    <>
      <Query query={GET_REPO} variables={variables}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <Spinner />;
          }

          const { pageInfo } = data.user.repositories;

          arrRepo = arrRepo.concat(data.user.repositories.nodes);

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
