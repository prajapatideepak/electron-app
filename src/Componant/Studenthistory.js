import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MdLocalPrintshop } from 'react-icons/md';
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { studentFeesHistory } from '../hooks/usePost';
import Loader from './Loader';

const Studenthistory = () => {

  const location = useLocation();
  const academic_id = location.state.academic_id

  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [feesReceipts, setFeesReceipts] = useState([]);
  let date;
  let time;

  useEffect(() =>{
    async function getFfeesHistory(){
      try{
          const allReceipts = await studentFeesHistory(academic_id);

          if(!allReceipts.data.success){
              Toaster('error', allReceipts.data.message)
              return navigate(-1);
          }
          setFeesReceipts(allReceipts.data.all_receipts)
          setIsLoadingDetails(false);

      } catch(err){
          Toaster('error', err.response.data.message);
          navigate(-1);
          return;
      }
    }
    getFfeesHistory()
  },[])

  if(isLoadingDetails){
      return <Loader/>
  }
  
  return (
    <>
      <section className=''>
        <div className='lable  text-left flex justify-between items-center  p-5'>
          <h1 className='text-[#020D46] font-bold text-3xl '>Fees History</h1>
          <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
            <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
            <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
        </div>
        </div>

        <div className='FeesHistory w-3/4 bg-white mt-0 p-10 pt-3 rounded drop-shadow-md ml-40 space-y-5'>
          {
            feesReceipts && feesReceipts[0] 
            ?
              <>
                <div className='btn flex justify-start'>
                  <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" id='print' className="text-3xl bg-darkblue-500 rounded-md text-white p-1  " onClick={handlePrint}><MdLocalPrintshop /></a></Tooltip>
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
                          {
                            feesReceipts.map((receipt, index) => {
                              { 
                                date = new Date(receipt.date).toLocaleString();
                                time = date.split(',')[1].trim()
                                time = time.split(':')[0]+ ":"+ time.split(':')[1] + " " + time.split(' ')[1]
                                date = date.split(',')[0]
                              }
                              return <tr key={index} className="bg-white border-b">
                                <td className="py-4 px-7 text-center">{receipt.fees_receipt_id}</td>
                                <td className="py-4 px-7 text-center">{receipt.admin_id.username}</td>
                                <td className="py-4 px-7 text-center">{date}</td>
                                <td className="py-4 px-7 text-center">{time}</td>
                                <td className="py-4 px-7 text-center">{receipt.transaction_id.amount}</td>
                                <td className="py-4 px-7 text-center">{receipt.discount}</td>
                                <td className="py-4 px-7 text-center">
                                  <div className='flex justify-center space-x-2'>
                                    <NavLink className="nav-link" to="/receipt/receipt" state={{isStaff: false, fees_receipt_id: receipt.fees_receipt_id}}>
                                      <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><span className="text-xl bg-white text-darkblue-500"><AiFillEye /></span></Tooltip>
                                    </NavLink>
                                  </div>
                                </td>
                              </tr>
                            })
                          }
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            :
              <h3 className="text-2xl text-gray-700 font-medium text-center pt-3">No Receipts Found</h3>
          }
        </div>
      </section>
    </>
  )
}

export default Studenthistory