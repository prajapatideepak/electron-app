import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AiOutlineUser } from "react-icons/ai"
import { MdPendingActions } from "react-icons/md"
import { FcMoneyTransfer } from "react-icons/fc"
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { MdLocalPrintshop } from 'react-icons/md';
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";



const Facultyheader = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <div className='flex justify-center items-center p-10 pt-10'>
                <div class="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
                    <div>
                        <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                            Staff Transection List
                        </p>
                    </div>
                    <div className="print-btn flex items-center space-x-3">

                        <button id="" className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-md  space-x-1 ">
                            <select name="" id="" className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none">
                                <option value="Today">Today</option>
                                <option value="Weekly">Last Week</option>
                                <option value="Monthly">Last Month</option>
                            </select>
                        </button>
                        <input id="" type="Date" className='outline-none bg-white border rounded-md p-2 cursor-pointer' />
                        <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-3xl bg-blue-200 rounded-md text-darkblue-500  w-10 h-8 flex justify-center  " onClick={handlePrint}><MdLocalPrintshop /></a></Tooltip>

                    </div>
                    <div ref={componentRef} className='p-5 pt-3 pb-0'>
                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                                        <th className="font-normal text-center px-6">PROFILE</th>
                                        <th className="font-normal text-center px-10 lg:px-6 xl:px-6">
                                            ID
                                        </th>
                                        <th className="font-normal text-center px-10 lg:px-6  xl:px-6 ">
                                            Name
                                        </th>
                                        <th className="font-normal text-center px-10 lg:px-6  xl:px-6">
                                            ROLE
                                        </th>
                                        <th className="font-normal text-center px-10 lg:px-6  xl:px-6">
                                            DATE
                                        </th>
                                        <th className="font-normal text-center px-10 lg:px-6  xl:px-6">
                                            LASTPAID
                                        </th>
                                        <th className="font-normal text-center px-10 lg:px-6  xl:px-6">
                                            Admin
                                        </th>
                                        <th className="font-normal text-center px-10 lg:px-6  xl:px-6">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">

                                    <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                                        <td className="text-center">
                                            <div className='flex justify-center items-center space-x-2'>

                                                <img className='h-14 w-14 rounded-full' src="../images/user.png" alt="profile" />
                                               
                                            </div>
                                        </td>
                                        <td className=" px-10 text-center font-bold lg:px-6 xl:px-0">
                                            01
                                        </td>
                                        <td className="px-10 text-center lg:px-6 xl:px-0">
                                            shad
                                        </td>
                                        <td className="font-medium px-10 lg:px-6 xl:px-0">
                                            <p className='text-center'>

                                                Teacher
                                            </p>
                                        </td>
                                        <td className="px-10 lg:px-6 xl:px-0">
                                            <p className="text-center">
                                                12/5/2022
                                            </p>
                                        </td>
                                        <td>
                                            <p className='text-center'>
                                                <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                                    800
                                                </span>
                                            </p>
                                        </td>
                                        <td>
                                            <span className='flex justify-center'>Sadik Ali</span>
                                        </td>
                                        <td className="px-5  ">
                                            <span className='flex justify-center'>
                                                <NavLink to={"/reciept/recipet"}>
                                                    <AiFillEye className="text-xl cursor-pointer" />
                                                </NavLink>
                                            </span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Facultyheader