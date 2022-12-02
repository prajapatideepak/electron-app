import React, { useState } from "react";
import Facultyheader from "../Componant/Facultyheader";
import Studentheader from "../Componant/Studentheader";

const Report = () => {
  const [reportState, setReportState] = useState("Student");
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

      {reportState == "Student" ? <Studentheader /> : <Facultyheader />}
    </div>
  );
};

export default Report;
