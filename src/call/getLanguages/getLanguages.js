import gql from "graphql-tag";

export const GET_LANGUAGES = gql`
  query {
    viewer {
      repositories(orderBy: { field: CREATED_AT, direction: DESC }, last: 23) {
        nodes {
          name
          languages(last: 100) {
            nodes {
              name
              color
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  nodes {
                    additions
                    deletions
                  }
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;
