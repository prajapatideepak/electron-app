import React from 'react'
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import { MdLocalPrintshop } from 'react-icons/md';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5"
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { FaArrowLeft } from "react-icons/fa"


function Remove() {
    Swal.fire({
        title: 'Are you sure to start new year ?',
        text: "After starting new year, your current classes will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Start New Year'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'New Year Started!',
                '',
                'success'
            )
        }
    })
}

const ChangeYear = () => {
    const [start, setstartyear] = React.useState("2022")
    const [end, setendyear] = React.useState("2023")
    const [medium, setMedium] = React.useState("")
    const [section, setSection] = React.useState("")
    const [stream, setStream] = React.useState("")
    const [fees, setFees] = React.useState("500")
    const [isEditable, setEditable] = React.useState(true)


    const editTable = () => {
        setEditable(!isEditable)
        
        
    }

   

    const navigate = useNavigate();

    return (
        <>
            <section className='table h-full w-full  shadow-none'>
                <div className=' justify-center items-center mt-2 p-10  pt-0'>
                    <div className="title py-6 flex justify-between items-center">
                        <h1 className="text-3xl text-center font-medium text-[#020D46] mb-3">
                            Transfer Classes
                        </h1>

                        <div className="btn cursor-pointer ml-5 h-10 w-24 rounded-md bg-white text-left border  overflow-hidden" id="btn" onClick={() => navigate(-1)}>
                            <div className="icons  h-9 w-40 flex ml-2 items-center " id="icons">
                                <FaArrowLeft className="text-2xl text-darkblue-500  " />
                                <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
                            </div>
                        </div>

                    </div>
                    <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">

                        <table className="w-full text-sm text-center bg-class3-50 rounded-xl  ">
                            <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                                <tr className='text-white text-base'>
                                    <th scope="col" className="w-20 h-20">Class</th>
                                    <th scope="col" className="w-20 h-20">Batch</th>
                                    <th scope="col" className="w-20 h-20">Medium</th>
                                    <th scope="col" className="w-20 h-20">Section</th>
                                    <th scope="col" className="w-20 h-20">Stream</th>
                                    <th scope="col" className="w-20 h-20">Fees</th>

                                </tr>
                            </thead>
                            <tbody className='bg-white border items-center '>
                                <tr className=" border-b">
                                    <td scope="row" className="w-20 h-20">
                                        1
                                    </td>
                                    <td className="w-28 h-20 space-x-4">
                                        <input type="text" disabled={isEditable} className=' rounded-md w-16 h-7 text-center border-2 border-class3-50 ' value={start} onChange={e => setstartyear(e.target.value)} id='start-year' />
                                        <input type="text" disabled={isEditable} className=' rounded-md w-16 h-7 text-center border-2 border-class3-50' value={end} onChange={e => setendyear(e.target.value)} id='end-year' />
                                    </td>
                                    <td className="w-20 h-20">
                                        <select name="" id="" disabled={isEditable} className=' rounded-md w-20 h-7 text-center border-2 border-class3-50 ' value={medium} onChange={e => setMedium(e.target.value)}>
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Science">Gujarati</option>
                                        </select>
                                    </td>
                                    <td className="w-20 h-20">
                                        <select name="" id="" disabled={isEditable} className=' rounded-md w-20 h-7 text-center border-2 border-class3-50' value={section} onChange={e => setSection(e.target.value)} >
                                            <option value="English">Primary</option>
                                            <option value="Hindi">Secondary</option>
                                        </select>
                                    </td>
                                    <td className="w-20 h-20">
                                        <select name="" id="" disabled={isEditable} className=' rounded-md w-24 h-7 text-center border-2 border-class3-50'  value={stream} onChange={e => setStream(e.target.value)} >
                                            <option value="English">Commerce</option>
                                            <option value="Hindi">Arts</option>
                                            <option value="Science">Science</option>
                                        </select>
                                    </td>
                                    <td className="w-20 h-20">
                                        <input type="text" disabled={isEditable} className=' rounded-md w-16 h-7 text-center border-2 border-class3-50' value={fees} onChange={e => setFees(e.target.value)} />

                                    </td>
                                    <td className="w-20 h-20 ">
                                        <div className='flex justify-center space-x-2'>


                                            <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2' onClick={editTable}>
                                                {isEditable ?

                                                    <MdModeEditOutline id='edit-class' onClick={editTable} className='text-xl cursor-pointer hover:text-class3-50 text-darkblue-500' />
                                                    :
                                                    <IoCheckmarkDoneCircleSharp id='edit-class' onClick={editTable} className='text-xl cursor-pointer hover:text-class3-50 text-darkblue-500' />
                                                }
                                            </Tooltip>

                                        </div>
                                    </td>
                                </tr>



                            </tbody>
                        </table>
                        <div className="button flex justify-end items-center space-x-4">

                            <div onClick={Remove} id='transfer-btn' className='flex items-center hover:bg-class3-50 bg-orange-400 w-28 h-10 justify-center rounded-lg cursor-pointer space-x-2' >
                                <div className=''>
                                </div>
                                <p className='text-white text-lg'>SUBMIT</p>
                            </div>
                        </div>
                        {/* <nav aria-label="Page navigation example" className='flex justify-end'>
                            <ul class="inline-flex items-center -space-x-px ">
                                <li>
                                    <a to="#" class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Previous</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a to="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a to="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a to="#" aria-current="page" class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a to="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                </li>
                                <li>
                                    <a to="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                </li>
                                <li>
                                    <a to="#" class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Next</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </nav> */}

                    </div>
                </div>
            </section>


        </>
    )
}

export default ChangeYear