import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from 'react-to-print';
import { AiFillEye } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { Alloverstudent } from "../hooks/usePost";
import Loader from '../Componant/Loader';
import { NasirContext } from "../NasirContext";
import ReactPaginate from "react-paginate";
import { AiOutlineUser } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineSearch } from 'react-icons/ai';

export default function Dashboard() {
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [isloading, setloading] = React.useState(true)
  const [currentItems, setcurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [Serialno, setserialno] = useState(1)
  const { section, admin } = React.useContext(NasirContext);
  const [Student, setstudent] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [isStudentNotFound, setIsStudentNotFound] = useState(true);
  const itemsPerPage = 2;  

  useEffect(() => {
    async function fetchFeesPendingData() {
      const res = await Alloverstudent(section);
      const StudentsWithPendingFees = res.data?.filter((student)=>{
        return student.academics[0].fees[0].pending_amount > 0 && student.academics[0].class[0] != undefined
      })

      if(StudentsWithPendingFees.length > 0){
        setIsStudentNotFound(false)
      }
      setstudent(StudentsWithPendingFees)
      setAllStudent(StudentsWithPendingFees)
      setloading(false);
    }
    fetchFeesPendingData()
  }, [])

  let calculatepending = 0;
  for (let i = 0; i < Student.length; i++) {
    calculatepending += Student[i].academics[0].fees[0].pending_amount
  }

  const handleSearchStudents = (e)=>{
      setstudent(()=> allStudent?.filter((data)=>{
        let searched_value = e.target.value;
        const full_name = data.basic_info[0].full_name?.toLowerCase();
        let isNameFound = false;

        if(isNaN(searched_value)){
          searched_value = searched_value.toLowerCase();
        }

        if (full_name.indexOf(searched_value) > -1){
            isNameFound = true;
        }

        return data.student_id == searched_value || isNameFound || data.contact_info[0].whatsapp_no == searched_value;
      }))
  }


  // // -------------------------------
  // // -------- Pagination -----------
  // // -------------------------------
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setcurrentItems(Student.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Student.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, Student])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Student.length;
    setserialno(event.selected + 1)
    setItemOffset(newOffset);
  };

  if (isloading) {
    return <Loader />
  }

  return (
    <div className="">
      <div className="pt-0 md:flex items-center justify-center md:justify-between mr-5 ">
        <div className="left pt-0 ">
          <img src="images/desk.webp" alt="" className="" />
        </div>
        <div className="w-4/5  ">
          <div className="right pt-4  xl:px-0 flex xl:mr-10 xl:mt-0 space-x-10 space-y-0 xl:space-y-0 justify-center items-center text-center">
            <div id='Student-cards' className=' flex items-center justify-between px-5 space-x-5 p-2 py-3  rounded-lg xl:py-5 bg-class4-50  '>
              <div className='flex ml-1'>
                <div className="bg-white rounded-md  flex justify-center items-center p-5">

                  <AiOutlineUser className=' text-class4-50 text-4xl ' />
                </div>
              </div>
              <div className="">
                <p className='text-white text-5xl mb-3 text-center '>{Student.length > 0 ? Student.length : 0}</p>
                <h1 className='text-white  text-lg'>Total <span>Students</span></h1>
              </div>
            </div>
            <div id='Student-cards' className=' flex items-center justify-between px-5 p-2 py-3 rounded-lg xl:py-5 bg-class1-50  '>
              <div className='flex ml-1'>
                <div className="bg-white rounded-md  flex justify-center items-center p-5">
                    <MdPendingActions className=' text-class1-50 text-4xl ' />
                </div>
              </div>
              <div className="ml-2">
                  <p className='text-white text-5xl mb-3'>{calculatepending ? calculatepending : 0}</p>

                  <h1 className='text-white text-lg '>Fees Pending <span>Students</span></h1>
              </div>
             </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-10 pt-0">
        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
          <div className="print-btn flex justify-between items-center">
            <div className=" flex  items-center justify-center ml-5">
              <input
                  onChange={handleSearchStudents}
                  type="text"
                  className=" w-full shadow-xl px-3 py-2 rounded-l-lg outline-none    "
                  placeholder="Search Student"
              ></input>
              <button
                  className="bg-class2-50 px-2 py-1 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
              >
                  <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-white transition duration-400" />
              </button>
            </div>
              <Tooltip
                content="Print"
                placement="bottom-end"
                className="text-white bg-black rounded p-2"
              >
                <span>
                  <ReactToPrint
                    trigger={() => (
                      <button id='print' className="text-3xl bg-class2-50 rounded-md text-white p-1 mr-5">
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
          </div>
          <div ref={componentRef} className='p-5 pt-3 pb-0'>
            <table className="w-full text-sm text-center rounded-xl overflow-hidden " >
              <thead className="text-xs text-gray-700 bg-class2-50 uppercase">
                <tr className="text-white text-base">
                  <th scope="col" className="py-4 px-6 text-center ">
                    Serial No
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Student ID
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Name
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Class
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Phone
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Total
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Paidup
                  </th>
                  <th scope="col" className="py-4 px-6 text-center ">
                    Pending
                  </th>
                  {
                    !isPrint
                    ?
                        <>
                            <th scope="col" className="px-6 py-4">Profile</th>
                            <th scope="col" className="px-6 py-4">Action</th>
                        </>
                    :
                        null
                  }
                </tr>
              </thead>
              <tbody className="bg-white border items-center ">
                    {
                      isPrint
                      ?
                        (
                          Student.map((item, key) => {
                          const Paid_up = item.academics[0].fees[0].net_fees - item.academics[0].fees[0].pending_amount
                          
                            return ( 
                              <tr key={key} className="border-b" >
                                <th className="py-5 px-6">{(key + 1) + (itemsPerPage * Serialno - itemsPerPage)}</th>
                                <td className="py-5 px-6 text-center ">{item.student_id}</td>
                                <td className="py-5 px-6 text-center ">{item.basic_info[0].full_name}</td>
                                <td className="py-5 px-6 text-center ">{item.academics[0].class[0].class_name}</td>
                                <td className="py-5 px-6 text-center ">{item.contact_info[0].whatsapp_no}</td>
                                <td className="py-5 px-6 text-center ">{item.academics[0].fees[0].net_fees}</td>
                                <td className="py-5 px-6 text-center ">{Paid_up}</td>
                                <td className="py-5 px-6 text-center ">{item.academics[0].fees[0].pending_amount}</td>
                                <td className={`py-5 px-6 text-center  ${isPrint ? "hidden" : "block"}`}>
                                  <div className="flex justify-center space-x-2">
                                    <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id}`}>
                                      <Tooltip
                                        content="Show Profile"
                                        placement="bottom-end"
                                        className="text-white bg-black rounded p-2"
                                      >
                                        <span className="text-xl text-darkblue-500">
                                          <AiFillEye />
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
                        currentItems.map((item, key) => {                          
                            const Paid_up = item.academics[0].fees[0].net_fees - item.academics[0].fees[0].pending_amount

                              return ( 
                                <tr key={key} className="border-b" >
                                  <th className="py-5 px-6">{(key + 1) + (itemsPerPage * Serialno - itemsPerPage)}</th>
                                  <td className="py-5 px-6 text-center ">{item.student_id}</td>
                                  <td className="py-5 px-6 text-center ">{item.basic_info[0].full_name}</td>
                                  <td className="py-5 px-6 text-center ">{item.academics[0].class[0].class_name}</td>
                                  <td className="py-5 px-6 text-center ">{item.contact_info[0].whatsapp_no}</td>
                                  <td className="py-5 px-6 text-center ">{item.academics[0].fees[0].net_fees}</td>
                                  <td className="py-5 px-6 text-center ">{Paid_up}</td>
                                  <td className="py-5 px-6 text-center ">{item.academics[0].fees[0].pending_amount}</td>
                                  <td className={`py-5 px-6 text-center  ${isPrint ? "hidden" : "block"}`}>
                                    <div className="flex justify-center space-x-2">
                                      <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id}`}>
                                        <Tooltip
                                          content="Show Profile"
                                          placement="bottom-end"
                                          className="text-white bg-black rounded p-2"
                                        >
                                          <span className="text-xl text-darkblue-500">
                                            <AiFillEye />
                                          </span>
                                        </Tooltip>
                                      </NavLink>
                                    </div>
                                  </td>
                                  <td className="px-6 py-5 ">
                                    <div className='flex justify-center space-x-3'>
                                        <NavLink to={"/receipt/FeesDetail"} state={{
                                            rollno: item.student_id,
                                            full_name: item.basic_info[0].full_name,
                                            class_name: item.academics[0].class[0].class_name,
                                            medium: item.academics[0].class[0].medium,
                                            stream: item.academics[0].class[0].stream,
                                            batch: `${item.academics[0].class[0].batch_start_year}-${item.academics[0].class[0].batch_end_year}`
                                        }} >
                                            <button className={`${item.academics[0].fees[0].pending_amount <= 0 ? 'disabled:opacity-40' : 'bg-darkblue-500 hover:bg-blue-900'} bg-darkblue-500 rounded-lg  duration-200 transition text-white px-5 font-semibold py-1`} disabled={item.academics[0].fees[0].pending_amount <= 0 ? true : false}>
                                            Pay
                                            </button>
                                        </NavLink>
                                    </div>
                                  </td>
                            </tr>
                          )
                      })
                    }
                {
                  isStudentNotFound
                    ?
                    <tr className="">
                      <td colSpan={10} className="bg-red-200  font-bold p-2 rounded">
                          <div className="flex space-x-2 justify-center items-center">
                          <IoMdInformationCircle className="text-xl text-red-600" />
                          <h1 className="text-red-800">Students not found </h1>
                        </div>
                      </td>
                    </tr>
                    :
                    null
                }
              </tbody>
            </table>
          </div>
          {
            !isStudentNotFound
              ?
              <nav aria-label="Page navigation example" className='flex justify-end'>
                <ul className="inline-flex items-center -space-x-px ">
                  <li>
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={4}
                      pageCount={pageCount}
                      previousLabel="< previous"
                      renderOnZeroPageCount={null}
                      containerClassName="pagination"
                      pageLinkClassName='page-num'
                      previousLinkClassName='page-num'
                      nextLinkClassName='page-num'
                      activeLinkClassName='active-page'
                    />
                  </li>
                </ul>
              </nav>
              :
              null
          }
        </div>
      </div>
    </div>
  );
}
