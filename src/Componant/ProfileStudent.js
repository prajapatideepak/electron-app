import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { AiFillEye } from 'react-icons/ai';
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserEdit } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { getStudentDetails, studentAllAcademicDetails, updateStudent, getActiveClasses, transferStudent } from '../hooks/usePost';
import Toaster from '../hooks/showToaster';
import SweetAlert from '../hooks/sweetAlert';
import Loader from './Loader';
import { AiFillCloseCircle } from "react-icons/ai";
import {AxiosError} from 'axios';
import Validator from '../hooks/validator';

const valid = new Validator();
valid.register({
    photo: {
        required: [false],
    },
    full_name: {
        required: [true, 'Field is required'],
        pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
    },
    mother_name: {
        required: [true, 'Field is required'],
        pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
    },
    dob: {
        required: [true, 'Field is required']
    },
    whatsapp_no: {
        required: [true, 'Field is required'],
        pattern: [/^[0-9]*$/, "Please enter only numbers"]
    },
    alternate_no: {
        required: [false],
        pattern: [/^[0-9]*$/, "Please enter only numbers"]
    },
    gender: {
        required: [false]
    },
    address: {
        required: [true, 'Address is required']
    },
    admission_date: {
        required: [true, 'Field is required']
    },
    total_fees: {
        required: [true, 'Field is required'],
        pattern: [/^[0-9]*$/, "Please enter only numbers"]
    },
    discount: {
        required: [false],
        pattern: [/^[0-9]*$/, "Please enter only numbers"]
    },
    email: {
        required: [false],
        pattern: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter valid email"]
    },
    reference: {
        required: [false],
        pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
    },
    school_name: {
        required: [false],
        pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
    },
    note: {
        required: [false],
        pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
    }
})

const Profilestudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const form = useRef(null);
    const server = "http://localhost:4000/";
    const defaultImage = "http://localhost:4000/user_default@123.png";

    const [state, setState] = React.useState(true);
    const [img, setImg] = useState(defaultImage); 
    const [isLoadingDetails, setIsLoadingDetails] = useState(true); //used in fetching details and on update details
    const [isProcessing, setIsProcessing] = useState(false); //used in fetching details and on update details
    const [studentInputController, setStudentInputController] = useState({
        photo: '',
        full_name: '',
        mother_name: '',
        dob: '',
        whatsapp_no: '',
        alternate_no: '',
        gender: '',
        address: '',
        class_name: '',
        medium: '',
        stream: '',
        admission_date: '',
        total_fees: 0,
        net_fees: 0,
        discount: 0,
        email: '',
        reference: '',
        school_name: '',
        note: ''
    })
    
    const [oldStudentDetails, setOldStudentDetails] = useState({});
    const [call, setCall] = useState(false);
    
    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };
    const [isEnable, setIsEnable] = useState(true);
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [academicDetails, setAcademicDetails] = useState([]);
    const [classSelectionModel, setClassSelectionModel] = useState(false);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [classNotSelectedError, setClassNotSelectedError] = useState(false);
    const [studDetails, setStudDetails] = useState({}); //Only used to pass data to next page

    const student_id =86;
    
    let student_details;
    
    const setStudentDetails = () => {
        student_details = student_details.data.data.students_detail[0];
        setStudDetails(student_details);
        let dob = new Date(student_details.personal.basic_info_id.dob);
        dob = `${dob.getFullYear()}-${dob.getMonth() + 1 < 10 ? "0"+(dob.getMonth() + 1) : dob.getMonth() + 1 }-${dob.getDate() < 10 ? "0"+dob.getDate() : dob.getDate() }`

        let admissionDate = new Date(student_details.personal.admission_date);
        admissionDate = `${admissionDate.getFullYear()}-${admissionDate.getMonth() + 1 < 10 ? "0"+(admissionDate.getMonth() + 1) : admissionDate.getMonth() + 1 }-${admissionDate.getDate() < 10 ? "0"+admissionDate.getDate() : admissionDate.getDate() }`

        const alternate_no = student_details.personal.contact_info_id.alternate_no;
        const email = student_details.personal.contact_info_id.email;
        const reference = student_details.personal.reference;
        const note = student_details.personal.note;
        const school_name= student_details.academic.school_name;

        const stud_data = {
            photo: student_details.personal.basic_info_id.photo,
            dob: dob ,
            admission_date: admissionDate ,
            full_name: student_details.personal.basic_info_id.full_name,
            mother_name: student_details.personal.mother_name,
            whatsapp_no: student_details.personal.contact_info_id.whatsapp_no,
            alternate_no: alternate_no == '' ? '--' : alternate_no,
            gender: student_details.personal.basic_info_id.gender,
            address: student_details.personal.contact_info_id.address,
            class_name: student_details.academic.class_id.class_name,
            medium: student_details.academic.class_id.medium,
            stream: student_details.academic.class_id.stream,
            total_fees: (student_details.fees.net_fees + student_details.fees.discount),
            discount: student_details.fees.discount,
            email: email == '' ? '--' : email,
            reference: reference == '' ? '--' : reference,
            note: note == '' ? '--' : note,
            school_name: school_name == '' ? '--' : school_name
        }

        const photo = student_details.personal.basic_info_id.photo;
        setImg(photo != '' ? server+photo : defaultImage)
        setStudentInputController(stud_data)

        setOldStudentDetails(stud_data)

        valid.fieldsValue = {
            full_name : stud_data.full_name ?? stud_data.full_name,
            dob : stud_data.dob ?? stud_data.dob,
            admission_date : stud_data.admission_date ?? stud_data.admission_date,
            mother_name : stud_data.mother_name ?? stud_data.mother_name,
            whatsapp_no : stud_data.whatsapp_no ?? stud_data.whatsapp_no,
            alternate_no : stud_data.alternate_no ?? stud_data.alternate_no,
            gender : stud_data.gender ?? stud_data.gender,
            address : stud_data.address ?? stud_data.address,
            total_fees : stud_data.total_fees ?? stud_data.total_fees,
            discount : stud_data.discount ?? stud_data.discount,
            email : stud_data.email ?? stud_data.email,
            reference : stud_data.reference ?? stud_data.reference,
            note : stud_data.note ?? stud_data.note,
            school_name : stud_data.school_name ?? stud_data.school_name        
        }
    }  
    //Loading initial student details
    useEffect(() => {
        async function studentApi(){
            try{
                student_details = await getStudentDetails(student_id)
                if(!student_details.data.success){
                    Toaster('error', student_details.data.message)
                   return navigate(-1);
                }
                setStudentDetails();  //function call
                setIsLoadingDetails(false);
                
                //Loading classes
                const activeClasses = await getActiveClasses()
                setClasses(activeClasses.data.data.filter((data)=>{ 
                    return data._id != student_details.academic.class_id._id
                }));

                allAcademicFees(); //call to below function

            } catch(err){
                if(err instanceof AxiosError){
                Toaster('error', err.response.data.message);
                }
                else{
                    Toaster('error', err.message);
                }
                return navigate(-1);
            }
        }
        studentApi();


        async function allAcademicFees(){
            try{
                const academic_details = await studentAllAcademicDetails(student_id)
                if(!academic_details.data.success){
                    Toaster('error', academic_details.data.message)
                    navigate(-1);
                }
                setAcademicDetails(academic_details.data.academic_details)
                setIsLoadingDetails(false);
            } catch(err){
                Toaster('error', err.response.data.message);
                return navigate(-1);
            }
        }
    },[call])

    const totalDis = () => {
        const totalFee = document.getElementById("totalfee").value;
        const totalDis = document.getElementById("discount").value;

        let netPay = totalFee - totalDis;

        setStudentInputController((prevData)=>{
            return{
                ...prevData,
                net_fees: netPay
            }
        });
    };

    const onSubmit = async (data) => {
        const netFees = studentInputController.total_fees - studentInputController.discount;

        Object.assign(data,{net_fees: netFees, photo: data.photo, student_id})
        delete data.class_name;
        delete data.total_fees;

        const formdata = new FormData(form.current);
        const http = img.split(':')
        let photo_name = '';
        if(http[0] == 'http'){
            photo_name = img.split("/")[3]
        }
        formdata.append('photo_name', photo_name);
        
        setIsProcessing(true);

        try{
            const result = await updateStudent(student_id, formdata);
            setIsProcessing(false);

            if(result.data.success){
                Toaster('success', result.data.message);
                setShowUpdateButton(false)
                setIsEnable(()=> true);
                setCall(()=> !call);
            }
        }
        catch(error){
            if(error instanceof AxiosError){
                Toaster('error', error.response.data.message);
            }
            else{
                Toaster('error', error.message);
            }

            setIsProcessing(false);
        }
    }


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function handleChange (e) {
        e.preventDefault()

        let name = e.target.name;
        let value = e.target.value;
        
        valid.validate({
            fieldName: name, 
            value: value
        })

        setStudentInputController((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });
    }

    const handleAdmissionCancel = async (e) => {
        e.preventDefault()  
        try{
            navigate(`/cancelAdmission/${student_id}`, {state:{studDetails}})
        }
        catch(error){
            Toaster('error', error.response.data.message);
        }
    }

    const handleTransfer = (e)=>{
        if(selectedClass == ''){
           return setClassNotSelectedError(true)
        }

        SweetAlert('Are you sure to transfer?', 'Student will be transfered to selected  class')
        .then(async (res)=>{
            if(res.isConfirmed){
                try{
                    const data = {
                        student_ids: [student_id],
                        class_id: selectedClass,
                    }
                    setIsProcessing(true)
                    
                    //api call
                    const res = await transferStudent(data)

                    setIsProcessing(false)
                    
                    if(res.data.success){
                        Toaster("success", res.data.message);
                        navigate('/');
                        return;
                    }
                    else{
                        Toaster("error", res.data.message);
                    }
                }
                catch(err){
                    setIsProcessing(false)

                    if(err instanceof AxiosError){
                        Toaster("error",err.response.data.message);
                    }
                    else{
                        Toaster("error", err.message);
                    }
                }
            }
        })
        
    }

    if(isLoadingDetails){
        return <Loader/>
    }

    return (
        <>
            <section className={` p-10 pt-0 ${classSelectionModel ? 'opacity:20' : 'opacity:100'} `}>
                {classSelectionModel && (
                    <div className='absolute w-full h-full z-30'  >
                        <div className='flex justify-center shadow-2xl opacity-100 '>
                            <div className='absolute mx-auto  opacity-100 shadow-2xl rounded mt-32 bg-white w-1/3 z-50'>
                                <div className=''>
                                    <div className='flex justify-end '>
                                        <button onClick={(e) => setClassSelectionModel(!classSelectionModel)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                                            <AiFillCloseCircle />
                                        </button>

                                    </div>
                                    <div className='mt-7'>
                                        <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Class Selection</h1>
                                    </div>
                                    <div className="select-clas flex flex-col justify-center items-center px-10 pt-10">
                                        <select name="class" id="" className='border px-2 py-1 rounded-md drop-shadow-md w-8/12' onChange={(e)=>{setSelectedClass(e.target.value); setClassNotSelectedError(false)}}>
                                            <option value="">Select</option>
                                            {
                                                classes.map((classes, index)=>{
                                                    return(
                                                        <option key={index} value={classes._id}>
                                                            {classes.class_name + ' | ' + classes.medium}
                                                            {
                                                                classes.stream.toLowerCase() != 'none' 
                                                                ?
                                                                    <>{' | ' + classes.stream}</>
                                                                : 
                                                                    null
                                                            }
                                                            
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {
                                            classNotSelectedError 
                                            ?
                                                <small className="text-red-700 mt-5">*Please select class</small>
                                            :
                                                null
                                        }
                                    </div>
                                    <div className="submit flex justify-center mt-10 pb-10" >
                                        <button disabled={isProcessing} className={`${isProcessing ? 'bg-darkblue-300' : 'bg-darkblue-500'} bg-darkblue-500 text-white px-5 py-1 rounded-md`} onClick={handleTransfer} >
                                            SUBMIT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`
                    ${classSelectionModel 
                    ? 
                        'opacity-20 bg-white z-10'  
                    : 
                        'opacity-100'
                    }
                `}>
                    <div className={`title px-5 pt-8 pb-2 flex justify-between xl:px-0 `}>
                        <h1 className="text-3xl  text-[#020D46] mb-3 font-bold">
                            Student Details
                        </h1>
                        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
                            <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                            <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                        </div>
                    </div>
                    <div className={`bg-white overflow-x-auto relative  sm:rounded-lg  shadow-xl space-y-5 w-full`}>
                        {/* <div className="button flex justify-end m-5 pr-20">
                            
                        </div> */}
                        
                        <form ref={form} className="flex justify-center items-center" onSubmit={(e)=> setState(valid.handleSubmit(e, onSubmit))} >
                            <div className="w-11/12 grid grid-cols-2 rounded-lg  truncate bg-white p-10">
                                <div className="left flex flex-col items-center gap-5">
                                    <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                                        <img src={img} name="photo_name" width="100%" height="100%" alt="student profile" />
                                        {
                                            !isEnable
                                            ?
                                                <div className='profile_img_overlay flex flex-col justify-center items-center'>
                                                    <input type='file' id="file" name="photo" className="rounded-md w-16" onChange={onImageChange} accept=".png, .jpg, .jpeg" />
                                                    {
                                                        img != defaultImage
                                                        ?
                                                            <button  
                                                            className='bg-red-600 px-1 rounded text-white hover:bg-red-400 mt-5 flex items-center justify-center gap-3' onClick={()=>{
                                                                setImg(defaultImage);
                                                                document.getElementById('file').value = ''
                                                            }}>
                                                                <span> Remove</span>
                                                            </button>
                                                        :
                                                            null
                                                    }
                                                </div>
                                            :
                                                null
                                        }
                                    </div>
                                    <div className="flex lg:flex-row md:flex-col gap-4 mt-5">
                                        <div className="fullname">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Full Name *
                                                </span>
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    placeholder="First Name, Middle Name, Last Name"
                                                    value={studentInputController.full_name}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.full_name != '' && 'border-red-600'}`}
                                                    onChange={handleChange}
                                                />
                                                {valid.errors?.full_name != '' ? <small className="text-red-600 mt-3">*{valid.errors?.full_name}</small> : null}
                                            </label>
                                        </div>
                                        <div className="mothername">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Mother Name *
                                                </span>
                                                <input
                                                    type="text"
                                                    name="mother_name"
                                                    placeholder="Enter Your Mother Name"
                                                    value={studentInputController.mother_name}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.mother_name != '' && 'border-red-600'}`}
                                                    
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {valid.errors?.mother_name != '' ? <small className="text-red-600 mt-3">*{valid.errors?.mother_name}</small> : null}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row md:flex-col gap-4">
                                        <div className="whatsappno">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    WhatsApp No *
                                                </span>
                                                <input
                                                    type="text"
                                                    name="whatsapp_no"
                                                    placeholder="Enter Your WhatsApp No"
                                                    value={studentInputController.whatsapp_no}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.whatsapp_no != '' && 'border-red-600'}`}
                                                
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {valid.errors?.whatsapp_no != '' ? <small className="text-red-600 mt-3">*{valid.errors?.whatsapp_no}</small> : null}
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
                                                    value={studentInputController.alternate_no != '' || studentInputController.alternate_no != '--' ? studentInputController.alternate_no : '--'}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.alternate_no != '' && 'border-red-600'}`}
                                                    
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {valid.errors?.alternate_no != '' ? <small className="text-red-600 mt-3">*{valid.errors?.alternate_no}</small> : null}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row md:flex-col gap-4">
                                        <div className="dateofbirth">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Date Of Birth *
                                                </span>
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    name="dob"
                                                    disabled={isEnable}
                                                    value={studentInputController.dob}
                                                    className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.dob != '' && 'border-red-600'}`}
                                                    
                                                    onChange={handleChange}                                           />
                                                {valid.errors?.dob != '' ? <small className="text-red-600 mt-3">*{valid.errors?.dob}</small> : null}
                                            </label>
                                        </div>
                                        <div className="gender w-60">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Gender
                                                </span>
                                                <div className={` border border-slate-300 mt-1 rounded-md h-10 flex justify-center items-center space-x-5 ${valid.errors?.gender != '' && 'border-red-600'} `}>
                                                    <div className="male ">

                                                        <label htmlFor="gender" className="m-2">
                                                            Male
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="male"
                                                            name="gender"
                                                            value="male"
                                                            checked={studentInputController?.gender?.toLowerCase() == 'male' ? true : false}
                                                            disabled={isEnable}
                                                            className="  hover:cursor-pointer"
                                                            
                                                            onChange={handleChange}
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
                                                            value="female"
                                                            checked={studentInputController?.gender?.toLowerCase() == 'female' ? true : false}
                                                            disabled={isEnable}
                                                            className="   hover:cursor-pointer"
                                                            
                                                            onChange={handleChange}
                                                        />

                                                    </div>

                                                </div>
                                            </label>
                                            {valid.errors?.gender != '' ? <small className="text-red-600 mt-3">*{valid.errors?.gender}</small> : null}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 w-full px-3">
                                        <div className="Addresss w-full">
                                            <label className="block flex flex-col">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Address *
                                                </span>
                                                <textarea name="address" 
                                                    value={studentInputController.address}
                                                    disabled={isEnable}className={`mt-1 rounded-md px-3 py-2 outline-none border  border-slate-300 text-sm shadow-sm placeholder-slate-400 ${valid.errors?.address != '' && 'border-red-600'}`}  placeholder="Enter Address" id=""
                                                    onChange={handleChange} cols="71" rows="2"></textarea>
                                                {valid.errors?.address != '' ? <small className="text-red-600 mt-3">*{valid.errors?.address}</small> : null}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="right flex flex-col justify-center items-center gap-5">
                                    <div className="flex lg:flex-row md:flex-col gap-4">
                                        <div className="selectstd">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Class *
                                                </span>
                                                <select
                                                    name="class_name"
                                                    disabled={true}
                                                    className={`w-[155px] hover:cursor-pointer mt-1 block w-full px-3 py-[6px] bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
                                                >
                                                    <option value="">{studentInputController.class_name}</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div className="selectstream">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Stream
                                                </span>
                                                <select
                                                    name="stream"
                                                    disabled={true}
                                                    className={`w-[155px] hover:cursor-pointer mt-1 block w-full px-3 py-[6px] bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
                                                >
                                                    <option value="">{studentInputController.stream}</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div className="selectmedium">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Medium
                                                </span>
                                                <select
                                                    name="medium"
                                                    disabled={true}
                                                    className={`w-[155px] hover:cursor-pointer mt-1 block w-full px-3 py-[6px] bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none `}
                                                >
                                                    <option value="">{studentInputController.medium}</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-row md:flex-col gap-4">
                                        <div className="admissiondate">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Admission Date *
                                                </span>
                                                <input
                                                    type="date"
                                                    id="admission_date"
                                                    name="admission_date"
                                                    value={studentInputController.admission_date}
                                                    disabled={isEnable}
                                                    className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.admission_date != '' && 'border-red-600'}`}
                                                    
                                                    onChange={handleChange}
                                                />
                                                {valid.errors?.admission_date != '' ? <small className="text-red-600 mt-3">*{valid.errors?.admission_date}</small> : null}
                                            </label>
                                        </div>
                                        <div className="totalfee">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Total Fee *
                                                </span>
                                                <input
                                                    type="text" id='totalfee'
                                                    name="total_fees"
                                                    placeholder="Enter Your Total Fee"
                                                    disabled={isEnable}
                                                    value={studentInputController.total_fees}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.total_fees != '' && 'border-red-600'}`}
                                                    
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                        totalDis()
                                                    }}
                                                />
                                                {valid.errors?.total_fees != '' ? <small className="text-red-600 mt-3">*{valid.errors?.total_fees}</small> : null}
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
                                                    value={studentInputController.email != '' || studentInputController.email != '--' ? studentInputController.email : "--"}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.email != '' && 'border-red-600'}`}
                                                    
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {valid.errors?.email != '' ? <small className="text-red-600 mt-3">*{valid.errors?.email}</small> : null}
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
                                                    value={studentInputController.discount}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.discount != '' && 'border-red-600'}`}
                                                    
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                        totalDis()
                                                    }}
                                                />
                                                {valid.errors?.discount != '' ? <small className="text-red-600 mt-3">*{valid.errors?.discount}</small> : null}
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
                                                    value={studentInputController.reference != '' || studentInputController.reference != '--' ? studentInputController.reference : "--"}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.reference != '' && 'border-red-600'} `}
                                                    
                                                    onChange={handleChange}
                                                />
                                                {valid.errors?.reference != '' ? <small className="text-red-600 mt-3">*{valid.errors?.reference}</small> : null}
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
                                                    value={studentInputController.net_fees ? studentInputController.net_fees : studentInputController.total_fees - studentInputController.discount}
                                                    placeholder="Enter Your Net Payable"
                                                    disabled={true}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none`}
                                                    onChange={handleChange}
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
                                                    name="school_name"
                                                    placeholder="Enter Your School Name"
                                                    value={studentInputController.school_name != '' || studentInputController.school_name != '--'? studentInputController.school_name : "--"}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.school_name != '' && 'border-red-600'}`}
                                                    
                                                    onChange={handleChange}
                                                />
                                                {valid.errors?.school_name != '' ? <small className="text-red-600 mt-3">*{valid.errors?.school_name}</small> : null}
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
                                                    value={studentInputController.note != '' || studentInputController.note != '--' ? studentInputController.note : "--"}
                                                    disabled={isEnable}
                                                    className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.note != '' && 'border-red-600'}`}
                                                    
                                                    onChange={(e) => {
                                                        handleChange(e)
                                                    }}
                                                />
                                                {valid.errors?.note != '' ? <small className="text-red-600 mt-3">*{valid.errors?.note}</small> : null}
                                            </label>
                                        </div>
                                    </div>
                                    
                                        <div className="flex w-full justify-end pr-2 pt-7">
                                            <button className={`border rounded-md w-24 h-11 bg-darkblue-500 
                                            ${!showUpdateButton? null  : "hidden"}
                                            drop-shadow-lg text-white hover:bg-white 
                                            border-2 hover:border-darkblue-500 hover:text-darkblue-500`} 
                                                onClick={(e)=>{
                                                    e.preventDefault()
                                                    setClassSelectionModel(true); 
                                                }} >
                                                Transfer
                                            </button>
                                            {
                                                studDetails?.personal.is_cancelled == 0
                                                ?
                                                    <>
                                                    <button className={`border rounded-md ml-2 mr-2 w-36 h-11 bg-darkblue-500 ${!showUpdateButton? null  : "hidden"} drop-shadow-lg text-white border-2 hover:bg-white hover:border-darkblue-500 hover:text-darkblue-500`} onClick={handleAdmissionCancel}>
                                                        Cancel Admission
                                                    </button>

                                                    <button type="button" className={`${showUpdateButton? "hidden"  : null} py-2 px-8 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center`} 
                                                    onClick={
                                                        (e)=>{
                                                            e.preventDefault();
                                                            setIsEnable(false); 
                                                            setShowUpdateButton(true);
                                                            setStudentInputController((prevData)=>{
                                                                return { 
                                                                    ...prevData,
                                                                    alternate_no:  studentInputController.alternate_no == '--' ? '' : studentInputController.alternate_no,
                                                                    email: studentInputController.email == '--' ? '' : studentInputController.email,
                                                                    reference: studentInputController.reference == '--' ? '' : studentInputController.reference,
                                                                    school_name: studentInputController.school_name == '--' ? '' : studentInputController.school_name,
                                                                    note: studentInputController.note == '--' ? '' : studentInputController.note
                                                                }
                                                            })
                                                        }
                                                    }>
                                                        <FaUserEdit className="text-xl" />Edit
                                                    </button>

                                                    <button type="button" className={`${showUpdateButton? null  : "hidden"} py-2 px-8 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center`} 
                                                    onClick={
                                                        (e)=>{
                                                            e.preventDefault();
                                                            setIsEnable(true); 
                                                            setShowUpdateButton(false)
                                                            setStudentInputController((prevData)=>{
                                                                return { 
                                                                    ...prevData,
                                                                    alternate_no:  studentInputController.alternate_no == '' ? '--' : studentInputController.alternate_no,
                                                                    email: studentInputController.email == '' ? '--' : studentInputController.email,
                                                                    reference: studentInputController.reference == '' ? '--' : studentInputController.reference,
                                                                    school_name: studentInputController.school_name == '' ? '--' : studentInputController.school_name,
                                                                    note: studentInputController.note == '' ? '--' : studentInputController.note
                                                                }
                                                            })
                                                            setStudentInputController(oldStudentDetails);
                                                        }
                                                    }>
                                                        <FaUserEdit className="text-xl" />Cancel
                                                    </button>

                                                    <button type="submit" disabled={isProcessing} className={`${showUpdateButton? null  : "hidden"} ${isProcessing ? 'bg-darkblue-300' : 'bg-darkblue-500'} py-2 px-8 gap-2  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center`}>
                                                        <FaUserEdit className="text-xl" />{isProcessing ? 'Loading...' : 'Update'}
                                                    </button>
                                                    </>
                                                :
                                                    null
                                            }
                                        </div>
                                        
                                </div>
                            </div>
                        </form>

                        <div className="overflow-x-auto relative  sm:rounded-lg  p-10  space-y-5 w-full">

                            <div className="ml-5 flex items-center text-gray-700">
                                <h3 className="text-2xl font-medium">Fees Details</h3>
                            </div>
                            <div className='p-5 pt-2 pb-0'>
                                <table className="w-full text-sm text-center bg-class3-50 rounded-xl shadow-xl ">
                                    <thead className="text-xs text-gray-700 uppercase">
                                        <tr className='text-white text-base'>
                                            <th scope="col" className="w-20 h-20">Batch</th>
                                            <th scope="col" className="w-20 h-20">Class</th>
                                            <th scope="col" className="w-20 h-20">Net Fees</th>
                                            <th scope="col" className="w-20 h-20">Discount</th>
                                            <th scope="col" className="w-20 h-20">Paidup</th>
                                            <th scope="col" className="w-20 h-20">Pending</th>
                                            <th scope="col" className="w-20 h-20">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white border items-center '>
                                        {
                                            academicDetails && academicDetails[0] 
                                            ?
                                            academicDetails.map((academic, index) => {
                                                return <tr key={index} className=" border-b">
                                                    <td scope="row" className="w-20 h-20">
                                                        {academic.class_id.batch_start_year}-{academic.class_id.batch_end_year}
                                                    </td>
                                                    <td className="w-20 h-20">{academic.class_id.class_name}</td>
                                                    <td className="w-20 h-20">{academic.fees_id.net_fees}</td>
                                                    <td className="w-20 h-20">{academic.fees_id.discount}</td>
                                                    <td className="w-20 h-20">{academic.fees_id.net_fees - academic.fees_id.pending_amount}</td>
                                                    <td className="w-20 h-20">{academic.fees_id.pending_amount}</td>
                                                    <td className="w-20 h-20 ">
                                                        <div className='flex justify-center space-x-2'>
                                                            <NavLink className="nav-link" to= 'Studenthistory' 
                                                                state={{
                                                                    is_cancelled: studDetails?.personal.is_cancelled, 
                                                                    student_id: studDetails?.personal.student_id, full_name:studDetails?.personal.basic_info_id.full_name, academic_id: academic._id
                                                                }}>
                                                                <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><span className="text-xl text-darkblue-500"><AiFillEye /></span></Tooltip>
                                                            </NavLink>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })  
                                            :
                                                null
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profilestudent;