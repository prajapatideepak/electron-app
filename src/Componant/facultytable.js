import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { GiWallet } from "react-icons/gi";
import { AiFillEye } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { Exportallfaculty } from "../hooks/usePost";
import _ from "lodash"
import ReactPaginate from "react-paginate";
import './Pagination.css'
import Loader from './Loader';
import { toast } from "react-toastify";



const Facultytable = ({ call, allFaculty }) => {
  // -------------------------------
  // -------- API WORKS -----------
  // -------------------------------
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [facultyData, setFacultyData] = useState(allFaculty)
  const [currentItems, setcurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [Serialno, setserialno] = useState(1)
  const itemsPerPage = 6;
  const Toaster = () => { toast.success('All Staff Export To Excel') }
  const errtoast = () => { toast.error("Something Wrong") }

  // -------------------------------
  // -------- Pagination -----------
  // -------------------------------
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setcurrentItems(facultyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(facultyData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, facultyData])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % facultyData.length;
    setserialno(event.selected + 1)
    setItemOffset(newOffset);
  };

  const ExportAllfaculty = () => {
    const res = Exportallfaculty()
    if (res) {
        Toaster()
    } else {
        errtoast()
    }
  }

  const temp = () => {
    setIsPrint(true)
  }




  return (
    <>
      <section className="table h-full w-full mt-10 shadow-none">
        <div className="flex justify-center items-center p-10 pt-0 py-5">
          <div className="sm:rounded-lg bg-white p-10 shadow-xl w-full">
            <div className='flex justify-start items-center space-x-3'>
              <Tooltip
                content="Print"
                placement="bottom-end"
                className="text-white bg-black rounded p-2"
              >
                <span>
                  <ReactToPrint
                    trigger={() => (
                      <button id='print' className="text-3xl bg-class7-50 rounded-md text-white p-1">
                        <MdLocalPrintshop />
                      </button>
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
                </span>
              </Tooltip>

              <Tooltip
                content="Export To Excel"
                placement="bottom-end"
                className="text-white bg-black rounded p-2"
              >
                <button onClick={ExportAllfaculty}
                  className='text-white bg-class7-50 font-semibold shadow-2xl  py-[7px] px-3 rounded-lg text-sm'>
                  Export
                </button>
              </Tooltip>
            </div>

            <div ref={componentRef} className='p-5 pt-3 pb-0'>
              <table className="w-full text-sm text-center bg-class7-50 rounded-xl " id="table-to-xls">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr className="text-white text-base">
                    <th scope="col" className="py-4">
                      Serial No
                    </th>
                    <th scope="col" className="py-4 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-4 px-6">
                      Phone
                    </th>
                    <th scope="col" className="py-4 px-6">
                      Role
                    </th>
                    <th scope="col" className={`py-4 px-6 ${isPrint ? "hidden" : ""}`}>
                      Profile
                    </th>
                    <th scope="col" className={`py-4 px-6 ${isPrint ? "hidden" : ""}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white border">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, key) => {
                      return (
                        <tr className="border-b"  >
                          <td className="py-5 px-6">{(key + 1) + (6 * Serialno - 6)}</td>
                          <td className="py-5 px-6">{item.basic_info_id.full_name}</td>
                          <td className="py-5 px-6">{item.contact_info_id.whatsapp_no}</td>
                          <td className="py-5 px-6">{item.role}</td>
                          <td className={`py-5 px-6 ${isPrint ? "hidden" : ""}`}>
                            <div className="flex justify-center items-center">
                              <NavLink to={`Profilefaculty/${item._id}`} >
                                <Tooltip content="Show Profile" placement="bottom-end" className="text-white bg-black rounded p-2" >
                                  <span className="text-xl text-darkblue-500">
                                    <AiFillEye className="cursor-pointer" />
                                  </span>
                                </Tooltip>
                              </NavLink>
                            </div>
                          </td>
                          <td className={`py-5 px-5 ${isPrint ? "hidden" : ""}`}>
                            <div className="flex justify-center items-center">
                              <NavLink to={`/salary/${item._id}`}>
                                <Tooltip
                                  content="Pay Salary"
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
                    })
                  ) : (
                    <tr className="">
                      <td colSpan={6} className="bg-red-200  font-bold p-2 rounded">
                        <div className="flex space-x-2 justify-center items-center">

                          <IoMdInformationCircle className="text-xl text-red-600" />
                          <h1 className="text-red-800">Faculty not found </h1>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className=' flex justify-end items-center ml-32 py-5' >
              <div className=' py-2'>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  pageLinkClassName='page-num'
                  previousLinkClassName='page-num'
                  nextLinkClassName='page-num'
                  activeLinkClassName='active-page'
                />

              </div>
            </div>


          </div>

        </div>
      </section>
    </>
  );
};

export default Facultytable;



