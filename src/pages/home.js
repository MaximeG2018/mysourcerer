import React, { Component } from "react";

import { Button } from "antd";
import { Row, Col } from "antd";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };

    this.checkUser();
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  checkUser = () => {
    if (this.state.user !== "") {
      this.props.userChange(this.state.user);
    }
  };

  render() {
    return (
      <>
        <section className="hero is-info" style={{ marginBottom: 100 }}>
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">My Sourcerer</h1>
              <h2 className="subtitle">Find your github informations</h2>
            </div>
          </div>
        </section>
        <Row type="flex" justify="center">
          <Col span={8}>
            <input
              className="input has-text-centered"
              type="text"
              placeholder="Enter a login"
              onChange={this.handleChange}
              name="user"
            />
          </Col>
          <Col span={4}>
            <Button
              className="button is-info"
              style={{ marginLeft: 20 }}
              onClick={this.checkUser}
            >
              Enter !
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
export default Home;
