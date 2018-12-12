import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_LANGUAGES } from "./getLanguages";
import LanguagesData from "../../components/languagesData";
import { Spinner } from "evergreen-ui";

export const GetLanguages = props => {
  return (
    <>
      <Query query={GET_LANGUAGES}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          const arrAllLanguages = [];
          const languages = [];
          const color = [];
          const count = [];
          data.viewer.repositories.nodes.map(item => {
            item.languages.nodes.map(language => {
              arrAllLanguages.push(language.name);
              if (
                !languages.includes(language.name) &&
                !color.includes(language.color)
              ) {
                color.push(language.color);
                languages.push(language.name);
              }
            });
          });
          const map = arrAllLanguages.reduce(
            (a, c) => ((a[c] = a[c] || 0), a[c]++, a),
            {}
          );

          const output = Object.keys(map).map(s => ({
            name: s,
            count: map[s]
          }));

          output.map(totalCount => {
            count.push(totalCount.count);
          });
          console.log(count);

          return (
            <>
              <LanguagesData
                languages={languages}
                color={color}
                count={count}
              />
            </>
          );
        }}
      </Query>
    </>
  );
};
