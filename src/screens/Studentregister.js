import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import {MdModeEditOutline} from 'react-icons/md';
import "../Styles/Studentform.css";
import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios';
import {
   useQuery,
   useMutation,
   useQueryClient
 } from 'react-query';


const Studentregister = () => {
    const [img, setImg] = useState("./images/profile.jpeg");
    const [classes, setClasses] = useState([]);
    const [medium, setMedium] = useState('--');

    const [stream, setStream] = useState('--');
    const [netFees, setNetFees] = useState(0);

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

    const onSubmit = (data, e) => {
        e.preventDefault();

        Object.assign(data,{net_fees: netFees})
        // reset();
    };

    const onError = (errors, e) => console.log(errors, e);

    const handleClick = () => {
        resetField("fullname");
        resetField("mothername");
        resetField("whatsappno");
        resetField("mobileno");
        resetField("dateofbirth");
        resetField("gender");
        resetField("class");
        setMedium('--');
        setStream('--');
        resetField("admissiondate");
        resetField("totalfee");
        resetField("discount");
        resetField("netpayable");
        resetField("email");
        resetField("reference");
        resetField("note");
        resetField("school");
        resetField("address");
        setNetFees(0);
    };
    const totalDis = () => {
        const totalFee = document.getElementById("totalfee").value;
        const totalDis = document.getElementById("discount").value;

        let netPay = totalFee - totalDis;

        setNetFees(netPay);
    };

    const handleClassChange = (e) =>{
        trigger('class')
        e.preventDefault();
        classes.map((item)=>{
            if(e.target.value == ''){
                setMedium('--');
                setStream('--');
                return;
            }
            if(item._id == e.target.value){
                setMedium(item.medium);
                setStream(item.stream);
                return;
            }
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:4000/classes")
        .then((res)=>{
            setClasses(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        });
    },[]);

    return (
        <>
            <section className="">
                <div className="title px-14 py-6">
                    <h1 className="text-3xl font-bold text-[#020D46] mb-3">
                        Student Registration
                    </h1>
                </div>
                <form className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit, onError)} method="post">
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
                                            name="full_name"
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
                                            name="mother_name"
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
                                            name="whatsapp_no"
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
                                            name="alternate_no"
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
                                            name="dob"
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

                                                <label htmlFor="gender" className="m-2">
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
                                                <label htmlFor="gender" className="m-2">
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
                            <div className="flex flex-1 w-full px-6">
                                <div className="Addresss w-full">
                                    <label className="block flex flex-col">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Address
                                        </span>
                                        <textarea name="address" className={`mt-1 rounded-md px-3 py-2 outline-none border  border-slate-300 text-sm shadow-sm placeholder-slate-400 ${errors.address && 'border-red-600'}`} {...register("address", { required: "Address is required" })} placeholder="Enter Address" id="" cols="71" rows="2"></textarea>
                                        {/* <input
                                            type="text"
                                            
                                            className={`w-full hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.address && 'border-red-600'}`}
                                            
                                        /> */}
                                        {errors.address && (<small className="mt-1 text-red-700">{errors.address.message}</small>)}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="right flex flex-col justify-center items-center gap-5">
                            <div className="flex lg:flex-row md:flex-col gap-6 2xl:gap-9">
                                <div className="selectstd">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Class
                                        </span>
                                        <select
                                            name="class"
                                            id=""
                                            className={` xl:w-32 2xl:w-36 hover:cursor-pointer mt-1 block  px-3 py-[6px] bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.class && 'border-red-600'}`}
                                            {...register("class", { required: "Class required" })}
                                            onChange={handleClassChange}
                                        >
                                            <option value="">Select</option>
                                            {
                                                classes.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item._id}>{item.class_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </label>
                                    {errors.class && (<small className="text-red-700">{errors.class.message}</small>)}
                                </div>
                                <div className="selectstream">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Stream
                                        </span>
                                        <input
                                            type="text" 
                                            name=""
                                            id=""
                                            placeholder="--"
                                            value={stream}
                                            className={`xl:w-32 2xl:w-36 mt-1 block px-3 py-[6px] bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none `}
                                            {...register("stream")}
                                        />
                                    </label>
                                </div>
                                <div className="selectmedium">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Medium
                                        </span>
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="--"
                                            value={medium}
                                            className={`xl:w-32 2xl:w-36 mt-1 block  px-3 py-[6px] bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
                                            {...register("medium")}
                                        />
                                            
                                    </label>
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
                                            name="admission_date"
                                            className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.admissiondate && 'border-red-600'}`}
                                            {...register("admissiondate", { required: "Admission date is required" })}
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
                                            name="total_fees"
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
                                            name="email"
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
                                            Discount
                                        </span>
                                        <input
                                            type="text" id='discount'
                                            name="discount"
                                            placeholder="Enter Your Discount"
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.discount && 'border-red-600'}`}
                                            {...register("discount", { required: false, pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" } })}
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
                                            name="reference"
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
                                            type="text"
                                            name="net_fees"
                                            value={netFees}
                                            className={`wxl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
                                            {...register("net_fees")}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex lg:flex-row md:flex-col gap-4">
                                <div className="schoolname">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            School Name

                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Enter Your School Name"
                                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.note && 'border-red-600'}`}
                                            {...register("school", { pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                            onKeyUp={() => {
                                                trigger('school')
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
                                            name="note"
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
                            <div className="flex w-full justify-end pr-7 h-20">
                                <button type="clear" className="mt-9 px-8 mr-4 text-darkblue-500 border-darkblue-500 hover:bg-darkblue border-2 hover:bg-darkblue-500 text-white hover:text-white font-medium rounded-md tracking-wider flex justify-center items-center" onClick={handleClick}>
                                    CLEAR
                                </button>
                                <button type="submit" className="mt-9 px-8 bg-darkblue-500  hover:bg-white border-2 border-darkblue-500 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center">
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
