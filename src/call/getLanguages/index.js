import React from "react";
import { Query } from "react-apollo";
import { GET_LANGUAGES } from "./getLanguages";
import LanguagesData from "../../components/languagesData";
import { Spinner } from "evergreen-ui";
import _ from "lodash";

export const GetLanguages = ({ user }) => {
  const variables = {
    login: user
  };
  return (
    <>
      <Query query={GET_LANGUAGES} variables={variables}>
        {({ loading, error, data: { user } }) => {
          if (loading) {
            return <Spinner />;
          }
          const arrAllLanguages = [];
          const languages = [];
          const color = [];
          const count = [];
          const arrLangCommit = [];
          let sum = 0;
          let deletion = 0;
          let totalLoc = 0;
          user.repositories.nodes.forEach(item => {
            item.languages.nodes.forEach(language => {
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
          user.repositories.nodes.forEach(total => {
            if (total.defaultBranchRef) {
              total.defaultBranchRef.target.history.nodes.forEach(loc => {
                sum += loc.additions;
                deletion += loc.deletions;
                totalLoc = sum - deletion;
              });
            }
            total.languages.nodes.forEach(item => {
              if (languages.includes(item.name) && total.defaultBranchRef) {
                arrLangCommit.push({
                  name: item.name,
                  commit: total.defaultBranchRef.target.history.totalCount,
                  color: item.color,
                  additions: totalLoc
                });
              }
            });
          });

          var totalCommit = _(arrLangCommit)
            .groupBy("name")
            .map((objs, key) => ({
              name: key,
              commit: _.sumBy(objs, "commit"),
              color: _.find(objs, "color").color,
              additions: _.find(objs, "additions").additions
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
