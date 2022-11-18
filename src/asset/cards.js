import React, { useRef, useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { Alloverstudent } from "../hooks/usePost";
import { toast } from "react-toastify";
import Loader from '../Componant/Loader';

export default function Cards() {

    const [isloading, setloading] = React.useState(true)


    // ---------------------------------------------------------------
    // --------------------    API Works    --------------------------
    // ---------------------------------------------------------------

    const [data, setData] = useState([]);
    const [Pending, setpending] = useState([]);
    const [Paidup, setpaidup] = useState([]);
    const Toaster = () => { toast.success('New Staff Register successfully') }
    const errtoast = () => { toast.error("Something Wrong") }

    useEffect(() => {
        async function fetchfacultdata() {
            const res = await Alloverstudent();
            setData(() => res.data.length)
            setpending(() => res.data)
            setloading(false);
        }
        fetchfacultdata()
    }, [])
    // console.log(Pending[0].academics[0].fees[0].pending_amount,"pending")
    // ------------------------------
    // ------ Pending_Student -------
    // ------------------------------
    let calculatepending = 0;
    for (let i = 0; i < Pending.length; i++) {
        calculatepending += Pending[i].academics[0].fees[0].pending_amount > 0
    }

    return (
        <div className="w-2/3  ">
            <div className="right pt-4 p-5 px-20 xl:px-0 xl:flex xl:mr-10 xl:mt-0 xl:space-x-10 space-y-10 xl:space-y-0 justify-start items-center text-center">
                <div id='Student-cards' className=' flex items-center justify-start px-5 p-2 cursor-pointer  xl:w-1/2 rounded-lg xl:py-5 bg-class4-50  '>
                    <div className='flex ml-1'>
                        <div className="bg-white rounded-md  flex justify-center items-center p-5">

                            <AiOutlineUser className=' text-class4-50 text-4xl ' />
                        </div>
                    </div>
                    <div className="ml-10">
                        <p className='text-white text-5xl mb-3 text-center '>{data ? data : 0}</p>
                        <h1 className='text-white  text-lg'>Total <span>Students</span></h1>

                    </div>
                </div>
                <div id='Student-cards' className=' flex items-center p-2 cursor-pointer xl:w-1/2 rounded-lg xl:py-5 px-5 bg-class1-50  '>
                    <div className='flex ml-1'>
                        <div className="bg-white rounded-md p-5 flex justify-center items-center">

                            <MdPendingActions className=' text-class1-50 text-4xl ' />
                        </div>
                    </div>
                    <div className="ml-10">
                        <p className='text-white text-5xl mb-3'>{calculatepending ? calculatepending : 0}</p>

                        <h1 className='text-white text-lg '>Total <span>Pending</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
}