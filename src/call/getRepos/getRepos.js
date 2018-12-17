import gql from "graphql-tag";

export const GET_REPO = gql`
  query {
    viewer {
      repositories(orderBy: { field: CREATED_AT, direction: DESC }, last: 23) {
        nodes {
          name
          updatedAt
          url
          isPrivate
          collaborators(first: 3) {
            nodes {
              login
              avatarUrl
            }
          }
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
