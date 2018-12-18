import React, { Component } from "react";
import "antd/dist/antd.css";
import { Pane, Text } from "evergreen-ui";

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
        <h2>Languages</h2>

        <Pane clearfix>
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
                <Text>Commit : {key.commit}</Text>
              </Pane>
            );
          })}
          <Doughnut data={data} />
        </Pane>
      </>
    );
  }
}
export default LanguagesData;
