import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
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


const Class = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [openModel, setOpenModel] = useState(false)
    const [model, setModel] = React.useState(false);
    const [data, setdata] = React.useState([]);


    // model card data
    function loadData() {
        setdata([
            ...data,
            {
                id: 1,
                name: "Prajapati Deepak",
                fees: 1200,
                photo: "/images/user.png",
                mobile: "7359150166",
                class: "10th",
                amount: "1000"
            },
        ]);
    }

    return (
        <div className='relative  '>
            {model && (
                <div className='absolute w-full h-full  z-30 ' >
                    <div className='flex justify-center shadow-2xl opacity-100 '>
                        <div className='absolute h-2/3 mx-auto  opacity-100 shadow-2xl rounded mt-10 bg-white w-2/3 z-50'>
                            <div className=''>
                                <div className='flex justify-end '>
                                    <button onClick={(e) => setModel(!model)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                                        <AiFillCloseCircle />
                                    </button>

                                </div>
                                <div className='mt-7'>
                                    <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Transfer Fees</h1>


                                    <div className="px-2 py-2 flex mt-1 items-center justify-center">
                                        <input
                                            type="text"
                                            className="w-2/4 shadow-xl px-3 py-2 rounded-l-lg rounded-r-lg outline-none border   "
                                            placeholder="Search Student"
                                        ></input>
                                        <button
                                            onClick={loadData}
                                            className="  py-1 relative right-12 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
                                        >
                                            <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-darkblue-500 transition duration-400" />
                                        </button>
                                    </div>

                                    <div className=" pt-0 mt-8 ">
                                        {data.length > 0 ? (
                                            <div className="   flex justify-center mt-0  ">

                                                {data.map((m) => {
                                                    return (
                                                        <div className="border p-5 pt-2 rounded-lg shadow-lg">
                                                            <div className=" flex justify-center space-x-32  ">
                                                                <div className="font-mono space-y-2">
                                                                    <h1 className="font-bold text-xl">Name : {m.name}</h1>
                                                                    <h2>Student ID : {m.id}</h2>
                                                                    <p>Mobile : {m.mobile}</p>
                                                                    <h3>class : {m.class}</h3>
                                                                    <div className='shadow-2xl bg-slate-200  rounded-md py-1 flex justify-center w-1/2'>

                                                                        <h3 className='text-darkblue-500 text-base'>Amount :1000</h3>
                                                                    </div>
                                                                </div>

                                                                <div className=" rounded-full">
                                                                    <img
                                                                        src={m.photo}
                                                                        className="w-20 shadow-2xl h-20 rounded-full"
                                                                        alt={m.name}
                                                                    ></img>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end">

                                                                <button className=" bg-darkblue-500  rounded-lg m-3 hover:bg-blue-900  duration-200 transition text-white px-7 font-bold   py-1">
                                                                    Pay
                                                                </button>

                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
                                                <IoMdInformationCircle className="text-xl text-red-600" />

                                                <h1 className="text-red-800">Student Not available </h1>
                                            </div>
                                        )}
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            )}
            <div className={`bg-slate-100 ${model && "opacity-20"}`}>
                <div className="xl:flex xl:justify-between justify-center items-center pr-5 pt-3 xl:pl-8 space-y-5">
                    <h1 className=" text-xl xl:text-3xl text-center text-darkblue-5003g Q@ 
                    
                      xl:text-left font-bold text-darkblue-50 ">
                        1<span className='text-sm absolute  text-darkblue-500'>st</span>
                        <p className='inline-block mx-4 text-darkblue-500'> Stander</p>
                    </h1>
                    <div className="button flex justify-center  ">

                        <NavLink className="nav-link" to="Transfer">

                            <div className="wrapper">
                                <div className="btn cursor-pointer  h-12 w-40 rounded-full bg-white text-left border  overflow-hidden" id="btn">
                                    <div className="icons  h-12 w-40 flex ml-3 items-center " id="icons">
                                        <FaArrowRight className="text-2xl text-darkblue-500  " />
                                        <span className="ml-3 text-lg text-darkblue-500 font-semibold">Transfer All</span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>

                    </div>
                </div>
                <div className="pt-0 xl:flex items-center justify-center  ">
                    <div className=" xl:mr-36 pl-5 pr-5 xl:pl-0 xl:pr-0">
                        <img src="/images/class1.png" alt="" className="   xl:ml-10 xl:mt-0 " />
                    </div>
                    <div className="right pt-4 p-5 xl:flex xl:mr-10 xl:mt-10 xl:space-x-10 space-y-10 xl:space-y-0 justify-center items-center text-center">
                        <div id='Student-cards' className=' cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class4-50  xl:space-y-3 space-y-2 '>
                            <div className='flex items-center text-center justify-center space-x-5 pt-5 '>
                                <AiOutlineUser className=' text-class4-50 rounded-full text-5xl xl:p-1 bg-white' />
                                <p className='text-white text-4xl'>578</p>
                            </div>
                            <h1 className='text-white text-xl '>Total <span>Students</span></h1>
                        </div>
                        <div id='Student-cards' className=' cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class1-50  xl:space-y-3 space-y-2 '>
                            <div className='flex items-center text-center justify-center space-x-5 pt-5 '>
                                <MdPendingActions className=' text-class1-50 rounded-full xl:text-5xl text-5xl  xl:p-1 p-1 bg-white' />
                                <p className='text-white text-4xl'>578</p>
                            </div>
                            <h1 className='text-white text-xl  '>Pending <span>Students</span></h1>
                        </div>
                        <div id='Student-cards' className=' cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class2-50  xl:space-y-3 space-y-2 '>
                            <div className='flex items-center text-center justify-center space-x-5 pt-5 '>
                                <FcMoneyTransfer className='text-class2-50 rounded-full text-5xl  xl:p-1 p-2 bg-white' />
                                <p className='text-white text-4xl'>578</p>
                            </div>
                            <h1 className='text-white text-xl '>Pending <span>Fees</span></h1>
                        </div>
                    </div>

                </div>
                <div className='flex justify-center items-center p-10 pt-5'>
                    <div class="overflow-x-auto relative  sm:rounded-lg bg-white p-5 shadow-xl space-y-5 w-full">
                        <div className="print-btn flex items-center justify-between space-x-3">
                            <div className=" flex  items-center justify-center ml-6">
                                <input
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
                                    <select name="" id="" className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none">
                                        <option value="All">All</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Paidup">Paidup</option>
                                    </select>
                                </button>
                                <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" id='print' class="text-3xl bg-[#f8b26a] rounded-md text-white  w-10 h-8 flex justify-center  " onClick={handlePrint}><MdLocalPrintshop /></a></Tooltip>
                            </div>
                        </div>
                        <div ref={componentRef} className='p-5 pt-3 pb-0'>
                            <table class="w-full text-sm text-center bg-class3-50 rounded-xl shadow-xl ">
                                <thead class="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                                    <tr className='text-white text-base'>
                                        <th scope="col" class="w-20 h-20">Profile</th>
                                        <th scope="col" class="w-20 h-20">Phone</th>
                                        <th scope="col" class="w-20 h-20">Total</th>
                                        <th scope="col" class="w-20 h-20">Paidup</th>
                                        <th scope="col" class="w-20 h-20">Pending</th>
                                        <th scope="col" class="w-20 h-20">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white border items-center '>
                                    <tr class=" border-b">
                                        <th scope="row" class="w-20 h-20">
                                        <NavLink className="nav-link" to="Profilestudent">

                                            <div className='flex justify-center items-center space-x-2 cursor-pointer'>

                                                <img className='h-1/4 w-1/4 rounded-full' src="/images/user.png" alt="profile" />
                                                <div>
                                                    <p className='text-darkblue-500'>Deepak</p>
                                                    <p className='text-gray-500'>01</p>
                                                </div>
                                            </div>
                                        </NavLink>
                                        </th>
                                        <td class="w-20 h-20">1234567891</td>
                                        <td class="w-20 h-20">20000</td>
                                        <td class="w-20 h-20">10000</td>
                                        <td class="w-20 h-20">10000</td>
                                        <td class="w-20 h-20 ">
                                            <div className='flex justify-center space-x-3'>
                                                <NavLink className="nav-link" to="Profilestudent">

                                                    <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-xl text-darkblue-500"><AiFillEye /></a></Tooltip>
                                                </NavLink>


                                                <Tooltip content="Admission Cansel" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-xl text-red-600"
                                                    onClick={(e) => setModel(true)}
                                                ><MdDelete /></a></Tooltip>



                                            </div>
                                        </td>
                                    </tr>



                                </tbody>
                            </table>

                        </div>
                        <nav aria-label="Page navigation example" className='flex justify-end'>
                            <ul class="inline-flex items-center -space-x-px ">
                                <li>
                                    <a href="#" class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Previous</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                </li>
                                <li>
                                    <a href="#" class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Next</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
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



















