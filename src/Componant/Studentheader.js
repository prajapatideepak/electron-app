/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { MdLocalPrintshop } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { useGetMonthlyReport, useGetReport } from "../hooks/usePost";
import { useState } from "react";
import StudentChart from "./StudentChart";
import { IoMdInformationCircle } from "react-icons/io";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Studenthearder = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const reportData = useQuery("reports", useGetReport);
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [currentItems, setcurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [Serialno, setserialno] = useState(1);
  const itemsPerPage = 4;

  function handleDataFilter(filterDate) {
    const preDate = new Date(`${filterDate},23:59:00`);
    const previous = preDate.setDate(preDate.getDate() - 1);

    const postDate = new Date(`${filterDate},0:00:00`);
    const post = postDate.setDate(postDate.getDate() + 1);
    return [previous, post];
  }

  function handle_data(e) {
    const [previous, post] = handleDataFilter(e.target.value);

    setDate(e.target.value);
    const newData = reportData.data.data.filter(
      (recipet) =>
        new Date(recipet.date).getTime() > previous &&
        new Date(recipet.date).getTime() < post
    );

    setData(() => newData);
  }

  React.useEffect(() => {
    setData(reportData?.data?.data);
  }, [reportData.isSuccess]);

  // -------------------------------
  // -------- Pagination -----------
  // -------------------------------
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setcurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setserialno(event.selected + 1);
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="mt-4">
        <StudentChart key="student" />
      </div>
      <div className="flex justify-center items-center p-10 pt-10">
        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
          <div>
            <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
              Transaction List
            </p>
          </div>
          <div className="print-btn flex items-center space-x-3">
            <input
              id=""
              value={date}
              type="Date"
              onChange={(e) => handle_data(e)}
              className="outline-none bg-white border rounded-md p-2 cursor-pointer"
            />
            <button
              id=""
              className=" flex items-center border outline-none bg-white py-2 px-4 xl:p-4 xl:py-2 shadow-lg hover:shadow rounded-md  space-x-1 "
              onClick={(e) => {
                setDate("");
                setData(reportData?.data?.data);
              }}
            >
              Clear Filter
            </button>
            {currentItems?.length > 0 ? (
              <Tooltip
                content="Print"
                placement="bottom-end"
                className="text-white bg-black rounded p-2"
              >
                <span
                  href="#"
                  className="text-3xl bg-green-200 rounded-md text-green-900  w-10 h-8 flex justify-center  cursor-pointer"
                >
                  <ReactToPrint
                      trigger={() => (
                          <MdLocalPrintshop />
                      )}
                      content={() => componentRef.current}
                      onBeforeGetContent={() => {
                        return new Promise((resolve) => {
                          setIsPrint(true);
                          resolve();
                        });
                      }}
                      onAfterPrint={() => setIsPrint(false)}
                    />
                </span>
              </Tooltip>
            ) : null}
          </div>
          <div className="p-5 pt-3 pb-0">
            <div className="overflow-x-auto">
              <table ref={componentRef} className="w-full whitespace-nowrap" >
                <thead>
                  <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                    <th className="font-normal text-left pl-10">Date</th>
                    <th className="font-normal text-left  px-10 lg:px-6 xl:px-0">
                      Reciept No
                    </th>
                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                      Student Name
                    </th>
                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                      Paid
                    </th>
                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                      Discount
                    </th>
                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                      total
                    </th>
                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                      Admin
                    </th>
                    {
                      !isPrint
                      ?
                        <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                          Detail
                        </th>
                      :
                        null
                    }
                  </tr>
                </thead>
                <tbody className="w-full">
                  {
                    reportData.isLoading 
                    ? 
                      <tr className="h-20 blur-sm text-sm leading-none text-gray-800 border-b border-gray-100">
                      <td className="pl-8">.........</td>
                      <td className=" px-10 font-bold lg:px-6 xl:px-0">..</td>
                      <td className="px-10 lg:px-6 xl:px-0">.....</td>
                      <td className="font-medium px-10 lg:px-6 xl:px-0">
                        <span className="bg-green-200 px-4 text-green-900 font-bold rounded">
                          ...
                        </span>
                      </td>
                      <td className="px-10 lg:px-6 xl:px-0">
                        <p className="">
                          <span className="bg-red-200 px-4 text-red-900 font-bold rounded">
                            ..
                          </span>
                        </p>
                      </td>
                      <td>
                        <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                          ...
                        </span>
                      </td>
                      <td>
                        <span>.......</span>
                      </td>
                      <td className="px-5  ">
                        <span>........</span>
                      </td>
                      </tr>
                    : 
                        
                      isPrint
                      ?
                        data?.map((m, key) => {
                          return (
                            <tr
                              key={key}
                              className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100"
                            >
                              <td className="pl-8">
                                {new Date(m.date)?.toISOString().slice(0, 10)}
                              </td>
                              <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                {m.fees_receipt_id}
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0 capitalize">
                                {
                                  m.fees[0].academics[0].students[0].basic_info[0]
                                    .full_name
                                }
                              </td>
                              <td className="font-medium px-10 lg:px-6 xl:px-0">
                                <span className="bg-green-200 px-4 text-green-900 font-bold rounded">
                                  {m.transaction[0].amount}
                                </span>
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                <p className="">
                                  <span className="bg-red-200 px-4 text-red-900 font-bold rounded">
                                    {m.discount}
                                  </span>
                                </p>
                              </td>
                              <td>
                                <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                  {m.transaction[0]?.amount + m.discount}
                                </span>
                              </td>
                              <td>
                                <span>{m.admin[0]?.username}</span>
                              </td>
                            </tr>
                          );
                        })
                      :
                        currentItems?.map((m, key) => {
                          return (
                            <tr
                              key={key}
                              className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100"
                            >
                              <td className="pl-8">
                                {new Date(m.date)?.toISOString().slice(0, 10)}
                              </td>
                              <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                {m.fees_receipt_id}
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0 capitalize">
                                {
                                  m.fees[0].academics[0].students[0].basic_info[0]
                                    .full_name
                                }
                              </td>
                              <td className="font-medium px-10 lg:px-6 xl:px-0">
                                <span className="bg-green-200 px-4 text-green-900 font-bold rounded">
                                  {m.transaction[0].amount}
                                </span>
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                <p className="">
                                  <span className="bg-red-200 px-4 text-red-900 font-bold rounded">
                                    {m.discount}
                                  </span>
                                </p>
                              </td>
                              <td>
                                <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                  {m.transaction[0]?.amount + m.discount}
                                </span>
                              </td>
                              <td>
                                <span>{m.admin[0]?.username}</span>
                              </td>
                              <td className="px-5  ">
                                <span>
                                  <NavLink to={"/receipt/receipt"} state={{is_cancelled: m.fees[0].academics[0].students[0].basic_info[0]
                                    .is_cancelled, isStaff: false, fees_receipt_id: m.fees_receipt_id}}>
                                    <AiFillEye className="text-xl cursor-pointer" />
                                  </NavLink>
                                </span>
                              </td>
                            </tr>
                          );
                        })
                  }
                </tbody>
              </table>
              {currentItems?.length < 1 ? (
                <div className="bg-red-200 font-bold justify-center items-center p-2 rounded  flex space-x-2">
                  <IoMdInformationCircle className="text-xl text-red-600" />
                  <h1 className="text-red-800"> Transaction not Found </h1>
                </div>
              ) : null}
            </div>
          </div>
          {currentItems?.length > 0 ? (
            <div className=" flex justify-end items-center  py-2">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active-page"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Studenthearder;
