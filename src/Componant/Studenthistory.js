import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MdLocalPrintshop } from 'react-icons/md';
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';



const Studenthistory = () => {

  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <section className=''>
        <div className='lable  text-left flex justify-between items-center  p-5'>
          <h1 className='text-[#020D46] font-bold text-3xl '>Fees History</h1>
          <div className="btn cursor-pointer ml-5 h-10 w-24 rounded-md bg-white text-left border  overflow-hidden " id="btn" onClick={() => navigate(-1)}>
            <div className="icons  h-9 w-40 flex ml-2 items-center " id="icons">
              <FaArrowLeft className="text-2xl text-darkblue-500  " />
              <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
            </div>
          </div>
        </div>

        <div className='FeesHistory w-3/4 bg-white mt-0 p-10 pt-3 rounded drop-shadow-md ml-40 space-y-5'>


          <div className='btn flex justify-start'>
            <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" id='print' class="text-3xl bg-darkblue-500 rounded-md text-white p-1  " onClick={handlePrint}><MdLocalPrintshop /></a></Tooltip>
          </div>

          <div ref={componentRef} className='p-5 pt-2 pb-0'>
          <div className="overflow-x-auto relative rounded-lg  ">
            <table  className="w-full text-sm text-left  ">
              <thead className="text-sm uppercase bg-darkblue-500">
                <tr className='text-white'>
                  <th scope="col" className="py-3 px-6 text-center">Reciept No</th>
                  <th scope="col" className="py-3 px-6 text-center">Admin</th>
                  <th scope="col" className="py-3 px-6 text-center">Date</th>
                  <th scope="col" className="py-3 px-6 text-center">Time</th>
                  <th scope="col" className="py-3 px-6 text-center">Amount</th>
                  <th scope="col" className="py-3 px-6 text-center">Discount</th>
                  <th scope="col" className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="py-4 px-7 text-center">01</td>
                  <td className="py-4 px-7 text-center">Shad</td>
                  <td className="py-4 px-7 text-center">12/04/22</td>
                  <td className="py-4 px-7 text-center">12:11:00</td>
                  <td className="py-4 px-7 text-center">5000</td>
                  <td className="py-4 px-7 text-center">10%</td>
                  <td className="py-4 px-7 text-center">
                    <div className='flex justify-center space-x-2'>
                      <NavLink className="nav-link" to="">

                        <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-xl bg-white text-darkblue-500"><AiFillEye /></a></Tooltip>
                      </NavLink>


                    </div>
                  </td>

                </tr>

              </tbody>
            </table>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Studenthistory