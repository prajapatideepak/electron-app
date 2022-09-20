import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";





const Confomodel = () => {

    const [model, setModel] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [modale, satModal] = React.useState(false);



    return (


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
)
}

export default Confomodel









