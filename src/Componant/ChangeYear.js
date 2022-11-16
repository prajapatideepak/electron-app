import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import { MdLocalPrintshop } from 'react-icons/md';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5"
import { Tooltip } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import { FaArrowLeft } from "react-icons/fa"
import { transferClasses } from "../hooks/usePost";
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';



function Remove() {
  Swal.fire({
    title: "Are you sure to start new year ?",
    text: "After starting new year, your current classes will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Start New Year",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("New Year Started!", "", "success");
    }
  });
}

const ChangeYear = () => {
    const location = useLocation();
    const [classesData,setClassesData] = React.useState(location.state.classes);
    const [classesNewData,setClassesNewData] = React.useState([]);
    
    const notify = () => toast.success("Class transfer successfully");
    const [call, setCall] = React.useState(false)

    classesData.map((item,index)=>{
        return {...item,is_selected:true, is_disabled:true}
    })

    useEffect(()=>{
        setClassesNewData(classesData.map((item,index)=>{
            return {...item,is_selected:true, is_disabled:true}
         })
        )
    },[])

    const editTable = (e, index) => {

        setClassesNewData(
            classesNewData.map((item, idx)=>{
            return {
                ...item,
                is_disabled : idx == index ? !item.is_disabled : item.is_disabled
            }
         })
        )
    }

    const navigate = useNavigate();

    const handleClassSelect = (e,index) =>{
        classesNewData[index].is_selected = e.target.checked;    
    }

    function handleMyclassName(target, index) {
        classesNewData[index].class_name = target;
    }

    function handleMedium(target, index) {
        classesNewData[index].medium = target;
    }

    function handleSection(target, index) {
        classesNewData[index].section = target;
    }

    function handleStream(target, index) {
        classesNewData[index].stream = target;
    }

    function handleFees(target, index) {
        classesNewData[index].fees = target;
    }

    const onSubmit = async () => {
        const res = await classesNewData.filter((data)=>{
            return data.is_selected == true  
        })

        const response = transferClasses(res);    
        if(response){
          setCall(()=>!call)
          Remove()
          return notify()
        } 
    }  

    return (
        <>
            <section className='table h-full w-full  shadow-none'>
                <div className=' justify-center items-center mt-2 p-10  pt-0'>
                    <div className="title py-6 flex justify-between items-center">
                        <h1 className="text-3xl text-center font-medium text-[#020D46] mb-3">
                            Transfer Classes
                        </h1>

                        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
                            <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                            <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                        </div>

                    </div>
                    <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">

                        <table className="w-full text-sm text-center bg-class3-50 rounded-xl  ">
                            <thead className="text-xs text-gray-700 uppercase">
                                <tr className='text-white text-base'>
                                    <th scope="col" className="w-20 h-20">Select</th>
                                    <th scope="col" className="w-20 h-20">Class</th>
                                    <th scope="col" className="w-20 h-20">Batch</th>
                                    <th scope="col" className="w-20 h-20">Medium</th>
                                    <th scope="col" className="w-20 h-20">Section</th>
                                    <th scope="col" className="w-20 h-20">Stream</th>
                                    <th scope="col" className="w-20 h-20">Fees</th>
                                    <th scope="col" className="w-20 h-20">Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white border items-center '>
                            {
                                classesNewData.map((item,index)=>{
                                    return(
                                        
                                <tr className=" border-b" key={index}>
                                    <td>
                                        <input type="checkbox" defaultChecked={item.is_selected} 
                                        onClick={(e)=>{handleClassSelect(e,index)}} defaultValue={item._id}
                                        className=' rounded-md w-16 h-5 text-center bg-white'/>     
                                    </td>
                                    <td scope="row" className="w-20 h-20"> 
                                        <input type="text" disabled={item.is_disabled}
                                        onChange={(e) => handleMyclassName(e.target.value, index) }
                                        className='rounded-md w-16 h-7 text-center bg-white' defaultValue={item.class_name}  
                                        style={{border: item.is_disabled?false:'2px solid #f8b26a'}}/>  
                                     </td>
                                    <td className="w-28 h-20 space-x-4">
                                        <input type="text" disabled={true}
                                        className=' rounded-md w-16 h-7 text-center bg-white' defaultValue={item.batch_start_year+1} />
                                        
                                        <input type="text" disabled={true} 
                                        className=' rounded-md w-16 h-7 text-center bg-white' defaultValue={item.batch_end_year+1} />
                                    </td>
                                    <td className="w-20 h-20">
                                        <select name="" disabled={item.is_disabled} 
                                        onChange={(e)=> handleMedium(e.target.value, index)} className=' rounded-md w-20 h-7 text-center'
                                        defaultValue={item.medium} 
                                        style={{border: item.is_disabled?false:'2px solid #f8b26a'}}>
                                        
                                            <option value="english"  defaultValue={item.medium == "english" ? true:false}>English</option>
                                            <option value="gujarati" defaultValue={item.medium == "gujarati" ? true:false}>Gujarati</option>
                                            <option value="hindi" defaultValue={item.medium == "hindi" ? true:false}>Hindi</option>
                                        
                                        </select>
                                    </td>
                                    <td className="w-20 h-20">
                                        <select name="" disabled={item.is_disabled} 
                                        className=' rounded-md w-20 h-7 text-center' defaultValue={item.section} 
                                        onChange={(e)=>{ handleSection(e.target.value, index)}} 
                                        style={{border: item.is_disabled?false:'2px solid #f8b26a'}}>
                                        
                                            <option value={0} defaultValue={item.is_primary == 0 ? true:false}>Primary</option>
                                            <option value={1} defaultValue={item.is_primary == 1 ? true:false}>Secondary</option>
                                        
                                        </select>
                                    </td>
                                    <td className="w-20 h-20">
                                        <select name="" disabled={item.is_disabled} 
                                        className=' rounded-md w-24 h-7 text-center'  defaultValue={item.stream} 
                                        onChange={(e)=>{ handleStream(e.target.value, index)}} 
                                        style={{border: item.is_disabled?false:'2px solid #f8b26a'}}>
                                         
                                            <option value="none" defaultValue={item.stream == "none" ? true:false}>None</option>
                                            <option value="commerce" defaultValue={item.stream == "commerce" ? true:false}>Commerce</option>
                                            <option value="science" defaultValue={item.stream == "science" ? true:false}>Science</option>
                                            <option value="arts" defaultValue={item.stream == "arts" ? true:false}>Arts</option>
                                        
                                        </select>
                                    </td>
                                    <td className="w-20 h-20">
                                        <input type="text" disabled={item.is_disabled} 
                                        className=' rounded-md w-16 h-7 text-center bg-white' 
                                        defaultValue={item.fees} 
                                        onChange={(e)=>{handleFees(e.target.value, index)}} 
                                        style={{border: item.is_disabled?false:'2px solid #f8b26a'}}/>
                                    </td>
                                    <td className="w-20 h-20 ">
                                        <div className='flex justify-center space-x-2'>

                                            {item.is_disabled ?
                                                    <button  value={index} onClick={(e)=>editTable(e,index)} >
                                                        Edit
                                                    </button>
                                                    :
                                                    <button  value={index} onClick={(e)=>editTable(e, index)} >
                                                        Save
                                                    </button>
                                            }
                                            {/* <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                {isEditable ?
                                                    <button  value={index} onClick={editTable} >
                                                        <MdModeEditOutline id='edit-class' className='text-xl cursor-pointer hover:text-class3-50 text-darkblue-500' />
                                                    </button>
                                                    :
                                                    <IoCheckmarkDoneCircleSharp id='edit-class' value={index} onClick={editTable} className='text-xl cursor-pointer hover:text-class3-50 text-green-500' />
                                                }
                                            </Tooltip> */}

                                        </div>
                                    </td>
                                </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <div className="button flex justify-end items-center space-x-4">

                            <div onClick={onSubmit} id='transfer-btn' className='flex items-center hover:bg-class3-50 bg-orange-400 w-28 h-10 justify-center rounded-lg cursor-pointer space-x-2' >
                                <div className=''>
                                </div>
                                <p className='text-white text-lg'>SUBMIT</p>
                            </div>
                        </div>
                        {/* Pagination */}
                    </div>
                </div>
            </section>


        </>
    )
}

export default ChangeYear
