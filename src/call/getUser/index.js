import React from "react";
import { Query } from "react-apollo";
import { GET_USER } from "./getUser";
import UserInfo from "../../components/userInfo";
import { Spinner } from "evergreen-ui";

export const GetUser = ({ user }) => {
  const variables = {
    login: user
  };

  return (
    <>
      <Query query={GET_USER} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <span>
                <Spinner />
              </span>
            );
          }

          const followersCount = data.user.followers.edges.length;
          const followingCount = data.user.following.edges.length;
          const arrData = data.user.repositories.nodes;
          let commitCount = 0;
          arrData.forEach(item => {
            if (item.defaultBranchRef) {
              return (commitCount +=
                item.defaultBranchRef.target.history.totalCount);
            }
          });
          const repoCount = arrData.length;

          return (
            <>
              <UserInfo
                img={data.user.avatarUrl}
                login={data.user.login}
                followersCount={followersCount}
                followingCount={followingCount}
                name={data.user.name}
                bio={data.user.bio}
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
