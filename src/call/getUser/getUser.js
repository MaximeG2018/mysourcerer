import gql from "graphql-tag";

export const GET_USER = gql`
  query($login: String!) {
    user(login: $login) {
      login
      name
      bio
      avatarUrl
      repositories(first: 100) {
        totalCount
        nodes {
          nameWithOwner
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
      followers(first: 100) {
        edges {
          node {
            id
          }
        }
      }
      following(first: 100) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
