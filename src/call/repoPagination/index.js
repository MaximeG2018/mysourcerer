import React from "react";
import { Query } from "react-apollo";
import { GET_REPO } from "./repoPagination";
import ReposPagination from "../../components/repos";
import { Spinner } from "evergreen-ui";
import { Pane, Text, Button } from "evergreen-ui";

export const GetReposPagination = props => {
  const arrRepo = [];
  const variables = {
    cursor: null
  };

  return (
    <>
      <Query
        query={GET_REPO}
        fetchPolicy="cache-and-network"
        variables={variables}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <span>=== WAIT === </span>;
          }
          if (error) {
            return <span>=== ERROOOOOR === </span>;
          }

          arrRepo.push(data.viewer.repositories.nodes[0]);
          console.log(data.viewer.repositories.nodes[0]);

          console.log(arrRepo);

          const { pageInfo } = data.viewer.repositories;
          let newPosts;

          if (pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                //console.log("🔥", prev);
                newPosts = fetchMoreResult;
                //console.log("⚡️", fetchMoreResult);
                //arrRepo.push(newPosts);
                return Object.assign({}, prev, fetchMoreResult);
              }
            });
          }

          return (
            <Pane
              elevation={1}
              float="left"
              backgroundColor="white"
              width={420}
              height={240}
              margin={24}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Text>
                <strong>{data.viewer.name}</strong>
              </Text>
              <Button marginRight={16} appearance="minimal" onClick={() => {}}>
                Next
              </Button>
            </Pane>
          );
        }}
      </Query>
    </>
  );
};
