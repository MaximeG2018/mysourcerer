import gql from "graphql-tag";

export const GET_REPO = gql`
  query($cursor: String, $login: String!) {
    user(login: $login) {
      repositories(
        first: 1
        orderBy: { field: CREATED_AT, direction: DESC }
        after: $cursor
        privacy: PUBLIC
      ) {
        nodes {
          name
          updatedAt
          url
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
