import React from "react";
import { Query } from "react-apollo";
import { GET_COMMIT } from "./getCommit";
import { Spinner } from "evergreen-ui";
import CommitData from "../../components/CommitData";
import moment from "moment";

export const GetCommit = ({ user }) => {
  const variables = {
    login: user
  };
  return (
    <>
      <Query query={GET_COMMIT} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }

          let getCommit = [];
          data.user.repositories.nodes.forEach(item => {
            if (item.defaultBranchRef) {
              item.defaultBranchRef.target.history.nodes.forEach(commitDate => {
                getCommit.push(
                  moment(commitDate.committedDate).format("MMM YYYY")
                );
              });
            }
          });

          const map = getCommit.reduce(
            (a, c) => ((a[c] = a[c] || 0), a[c]++, a),
            {}
          );

          const output = Object.keys(map).map(s => ({
            date: s,
            count: map[s]
          }));

          output.sort(function(a, b) {
            var dateA = new Date(a.date),
              dateB = new Date(b.date);
            return dateA - dateB;
          });

          return (
            <>
              <CommitData getCommit={output} />
            </>
          );
        }}
      </Query>
    </>
  );
};
