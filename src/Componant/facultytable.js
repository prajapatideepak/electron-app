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
import ReactPaginate from "react-paginate";
import './Pagination.css'


const Facultytable = () => {
  // -------------------------------
  // -------- API WORKS -----------
  // -------------------------------
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [facultyData, setFacultyData] = useState([])
  const [currentItems, setcurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [Serialno , setserialno] = useState(1)
  const itemsPerPage = 6;

  useEffect(() => {
    getAllFaculty()
      .then((res) => {
        setFacultyData(res.staffData);
      })
  }, [])

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





  return (
    <>
      <section className="table h-full w-full mt-10 shadow-none">
        <div className="flex justify-center items-center p-10 pt-0 py-5">
          <div className="sm:rounded-lg bg-white p-10 shadow-xl w-full">
            <ReactToPrint
              trigger={() => (
                <button id='print' className="text-3xl bg-class5-50 rounded-md text-white p-1">
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
            <div ref={componentRef} className='p-5 pt-3 pb-0'>
              <table className="w-full text-sm text-center bg-class5-50 rounded-xl ">
                <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                  <tr className="text-white text-base">
                    <th scope="col" className="py-4 px-6 text-center">
                      Serial No
                    </th>
                    <th scope="col" className="py-4 px-6 text-center">
                      Name
                    </th>
                    <th scope="col" className="py-4 px-6 text-center">
                      Phone
                    </th>
                    <th scope="col" className="py-4 px-6 text-center">
                      Role
                    </th>
                    <th scope="col" className={`py-4 px-6 text-center ${isPrint ? "hidden" : "block"}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                {currentItems.length > 0 ? (
                  <tbody className="bg-white border items-center ">

                    {
                      currentItems.map((item, key) => {
                        return (
                          <tr className=" border-b"  >
                            <td className="py-8 px-6 text-center">{(key + 1) + (6 * Serialno - 6)}</td>
                            <td className="py-8 px-6 text-center">{item.basic_info_id.full_name}</td>
                            <td className="py-8 px-6 text-center">{item.contact_info_id.whatsapp_no}</td>
                            <td className="py-8 px-6 text-center">{item.role}</td>
                            <td className={`py-8 px-6 text-center ${isPrint ? "hidden" : "block"}`}>
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
                  <div className="bg-red-200 font-bold flex justify-center items-center p-2 rounded  space-x-2">
                    <IoMdInformationCircle className="text-xl text-red-600" />

                    <h1 className="text-red-800">Staffs Not Founde</h1>
                  </div>
                )}
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



