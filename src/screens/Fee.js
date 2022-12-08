import React, {useState, useEffect} from "react";
import { AiFillEye, AiOutlineSearch } from "react-icons/ai";
import { Tooltip } from "@material-tailwind/react";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import {getStudentDetails} from '../hooks/usePost';
import Loader from '../Componant/Loader';
import Toaster from '../hooks/showToaster';
import {AxiosError} from 'axios';

export default function Fess() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showNotFound, setShowNotFound] = useState(-1)
  
  async function searchStudent() {
    try{
      if(searchValue == '' || searchValue == ' '){
        return;
      }
      setLoading(true);
      const res = await getStudentDetails(searchValue)
      setLoading(false);
      setdata(res?.data?.data?.students_detail?.length > 0 ? res?.data?.data?.students_detail : null);
      setShowNotFound(1)
    }
    catch(err){
      console.log(err)
        setLoading(false);
        if(err instanceof AxiosError){
          if(err.response){
            Toaster("error",err.response.data.message);
          }
          else{
            Toaster("error",err.message);
          }
        }
        else{
            Toaster("error", err.message);
        }
    }
  }
  return (
    <div className="bg-student-100 m-1 min-h-screen py-10 px-14">
      <div className="">
        <h1 className="text-3xl  font-bold text-darkblue-500">Fees Pay</h1>

        <div className="px-2 py-2 flex mt-7 items-center justify-center">
          <input
            type="search"
            value={searchValue}
            onChange={(e)=> setSearchValue(e.target.value)}
            className="w-2/3 shadow-xl px-3 py-2 rounded-l-lg outline-none    "
            placeholder="Search Student (By : ID , Name , Whatsapp Number)"
          ></input>
          <button
            onClick={searchStudent}
            className="bg-darkblue-500 px-2 py-1 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
          >
            <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-white transition duration-400" />
          </button>
        </div>
      </div>

      <div className="p-4 mt-8 ">
        
        {
          loading
          ?
            <Loader/>
          :

            (
              data?.length > 0 
              ? (
                <div className="p-4 bg-whrounded">
                  <h1 className="font-bold text-2xl text-darkblue-500"> </h1>
                  {/* Recipet table  */}
                  <div>
                    <div className=" bg-white rounded-lg shadow">
                      <div className="border rounded-lg border-gray-100">
                        <div className="py-4 md:py-6 pl-8">
                          <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                            Students List
                          </p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full whitespace-nowrap">
                            <thead>
                              <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-auto">
                                  Student ID
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Name
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Mobile
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Class
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Medium
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Stream
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Net Fees
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Pending
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Profile
                                </th>
                                <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                  Action
                                </th>
                              </tr>
                            </thead>
                              <tbody className="w-full">
                                {data.map((m, index) => {
                                  return (
                                    <tr key={index} className={`${m.fees.pending_amount > 0 ? 'bg-red-100' : 'bg-green-100'} border-b-1 border-gray-200 h-20 text-sm leading-none text-gray-800 border-b border-gray-100`}>
                                      <td className="px-10 lg:px-6 xl:px-auto">
                                        <span className="font-bold">
                                            {m.personal.student_id}
                                        </span>
                                      </td>
                                      <td className=" px-10 lg:px-6 xl:px-0 capitalize">
                                        {m.personal.basic_info_id.full_name}
                                      </td>
                                      <td className="px-10 lg:px-6 xl:px-0">
                                        <span className="">
                                          {m.personal.contact_info_id.whatsapp_no}
                                        </span>
                                      </td>
                                      <td className="px-10 lg:px-6 xl:px-0">
                                        <p className="">
                                          <span className="">
                                            {m.academic.class_id.class_name}
                                          </span>
                                        </p>
                                      </td>
                                      <td className="px-10 lg:px-6 xl:px-0">
                                        <p className="">
                                          <span className="">
                                            {m.academic.class_id.medium}
                                          </span>
                                        </p>
                                      </td>
                                      <td className="px-10 lg:px-6 xl:px-0">
                                        <p className="">
                                          <span className="">
                                            {m.academic.class_id.stream.toLowerCase() == 'none' ? '--' : m.academic.class_id.stream}
                                          </span>
                                        </p>
                                      </td>
                                      <td className="px-10 lg:px-6 xl:px-0">
                                        <p className="">
                                          <span className="">
                                            {m.fees.net_fees}
                                          </span>
                                        </p>
                                      </td>
                                      <td className="px-10 lg:px-6 xl:px-0">
                                        <p className="">
                                          <span className="">
                                            {m.fees.pending_amount}
                                          </span>
                                        </p>
                                      </td>
                                      <td>
                                        <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${m.personal.student_id}`}>
                                          <Tooltip
                                            content="Show Profile"
                                            placement="bottom-end"
                                            className="text-white bg-black rounded p-2"
                                          >
                                            <span className="text-xl text-darkblue-500">
                                              <AiFillEye />
                                            </span>
                                          </Tooltip>
                                        </NavLink>
                                      </td>
                                      <td className="">
                                        <span className="">
                                          <NavLink to={"/receipt/FeesDetail"} state={{
                                            rollno: m.personal.student_id,
                                            full_name: m.personal.basic_info_id.full_name,
                                            class_name: m.academic.class_id.class_name,
                                            medium: m.academic.class_id.medium,
                                            stream: m.academic.class_id.stream,
                                            batch: `${m.academic.class_id.batch_start_year}-${m.academic.class_id.batch_end_year}`
                                          }} >
                                          <button className={`${m.fees.pending_amount <= 0 ? 'disabled:opacity-40' : 'bg-darkblue-500 hover:bg-blue-900'} bg-darkblue-500 rounded-lg  duration-200 transition text-white px-7 font-bold py-2`} disabled={m.fees.pending_amount <= 0 ? true : false}>
                                          Pay
                                        </button>
                                          </NavLink>
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) 
              : (
                showNotFound != -1 
                ?
                  <div className="bg-red-200 font-bold justify-center items-center p-2 rounded mx-3 flex space-x-2">
                    <IoMdInformationCircle className="text-xl text-red-600" />

                    <h1 className="text-red-800">No Student Found </h1>
                  </div>
                :
                  null
              )
            )
        }
      </div>
    </div>
  );
}

