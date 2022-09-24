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



const studentData = [{ profile: "shad" },
{ class: "12" },
{ id: "12" },
{ phone: "1234567890" },
{ total: "12000" },
{ paidup: "2500" },
{ pending: "10500" }]





const Transfer = () => {

    const [model1, Classselection] = React.useState(false);
    const [model2, Warning ] = React.useState(false);
    const [model3, Seccess] = React.useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(studentData)
    }, [])

    const handleChange = (e) => {
        const { id, checked } = e.target;
        if (id === "allselect") {
            let tempUser = users.map(users => { return { ...users, isChecked: checked } })
            setUsers(tempUser)
        } else {

            let tempUser = users.map(users => users.id === id ? { ...users, isChecked: checked } : users
            );
            setUsers(tempUser)
        }
    }

    // warning model for classselection
    function warning(){
        Classselection (false)
        Warning (true)
        Seccess (false)
    }
    // warning-cancel model for classselection
    function warning_cansel(){
        Classselection (true)
        Warning (false)
        Seccess (false)
    }
    // warning-select model for classselection
    function warning_true(){
        Classselection (false)
        Warning (false)
        Seccess (true)
    }
    // Success Modela for Classselection
    function allremove() {
        Classselection (false)
        Warning (false)
        Seccess (false)
    }
    return (
        <div className='relative' >
            {/* model for class selection */}
            {model1 && (
                <div className='absolute w-full h-full  z-30 ' >
                    <div className='flex justify-center shadow-2xl opacity-100 '>
                        <div className='absolute h-1/3 mx-auto  opacity-100 shadow-2xl rounded mt-32 bg-white w-1/3 z-50'>
                            <div className=''>
                                <div className='flex justify-end '>
                                    <button onClick={(e) => Classselection(!model1)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                                        <AiFillCloseCircle />
                                    </button>

                                </div>
                                <div className='mt-7'>
                                    <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Class Selection</h1>
                                </div>
                                <div className="select-clas flex justify-center items-center mt-10">
                                    <select name="class" id="" className='border px-2 py-1 rounded-md drop-shadow-md w-8/12 '>
                                        <option value="none">Select</option>
                                        <option value="none">1-English-2022/23</option>
                                    </select>
                                </div>
                                <div className="submit flex justify-center mt-10" >
                                    <button className='bg-darkblue-500 text-white px-5 py-1 rounded-md' onClick={warning} >
                                        SUBMIT
                                    </button>
                                </div>





                            </div>
                        </div>
                    </div>
                </div>


            )}

                
            {/* model for conformation */}
            {model2 && (
                <div className='absolute w-full h-full   ' >
                    <div className='flex justify-center shadow-2xl opacity-100 '>
                        <div className='absolute h-1/2 mx-auto  opacity-100 shadow-2xl rounded mt-32 bg-white w-1/2 z-50'>
                            <div className=''>
                              
                                <div className="alert flex justify-center mt-8 text-9xl">

                                    <FiAlertCircle className='text-orange-200' />
                                </div>
                                <div className='text-center'>
                                    <p className='text-4xl  py-5 font-bold'>Are You Sure?</p>
                                    <p className='pt-2'>You Wont to transefr Class in selected year ??</p>
                                </div>
                                <div className="btn flex justify-center py-8 space-x-3">
                                    <button className='bg-blue-500  px-4 py-3 text-white rounded-md' onClick={warning_true}>
                                        Yes, Transefr it!
                                    </button>
                                    <button className='bg-[#FF0000] px-5 py-3 text-white rounded-md' onClick={warning_cansel}>
                                        Cancel
                                    </button>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
                

            )}

            {/* model for afetr comformation */}
            {model3 && (
                <div className='absolute w-full h-full   ' >
                    <div className='flex justify-center shadow-2xl opacity-100 '>
                        <div className='absolute h-1/2 mx-auto  opacity-100 shadow-2xl rounded mt-32 bg-white w-1/2 z-50'>
                            <div className=''>

                                <div className="alert flex justify-center mt-8 text-9xl text-green-400 ">
                                <BsCheck2All className='border-2  px-1 rounded-full py-4 border-green-400'/>

                                </div>
                                <div className='text-center'>
                                    <p className='text-4xl  py-5 font-bold'>Success!!</p>
                                    <p className='pt-2'>Your student has been transfered</p>
                                </div>
                                <div className="btn flex justify-center py-8 space-x-3">
                                    <button className='bg-blue-500  px-5 py-3 text-white rounded-md' onClick={allremove}>
                                        OK
                                    </button>

                                </div>




                            </div>
                        </div>
                    </div>
                </div>


            )}

            <div className={`bg-slate-100 ${model1 ? "opacity-20" :  model2 || model3 ?  "opacity-20" : ""}`}>
                <div className="wrapper py-5 pl-5">
                    <NavLink className="nav-link" to="class">

                        <div className="btn cursor-pointer  h-10 w-24 rounded-lg bg-white text-left border  overflow-hidden " id="btn">
                            <div className="icons  h-10 w-40 flex ml-2 items-center " id="icons">
                                <FaArrowLeft className="text-2xl text-darkblue-500  " />
                                <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
                            </div>
                        </div>
                    </NavLink>
                </div>
                <section className='table h-full w-full  shadow-none'>

                    <div className='flex justify-center items-center p-10 pt-0'>

                        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 pt-5 shadow-xl space-y-5 w-full">
                            <div className='flex justify-between items-center'>
                                <h1 className='pl-5 text-xl text-red-600 font-bold'>
                                    Not Eligible For Transfer
                                </h1>

                            </div>

                            <table className="w-full text-sm text-center bg-red-500 rounded-xl  ">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                                    <tr className='text-white text-base'>

                                        <th scope="col" className="w-20 h-20">Profile</th>
                                        <th scope="col" className="w-20 h-20">Class</th>
                                        <th scope="col" className="w-20 h-20">Phone</th>
                                        <th scope="col" className="w-20 h-20">Total</th>
                                        <th scope="col" className="w-20 h-20">Paidup</th>
                                        <th scope="col" className="w-20 h-20">Pending</th>
                                        <th scope="col" className="w-20 h-20">Action</th>
                                    </tr>
                                </thead>
                                <tbody className=' border items-center '>

                                    <tr className=" border-b bg-white cursor-pointer">

                                        <td scope="row" className="w-20 h-20">
                                            <div className='flex justify-center items-center space-x-2'>

                                                <img className='h-14 w-14 rounded-full' src="/images/user.png" alt="profile" />
                                                <div>
                                                    <p className='text-darkblue-500'>{users.id}</p>
                                                    <p className='text-gray-500'>01</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-20 h-20">12</td>
                                        <td className="w-20 h-20">1234567891</td>
                                        <td className="w-20 h-20">20000</td>
                                        <td className="w-20 h-20">10000</td>
                                        <td className="w-20 h-20">10000</td>
                                        <td className="w-20 h-20 ">
                                            <div className='flex justify-center space-x-2'>
                                                <NavLink className="nav-link" to="Profilestudent">

                                                    <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'><div className="text-xl text-darkblue-500 cursor-pointer" ><AiFillEye /></div></Tooltip>
                                                </NavLink>
                                                <Tooltip content="Sent To Eligible Table" placement="bottom-end" className='text-white bg-black rounded p-2'><div href="#" className="text-xl text-darkblue-500 cursor-pointer" onClick={Remove}><FaHandPointDown /></div></Tooltip>


                                            </div>
                                        </td>
                                    </tr>



                                </tbody>
                            </table>








                        </div>
                    </div>
                    <div className='flex justify-center items-center p-10 pt-0 '>
                        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 pt-5 shadow-2xl space-y-5 w-full">
                            <h1 className='pl-5 text-xl text-green-600 font-bold'>
                                Eliglible for Transfer
                            </h1>

                            <table className="w-full text-sm text-center bg-green-500 rounded-xl ">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                                    <tr className='text-white text-base'>
                                        <th scope="col" className="w-20 h-20">Profile</th>
                                        <th scope="col" className="w-20 h-20">Class</th>
                                        <th scope="col" className="w-20 h-20">Phone</th>
                                        <th scope="col" className="w-20 h-20">Total</th>
                                        <th scope="col" className="w-20 h-20">Paidup</th>
                                        <th scope="col" className="w-20 h-20">Pending</th>
                                        <th scope="col" className="w-20 h-20">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white border items-center '>
                                    <tr className=" border-b">
                                        <th scope="row" className="w-20 h-20">
                                            <div className='flex justify-center items-center space-x-2'>

                                                <img className='h-14 w-14 rounded-full' src="/images/user.png" alt="profile" />
                                                <div>
                                                    <p className='text-darkblue-500'>Deepak</p>
                                                    <p className='text-gray-500'>01</p>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="w-20 h-20">12</td>
                                        <td className="w-20 h-20">1234567891</td>
                                        <td className="w-20 h-20">20000</td>
                                        <td className="w-20 h-20">10000</td>
                                        <td className="w-20 h-20">10000</td>
                                        <td className="w-20 h-20 ">
                                            <div className='flex justify-center space-x-2'>
                                                <NavLink className="nav-link" to="Profilestudent">

                                                    <Tooltip content="Show Details" placement="bottom-end" className='text-white bg-black rounded p-2'><div className="text-xl text-darkblue-500 cursor-pointer" ><AiFillEye /></div></Tooltip>
                                                </NavLink>
                                                <Tooltip content="Sent To Not Eligible Table" placement="bottom-end" className='text-white bg-black rounded p-2'><div href="#" className="text-xl text-darkblue-500 cursor-pointer" onClick={Remove}><FaHandPointUp /></div></Tooltip>


                                            </div>
                                        </td>
                                    </tr>



                                </tbody>
                            </table>


                            <div className="button flex justify-end ">

                                <div id='transfer-btn' className='flex items-center bg-green-500 hover:bg-green-700 w-28 h-10 justify-center rounded-lg cursor-pointer space-x-2' onClick={(e) => Classselection(true)} >
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
