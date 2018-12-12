import React, { Component } from "react";
import gql from "graphql-tag";

export const GET_USER = gql`
  query {
    viewer {
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
            name
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

export const GET_COMMIT = gql`
  query {
    viewer {
      login
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
    }
  }
`;

export const GET_LANGUAGE = gql`
  query {
    viewer {
      name
      repositories(last: 7) {
        totalCount
        nodes {
          name
          languages(last: 7) {
            totalSize
            edges {
              size
              node {
                id
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;
