import React from "react";
import { Query } from "react-apollo";
import { GET_USER } from "./getUser";
import UserInfo from "../../components/userInfo";

export const GetUser = props => {
  return (
    <>
      <Query query={GET_USER} fetchPolicy="cache-and-network">
        {({ loading, error, data: { viewer } }) => {
          if (loading) {
            return <span>WAIT</span>;
          }
          const followersCount = viewer.followers.edges.length;
          const followingCount = viewer.following.edges.length;
          const arrData = viewer.repositories.nodes;
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
                img={viewer.avatarUrl}
                login={viewer.login}
                followersCount={followersCount}
                followingCount={followingCount}
                name={viewer.name}
                bio={viewer.bio}
                commitCount={commitCount}
                repoCount={repoCount}
              />
            </>
          );
        }}
      </Query>
    </>
  );
};
