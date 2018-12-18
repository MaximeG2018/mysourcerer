import gql from "graphql-tag";

export const GET_REPO = gql`
  query($cursor: String) {
    viewer {
      name
      repositories(first: 1, privacy: PUBLIC, after: $cursor) {
        totalCount
        nodes {
          name
          primaryLanguage {
            name
            color
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
