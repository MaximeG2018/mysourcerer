import gql from "graphql-tag";

export const GET_COMMIT = gql`
  query($login: String!) {
    user(login: $login) {
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
