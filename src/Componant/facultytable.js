import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { GiWallet } from "react-icons/gi";
import { AiFillEye } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import _ from "lodash"
import ReactPaginate from "react-paginate";
import './Pagination.css'
import { Exportallfaculty , getAllFaculty } from "../hooks/usePost";
import Toaster from '../hooks/showToaster'
import LoaderSmall from '../Componant/LoaderSmall';


const Facultytable = () => {
  // -------------------------------
  // -------- All useState -----------
  // -------------------------------
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [facultyData, setFacultyData] = useState([])
  const [currentItems, setcurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [Serialno, setserialno] = useState(1)
  const [call, setcall] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  // -------------------------------
  // --------  API Work  -----------
  // -------------------------------
  useEffect(() => {
    async function fatchallstaff() {
      const res = await getAllFaculty();
      setIsLoading(false)
      if (res) {
        setFacultyData(res.staffData)
        setcall(() => !call)
      }
    }
    fatchallstaff();
  }, [call]);

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

  // -----------------------------------------
  // ------- Export To Excel All Staff --------
  // ------------------------------------------
  const ExportAllfaculty = async () => {
    const res = await Exportallfaculty()
    if (res.success) {
      Toaster('success', 'Exported successfully. Check your download folder')
    } else {
      Toaster('error', 'Something went wrong')
    }
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
                    <th scope="col" className="py-4 px-2">
                      Name
                    </th>
                    <th scope="col" className="py-4 px-2">
                      Phone
                    </th>
                    <th scope="col" className="py-4 px-2">
                      Role
                    </th>
                    <th scope="col" className={`py-4 px-2 ${isPrint ? "hidden" : ""}`}>
                      Profile
                    </th>
                    <th scope="col" className={`py-4 px-2 ${isPrint ? "hidden" : ""}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white border">
                  {
                    isLoading
                    ?
                      <td colSpan={6}>
                        <LoaderSmall />
                      </td>
                    :
                      currentItems.length > 0
                      ?
                        isPrint
                        ?
                        currentItems.map((item, key) => {
                          return (
                            <tr key={key} className="border-b"  >
                              <th className="py-5 px-2">{(key + 1) + (itemsPerPage * Serialno - itemsPerPage)}</th>
                              <td className="py-5 px-2 capitalize">{item.basic_info_id.full_name}</td>
                              <td className="py-5 px-2">{item.contact_info_id.whatsapp_no}</td>
                              <td className="py-5 px-2">{item.role}</td>
                              <td className={`py-5 px-2 ${isPrint ? "hidden" : ""}`}>
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
                        :
                        (
                          currentItems.map((item, key) => {
                            return (
                              <tr key={key} className="border-b"  >
                                <th className="py-5 px-2">{(key + 1) + (itemsPerPage * Serialno - itemsPerPage)}</th>
                                <td className="py-5 px-2 capitalize">{item.basic_info_id.full_name}</td>
                                <td className="py-5 px-2">{item.contact_info_id.whatsapp_no}</td>
                                <td className="py-5 px-2">{item.role}</td>
                                <td className={`py-5 px-2 ${isPrint ? "hidden" : ""}`}>
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
                        )
                      :
                      (
                        <tr className="">
                          <td colSpan={6} className="bg-red-200  font-bold p-2 rounded">
                            <div className="flex space-x-2 justify-center items-center">
                              <IoMdInformationCircle className="text-xl text-red-600" />
                              <h1 className="text-red-800">Faculty not found </h1>
                            </div>
                          </td>
                        </tr>
                      )
                  }
                </tbody>
              </table>
            </div>
            {
              currentItems.length > 0
                ?
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
                :
                null
            }
          </div>

        </div>
      </section>
    </>
  );
};

export default Facultytable;



