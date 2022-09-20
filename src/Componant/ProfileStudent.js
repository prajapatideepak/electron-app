import React, { useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { useForm } from "react-hook-form";
import { AiFillEye } from 'react-icons/ai';
import { MdLocalPrintshop } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserEdit } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';


const Profilestudent = () => {
    const [img, setImg] = useState("/images/user.png");
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

    const navigate = useNavigate();



    const [discount, setDiscount] = useState(0)
    const handleClick = () => {
        resetField("fullname"); resetField("mothername"); resetField("whatsappno"); resetField("mobileno"); resetField("dateofbirth"); resetField("gender");
        resetField("std"); resetField("stream"); resetField("medium"); resetField("admissiondate"); resetField("totalfee"); resetField("discount");
        resetField("netpayable"); resetField("email"); resetField("reference"); resetField("note");
        setDiscount(0)
    }
    const totalDis = () => {
        const totalFee = document.getElementById("totalfee").value;
        const totalDis = document.getElementById("discount").value;

        let dis = (totalFee * totalDis) / 100;
        let netPay = totalFee - dis;

        setDiscount(Math.round(netPay))
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <section className=" p-10 pt-0">
                <div className="title px-5 pt-8 pb-2 flex justify-between xl:px-0">
                    <h1 className="text-3xl  text-[#020D46] mb-3 font-bold">
                        Shad Details
                    </h1>
                    <div className="btn cursor-pointer ml-5 h-10 w-24 rounded-md bg-white text-left border  overflow-hidden " id="btn" onClick={() => navigate(-1)}>
                        <div className="icons  h-9 w-40 flex ml-2 items-center " id="icons">
                            <FaArrowLeft className="text-2xl text-darkblue-500  " />
                            <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto relative  sm:rounded-lg bg-white  shadow-xl space-y-5 w-full">
                    <div className="button flex justify-end m-5 ">

                        <NavLink className="nav-link" to="Transfer">

                            <button className="border rounded-md w-20 h-8 bg-darkblue-500 drop-shadow-lg text-white">
                                Transfer
                            </button>
                        </NavLink>

                    </div>
                    <form className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-11/12 grid grid-cols-2 rounded-lg  truncate bg-white p-10">
                            <div className="left flex flex-col items-center gap-5">
                                <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                                    <img src={img} width="100%" height="100%" alt="student profile" />
                                    <div className='profile_img_overlay flex flex-col justify-center items-center'>
                                        <input type='file' className="rounded-md w-16" onChange={onImageChange} />
                                        {/* <button className='upload_btn text-white mt-5 flex items-center justify-center gap-3'>
                        <MdModeEditOutline/> <span style={{textTransform:'lowercase'}}> upload</span>
                    </button>                             */}
                                    </div>
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4 mt-5">
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
                                    <div className="mothername">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Mother Name
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Enter Your Mother Name"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.mothername && 'border-red-600'}`}
                                                {...register("mothername", { required: "Mothername is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                                onKeyUp={() => {
                                                    trigger('mothername')
                                                }}
                                            />
                                            {errors.mothername && (<small className="text-red-700">{errors.mothername.message}</small>)}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4">
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
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4">
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
                                            <div className={` border border-slate-300 mt-1 rounded-md h-10 flex justify-center items-center space-x-5 ${errors.gender && 'border-red-600'} `}>
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
                            </div>
                            <div className="right flex flex-col justify-center items-center gap-5">
                                <div className="flex lg:flex-row md:flex-col gap-4">
                                    <div className="selectstd">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Select STD
                                            </span>
                                            <select
                                                name="cars"
                                                id="cars"
                                                className={`w-[155px] hover:cursor-pointer mt-1 block w-full px-3 py-[6px] bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.std && 'border-red-600'}`}
                                                {...register("std", { required: "STD required" })}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </label>
                                        {errors.std && (<small className="text-red-700">{errors.std.message}</small>)}
                                    </div>
                                    <div className="selectstream">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Select STREAM
                                            </span>
                                            <select
                                                name="cars"
                                                id="cars"
                                                className={`w-[155px] hover:cursor-pointer mt-1 block w-full px-3 py-[6px] bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.std && 'border-red-600'}`}
                                                {...register("stream", { required: "Stream is required" })}
                                            >
                                                <option value="">Select</option>
                                                <option value="arts">Arts</option>
                                                <option value="commerce">Commerce</option>
                                                <option value="science">Science</option>
                                            </select>
                                        </label>
                                        {errors.stream && (<small className="text-red-700">{errors.stream.message}</small>)}
                                    </div>
                                    <div className="selectmedium">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Select MEDIUM
                                            </span>
                                            <select
                                                name="cars"
                                                id="cars"
                                                className={`w-[155px] hover:cursor-pointer mt-1 block w-full px-3 py-[6px] bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.medium && 'border-red-600'}`}
                                                {...register("medium", { required: "Medium is required" })}
                                            >
                                                <option value="">Select</option>
                                                <option value="english">English</option>
                                                <option value="gujarati">Gujarati</option>
                                                <option value="hindi">Hindi</option>
                                            </select>
                                        </label>
                                        {errors.medium && (<small className="text-red-700">{errors.medium.message}</small>)}
                                    </div>
                                </div>

                                <div className="flex lg:flex-row md:flex-col gap-4">
                                    <div className="admissiondate">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Admission Date
                                            </span>
                                            <input
                                                type="date"
                                                className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.admissiondate && 'border-red-600'}`}
                                                {...register("admissiondate", { required: "Admissiondate is required" })}
                                            />
                                            {errors.admissiondate && (<small className="text-red-700">{errors.admissiondate.message}</small>)}
                                        </label>
                                    </div>
                                    <div className="totalfee">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Total Fee
                                            </span>
                                            <input
                                                type="text" id='totalfee'
                                                placeholder="Enter Your Total Fee"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.totalfee && 'border-red-600'}`}
                                                {...register("totalfee", { required: "Total Fee is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" } })}
                                                onKeyUp={() => {
                                                    trigger('totalfee')
                                                    totalDis()
                                                }}
                                            />
                                            {errors.totalfee && (<small className="text-red-700">{errors.totalfee.message}</small>)}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4">
                                    <div className="email">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Email
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Enter Your Email"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.email && 'border-red-600'}`}
                                                {...register("email", { pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Please enter valid email" } })}
                                                onKeyUp={() => {
                                                    trigger('email')
                                                }}
                                            />
                                            {errors.email && (<small className="text-red-700">{errors.email.message}</small>)}
                                        </label>
                                    </div>
                                    <div className="discount">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Discount(%)
                                            </span>
                                            <input
                                                type="text" id='discount'
                                                placeholder="Enter Your Discount"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.discount && 'border-red-600'}`}
                                                {...register("discount", { pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" } })}
                                                onKeyUp={() => {
                                                    trigger('discount')
                                                    totalDis()
                                                }}
                                            />
                                            {errors.discount && (<small className="text-red-700">{errors.discount.message}</small>)}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex lg:flex-row md:flex-col gap-4">
                                    <div className="reference">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Reference
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Enter Your Refeence"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.reference && 'border-red-600'} `}
                                                {...register("reference", { pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                                onKeyUp={() => {
                                                    trigger('reference')
                                                }}
                                            />
                                            {errors.reference && (<small className="text-red-700">{errors.reference.message}</small>)}
                                        </label>
                                    </div>
                                    <div className="netpayable">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Net Payable
                                            </span>
                                            <input
                                                disabled
                                                type="text"
                                                value={discount}
                                                placeholder="Enter Your Net Payable"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
                                                {...register("netpayable", { required: "Discount is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" } })}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex lg:flex-row md:flex-col gap-4">
                                    <div className="schoolname">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                School

                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Enter Your School Name"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.note && 'border-red-600'}`}
                                                {...register("note", { pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                                onKeyUp={() => {
                                                    trigger('note')
                                                }}
                                            />
                                            {errors.note && (<small className="text-red-700">{errors.note.message}</small>)}
                                        </label>
                                    </div>
                                    <div className="note">
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Note
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Enter Your Note"
                                                className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.note && 'border-red-600'}`}
                                                {...register("note", { pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                                onKeyUp={() => {
                                                    trigger('note')
                                                }}
                                            />
                                            {errors.note && (<small className="text-red-700">{errors.note.message}</small>)}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex w-full justify-end pr-2">
                                    <button type="submit" className="py-2 px-8 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center">
                                        <FaUserEdit className="text-xl" />Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="overflow-x-auto relative  sm:rounded-lg  p-10  space-y-5 w-full">

                        <div className="print-btn flex items-center space-x-3">
                            <button id="year-btn" className=" flex items-center border bg-white p-2 xl:p-2 xl:py-1 rounded-md shadow-2xl space-x-1 ">
                                <select name="" id="" className="cursor-pointer text-darkblue-500 text-xs xl:text-lg outline-none">
                                    <option value="All">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Paidup">Paidup</option>
                                </select>
                            </button>


                            <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" id='print' class="text-3xl bg-class3-50 rounded-md text-white  w-10 h-8 flex justify-center  " onClick={handlePrint} ><MdLocalPrintshop /></a></Tooltip>

                        </div>
                        <div ref={componentRef} className='p-5 pt-3 pb-0'>
                            <table class="w-full text-sm text-center bg-class3-50 rounded-xl shadow-xl ">
                                <thead class="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                                    <tr className='text-white text-base'>
                                        <th scope="col" class="w-20 h-20">Batch</th>
                                        <th scope="col" class="w-20 h-20">Class</th>
                                        <th scope="col" class="w-20 h-20">Total</th>
                                        <th scope="col" class="w-20 h-20">Discount</th>
                                        <th scope="col" class="w-20 h-20">Paidup</th>
                                        <th scope="col" class="w-20 h-20">Pending</th>
                                        <th scope="col" class="w-20 h-20">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white border items-center '>
                                    <tr class=" border-b">
                                        <td scope="row" class="w-20 h-20">
                                            2022-23
                                        </td>
                                        <td class="w-20 h-20">12</td>
                                        <td class="w-20 h-20">20000</td>
                                        <td class="w-20 h-20">10%</td>
                                        <td class="w-20 h-20">10000</td>
                                        <td class="w-20 h-20">10000</td>
                                        <td class="w-20 h-20 ">
                                            <div className='flex justify-center space-x-2'>
                                                <NavLink className="nav-link" to="Studenthistory">

                                                    <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-xl text-darkblue-500"><AiFillEye /></a></Tooltip>
                                                </NavLink>


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

            </section>
        </>
    );
};

export default Profilestudent;