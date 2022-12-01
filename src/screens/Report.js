import React, { useState } from "react";
import { useQuery } from "react-query";
import Facultyheader from "../Componant/Facultyheader";
import StudentChart from "../Componant/StudentChart";
import Studentheader from "../Componant/Studentheader";
import { useGetMonthlyReport } from "../hooks/usePost";

const Report = () => {
  const [reportState, setReportState] = useState("Student");
  const studentChartData = useQuery("StudentChartData", useGetMonthlyReport);
  const [series, setSeries] = useState([]);

  React.useEffect(() => {
    if (studentChartData.isSuccess) {
      let ProprtyName = Object.keys(studentChartData.data);
      let newData = Object.values(studentChartData.data);
      // setSeries(() => {
      let data = Object.values(newData[0]).map((m) => m.Month);
      // });

      setSeries(data);
      // setSeries(newData[0].map((m) => m.Month));
    }
  }, [studentChartData.isSuccess]);

  console.log(series);
  return (
    <div>
      <div className="print-btn flex justify-end items-center pt-5 space-x-3 pr-5">
        <button
          id="reportselect"
          className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-md drop-shadow-2xl  space-x-1 "
        >
          <select
            name=""
            id=""
            className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none"
            onChange={(e) => {
              const selectedReport = e.target.value;
              setReportState(selectedReport);
            }}
          >
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
          </select>
        </button>
      </div>

      <div className="px-12 pt-12 ">
        <h1 className="font-semibold  "> Monthly Report</h1>
        <StudentChart series={series} />
      </div>
      {reportState == "Student" ? <Studentheader /> : <Facultyheader />}
    </div>
  );
};

export default Report;
