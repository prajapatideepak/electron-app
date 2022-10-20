import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MdLocalPrintshop } from "react-icons/md";
import { AiFillEye } from 'react-icons/ai';
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";


const Studenthearder = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <div className='flex justify-center items-center p-10 pt-10'>
                <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
            <div>
                <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                    Student Transection List
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
                        <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#"  className="text-3xl bg-green-200 rounded-md text-green-900  w-10 h-8 flex justify-center  " onClick={handlePrint}><MdLocalPrintshop /></a></Tooltip>

                    </div>
                    <div ref={componentRef} className='p-5 pt-3 pb-0'>
                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
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
                                        <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                            Detail
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">

                                    <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                                        <td className="pl-8">
                                            01/02/2022
                                        </td>
                                        <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                                        01
                                        </td>
                                        <td className="px-10 lg:px-6 xl:px-0">
                                                        shad
                                        </td>
                                        <td className="font-medium px-10 lg:px-6 xl:px-0">
                                            <span className="bg-green-200 px-4 text-green-900 font-bold rounded">

                                                    720
                                            </span>
                                        </td>
                                        <td className="px-10 lg:px-6 xl:px-0">
                                            <p className="">
                                                <span className="bg-red-200 px-4 text-red-900 font-bold rounded">
                                                        80
                                                </span>
                                            </p>
                                        </td>
                                        <td>
                                            <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                                800
                                            </span>
                                        </td>
                                        <td>
                                            <span>Sadik Ali</span>
                                        </td>
                                        <td className="px-5  ">
                                            <span>
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

export default Studenthearder