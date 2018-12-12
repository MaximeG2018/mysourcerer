import React, { Component } from "react";
import gql from "graphql-tag";

export const GET_LANGUAGES = gql`
  query {
    viewer {
      repositories(orderBy: { field: CREATED_AT, direction: DESC }, last: 23) {
        nodes {
          languages(last: 100) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;
