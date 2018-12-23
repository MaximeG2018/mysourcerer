import React, { Component } from "react";
import "antd/dist/antd.css";
import { Pane, Text } from "evergreen-ui";
import { Row, Col } from "antd";

import { Doughnut } from "react-chartjs-2";

class LanguagesData extends Component {
  render() {
    const data = {
      labels: this.props.languages,
      datasets: [
        {
          data: this.props.count,
          backgroundColor: this.props.color
        }
      ]
    };

    //console.log(this.props.totalCommit);
    return (
      <>
        <Pane clearfix>
          <Row>
            <Col span={12}>
              {this.props.totalCommit.map(function(key, index) {
                return (
                  <Pane
                    key={index}
                    elevation={0}
                    float="left"
                    backgroundColor={key.color}
                    width={150}
                    height={90}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Text color="white">{key.name}</Text>
                    <Text color="white">Commit : {key.commit}</Text>
                    <Text color="white">Loc : {key.additions}</Text>
                  </Pane>
                );
              })}
            </Col>
            <Col span={12}>
              <Doughnut data={data} />
            </Col>
          </Row>
        </Pane>
      </>
    );
  }
}
export default LanguagesData;
