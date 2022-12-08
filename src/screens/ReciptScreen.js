import React, {useState} from "react";
import { AiFillEye, AiOutlineSearch } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import {searchReceipt} from '../hooks/usePost';
import Loader from '../Componant/Loader'; 
import Toaster from '../hooks/showToaster';
import {AxiosError} from 'axios';
import { Tooltip } from "@material-tailwind/react";

export default function ReciptScreen() {
    
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentReceipts, setStudentReceipts] = useState([])
  const [staffReceipts, setStaffReceipts] = useState([])
  const [showNotFound, setShowNotFound] = useState(-1)

   const searchAllReceipts = async (e)=>{
    try{
      e.preventDefault();
      if(searchValue == '' || searchValue == ' '){
        return;
      }
      
      setLoading(true);
      const res = await searchReceipt(searchValue)
      setLoading(false);

      setStudentReceipts(res.data.student_receipts)
      setStaffReceipts(res.data.staff_receipts)
      setShowNotFound(1)
    }
    catch(err){
        setLoading(false);
        if(err instanceof AxiosError){
            Toaster("error",err.response.data.message);
        }
        else{
            Toaster("error", err.message);
        }
    }
    
  }
  
  return (
    <div className="bg-student-100 m-1 min-h-screen py-10 px-14">
      <div className="">
      
        <h1 className="text-3xl  font-bold text-darkblue-500">Search Receipt</h1>

        <div className="px-2 py-2 flex mt-7 items-center justify-center">
          <input
            type="search"
            className="w-2/3 shadow-xl px-3 py-2 rounded-l-lg outline-none    "
            placeholder="Search Receipt  (BY : Receipt ID, Rollno , Name , Whatsapp Number)"
            value={searchValue}
            onChange={(e)=>{setSearchValue(e.target.value)}}
          />
          <button
            onClick={searchAllReceipts}
            className="bg-darkblue-500 px-2 py-1 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
          >
            <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-white transition duration-400" />
          </button>
        </div>
      </div>
      {
        loading
        ?
          <Loader/>
        :
          <div className="p-4 mt-8 ">
            {studentReceipts?.length > 0 || staffReceipts?.length > 0 ? (
              <div className="p-4 bg-whrounded  ">
                <h1 className="font-bold text-2xl text-darkblue-500"> </h1>
                {/* Recipet table  */}
                <div className="">
                  {
                    studentReceipts?.length > 0 
                    ? 
                      <div className="student-table bg-white rounded-lg shadow mb-14">
                        <div className="border rounded-lg border-gray-100">
                          <div className="py-4 md:py-6 pl-8">
                            <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                              Student List
                            </p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                              <thead>
                                <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                                  <th className="font-normal text-left pl-10">Date</th>
                                  <th className="font-normal text-left  px-10 lg:px-6 xl:px-0">
                                    Reciept No
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Name
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Paid
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Discount
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Total
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Admin
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="w-full">
                                {
                                  studentReceipts.map((data) => {
                                    return (
                                      data.academics[0].fees[0].fees_receipt.length > 0 
                                      ?
                                        data.academics[0].fees[0].fees_receipt.map((receipt, index)=>{
                                          let dt = new Date(receipt.date);
                                          let date = `${dt.getDate() < 10 ? "0"+dt.getDate() : dt.getDate() }/${dt.getMonth() + 1 < 10 ? "0"+(dt.getMonth() + 1) : dt.getMonth() + 1 }/${dt.getFullYear()}`

                                          return(
                                            <tr key={index} className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                                              <td className="pl-8">{date}</td>
                                              <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                                {receipt.fees_receipt_id}
                                              </td>
                                              <td className="px-10 lg:px-6 xl:px-0">
                                                {data.basic_info[0].full_name}
                                              </td>
                                              <td className="font-medium px-10 lg:px-6 xl:px-0">
                                                <span className="bg-green-200 px-4 text-green-900 font-bold rounded">
                                                  {" "}
                                                  {receipt.transaction[0].amount}{" "}
                                                </span>
                                              </td>
                                              <td className="px-10 lg:px-6 xl:px-0">
                                                <p className="">
                                                  <span className="bg-red-200 px-4 text-red-900 font-bold rounded">
                                                    {receipt.discount}{" "}
                                                  </span>
                                                </p>
                                              </td>
                                              <td>
                                                <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                                  {receipt.transaction[0].amount + receipt.discount}
                                                </span>
                                              </td>
                                              <td>
                                                <span>{receipt.admin[0].username}</span>
                                              </td>
                                              <td className="px-5  ">
                                                  <NavLink className="nav-link" to="/receipt/receipt" state={{is_cancelled: data.is_cancelled,isStaff: false, fees_receipt_id: receipt.fees_receipt_id}}>
                                                    <Tooltip
                                                      content="Show Receipt"
                                                      placement="bottom-end"
                                                      className="text-white bg-black rounded p-2"
                                                    >
                                                        <span>
                                                          <AiFillEye className="text-xl cursor-pointer" />
                                                        </span>
                                                    </Tooltip>
                                                  </NavLink>
                                              </td>
                                            </tr>
                                          )
                                        })
                                      : 
                                        null
                                    );
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    :
                      null
                  }
                  {
                    staffReceipts.length > 0 
                    ? 
                      <div className="staff-table bg-white rounded-lg shadow">
                        <div className="border rounded-lg border-gray-100">
                          <div className="py-4 md:py-6 pl-8">
                            <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                              Staff List
                            </p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                              <thead>
                                <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                                  <th className="font-normal text-left pl-10">Date</th>
                                  <th className="font-normal text-left  px-10 lg:px-6 xl:px-0">
                                    Reciept No
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Name
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Salary Type
                                  </th>                                
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Amount
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Admin
                                  </th>
                                  <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="w-full">
                                {staffReceipts.map((data) => {
                                  return (
                                    data.salary_receipt.length > 0 
                                    ?
                                      data.salary_receipt.map((receipt)=>{
                                        let dt = new Date(receipt.date);
                                        let date = `${dt.getDate() < 10 ? "0"+dt.getDate() : dt.getDate() }/${dt.getMonth() + 1 < 10 ? "0"+(dt.getMonth() + 1) : dt.getMonth() + 1 }/${dt.getFullYear()}`
                                        
                                        return(
                                          <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                                            <td className="pl-8">{date}</td>
                                            <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                              {receipt.salary_receipt_id}
                                            </td>
                                            <td className="px-10 lg:px-6 xl:px-0">
                                              {data.basic_info[0].full_name}
                                            </td>
                                            <td className="px-10 lg:px-6 xl:px-4 ">
                                              <span className="">
                                                {receipt.is_hourly ? 'Hourly' : 'Monthly'}
                                              </span>
                                            </td>
                                          
                                            <td>
                                              <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                                {receipt.transaction[0].amount}
                                              </span>
                                            </td>
                                            <td>
                                              <span>{receipt.admin[0].username}</span>
                                            </td>
                                            <td className="px-5  ">
                                              <span>
                                                <NavLink to={`/salary/Receipt_teacher/${receipt.salary_receipt_id}`}>
                                                  <AiFillEye className="text-xl cursor-pointer" />
                                                </NavLink>
                                              </span>
                                            </td>
                                          </tr>
                                        )
                                      })
                                    :
                                      null
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    :
                      null
                  }
                </div>
              </div>
            ) : (
              showNotFound != -1 
                ?
                  <div className="bg-red-200 font-bold justify-center items-center p-2 rounded mx-3 flex space-x-2">
                    <IoMdInformationCircle className="text-xl text-red-600" />

                    <h1 className="text-red-800">No Receipt Found </h1>
                  </div>
                :
                  null
            )}
          </div>
      }
    </div>
  );
}
