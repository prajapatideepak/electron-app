import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { RiFolderUserFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { BiFolderPlus } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";





const Myclass = () => {
  const [openModel, setOpenModel] = useState(false)
  const [model, setModel] = React.useState(false);
  const [reportState, setReportState] = useState("")

  const className = "Bcom  sem 1"
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();

  const onSubmit = (data) => { reset(); }

  const handleClick = () => {
    resetField("startyear"); resetField("endyear"); resetField("STD"); resetField("medium"); resetField("Class"); resetField("Fees"); resetField("Stream");

  }
  const navigate = useNavigate();


  return (
    <div className="relative p-5">
      {model && (
        <div className='absolute w-full h-full  z-30 ' >
          <div className='flex justify-center opacity-100 '>
            <div className='h-2/3 mx-auto  opacity-100 shadow-2xl rounded mt-24 bg-white w-2/3 z-50'>
              <div className=''>
                <div className='flex justify-end '>
                  <button onClick={(e) => setModel(!model)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                    <AiFillCloseCircle />
                  </button>

                </div>
                <div className='mt-7'>
                  <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Add New Class</h1>
                  <div>
                    <form className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
                      <div className=" w-full grid grid-cols-1 rounded-lg drop-shadow-md truncate bg-white pb-5 pt-10 ">
                        <div className=" flex flex-col items-center gap-4">

                          <div className="flex lg:flex-row md:flex-col gap-4 ">
                            <div className="STD">

                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Class
                                </span>

                                <input type="text" name="Primary" id="Primary"

                                  className='xl:w-52 2xl:w-60 mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none'
                                  {...register("STD", { required: "Classname is required" })}
                                  onKeyUp={() => {
                                    trigger('STD')
                                  }} />


                                {errors.STD && (<small className="text-red-700">{errors.STD.message}</small>)}
                              </label>




                            </div>
                            <div className="Batch">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Batch
                                </span>
                                <div className=' mt-1'>
                                  <div className="input flex items-center border border-slate-300 rounded-md">
                                    <input
                                      type="input"
                                      placeholder="Starting Year"
                                      className={`xl:w-24 2xl:w-28  block  px-3 py-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.Batch && 'border-red-600'}`}
                                      {...register("startyear", { required: "Starting Year" })}
                                      onKeyUp={() => {
                                        trigger('startyear')
                                      }}
                                    />
                                    <div className='w-0.5 bg-slate-500  rounded-md'>
                                      554
                                    </div>
                                    <input
                                      type="input"
                                      placeholder="Ending Year"
                                      className={`xl:w-28 2xl:w-32 block  px-3 py-2 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.Batch && 'border-red-600'}`}
                                      {...register("endyear", { required: "End Year " })}
                                      onKeyUp={() => {
                                        trigger('endyear')
                                      }}
                                    />

                                  </div>
                                  <div className="msg flex items-center mt-1 ml-1 ">

                                    {errors.startyear && (<small className="text-red-700">{errors.startyear.message}</small>)}
                                    <div className='ml-14'>

                                      {errors.endyear && (<small className="text-red-700">{errors.endyear.message}</small>)}
                                    </div>
                                  </div>


                                </div>
                              </label>
                            </div>
                            <div className="Medium">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Medium
                                </span>
                                {/* <input
                                  type="text"
                                  placeholder="Enter Your WhatsApp No"
                                 
                                /> */}
                                <select name="medium" id="medium"

                                  className='xl:w-52 2xl:w-60 mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none'
                                  {...register("medium", { required: "Medium is required" })}
                                  onChange={() => {
                                    trigger('medium')
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="English">English</option>
                                  <option value="Gujarati">Gujarati</option>
                                  <option value="Hindi">Hindi</option>
                                </select>
                                {errors.medium && (<small className="text-red-700">{errors.medium.message}</small>)}
                              </label>
                            </div>
                          </div>
                          <div className="flex lg:flex-row md:flex-col gap-4 items-center">
                            <div className="Class">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Section
                                </span>
                                {/* <input
                                  type="text"
                                  placeholder="Enter Your WhatsApp No"
                                 
                                /> */}
                                <select name="Class" id="Class"

                                  className={`xl:w-52 2xl:w-60  mt-1 block  px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.Class && 'border-red-600'}`}
                                  {...register("Class", { required: "Section is required" })}
                                  onKeyUp={() => {
                                    trigger('Class')
                                  }}
                                  onChange={(e) => {
                                    const selectedReport = e.target.value
                                    setReportState(selectedReport)
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="Primary">Primary</option>
                                  <option value="Higher">Secoundary</option>
                                </select>
                                {errors.Class && (<small className="text-red-700">{errors.Class.message}</small>)}
                              </label>
                            </div>
                            <div className="Stream">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Stream
                                </span>
                                {/* <input
                                  type="text"
                                  placeholder="Enter Your WhatsApp No"
                                 
                                /> */}
                                <select name="Stream" id="Stream"

                                  className={`xl:w-52 2xl:w-60  mt-1 block px-3 py-2  border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.Stream && 'border-red-600'}`}
                                  {...register("Stream", { required: "Stream is required" })}
                                  onKeyUp={() => {
                                    trigger('Stream')
                                  }}
                                  onChange={(e) => {
                                    const selectedReport = e.target.value
                                    setReportState(selectedReport)
                                  }}
                                >
                                  <option value="">None</option>
                                  <option value="Primary">Commerce</option>
                                  <option value="Higher">Science</option>
                                  <option value="Higher">Arts</option>
                                </select>
                                {errors.Stream && (<small className="text-red-700">{errors.Stream.message}</small>)}
                              </label>
                            </div>


                            <div className="Fees">
                              <label className="block">
                                <span className="block text-sm font-medium text-slate-700">
                                  Fees
                                </span>
                                <input
                                  type="number"
                                  placeholder="Enter fees"
                                  className={`xl:w-52 2xl:w-60  mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.Fees && 'border-red-600'}`}
                                  {...register("Fees", { required: "Fees is required" })}
                                  onKeyUp={() => {
                                    trigger('Fees')
                                  }}
                                />
                                {errors.Fees && (<small className="text-red-700">{errors.Fees.message}</small>)}
                              </label>
                            </div>


                          </div>
                          <div className="flex lg:flex-row md:flex-col gap-4">

                            <div className="btn mt-5 flex justify-center w-60 space-x-3">
                              <button
                                type="button"
                                onClick={handleClick}
                                className="bg-blue-900 hover:bg-white text-lg border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                              >
                                Clear
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-900 hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                              >


                                <h1 className=" text-lg">SUBMIT</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>








                </div>

              </div>
            </div>
          </div>

        </div>


      )}
      <div className={`bg-slate-100 ${model && "opacity-20"}`}>
        <div className="md:p-7 md:pt-3 xl:p-5 xl:pt-1 bg-[#f5f7ff]">
          <div className="flex justify-between items-center">
            <div className="left flex justify-center items-center space-x-5">
              <div className="slect-year ">
                <label htmlFor="change Year" className='text-darkblue-500 font-semibold ml-1'>Select Year</label>
                <button

                  className=" flex items-center border bg-white p-2 md:p-2 md:py-1 rounded-lg  space-x-1 "
                >
                  <select
                    name=""
                    id=""
                    className="cursor-pointer text-darkblue-500  text-base outline-none"
                  >
                    <option value="">Corrent Year</option>
                    <option value="Gujarati">2022-23</option>
                    <option value="Hindi">2023-24</option>
                  </select>
                </button>
              </div>
              <div className="medium ">
                <label htmlFor="medium" className='text-darkblue-500 font-semibold ml-1'>Medium</label>
                <button

                  className=" flex items-center border bg-white p-2 md:p-2 md:py-1 rounded-lg  space-x-1 "
                >
                  <select
                    name=""
                    id=""
                    className="cursor-pointer text-darkblue-500 text-xs md:text-lg outline-none"
                  >
                    <option value="">Select</option>
                    <option value="English">English</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </button>
              </div>
              <div className="stream">
                <label htmlFor="stream" className='text-darkblue-500 font-semibold ml-1'>Stream</label>
                <button

                  className=" flex items-center border bg-white p-2 md:p-2 md:py-1 rounded-lg space-x-1 "
                >
                  <select
                    name=""
                    id=""
                    className="cursor-pointer text-darkblue-500 text-xs md:text-lg outline-none"
                  >
                    <option value="">Stream</option>
                    <option value="none">None</option>
                    <option value="science">Science</option>
                    <option value="arts">Arts</option>
                    <option value="commerce">Commerce</option>
                  </select>
                </button>
              </div>

            </div>
            <div className="right">

              <div className="wrapper flex items-center space-x-3">
                <Tooltip content="Add New Class" placement="bottom-end" className='text-white bg-black rounded p-2'>

                  <div onClick={(e) => setModel(true)}
                    className="btn cursor-pointer  h-12 w-12 rounded-full bg-white text-left border  overflow-hidden "
                    id="btn"
                  >
                    <div
                      className="icons  h-12 w-40 flex ml-3 items-center "
                      id="icons"
                    >
                      <BiFolderPlus className="text-2xl text-darkblue-500  " />

                    </div>
                  </div>
                </Tooltip>

                <NavLink className="nav-link" to="class/ChangeYear">
                  <div
                    className="btn cursor-pointer  h-11 w-40 rounded-full bg-white text-left border  overflow-hidden"
                    id="btn"
                  >
                    <div
                      className="icons  h-11 w-40 flex ml-3 items-center "
                      id="icons"
                    >
                      <FaArrowRight className="text-xl text-darkblue-500  " />
                      <span className="ml-3 text-lg text-darkblue-500 font-semibold">
                        Change Year
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>



          <div className="  mt-5 h-1/5 rounded-lg bg-white pt-5 pb-10 ">
            <ul className='justify-between grid grid-custom gap-10 p-10 pb-0 pt-0 '>
                <li className='  rounded-md h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer  '>
                  <div className='class_card bg-[#ffd6d6] drop-shadow-lg rounded-lg p-2 pr-0 h-40'>
                    <div className=' h-6  flex justify-end items-center space-x-2 mr-2 '>
              
                   
                    <div className=' edit_delete_btns hidden text-f1-200 bg-white px-1 py-1 hover:text-white hover:bg-f1-200   rounded-md    ' >
                      <MdModeEdit className='' onClick={(e) => setModel(true)} />
                    </div>

                    <div className=' edit_delete_btns hidden text-f1-200 bg-white px-1 py-1 hover:text-white hover:bg-f1-200   rounded-md  ' >
                      <MdDelete  />
                    </div>

                    </div>
              <NavLink className="nav-link" to="class">
                    <div className=" flex  space-x-2 items-center ml-3 ">

                      <div className=' bg-f1-200 rounded-md'>

                        <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                      </div>

                      <div className='flex flex-1 justify-center items-center'>

                        <h1 className={` text-f1-200 text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                          {className}
                        </h1>
                      </div>
                    </div>
                    <div className="total bg-f1-200 w-60 h-8 ml-1 rounded-md  flex  justify-center items-center mt-4 ">
                      <p className="  text-white    ">Total Student : 200</p>

                    </div>


              </NavLink>

                  </div>
                </li>
              <li className='h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg '>
                <div className='class_card bg-blue-200 rounded-lg p-2 h-40 drop-shadow-lg'>
              
                <div className="flex p-3 space-x-2 items-center py-4 ">
                    <div className=' bg-blue-500 rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-blue-500 text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>

                  <div className="total bg-blue-500  rounded-md flex justify-center  p-1  mt-2">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>

                </div>
              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg  '>
                <div className=" bg-[#c1d1d8]  rounded-lg p-2 h-40 drop-shadow-lg">

                  <div className="flex p-3 space-x-2 items-center py-4 ">
                    <div className=' bg-[#2f667e] rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-[#2f667e] text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>

                  <div className="total bg-[#2f667e]   rounded-md flex justify-center  p-1  mt-2">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>
                </div>

              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg  '>
                <div className=" bg-orange-100  rounded-lg p-2 h-40 drop-shadow-lg">

                  <div className="flex p-3 space-x-2 items-center py-4 ">
                    <div className=' bg-[#9a4947] rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-[#9a4947] text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>
                  <div className="total bg-[#9a4947]   rounded-md flex justify-center  p-1  mt-2">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>

                </div>
              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg  '>
                <div className=" bg-[#f4d5ff] rounded-lg p-2 h-40 drop-shadow-lg">

                  <div className="flex p-3 space-x-2 items-center py-4">
                    <div className=' bg-[#e08aff] rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-[#e08aff] text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>

                  <div className="total bg-[#e08aff] rounded-md flex justify-center  p-1 mt-2 ">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>

                </div>
              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg  '>
                <div className="bg-[#fbc8bd] rounded-lg p-2 h-40 drop-shadow-lg">

                  <div className="flex p-3 space-x-2 items-center py-4 ">
                    <div className=' bg-[#f24822]  rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-[#f24822]  text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>

                  <div className="total bg-[#f24822]   rounded-md flex justify-center  p-1 mt-2 ">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>

                  </div>
                </div>
              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg  '>
                <div className="bg-teal-100 rounded-lg p-2 h-40 drop-shadow-lg ">

                  <div className="flex p-3 space-x-2 items-center py-4 ">
                    <div className=' bg-teal-500   rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-teal-500  text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>
                  <div className="total bg-teal-500   rounded-md flex justify-center  p-1 mt-2">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>


                </div>
              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg '>
                <div className=" bg-[#d8bbbc]  rounded-lg p-2 h-40 drop-shadow-lg ">

                  <div className="flex p-3 space-x-2 items-center py-4">
                    <div className=' bg-[#7e1b1f]   rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>

                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-[#7e1b1f]  text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>
                  <div className="total bg-[#7e1b1f]   rounded-md flex justify-center  p-1 mt-2 ">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>
                </div>

              </li>
              <li className=' h-28 xl:w-72  xl:h-44 p-3 pt-2 cursor-pointer rounded-lg '>
                <div className="bg-yellow-100  rounded-lg p-2 h-40 drop-shadow-lg ">

                  <div className="flex p-3 space-x-2 items-center py-4">
                    <div className=' bg-yellow-600   rounded-md'>

                      <RiFolderUserFill className="text-white text-4xl md:text-5xl xl:text-7xl " />
                    </div>
                    <div className='flex flex-1 justify-center items-center'>

                      <h1 className={` text-yellow-600 text-xl font-bold ${className.length < 8 && "text-4xl"}  ${className.length <= 2 && "text-7xl"}   `}>
                        {className}
                      </h1>
                    </div>
                  </div>

                  <div className="total bg-yellow-600   rounded-md flex justify-center  p-1 mt-2">
                    <p className="  text-white  text-xs sm:text-sm md:text-base   ">Total Student : 200</p>
                  </div>

                </div>
              </li>


            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myclass;
