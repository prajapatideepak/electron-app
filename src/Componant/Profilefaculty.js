import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink , useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"
import { AiFillEye } from 'react-icons/ai';
import { MdLocalPrintshop } from 'react-icons/md';
import { Tooltip } from "@material-tailwind/react";
import { FaUserEdit } from "react-icons/fa";
import '../Styles/Studentform.css';



const Profilefaculty = () => {
  const [img, setImg] = useState("./images/profile.jpeg");
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

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
    resetField("fullname"); resetField("email"); resetField("whatsappno"); resetField("mobileno"); resetField("dateofbirth");
    resetField("dateofjoining"); resetField("qualification"); resetField("address"); resetField("gender");
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="title  flex items-center justify-between  m-5 pt-6">

        <h1 className="text-3xl text-center font-medium text-[#020D46] ">
          Nasir Sir Profile
        </h1>
        <div className="btn cursor-pointer ml-5 h-10 w-24 rounded-md bg-white text-left border  overflow-hidden " id="btn" onClick={() => navigate(-1)}>
            <div className="icons  h-9 w-40 flex ml-2 items-center " id="icons">
              <FaArrowLeft className="text-2xl text-darkblue-500  " />
              <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
            </div>
          </div>
      </div>
      <section className=" p-10 pt-3 ">
        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10  space-y-5 w-full">
            
          <form className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
            <div className=" w-full grid grid-cols-1 rounded-lg drop-shadow-md truncate bg-white pb-5 pt-10 ">
              <div className=" flex flex-col items-center gap-4">
                <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                  <img src={img} width="100%" height="100%" alt="student profile" />
                  <div className='profile_img_overlay flex flex-col justify-center items-center'>
                    <input type='file' className="rounded-md w-16" onChange={onImageChange} />
                    {/* <button className='upload_btn text-white mt-5 flex items-center justify-center gap-3'>
                        <MdModeEditOutline/> <span style={{textTransform:'lowercase'}}> upload</span>
                    </button>                             */}
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4 ">
                  <div className="fullname">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Full Name
                      </span>
                      <input
                        type="text"
                        placeholder="First Name, Middle Name, Last Name"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.fullname && 'border-red-600'}`}
                        {...register("fullname", { required: "Fullname is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                        onKeyUp={() => {
                          trigger('fullname')
                        }}
                      />
                      {errors.fullname && (<small className="text-red-700">{errors.fullname.message}</small>)}
                    </label>
                  </div>
                  <div className="email">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Your Email"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.email && 'border-red-600'}`}
                        {...register("email", { required: "Email is required", pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Please enter valid email" } })}
                        onKeyUp={() => {
                          trigger('email')
                        }}
                      />
                      {errors.email && (<small className="text-red-700">{errors.email.message}</small>)}
                    </label>
                  </div>
                  <div className="whatsappno">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        WhatsApp No
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Your WhatsApp No"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.whatsappno && 'border-red-600'}`}
                        {...register("whatsappno", { required: "Whatsapp no is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" }, minLength: { value: 10, message: "Please enter valida whatsapp no" } })}
                        onKeyUp={() => {
                          trigger('whatsappno')
                        }}
                      />
                      {errors.whatsappno && (<small className="text-red-700">{errors.whatsappno.message}</small>)}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4 items-center">

                  <div className="mobileno">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Mobile No
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Your Mobile No"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.mobileno && 'border-red-600'}`}
                        {...register("mobileno", { required: "Mobile no is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" }, minLength: { value: 10, message: "Please enter valida mobile no" } })}
                        onKeyUp={() => {
                          trigger('mobileno')
                        }}
                      />
                      {errors.mobileno && (<small className="text-red-700">{errors.mobileno.message}</small>)}
                    </label>
                  </div>
                  <div className="dateofbirth">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Date Of Birth
                      </span>
                      <input
                        type="date"
                        className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.dateofbirth && 'border-red-600'}`}
                        {...register("dateofbirth", { required: "Date of birth is required" })}
                      />

                      {errors.dateofbirth && (<small className="text-red-700">{errors.dateofbirth.message}</small>)}
                    </label>
                  </div>
                  <div className="gender w-60">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Gender
                      </span>
                      <div className=" border-2 border-slate-300 mt-1 rounded-md h-10 flex justify-center items-center space-x-5 ">
                        <div className="male ">

                          <label for="gender" className="m-2">
                            Male
                          </label>
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            className="  hover:cursor-pointer"
                            {...register("gender", { required: "Gender is required" })}
                          />
                        </div>
                        <div className="female">
                          <label for="gender" className="m-2">
                            Female
                          </label>
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            className="   hover:cursor-pointer"
                            {...register("gender", { required: "Gender is required" })}
                          />

                        </div>

                      </div>
                    </label>
                    {errors.gender && (<small className="text-red-700">{errors.gender.message}</small>)}
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4">
                  <div className="qualification">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Qualification
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Your Qualification"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.qualification && 'border-red-600'}`}
                        {...register("qualification", { required: "Qualification is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                        onKeyUp={() => {
                          trigger('qualification')
                        }}
                      />
                      {errors.qualification && (<small className="text-red-700">{errors.qualification.message}</small>)}
                    </label>
                  </div>
                  <div className="address">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Address
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Your Address"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.address && 'border-red-600'}`}
                        {...register("address", { required: "Address is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                        onKeyUp={() => {
                          trigger('address')
                        }}
                      />
                      {errors.address && (<small className="text-red-700">{errors.address.message}</small>)}
                    </label>
                  </div>
                  <div className="dateofjoining">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Date Of Joining
                      </span>
                      <input
                        type="date"
                        className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.dateofjoining && 'border-red-600'}`}
                        {...register("dateofjoining", { required: "Date of joining is required" })}
                      />

                      {errors.dateofjoining && (<small className="text-red-700">{errors.dateofjoining.message}</small>)}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4">

                  <div className="btn mt-5 flex justify-center w-60">
                    {/* <button
                    type="button"
                    onClick={handleClick}
                    className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                  >
                    Clear
                  </button> */}
                    <button
                      type="submit"
                      className="bg-blue-900 hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                    >
                      <FaUserEdit className="text-3xl" />

                      <h1 className=" ml-2 text-xl">Edit</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="pt-10 space-y-5">
            <div className="print-btn flex items-center space-x-3">
              <button id="year-btn" className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-full shadow-2xl space-x-1 ">
                <select name="" id="" className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none">
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Paidup">Paidup</option>
                </select>
              </button>
              <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" id='print' className="text-3xl bg-class5-50 rounded-md text-white p-1  "><MdLocalPrintshop /></a></Tooltip>

            </div>
            <table className="w-full text-sm text-center bg-class5-50 rounded-xl shadow-xl ">
              <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                <tr className='text-white text-base'>
                  <th scope="col" className="w-20 h-20">Id</th>
                  <th scope="col" className="w-20 h-20">Profile</th>
                  <th scope="col" className="w-20 h-20">Name</th>
                  <th scope="col" className="w-20 h-20">Phone</th>
                  <th scope="col" className="w-20 h-20">Role</th>
                  <th scope="col" className="w-20 h-20">LastPaid</th>
                  <th scope="col" className="w-20 h-20">Action</th>
                </tr>
              </thead>
              <tbody className='bg-white border items-center '>
                <tr className=" border-b">
                  <td className="w-20 h-20">01</td>
                  <td scope="row" className="w-20 h-20">
                    <div className='flex justify-center items-center space-x-2'>

                      <img className='h-14 w-14 rounded-full' src="/images/user.png" alt="profile" />

                    </div>
                  </td>
                  <td className="w-20 h-20">Nasir</td>
                  <td className="w-20 h-20">1234567890</td>
                  <td className="w-20 h-20">Teacher</td>
                  <td className="w-20 h-20">
                    <div className=''>
                      <p>14/02/22</p>
                      <p>1400</p>

                    </div>
                  </td>
                  <td className="w-20 h-20 ">
                    <div className='flex justify-center space-x-2'>
                      <NavLink className="nav-link" to="Staffhistory">
                        <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><span className="text-xl text-darkblue-500"><AiFillEye /></span></Tooltip>

                      </NavLink>
                    </div>
                  </td>
                </tr>


              </tbody>
            </table>
            <nav aria-label="Page navigation example" className='flex justify-end'>
              <ul className="inline-flex items-center -space-x-px ">
                <li>
                  <a href="#" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                  <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                  <a href="#" aria-current="page" className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                  <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                </li>
                <li>
                  <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  </a>
                </li>
              </ul>
            </nav>

          </div>


        </div>


      </section>
    </>
  );
};

export default Profilefaculty;


