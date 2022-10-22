import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import Cards from "../asset/cards";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { Alloverstudent } from "../hooks/usePost";
import { toast } from "react-toastify";
import Loader from '../Componant/Loader';


export default function Dashboard() {
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [isloading, setloading] = React.useState(true)


  // ---------------------------------------------------------------
  // --------------------    API Works       -----------------------
  // ---------------------------------------------------------------

  const [Student, setstudent] = useState();
  const [PaginationData, setPaginationData] = useState([]);
  const Toaster = () => { toast.success('New Staff Register successfully') }
  const errtoast = () => { toast.error("Something Wrong") }

  useEffect(() => {
    async function fetchfacultdata() {
      const res = await Alloverstudent();
      setstudent(() => res.data)
      setloading(false);
    }
    fetchfacultdata()
  }, [])



  if (isloading) {
    return <Loader />
  }

  return (
    <div className="">
      <div className=" ">
        <div className="flex justify-between items-center pr-5 pt-8  md:pl-8 space-y-5">
          <h1 className=" text-xl md:text-3xl text-center md:text-left text-darkblue-500 font-semibold ">
            Welcome Nasir
          </h1>

        </div>
      </div>
      <div className="pt-0 md:flex items-center justify-center md:justify-between mr-5 ">
        <div className="left pt-0 ">
          <img src="/images/desk.webp" alt="" className="" />
        </div>
        <Cards />
      </div>
      <div className="flex justify-center items-center p-10 pt-0">
        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
          <div className="print-btn flex items-center space-x-3">


            <ReactToPrint
              trigger={() => (
                // <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'>
                <button id='print' className="text-3xl bg-class2-50 rounded-md text-white p-1">
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

          </div>
          <div ref={componentRef} className='p-5 pt-3 pb-0'>
            <table className="w-full text-sm text-center bg-class2-50 rounded-xl  " >
              <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                <tr className="text-white text-base">
                  <th scope="col" className="py-7 px-5 text-center ">
                    Serial No
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Name
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Class
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Phone
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Total
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Paidup
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Pending
                  </th>
                  <th scope="col" className={`py-7 px-5 text-center  ${isPrint ? "hidden" : "block"}`}>
                    Action
                  </th>
                </tr>
              </thead>
              {Student.length > 0 ? (
                <tbody className="bg-white border items-center ">
                  {
                    Student.map((item, key) => {
                      const Paid_up = [
                        item.fees_id.net_fees - item.fees_id.pending_amount
                      ]
                      if (item.fees_id.pending_amount > 0) {
                        return (
                          <tr className="border-b" >

                            <td className="py-7 px-5 text-center ">{item.student_id.student_id}</td>
                            <td className="py-7 px-5 text-center ">{item.student_id.basic_info_id.full_name}</td>
                            <td className="py-7 px-5 text-center ">{item.class_id.class_name}</td>
                            <td className="py-7 px-5 text-center ">{item.student_id.contact_info_id.whatsapp_no}</td>
                            <td className="py-7 px-5 text-center ">{item.fees_id.net_fees}</td>
                            <td className="py-7 px-5 text-center ">{Paid_up}</td>
                            <td className="py-7 px-5 text-center ">{item.fees_id.pending_amount}</td>
                            <td className={`py-7 px-5 text-center  ${isPrint ? "hidden" : "block"}`}>
                              <div className="flex justify-center space-x-2">
                                <NavLink className="nav-link" to="Profilestudent">
                                  <Tooltip
                                    content="Show"
                                    placement="bottom-end"
                                    className="text-white bg-black rounded p-2"
                                  >
                                    <a href="#" className="text-xl text-darkblue-500">
                                      <AiFillEye />
                                    </a>
                                  </Tooltip>
                                </NavLink>

                              </div>
                            </td>
                          </tr>
                        )

                      }
                    })}
                </tbody>) : (
                <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
                  <IoMdInformationCircle className="text-xl text-red-600" />

                  <h1 className="text-red-800">Student Not avaiable </h1>
                </div>
              )}
            </table>
          </div>
          <nav
            aria-label="Page navigation example"
            className="flex justify-end"
          >
            <ul class="inline-flex items-center -space-x-px ">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <AiOutlineLeft />

                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <AiOutlineRight />

                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
