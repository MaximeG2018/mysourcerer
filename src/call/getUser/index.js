import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_USER, GET_COMMIT, GET_LANGUAGE } from "./getUser";
import UserInfo from "../../components/userInfo";

export const GetUser = props => {
  return (
    <>
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span>WAIT</span>;
          }
          const followersCount = data.viewer.followers.edges.length;
          const followingCount = data.viewer.following.edges.length;
          const arrData = data.viewer.repositories.nodes;
          let commitCount = 0;
          arrData.forEach(item => {
            if (item.defaultBranchRef) {
              //console.log(item.defaultBranchRef.target.history.totalCount);
              return (commitCount +=
                item.defaultBranchRef.target.history.totalCount);
            }
          });
          const repoCount = arrData.length;

          return (
            <>
              <UserInfo
                img={data.viewer.avatarUrl}
                login={data.viewer.login}
                followersCount={followersCount}
                followingCount={followingCount}
                name={data.viewer.name}
                bio={data.viewer.bio}
                commitCount={commitCount}
                repoCount={repoCount}
              />
            </>
          );
        }}
      </Query>
      <Query query={GET_COMMIT}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span>WAIT</span>;
          }

          return <></>;
        }}
      </Query>
    </>
  );
};
