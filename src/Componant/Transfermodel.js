import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";





const Transfermodel = () => {

    const [model, setModel] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [modale, satModal] = React.useState(false);
  

  
    return (
        <div className='relative' >
            {/* model for class selection */}
            {model && (
                <div className='absolute w-full h-full  z-30 ' >
                    <div className='flex justify-center shadow-2xl opacity-100 '>
                        <div className='absolute h-1/3 mx-auto  opacity-100 shadow-2xl rounded mt-32 bg-white w-1/3 z-50'>
                            <div className=''>
                                <div className='flex justify-end '>
                                    <button onClick={(e) => setModel(!model)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

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
                                    <button className='bg-darkblue-500 text-white px-5 py-1 rounded-md' onClick={(e) => setModal(true)} >
                                        SUBMIT
                                    </button>
                                </div>





                            </div>
                        </div>
                    </div>
                </div>


            )}


            {/* model for conformation */}
            {modal && (
                <div className='absolute w-full h-full   ' >
                    <div className='flex justify-center shadow-2xl opacity-100 '>
                        <div className='absolute h-1/2 mx-auto  opacity-100 shadow-2xl rounded mt-32 bg-white w-1/2 z-50'>
                            <div className=''>
                                <div className='flex justify-end '>
                                    <button onClick={(e) => setModal(!modal)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                                        <AiFillCloseCircle />
                                    </button>

                                </div>
                                <div className="alert flex justify-center mt-8 text-9xl">

                                    <FiAlertCircle className='text-orange-200' />
                                </div>
                                <div className='text-center'>
                                    <p className='text-4xl  py-5 font-bold'>Are You Sure?</p>
                                    <p className='pt-2'>You Wont to transefr Class in selected year ??</p>
                                </div>
                                <div className="btn flex justify-center py-8 space-x-3">
                                    <button className='bg-blue-500  px-4 py-3 text-white rounded-md' onClick={(e) => satModal(true)}>
                                        Yes, Transefr it!
                                    </button>
                                    <button className='bg-[#FF0000] px-5 py-3 text-white rounded-md' onClick={(e) => setModal(false)}>
                                        Cancel
                                    </button>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>


            )}

            {/* model for afetr comformation */}
            {modale && (
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
                                    <button className='bg-blue-500  px-4 py-3 text-white rounded-md' onClick={(e) => satModal(false)}>
                                        OK
                                    </button>

                                </div>




                            </div>
                        </div>
                    </div>
                </div>


            )}

          

        </div>
    )
}

export default Transfermodel






