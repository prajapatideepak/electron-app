import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import {MdModeEditOutline} from 'react-icons/md';
import "../Styles/Studentform.css";
import { FaUserEdit } from 'react-icons/fa';


const Studentregister = () => {
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

    const onSubmit = (data) => {
        reset();
    };

    const [discount, setDiscount] = useState(0);
    const handleClick = () => {
        resetField("fullname");
        resetField("mothername");
        resetField("whatsappno");
        resetField("mobileno");
        resetField("dateofbirth");
        resetField("gender");
        resetField("std");
        resetField("stream");
        resetField("medium");
        resetField("admissiondate");
        resetField("totalfee");
        resetField("discount");
        resetField("netpayable");
        resetField("email");
        resetField("reference");
        resetField("note");
        setDiscount(0);
    };
    const totalDis = () => {
        const totalFee = document.getElementById("totalfee").value;
        const totalDis = document.getElementById("discount").value;

        let dis = (totalFee * totalDis) / 100;
        let netPay = totalFee - dis;

        setDiscount(Math.round(netPay));
    };

    return (
        <>
            <section className="">
                <div className="title px-14 py-6">
                    <h1 className="text-3xl font-bold text-[#020D46] mb-3">
                        Student Registration
                    </h1>
                </div>
                <form className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
                    <div className=" w-11/12 grid grid-cols-2 rounded-lg  truncate bg-white p-5 2xl:p-10  shadow-2xl">
                        <div className="left flex flex-col items-center gap-5">
                            <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                                <img src={img} width="100%" height="100%" alt="student profile" />
                                <div className='profile_img_overlay flex flex-col justify-center items-center'>
                                    <input type='file' className="rounded-md w-16" onChange={onImageChange} />

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
                                            className={`xl:w-52 2xl:w-60 mt-1 block px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.fullname && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.mothername && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.whatsappno && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.mobileno && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.dateofbirth && 'border-red-600'}`}
                                            {...register("dateofbirth", { required: "Date of birth is required" })}
                                        />
                                        {errors.dateofbirth && (<small className="text-red-700">{errors.dateofbirth.message}</small>)}
                                    </label>
                                </div>
                                <div className="gender ">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Gender
                                        </span>
                                        <div className={`xl:w-52 2xl:w-60 border border-slate-300 mt-1 rounded-md h-10 flex justify-center items-center space-x-5 ${errors.gender && 'border-red-600'} `}>
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
                            <div className="flex lg:flex-row md:flex-col gap-6 2xl:gap-9">
                                <div className="selectstd">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Select STD
                                        </span>
                                        <select
                                            name="cars"
                                            id="cars"
                                            className={` xl:w-32 2xl:w-36 hover:cursor-pointer mt-1 block  px-3 py-[6px] bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.std && 'border-red-600'}`}
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
                                            className={`xl:w-32 2xl:w-36 hover:cursor-pointer mt-1 block px-3 py-[6px] bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.std && 'border-red-600'}`}
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
                                            className={`xl:w-32 2xl:w-36 hover:cursor-pointer mt-1 block  px-3 py-[6px] bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.medium && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.admissiondate && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.totalfee && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.email && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.discount && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.reference && 'border-red-600'} `}
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
                                            className={`wxl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.note && 'border-red-600'}`}
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
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.note && 'border-red-600'}`}
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
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Studentregister;
