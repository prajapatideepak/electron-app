import React, { Component } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import { months } from "../hooks/Constant";
import { useGetMonthlyReport } from "../hooks/usePost";
import Loader from "./Loader";

function StudentChart(props) {
  console.log(props.series);
  const studentChartData = useQuery("StudentChartData", useGetMonthlyReport);
  const [type, setType] = React.useState("line");
  const [year, setYear] = React.useState([""]);
  const [noOfTransaction, setNoofNtransactiob] = React.useState([]);
  const [state, setState] = React.useState({
    // series: props.series,
    // labels: ["A", "B", "C", "D", "E"],
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months,
      },
    },
    series: [
      {
        name: "total",
        data: [],
      },
    ],
  });

  React.useEffect(() => {
    if (studentChartData.isSuccess) {
      let ProprtyName = Object.keys(studentChartData.data);
      let newData = Object.values(studentChartData.data);

      console.log(studentChartData.data);
      let data = Object.values(newData[ProprtyName.length - 1]).map(
        (m) => m.value
      );
      let noOfTransction = Object.values(newData[ProprtyName.length - 1]).map(
        (m) => m.noOfTransaction
      );

      console.log(noOfTransction);
      updateState(data);
      setYear(ProprtyName);
    }
  }, [studentChartData.isSuccess]);

  console.log(year);

  function handleYearChange(e) {
    let newData = Object.values(studentChartData.data);

    let data = Object.values(newData[e.target.value]).map((m) => m.value);
    updateState(data);
  }

  function updateState(newData) {
    setState({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: months,
        },
      },
      series: [
        {
          name: "total",
          data: newData,
        },
      ],
    });
  }

  return (
    <div className="px-10">
      {studentChartData.isSuccess ? (
        <div>
          <div className="donut w-2/5 shadow-xl rounded-lg bg-white p-2 ">
            <div className="flex justify-between  p-2 space-x-3">
              <div>
                <h2 className="text-sm font-semibold"> Monthly Report</h2>
              </div>
              <div className="flex space-x-4">
                <select
                  className="rounded bg-gray-100   px-3 font-semibold py-1"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={"line"}>Line</option>
                  <option value={"bar"}>bar</option>
                </select>
                <select
                  onChange={(e) => handleYearChange(e)}
                  className="rounded bg-gray-100   px-3 font-semibold py-1"
                >
                  <option value={year.length - 1}>
                    {year[year.length - 1]}
                  </option>
                  {year.map((y, i) => {
                    console.log(y);
                    return <option value={i}> {y} </option>;
                  })}
                </select>
              </div>
            </div>

            <Chart
              options={state.options}
              series={state.series}
              type={type}
              key={type}
              // width="480"
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default StudentChart;
