import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { FaWpforms } from "react-icons/fa";
import { BsReceipt } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { GiTeacher } from "react-icons/gi";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Sidebar({ data }) {
  return (
    <div className="h-full bg-white sticky left-0 top-0">
      <div className="sidebar h-screen w-20 xl:w-60">
        <div className="sidebar-top flex justify-center xl:mr-8 pt-3 xl:pt-1 lg:pb-1 xl:pb-6 ">
          <img
            src="images/logo.png"
            alt=""
            className="w-24 lg:w-32 xl:w-36 cursor-pointer"
            id="logo"
          />
        </div>
        <div className="navigation mt-12 xl:mt-0 2xl:mt-4">
          <ul className="text-center">
            {/* <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="/">
              <li className="inline-flex xl:pl-11 mx-5 xl:mx-0 items-center py-2 w-full xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <RiDashboardFill className="xl:w-5 xl:h-5 xl:mr-2" />
                <h1 className="text-base hidden xl:block  ">Dashboard</h1>
              </li>
            </NavLink>
            </div> */}

            <div className="mb-3">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/"
              >
                <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                  <RiDashboardFill className="xl:w-5 xl:h-5 xl:mr-2" />
                  <h1 className="text-base hidden  xl:block  ">Dashboard</h1>
                </li>
              </NavLink>
            </div>

            <div className="mb-3">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="myclass"
              >
                <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                  <FaUsers className="xl:w-5 xl:h-5 xl:mr-2" />
                  <h1 className="text-base hidden  xl:block  ">My Class</h1>
                </li>
              </NavLink>
            </div>

            <div className="mb-3">
              <NavLink className="nav-link" activeclassname="active" to="fee">
                <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                  <BiRupee className="xl:w-5 xl:h-5 xl:mr-2" />
                  <h1 className="text-base hidden  xl:block  ">Fees</h1>
                </li>
              </NavLink>
            </div>

            <div className="mb-3">
            <NavLink className="nav-link" activeclassname="active" to="receipt">
              <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                <BsReceipt className="xl:w-5 xl:h-5 xl:mr-2" />
                <h1 className="text-base hidden  xl:block  "> Reciept</h1>
              </li>
            </NavLink>
            </div>

            <div className="mb-3">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="faculty"
              >
                <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                  <GiTeacher className="xl:w-5 xl:h-5 xl:mr-2" />
                  <h1 className="text-base hidden  xl:block  ">Staff</h1>
                </li>
              </NavLink>
            </div>

            <div className="mb-3">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="report"
              >
                <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                  <FaWpforms className="xl:w-5 xl:h-5 xl:mr-2" />
                  <h1 className="text-base hidden  xl:block  "> Report</h1>
                </li>
              </NavLink>
            </div>

            <div className="mb-3">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="studentregister"
              >
                <li className="inline-flex xl:pl-11 items-center py-2 xl:w-48 cursor-pointer hover:bg-lightblue-200 hover:text-blue-500 rounded-md">
                  <IoMdPersonAdd className="xl:w-5 xl:h-5 xl:mr-2" />
                  <h1 className="text-base hidden  xl:block  ">Student Reg</h1>
                </li>
              </NavLink>
            </div>

           
          </ul>
        </div>
      </div>
    </div>
  );
}
