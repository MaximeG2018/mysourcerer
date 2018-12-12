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
    const result = {};
    this.props.languages.forEach(
      (key, value) => (result[key] = this.props.color[value])
    );

    return (
      <>
        <h2>Languages</h2>

        <Pane clearfix>
          {Object.keys(result).map(function(key, index) {
            return (
              <Pane
                elevation={0}
                float="left"
                backgroundColor={result[key]}
                width={150}
                height={90}
                margin={24}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text color="white">{key}</Text>
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
