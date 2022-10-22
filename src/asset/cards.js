import React, { useRef, useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { Alloverstudent } from "../Hooks/usePost";
import { toast } from "react-toastify";
import Loader from '../Componant/loader';

export default function Cards() {

    const [isloading, setloading] = React.useState(true)


    // ---------------------------------------------------------------
    // --------------------    API Works       -----------------------
    // ---------------------------------------------------------------

    const [data, setData] = useState([]);
    const [Pending, setpending] = useState([]);
    const [Paidup, setpaidup] = useState([]);
    const Toaster = () => { toast.success('New Staff Register successfully') }
    const errtoast = () => { toast.error("Something Wrong") }

    useEffect(() => {
        async function fetchfacultdata() {
            const res = await Alloverstudent();
            setData(() => res.data)
            setpending(() => res.data)
            setloading(false);
        }
        fetchfacultdata()
    }, [])

    // // ------------------------------
    // // ------ Pending_Student -------
    // // ------------------------------
    let calculatepending = 0;
    for (let i = 0; i < Pending.length; i++) {
        calculatepending += Pending[i].fees_id.pending_amount > 0
    }




    if (isloading) {
        return <Loader />
    }

    return (
        <div className="w-2/3">
            <div className="right pt-4 p-5 xl:flex xl:mr-10 xl:mt-10 xl:space-x-10 space-y-10 xl:space-y-0 justify-center items-center text-center">
                <div id='Student-cards' className=' flex items-center p-2 cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class4-50  '>
                    <div className='flex ml-1'>
                        <div className="bg-white rounded-md w-16 h-16 flex justify-center items-center">

                            <AiOutlineUser className=' text-class4-50 text-4xl ' />
                        </div>
                    </div>
                    <div className="text-left ml-2">
                        <p className='text-white text-4xl'>{data.length}</p>

                        <h1 className='text-white  '>Total <span>Students</span></h1>
                    </div>
                </div>
                <div id='Student-cards' className=' flex items-center p-2 cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class1-50  '>
                    <div className='flex ml-1'>
                        <div className="bg-white rounded-md w-16 h-16 flex justify-center items-center">

                            <MdPendingActions className=' text-class1-50 text-4xl ' />
                        </div>
                    </div>
                    <div className="text-left ml-2">
                        <p className='text-white text-4xl'>{calculatepending}</p>

                        <h1 className='text-white  '>Total <span>Pending</span></h1>
                    </div>
                </div>
                <div id='Student-cards' className=' flex items-center p-2 cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class2-50  '>
                    <div className='flex ml-1'>
                        <div className="bg-white rounded-md w-16 h-16 flex justify-center items-center">

                            <FcMoneyTransfer className=' text-class2-50 text-4xl ' />
                        </div>
                    </div>
                    <div className="text-left ml-2">
                        <p className='text-white text-4xl'></p>

                        <h1 className='text-white  '>Total <span>Paid</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
}