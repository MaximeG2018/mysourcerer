import gql from "graphql-tag";

export const GET_COMMIT = gql`
  query {
    viewer {
      repositories(last: 23) {
        nodes {
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  nodes {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
