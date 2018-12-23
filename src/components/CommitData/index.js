import React, { Component } from "react";
import "antd/dist/antd.css";
import { Pane, Text } from "evergreen-ui";

import { Line } from "react-chartjs-2";

class CommitData extends Component {
  render() {
    const arrDate = [];
    const arrData = [];
    console.log(this.props.getCommit);
    this.props.getCommit.map(item => {
      arrDate.push(item.date);
      arrData.push(item.count);
    });

    const data = {
      labels: arrDate,
      datasets: [
        {
          label: "Nb of commits",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: arrData
        }
      ]
    };

    return (
      <>
        <Line data={data} />
      </>
    );
  }
}
export default CommitData;
