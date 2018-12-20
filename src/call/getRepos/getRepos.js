import gql from "graphql-tag";

export const GET_REPO = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 1
        orderBy: { field: CREATED_AT, direction: DESC }
        after: $cursor
      ) {
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
