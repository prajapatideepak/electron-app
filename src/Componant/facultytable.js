import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { GiWallet } from "react-icons/gi";
import { AiFillEye } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";


// function Edit() {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't to do this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire("Deleted!", "Your file has been deleted.", "success");
//     }
//   });
// }
const Facultytable = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });
  return (
    <>
      <section className="table h-full w-full mt-10 shadow-none">
        <div className="flex justify-center items-center p-10 pt-0">
          <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
            <div className="print-btn flex items-center space-x-3">
              <button
                id="year-btn"
                className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-full shadow-2xl space-x-1 "
              >
                <select
                  name=""
                  id=""
                  className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Paidup">Paidup</option>
                </select>
              </button>
              <Tooltip
                content="Print"
                placement="bottom-end"
                className="text-white bg-black rounded p-2"
              >
                <a
                  href="#"
                  id="print"
                  className="text-3xl bg-class5-50 rounded-md text-white p-1  "
                  onClick={handlePrint}
                >
                  <MdLocalPrintshop />
                </a>
              </Tooltip>
            </div>
            <div ref={componentRef} className='p-5 pt-3 pb-0'>
            <table className="w-full text-sm text-center bg-class5-50 rounded-xl shadow-xl ">
              <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                <tr className="text-white text-base">
                  <th scope="col" className="w-20 h-20">
                    Id
                  </th>
                  <th scope="col" className="w-20 h-20">
                    Profile
                  </th>
                  <th scope="col" className="w-20 h-20">
                    Name
                  </th>
                  <th scope="col" className="w-20 h-20">
                    Phone
                  </th>
                  <th scope="col" className="w-20 h-20">
                    Role
                  </th>
                  <th scope="col" className="w-20 h-20">
                    LastPaid
                  </th>
                  <th scope="col" className="w-20 h-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white border items-center ">
                <tr className=" border-b">
                  <td className="w-20 h-20">01</td>
                  <td scope="row" className="w-20 h-20">
                    <div className="flex justify-center items-center space-x-2">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="../images/user.png"
                        alt="profile"
                      />
                    </div>
                  </td>
                  <td className="w-20 h-20">Nasir</td>
                  <td className="w-20 h-20">1234567890</td>
                  <td className="w-20 h-20">Teacher</td>
                  <td className="w-20 h-20">
                    <div className="">
                      <p>14/02/22</p>
                      <p>1400</p>
                    </div>
                  </td>
                  <td className="w-20 h-20 ">
                    <div className="flex justify-center items-center space-x-2">
                    <NavLink to="Profilefaculty">
                      <Tooltip content="Show" placement="bottom-end" className="text-white bg-black rounded p-2" >
                        
                          <span className="text-xl text-darkblue-500">
                            <AiFillEye className="cursor-pointer" />
                          </span>
                      </Tooltip>
                        </NavLink>
                        <NavLink to="/salary/123">

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
              </tbody>
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
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
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
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
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
