import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { FaArrowRight } from "react-icons/fa"
import { AiFillCloseCircle } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import { MdPendingActions } from "react-icons/md"
import { FcMoneyTransfer } from "react-icons/fc"
import { NavLink } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdLocalPrintshop } from 'react-icons/md';
import { IoMdInformationCircle } from 'react-icons/io';
import { Tooltip } from "@material-tailwind/react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { getAllStudentsInClass } from "../hooks/usePost";
import { IoIosArrowBack } from 'react-icons/io';
import _ from "lodash";
import ReactPaginate from "react-paginate";

const Class = () => {

    const params = useParams();
    const navigate = useNavigate()

    const [classStudents, setClassStudents] = React.useState([]);
    const [totalStudents, setTotalStudents] = React.useState(0);
    const [className, setClassName] = React.useState('');
    const [totalPendingStudents, setTotalPendingStudents] = React.useState(0);
    const [totalPendingFees, setTotalPendingFees] = React.useState(0);
    const [paginationData, setPaginationData] = React.useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0)
    const [isPrint, setIsPrint] = useState(false);
    const itemsPerPage = 6;

    let calculateTotalPendingFees = 0;
    for (let i = 0; i < totalPendingFees.length; i++) {
        calculateTotalPendingFees += totalPendingFees[i].fees_id.pending_amount
    }

    const componentRef = useRef();

    const [model, setModel] = React.useState(false);

    const [allClassStudents, setAllClassStudents] = React.useState([])

    useEffect(() => {
        async function fetchClassStudents() {
            const res = await getAllStudentsInClass(params.id);

            if (res.success) {
                setClassStudents(() => res.data.studentDetails)
                setAllClassStudents(() => res.data.studentDetails);
                setTotalStudents(() => res.data.classDetails.total_student);
                setClassName(() => res.data.classDetails.class_name);
                setTotalPendingStudents(() => res.data.studentDetails.filter((data) => {
                    return data.fees_id.pending_amount != 0;
                }))
                setTotalPendingFees(() => res.data.studentDetails.filter((data) => {
                    return data.fees_id.pending_amount != 0;
                }))
            }
        }
        fetchClassStudents()

    }, [])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPaginationData(classStudents.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(classStudents.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, classStudents])

    const handlePendingPaidUpClick = (e) => {
        setPaginationData(() => allClassStudents?.filter((data) => {
            if (e.target.value == 2) {
                return data.fees_id.pending_amount == 0
            } else if (e.target.value == 1) {
                return data.fees_id.pending_amount != 0
            } else {
                return data
            }
        })
        )
    }


    const handleSearchStudents = (e) => {
        setPaginationData(() => allClassStudents?.filter((data) => {

            let searched_value = e.target.value;
            const full_name = data.student_id.basic_info_id.full_name?.toLowerCase();
            let isNameFound = false;

            if (isNaN(searched_value)) {
                searched_value = searched_value.toLowerCase();
            }

            if (full_name.indexOf(searched_value) > -1) {
                isNameFound = true;
            }

            return data.student_id.student_id == searched_value || isNameFound || data.student_id.contact_info_id.whatsapp_no == searched_value;

        }))
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % classStudents.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='relative  '>
            <div className={`bg-slate-100 ${model && "opacity-20"}`}>
                <div className="flex justify-between  items-center px-5 pt-3  space-y-5">
                    <h1 className=" text-xl xl:text-3xl  text-darkblue-500 xl:text-left font-bold text-darkblue-50 ">
                        {className}
                    </h1>
                    <div className="button flex mr-6">
                        <NavLink className="nav-link mr-10" to={totalStudents > 0 ? "Transfer" : ''} state={{ classStudents }}>
                            <div className="wrapper">
                                <div className={`btn ${totalStudents > 0 ? 'cursor-pointer' : 'cursor-default'}  h-12 w-40 rounded-full bg-white text-left border  overflow-hidden`} id="btn">
                                    <div className="icons  h-12 w-40 flex ml-3 items-center" id="icons">
                                        <FaArrowRight className={`text-2xl ${totalStudents > 0 ? 'text-darkblue-500' : 'text-gray-400'} `} />
                                        <span className={`ml-3 text-lg ${totalStudents > 0 ? 'text-darkblue-500' : 'text-gray-400'} font-semibold`}>Transfer All</span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
                            <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                            <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                        </div>

                    </div>
                </div>
                <div className="pt-0 flex items-center justify-center py-5 ">
                    <div className="w-1/3">
                        <img src="images/class1.png" alt="" className="" />
                    </div>
                    <div className="right ml-5 p-5 pt-14 flex  2xl:space-x-10 space-x-5 justify-center items-center text-center">
                        <div id='Student-cards' className=' cursor-pointer h-32 w-44 2xl:w-52 rounded-lg xl:h-28 bg-class4-50  xl:space-y-3 space-y-2 flex justify-center items-center'>
                            <div>
                                <div className='flex items-center text-center justify-center space-x-5  '>
                                    <AiOutlineUser className=' text-class4-50 rounded-full text-5xl xl:p-1 bg-white' />
                                    <p className='text-white text-4xl'>{totalStudents}</p>
                                </div>
                                <h1 className='text-white text-xl '>Total <span>Students</span></h1>
                            </div>
                        </div>
                        <div id='Student-cards' className=' cursor-pointer h-32 w-44 2xl:w-52 rounded-lg xl:h-28 bg-class1-50  xl:space-y-3 space-y-2 flex justify-center items-center '>
                            <div>
                                <div className='flex items-center text-center justify-center space-x-5  '>
                                    <MdPendingActions className=' text-class1-50 rounded-full xl:text-5xl text-5xl  xl:p-1 p-1 bg-white' />
                                    <p className='text-white text-4xl'>{totalPendingStudents ? totalPendingStudents?.length : 0}</p>
                                </div>
                                <h1 className='text-white text-xl  '>Pending <span>Students</span></h1>

                            </div>
                        </div>
                        <div id='Student-cards' className=' cursor-pointer h-32 w-44 2xl:w-52 rounded-lg xl:h-28 bg-class2-50  xl:space-y-3 space-y-2 flex justify-center items-center '>
                            <div>
                                <div className='flex items-center text-center justify-center space-x-5  '>
                                    <FcMoneyTransfer className='text-class2-50 rounded-full text-5xl  xl:p-1 p-2 bg-white' />
                                    <p className='text-white text-4xl'>{calculateTotalPendingFees}</p>
                                </div>
                                <h1 className='text-white text-xl '>Pending <span>Fees</span></h1>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex justify-center items-center p-10 pt-5'>
                    <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-5 shadow-xl space-y-5 w-full">
                        <div className="print-btn flex items-center justify-between space-x-3">
                            <div className=" flex  items-center justify-center ml-6">
                                <input
                                    onChange={handleSearchStudents}
                                    type="text"
                                    className=" w-full shadow-xl px-3 py-2 rounded-l-lg outline-none    "
                                    placeholder="Search Student"
                                ></input>
                                <button

                                    className="bg-class3-50 px-2 py-1 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
                                >
                                    <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-white transition duration-400" />
                                </button>
                            </div>
                            <div className="right flex items-center space-x-3 pr-6">
                                <button id="year-btn" className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-lg shadow-2xl space-x-1 ">
                                    <select onChange={handlePendingPaidUpClick} name="" id="" className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none">
                                        <option value={0}>All</option>
                                        <option value={1}>Pending</option>
                                        <option value={2}>Paidup</option>
                                    </select>
                                </button>

                                <ReactToPrint
                                    trigger={() => (
                                        <Link to="#" id='print' className="text-3xl bg-[#f8b26a] rounded-md text-white  w-10 h-8 flex justify-center  "><MdLocalPrintshop /></Link>
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
                            </div>
                        </div>
                        <div ref={componentRef} className='p-5 pt-3 pb-0'>
                            <table className="w-full text-sm text-center rounded-xl overflow-hidden shadow-xl ">
                                <thead className="text-xs text-gray-700 bg-class3-50 uppercase">
                                    <tr className='text-white text-base'>
                                        <th scope="col" className="w-20 h-20">Student Id</th>
                                        <th scope="col" className="w-20 h-20">Name</th>
                                        <th scope="col" className="w-20 h-20">Phone</th>
                                        <th scope="col" className="w-20 h-20">Total</th>
                                        <th scope="col" className="w-20 h-20">Paidup</th>
                                        <th scope="col" className="w-20 h-20">Pending</th>
                                        {
                                            !isPrint
                                                ?
                                                <th scope="col" className="w-20 h-20">Action</th>
                                                :
                                                null
                                        }
                                    </tr>
                                </thead>
                                <tbody className='bg-white border items-center '>
                                    {
                                        paginationData[0]
                                            ?
                                            isPrint
                                                ?
                                                allClassStudents.map((item, index) => {
                                                    return (
                                                        <tr className=" border-b" key={index}>
                                                            <th className="w-20 h-20 text-gray-500">{item.student_id.student_id}</th>
                                                            <td className="w-20 h-20">{item.student_id.basic_info_id.full_name}</td>
                                                            <td className="w-20 h-20">{item.student_id.contact_info_id.whatsapp_no}</td>
                                                            <td className="w-20 h-20">{item.fees_id.net_fees}</td>
                                                            <td className="w-20 h-20">{item.fees_id.net_fees - item.fees_id.pending_amount}</td>
                                                            <td className="w-20 h-20">{item.fees_id.pending_amount}</td>
                                                            {
                                                                !isPrint
                                                                    ?
                                                                    <td className="w-20 h-20 ">
                                                                        <div className='flex justify-center space-x-3'>
                                                                            <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id.student_id}`}>
                                                                                <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                                                    <AiFillEye className="text-xl text-darkblue-500" />
                                                                                </Tooltip>
                                                                            </NavLink>

                                                                            {/* <Tooltip content="Admission Cansel" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                                    <MdDelete className="text-xl text-red-600" onClick={(e) => navigate(`/cancelAdmission/${item.student_id.student_id}`, {state:{item}})} />
                                                                </Tooltip> */}
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    null
                                                            }
                                                        </tr>
                                                    )
                                                })
                                                :
                                                paginationData.map((item, index) => {
                                                    return (
                                                        <tr className=" border-b" key={index}>
                                                            <th className="w-20 h-20 text-gray-500">{item.student_id.student_id}</th>
                                                            <td className="w-20 h-20">{item.student_id.basic_info_id.full_name}</td>
                                                            <td className="w-20 h-20">{item.student_id.contact_info_id.whatsapp_no}</td>
                                                            <td className="w-20 h-20">{item.fees_id.net_fees}</td>
                                                            <td className="w-20 h-20">{item.fees_id.net_fees - item.fees_id.pending_amount}</td>
                                                            <td className="w-20 h-20">{item.fees_id.pending_amount}</td>
                                                            {
                                                                !isPrint
                                                                    ?
                                                                    <td className="w-20 h-20 ">
                                                                        <div className='flex justify-center space-x-3'>
                                                                            <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id.student_id}`}>
                                                                                <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                                                    <AiFillEye className="text-xl text-darkblue-500" />
                                                                                </Tooltip>
                                                                            </NavLink>

                                                                            {/* <Tooltip content="Admission Cansel" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                                    <MdDelete className="text-xl text-red-600" onClick={(e) => navigate(`/cancelAdmission/${item.student_id.student_id}`, {state:{item}})} />
                                                                </Tooltip> */}
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    null
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            :
                                            <tr className="">
                                                <td colSpan={7} className="bg-red-200  font-bold p-2 rounded">
                                                    <div className="flex space-x-2 justify-center items-center">

                                                        <IoMdInformationCircle className="text-xl text-red-600" />
                                                        <h1 className="text-red-800">Students not found </h1>
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>

                        </div>
                        <nav aria-label="Page navigation example" className='flex justify-end'>
                            <ul className="inline-flex items-center -space-x-px ">
                                <li>
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
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Class
