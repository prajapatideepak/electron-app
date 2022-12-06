/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import { months } from "../hooks/Constant";
import { useGetMonthlyReport } from "../hooks/usePost";
import { NasirContext } from "../NasirContext";
import Loader from "./Loader";

function StudentChart() {
  const { section } = React.useContext(NasirContext);
  const sectionRequest = section === "primary" ? 1 : 0;

  const studentChartData = useQuery(
    ["studentC", sectionRequest],
    useGetMonthlyReport
  );
  const [type, setType] = React.useState("line");
  const [year, setYear] = React.useState([""]);
  const [noOfTransaction, setNoofNtransactiob] = React.useState([]);
  const [state, setState] = React.useState({
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

      let data = Object.values(newData[ProprtyName.length - 1]).map(
        (m) => m.value
      );
      let noOfT = Object.values(newData[ProprtyName.length - 1]).map(
        (m) => m.noOfTransaction
      );

      setNoofNtransactiob(noOfT);

      updateState(data);
      setYear(ProprtyName);
    }
  }, [studentChartData.isSuccess]);

  function handleYearChange(e) {
    let newData = Object.values(studentChartData.data);

    let data = Object.values(newData[e.target.value]).map((m) => m.value);
    let transactionData = Object.values(newData[e.target.value]).map(
      (m) => m.noOfTransaction
    );
    updateState(data);
    setNoofNtransactiob(transactionData);
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
    <div className="px-10 ">
      {studentChartData.isSuccess ? (
        <div className="flex justify-around">
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
          <div className="bg-gray-50 m-2 shadow-xl rounded-lg ">
            <h1 className="mx-4 my-1 font-semibold"> Fees Calendar</h1>
            <div className="grid grid-cols-4 px-5 py-3  gap-5 ">
              {noOfTransaction?.map((data, i) => {
                return (
                  <div className="rounded-xl shadow-2xl bg-white ">
                    <h1 className=" text-sm py-1 font-semibold bg-green-300 rounded-t-xl text-center">
                      {months[i]}
                    </h1>
                    <span className="text-xs m-2 ">Transaction : {data}</span>
                    <h2 className=" text-xs m-2">
                      Total:
                      <span className=" font-bold">
                        {state.series[0].data[i]}
                      </span>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default StudentChart;
