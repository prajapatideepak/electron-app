import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { GiWallet } from "react-icons/gi";
import { AiFillEye } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { getAllFaculty, getFaculty } from "../hooks/usePost";
import _ from "lodash"



const Facultytable = () => {
  // -------------------------------
  // -------- API WORKS -----------
  // -------------------------------
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [facultyData, setFacultyData] = useState([])

  useEffect(() => {
    getAllFaculty()
      .then((res) => {
        setFacultyData(res.staffData);
        console.log(res)
      })
  }, [])
  console.log(facultyData)

  // -------------------------------
  // -------- Pagination -----------
  // -------------------------------







  return (
    <>
      <section className="table h-full w-full mt-10 shadow-none">
        <div className="flex justify-center items-center p-10 pt-0">
          <div class="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
            {/* <div className="print-btn flex items-center space-x-3">
              <Tooltip
                content="Print"
                placement="bottom-end"
                className="text-white bg-black rounded p-2 "
              >
                <div


                  className="text-3xl bg-class5-50 rounded-md text-white p-1 hover:cursor-pointer  "
                  onClick={handlePrint} >

                  <MdLocalPrintshop />
                </div>
              </Tooltip>
            </div> */}
            <ReactToPrint
              trigger={() => (
                // <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'>
                <button id='print' className="text-3xl bg-class5-50 rounded-md text-white p-1">
                  <MdLocalPrintshop />
                </button>
                // </Tooltip>
              )}
              content={() => componentRef.current}
              onBeforeGetContent={(e) => {
                return new Promise((resolve) => {
                  setIsPrint(true);
                  resolve();
                });
              }}
              onAfterPrint={() => setIsPrint(false)}
            />
            <div ref={componentRef} className='p-5 pt-3 pb-0'>
              <table className="w-full text-sm text-center bg-class5-50 rounded-xl ">
                <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                  <tr className="text-white text-base">
                    <th scope="col" className="py-8 px-6 text-center">
                      Serial No
                    </th>
                    <th scope="col" className="py-8 px-6 text-center">
                      Name
                    </th>
                    <th scope="col" className="py-8 px-6 text-center">
                      Phone
                    </th>
                    <th scope="col" className="py-8 px-6 text-center">
                      Role
                    </th>
                    <th scope="col" className={`py-3 px-6 text-center ${isPrint ? "hidden" : "block"}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                {facultyData.length > 0 ? (
                  <tbody className="bg-white border items-center ">

                    {
                      facultyData.map((item, key) => {
                        return (
                          <tr className=" border-b"  >
                            <td className="py-8 px-6 text-center">{key + 1}</td>
                            <td className="py-8 px-6 text-center">{item.basic_info_id.full_name}</td>
                            <td className="py-8 px-6 text-center">{item.contact_info_id.whatsapp_no}</td>
                            <td className="py-8 px-6 text-center">{item.role}</td>
                            <td className={`py-3 px-6 text-center ${isPrint ? "hidden" : "block"}`}>
                              <div className="flex justify-center items-center space-x-2">
                                <NavLink to={`Profilefaculty/${item._id}`} >
                                  <Tooltip content="Show" placement="bottom-end" className="text-white bg-black rounded p-2" >

                                    <span className="text-xl text-darkblue-500">
                                      <AiFillEye className="cursor-pointer" />
                                    </span>
                                  </Tooltip>
                                </NavLink>
                                <NavLink to={`/salary/${item._id}`}>

                                  <Tooltip
                                    content="Pay"
                                    placement="bottom-end"
                                    className="text-white bg-black rounded p-2"
                                  >
                                    <span className="text-xl pb-1  text-green-500">
                                      <GiWallet className="cursor-pointer" />
                                    </span>
                                  </Tooltip>
                                </NavLink>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                ) : (
                  <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
                    <IoMdInformationCircle className="text-xl text-red-600" />

                    <h1 className="text-red-800">Recipt Not avaiable </h1>
                  </div>
                )}
              </table>
            </div>
            <nav
              aria-label="Page navigation example"
              className="flex justify-end"
            >
              <ul className="inline-flex items-center -space-x-px ">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <AiOutlineLeft />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <AiOutlineRight />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default Facultytable;



