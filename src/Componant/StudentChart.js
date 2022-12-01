import React, { Component } from "react";
import Chart from "react-apexcharts";

function StudentChart(props) {
  console.log(props.series);
  const [type, setType] = React.useState("line");
  const [state, _] = React.useState({
    // series: props.series,
    // labels: ["A", "B", "C", "D", "E"],
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
    },
    series: [
      {
        name: "months",
        data: [
          3000, 4000, 4500, 5000, 4900, 6000, 700, 91, 1200, 3000, 8000, 2000,
        ],
      },
    ],
  });
  // this.state =
  console.log(type);
  return (
    <div className="donut">
      <select onChange={(e) => setType(e.target.value)}>
        <option value={"line"}>Line</option>
        <option value={"bar"}>bar</option>
      </select>
      <Chart
        options={state.options}
        series={state.series}
        type={type}
        key={type}
        width="480"
      />
    </div>
  );
}

export default StudentChart;
