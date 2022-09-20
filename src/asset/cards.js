import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";

export default function Cards() {
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
                                <p className='text-white text-4xl'>578</p>

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
                                <p className='text-white text-4xl'>578</p>

                            <h1 className='text-white  '>Total <span>Students</span></h1>
                            </div>
                        </div>
                        <div id='Student-cards' className=' flex items-center p-2 cursor-pointer h-32 xl:w-52 rounded-lg xl:h-28 bg-class2-50  '>
                            <div className='flex ml-1'>
                                <div className="bg-white rounded-md w-16 h-16 flex justify-center items-center">

                                <FcMoneyTransfer className=' text-class2-50 text-4xl ' />
                                </div>
                            </div>
                            <div className="text-left ml-2">
                                <p className='text-white text-4xl'>578</p>

                            <h1 className='text-white  '>Total <span>Students</span></h1>
                            </div>
                        </div>
                    </div>
    </div>
  );
}