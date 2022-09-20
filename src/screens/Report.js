import React, { useState } from 'react'
import Facultyheader from '../Componant/Facultyheader'
import Facultytable from '../Componant/facultytable'
import Studentheader from '../Componant/Studentheader'
import Table from '../Componant/Table'


const Report = () => {
  const [reportState, setReportState] = useState("Student")
  return (
    <div>

      <div className="print-btn flex justify-end items-center space-x-3 mt-10 pr-5">
       
        <button id='reportselect' className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-md drop-shadow-2xl  space-x-1 ">
          <select name="" id="" className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none" onChange={(e) => {
            const selectedReport = e.target.value
            setReportState(selectedReport)
          }}>
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
          </select>
        </button>
      </div>
      {reportState == 'Student' ? <Studentheader /> :
        <Facultyheader />}
    </div>
  )
}

export default Report