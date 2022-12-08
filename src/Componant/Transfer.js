import React, { useEffect, useState } from 'react'
import { FaHandPointDown } from 'react-icons/fa';
import { FaHandPointUp } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { FiSend } from "react-icons/fi"
import { FaArrowLeft } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";
import Swal from 'sweetalert2';
import Confomodel from "../Componant/Confomodel"
import { useLocation, useNavigate } from "react-router-dom";
import { getActiveClasses, transferStudent } from "../hooks/usePost";
import Toaster from '../hooks/showToaster';
import SweetAlert from '../hooks/sweetAlert';
import { IoIosArrowBack } from 'react-icons/io';

import {AxiosError} from 'axios';


function Send() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't Transfer Student ??",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Transfer it!'
    })
}
function Remove() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}
function Addall() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't add all Student!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Added All!',
                'Your file has been Add.',
                'success'
            )
        }
    })
}


const Transfer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [studentsData,setStudentsData] = React.useState([]);
    
    let Eligible = [], NotEligible = []
    const [studentsEligibleData,setStudentsEligibleData] = React.useState([]);
    const [studentsNotEligibleData,setStudentsNotEligibleData] = React.useState([]);
   
    const [classSelectionModel, setClassSelectionModel] = useState(false);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [classNotSelectedError, setClassNotSelectedError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTransfer = (e)=>{
        if(selectedClass == ''){
            return setClassNotSelectedError(true)
        }

        SweetAlert('Are you sure to transfer?', 'Students will be transfered to selected class')
        .then(async (res)=>{
            if(res.isConfirmed){
                try{ 
                    let student_ids = []
                    studentsEligibleData.forEach((student)=>{
                        student_ids.push(student.student_id.student_id)
                    })

                    const data = {
                        student_ids,
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

    useEffect(() => {
        setStudentsData(() => location.state.classStudents.filter((student)=>{
            return student.is_transferred != 1
        }))
        studentsData?.map((item)=>{
            if(item.fees_id.pending_amount == 0){
                Eligible.push(item)
            }else{
                NotEligible.push(item)
            }
        })

        setStudentsEligibleData(Eligible)
        setStudentsNotEligibleData(NotEligible)
        
        const loadClassesData = async ()=>{
            //Loading classes
            const activeClasses = await getActiveClasses()
            setClasses(activeClasses.data.data);
        }
        loadClassesData()
    }, [])


    // classesData.map((item,index)=>{
    //     return {...item,is_selected:true}
    // })


    const handleSendToEligibleTable = (id,index)=>{
        let getData = studentsNotEligibleData.find(item => item._id === id)
        setStudentsEligibleData(arr=> [...arr,getData])
        setStudentsNotEligibleData([...studentsNotEligibleData.slice(0,index),...studentsNotEligibleData.slice(index + 1,studentsNotEligibleData.length)])
    }

    const handleSendToNotEligibleTable = (id,index)=>{
        let getData = studentsEligibleData.find(item => item._id === id)
        setStudentsNotEligibleData(arr=> [...arr,getData])
        setStudentsEligibleData([...studentsEligibleData.slice(0,index),...studentsEligibleData.slice(index + 1,studentsEligibleData.length)])
    }


    return (
        <div className='relative' >
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

            <div className={`bg-slate-100 ${classSelectionModel ? "opacity-20" :  "opacity-100"}`}>
                <div className="wrapper flex justify-end py-5 pr-10">
                    <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
                        <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                        <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                    </div>
                </div>
                <section className='table h-full w-full  shadow-none'>

                    <div className='flex justify-center items-center p-10 pt-0'>

                        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 pt-5 shadow-xl space-y-5 w-full">
                            <div className='flex justify-between items-center'>
                                <h1 className='pl-5 text-xl text-red-600 font-bold'>
                                    Not Eligible For Transfer
                                </h1>
                            </div>

                            <table className="w-full text-sm text-center overflow-hidden  rounded-xl  ">
                                <thead className="text-xs text-gray-700 bg-red-500 uppercase">
                                    <tr className='text-white text-base'>
                                        <th scope="col" className="w-20 h-20">Roll No</th>
                                        <th scope="col" className="w-20 h-20">Name</th>
                                        <th scope="col" className="w-20 h-20">Class</th>
                                        <th scope="col" className="w-20 h-20">Phone</th>
                                        <th scope="col" className="w-20 h-20">Total</th>
                                        <th scope="col" className="w-20 h-20">Paidup</th>
                                        <th scope="col" className="w-20 h-20">Pending</th>
                                        <th scope="col" className="w-20 h-20">Action</th>
                                    </tr>
                                </thead>
                                <tbody className=' border items-center '>
                                {
                                    studentsNotEligibleData.map((item,index)=>{
                                        return(

                                    <tr className="border-b bg-white cursor-pointer" key={index}>

                                        <td scope="row" className="w-20 h-20">
                                            <div className='flex justify-center items-center space-x-2'>

                                                <div>
                                                    <p className='text-gray-500'>{item.student_id.student_id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-20 h-20 capitalize">{item.student_id.basic_info_id.full_name}</td>
                                        <td className="w-20 h-20">{item.class_id.class_name}</td>
                                        <td className="w-20 h-20">{item.student_id.contact_info_id.whatsapp_no}</td>
                                        <td className="w-20 h-20">{item.fees_id.net_fees}</td>
                                        <td className="w-20 h-20">{item.fees_id.net_fees - item.fees_id.pending_amount}</td>
                                        <td className="w-20 h-20">{item.fees_id.pending_amount}</td>
                                        <td className="w-20 h-20 ">
                                            <div className='flex justify-center space-x-2'>
                                                <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id.student_id}`}>
                                                    <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                        <AiFillEye className="text-xl text-darkblue-500" />
                                                    </Tooltip>
                                                </NavLink>
                                                <Tooltip content="Sent To Eligible Table" placement="bottom-end" className='text-white bg-black rounded p-2'><div href="#" className="text-xl text-darkblue-500 cursor-pointer" onClick={()=> {handleSendToEligibleTable(item._id,index)}}><FaHandPointDown /></div></Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-10 pt-0 '>
                        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 pt-5 shadow-2xl space-y-5 w-full">
                            <h1 className='pl-5 text-xl text-green-600 font-bold'>
                                Eliglible for Transfer
                            </h1>

                            <table className="w-full text-sm text-center overflow-hidden rounded-xl ">
                                <thead className="text-xs text-gray-700 bg-green-500 uppercase">
                                    <tr className='text-white text-base'>
                                        <th scope="col" className="w-20 h-20">Roll No</th>
                                        <th scope="col" className="w-20 h-20">Name</th>
                                        <th scope="col" className="w-20 h-20">Class</th>
                                        <th scope="col" className="w-20 h-20">Phone</th>
                                        <th scope="col" className="w-20 h-20">Total</th>
                                        <th scope="col" className="w-20 h-20">Paidup</th>
                                        <th scope="col" className="w-20 h-20">Pending</th>
                                        <th scope="col" className="w-20 h-20">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white border items-center '>
                                {
                                    studentsEligibleData.map((item,index)=>{
                                        return(

                                    <tr className="border-b" key={index}>
                                        <th scope="row" className="w-20 h-20">
                                            <div className='flex justify-center items-center space-x-2'>

                                                <div>
                                                    <p className='text-gray-500'>{item.student_id.student_id}</p>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="w-20 h-20 capitalize">{item.student_id.basic_info_id.full_name}</td>
                                        <td className="w-20 h-20">{item.class_id.class_name}</td>
                                        <td className="w-20 h-20">{item.student_id.contact_info_id.whatsapp_no}</td>
                                        <td className="w-20 h-20">{item.fees_id.net_fees}</td>
                                        <td className="w-20 h-20">{item.fees_id.net_fees - item.fees_id.pending_amount}</td>
                                        <td className="w-20 h-20">{item.fees_id.pending_amount}</td>
                                        <td className="w-20 h-20 ">
                                            <div className='flex justify-center space-x-2'>
                                                <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id.student_id}`}>
                                                    <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                        <AiFillEye className="text-xl text-darkblue-500" />
                                                    </Tooltip>
                                                </NavLink>
                                                <Tooltip content="Sent To Not Eligible Table" placement="bottom-end" className='text-white bg-black rounded p-2'><div href="#" className="text-xl text-darkblue-500 cursor-pointer" onClick={()=>{handleSendToNotEligibleTable(item._id,index)}}><FaHandPointUp /></div></Tooltip>
                                            </div>
                                        </td>
                                    </tr>

                                    )
                                    })
                                }
                                </tbody>
                            </table>


                            <div className="button flex justify-end ">

                                <div id='transfer-btn' className='flex items-center bg-green-500 hover:bg-green-700 w-28 h-10 justify-center rounded-lg cursor-pointer space-x-2' onClick={(e) => setClassSelectionModel(true)} >
                                    <div className=''>
                                        <FiSend className=' ml-1  text-white text-2xl  ' />
                                    </div>
                                    <p className='text-white text-lg'>Transfer</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>


        </div>
    )
}

export default Transfer
