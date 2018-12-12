import React, { Component } from "react";
import gql from "graphql-tag";

export const GET_REPO = gql`
  query {
    viewer {
      repositories(orderBy: { field: CREATED_AT, direction: DESC }, last: 23) {
        nodes {
          name
          createdAt
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
            edges {
              size
              cursor
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
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
