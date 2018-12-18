import React from "react";
import { Query } from "react-apollo";
import { GET_LANGUAGES } from "./getLanguages";
import LanguagesData from "../../components/languagesData";
import { Spinner } from "evergreen-ui";
import _ from "lodash";

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
          const arrLangCommit = [];
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
          data.viewer.repositories.nodes.map(total => {
            total.languages.nodes.map(item => {
              if (languages.includes(item.name) && total.defaultBranchRef) {
                arrLangCommit.push({
                  name: item.name,
                  commit: total.defaultBranchRef.target.history.totalCount,
                  color: item.color
                });
              }
            });
          });

          var totalCommit = _(arrLangCommit)
            .groupBy("name")
            .map((objs, key) => ({
              name: key,
              commit: _.sumBy(objs, "commit"),
              color: _.find(objs, "color").color
            }))
            .value();

          const map = arrAllLanguages.reduce(
            (a, c) => ((a[c] = a[c] || 0), a[c]++, a),
            {}
          );

          const output = Object.keys(map).map(s => ({
            name: s,
            count: map[s],
            commit: 0
          }));

          output.map(totalCount => {
            return count.push(totalCount.count);
          });

          return (
            <>
              <LanguagesData
                languages={languages}
                color={color}
                count={count}
                totalCommit={totalCommit}
              />
            </>
          );
        }}
      </Query>
    </>
  );
};
