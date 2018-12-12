import React, { Component } from "react";
import "antd/dist/antd.css";
import { Avatar, Layout } from "antd";

const { Sider } = Layout;

class UserInfo extends Component {
  render() {
    return (
      <>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container has-text-centered">
              <Avatar size={150} src={this.props.img} />
              <h1 className="title">{this.props.login}</h1>
              <h2 className="subtitle">{this.props.bio}</h2>
            </div>
          </div>
          <nav className="level is-mobile">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">{this.props.name}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Repos</p>
                <p className="title">{this.props.repoCount}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Commits</p>
                <p className="title">{this.props.commitCount}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Following</p>
                <p className="title">{this.props.followingCount}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Followers</p>
                <p className="title">{this.props.followersCount}</p>
              </div>
            </div>
          </nav>
        </section>

        <br />
      </>
    );
  }
}
export default UserInfo;
