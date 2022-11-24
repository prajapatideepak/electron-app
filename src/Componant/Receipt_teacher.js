import React, { useRef, useState } from "react";
import { TbCurrencyRupee } from 'react-icons/tb';
import styled from 'styled-components';
import { useParams, useLocation } from "react-router-dom";
import { Facultyreciept, getAdminVerification,usegetAdmin } from "../hooks/usePost"
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { MdModeEditOutline } from "react-icons/md";
import ReactToPrint from "react-to-print";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import Loader from './Loader';
import { toast } from "react-toastify";
import { AxiosError } from "axios";




function Receipt_teacher() {
  const receiptBgColor = 'bg-red-600';
  const receiptTextColor = 'text-red-600';
  const Toaster = () => { toast.success('Authentication Successfull') }
  const errtoast = () => { toast.error("Invalid UserID / Password") }
  //   // --------------------------------
  //   // -----   API Works    ----------
  //   // -------------------------------
  const location = useLocation()
  const params = useParams();
  const [model, setModel] = React.useState(false);
  const [facultyhistory, setfacultyhistory] = React.useState([]);
  const [feesdetails, setfeesdetails] = React.useState([]);
  const [isloading, setloading] = React.useState(true)
  const [isHourly, setisHourly] = React.useState(0)
  const navigate = useNavigate();
  const printRef = useRef();
  const [print, setPrint] = useState(false);
  const [feesData, setFeesData] = React.useState({});
  const [pin, setPin] = React.useState("");
  const [admin, setadmin] = React.useState();
  const [admin_username, setadmin_username] = React.useState();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    async function fetchfacultdata() {
      const res = await Facultyreciept(params.id);
      setfacultyhistory(() => res.data.data.receipt_details.getdetails)
      setfeesdetails(() => res.data.data.receipt_details.hourlysalary)
      setisHourly(res.data.data.receipt_details.getdetails.is_hourly)
      setloading(false)
    }
    fetchfacultdata()
  }, [])

  React.useEffect(() => {
    async function fetchfacultdata() {
        const res = await usegetAdmin();
        setadmin(() => res.data.staff_id.basic_info_id.full_name)
        setadmin_username(() => res.data.username)
        setloading(false)
    }
    fetchfacultdata()
}, [])


  //   // --------------------------------
  //   // ---------   Date    ----------
  //   // -------------------------------
  var today = new Date(facultyhistory?.date);
  var date =
    today.getDate() +
    " / " +
    (today.getMonth() + 1) +
    " / " +
    today.getFullYear();

  //   // --------------------------------
  //   // ----  Number To Word  ----------
  //   // -------------------------------

  function inWords(num) {
    let a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((num = num?.toString())?.length > 9) return 'overflow';
    let n = ('000000000' + num)?.substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';

    return str.toUpperCase();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();


  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const admin_details = await getAdminVerification({ username: data.Username, password: data.Password });
      if (admin_details.data.success) {
        Toaster()
        navigate(`/salary/Salarydetails/${params.id}`);
        return
      }
    }
    catch (error) {
      errtoast()
      if (error instanceof AxiosError) {
        setError(error.response.data.error);
      }
      else {
        setError(error.message);
      }
    }
  };


  if (isloading) {
    return <Loader />
  }

  return (
    <>

      <section className="relative">
        {model && (
          <div className='absolute w-full h-full  z-30 ' >
            <div className='flex justify-center  '>
              <div className='h-2/2 mx-auto  opacity-100 shadow-2xl rounded  mt-20 bg-white w-1/2 z-50'>
                <div className=''>
                  <div className='flex justify-end '>
                    <button onClick={(e) => setModel(!model)} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                      <AiFillCloseCircle />
                    </button>

                  </div>
                  <div className='mt-7'>
                    <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Authentication</h1>

                    <form
                      className=""
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className=" p-5">


                        <div className="title flex justify-center pb-3  ">
                          <img src="/images/User.png" alt="" className="rounded-full w-1/5 relative drop-shadow-2xl  " />
                        </div>
                        <div className=" grid grid-cols-1 rounded-lg drop-shadow-md truncate   ">
                          <div className=" flex flex-col items-center gap-5">
                            <div className="Username">
                              <label className="relative block">
                                <span className="absolute flex items-center pl-2 mt-2">
                                  <FaUserAlt className="h-5 w-5 fill-slate-500" />
                                </span>
                                <input
                                  type="text"
                                  id="Username"
                                  placeholder="Enter Username"
                                  onChange={(e) => setPin(e.target.value)}
                                  className={`w-60 mt-1 block py-2 pl-9 pr-3 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.oldpassword && "border-red-600"
                                    }`}
                                  {...register("Username", {
                                    required: "Username is required",
                                  })}
                                  onKeyUp={() => {
                                    trigger("Username");
                                  }}
                                />
                                {errors.Username && (
                                  <small className="text-red-700">
                                    {errors.Username.message}
                                  </small>
                                )}
                              </label>
                            </div>
                          </div>

                          <div className=" flex flex-col items-center gap-5 mt-5">
                            <div className="confirmpassword">
                              <label className="relative block">
                                <span className="absolute flex items-center pl-2 mt-2">
                                  <IoMdLock className="h-5 w-5 fill-slate-500" />
                                </span>
                                <input
                                  type="text"
                                  id="Password"
                                  placeholder="Enter Password"
                                  onChange={(e) => setPin(e.target.value)}
                                  className={`w-60 mt-1 block py-2 pl-9 pr-3 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.confirmpassword && "border-red-600"
                                    }`}
                                  {...register("Password", {
                                    required: "Password is required",
                                  })}
                                  onKeyUp={() => {
                                    trigger("Password");
                                  }}
                                />
                                {errors.Password && (
                                  <small className="text-red-700">
                                    {errors.Password.message}
                                  </small>
                                )}

                              </label>
                            </div>
                          </div>
                          <div className=" flex flex-col items-center gap-5">
                            <div className="flex lg:flex-row md:flex-col gap-4">
                              <div className="btn mt-5 flex justify-center w-60">
                                <button
                                  type="submit"
                                  className="bg-blue-900 drop-shadow-2xl hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-10 w-24 rounded-md tracking-wider"
                                >
                                  SUBMIT
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>



                  </div>

                </div>
              </div>
            </div>
          </div>


        )}
        <div className={`bg-slate-100 ${model && "opacity-20"}`} >
          <div className=" px-6">
            <div>
              {
                location?.state?.prevPath != "generate_receipt" && location?.state?.prevPath != "update_receipt"
                  ?
                  <div className='lable  text-left flex justify-end items-center '>
                    <div className="group h-9 w-20 flex justify-center items-center gap-1 pt-10 cursor-pointer" id="" onClick={() => navigate(-1)}>
                      <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                      <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                    </div>
                  </div>
                  :
                  null
              }
              <div className="py-5 pt-10" ref={printRef}>
                <ReceiptMainDiv className={`border-4 rounded-3xl border-red-600 mx-auto mt-4`} ref={printRef} >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <img src="/images/logo.png" style={{ maxWidth: '250px' }} alt="" />
                      <div className={`${receiptTextColor} w-48 font-bold`}>
                        <p>E-35, Sumel-8, Safal Market, Nr. Ajit Mill Char Rasta, Rakhial, Ahmedabad.</p>
                        <p className="pt-2">Mobile: 8747382919</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                      <div className={`${receiptBgColor} w-26 rounded-md flex justify-center items-center`}>
                        <p className="text-sm text-white py-1 px-2 ">TEACHER RECEIPT</p>
                      </div>
                      <div>
                        <p className={`${receiptTextColor} font-bold`}>Receipt No: <span className="text-black">{facultyhistory.salary_receipt_id}</span></p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                      <div className="">
                        <p className={`${receiptTextColor} font-bold italic`}>Name: <span className="text-black">{facultyhistory.staff_id.basic_info_id.full_name}</span></p>
                      </div>
                      <div>
                        <p className={`${receiptTextColor} font-bold italic`}>Date: <span className="text-black">{date}</span></p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className={`${receiptTextColor} font-bold italic`}>The sum of Rupees: <span className="text-black"></span>{inWords(facultyhistory.transaction_id.amount)}</p>
                    </div>
                    <div className="mt-5">
                      <p className={`${receiptTextColor} font-bold italic`}>
                        By {
                          facultyhistory.transaction_id?.is_by_upi
                            ?
                            'UPI'
                            :
                            facultyhistory.transaction_id?.is_by_cheque
                              ?
                              "Cheque"
                              :
                              null
                        }: <span className="text-black">{
                          facultyhistory.transaction_id?.is_by_upi
                            ?
                            facultyhistory.transaction_id?.upi_no
                            :
                            facultyhistory.transaction_id?.is_by_cheque
                              ?
                              facultyhistory.transaction_id?.cheque_no
                              :
                              'CASH'

                        }</span>
                      </p>
                    </div>
                    {isHourly ?
                      <div className="flex">
                        <div className={`flex justify-center items-center w-36 h-8 ${receiptBgColor} mt-5 mr-5 rounded-md`}>
                          <p className="text-white">Per Lecture: {feesdetails.rate_per_hour}</p>
                        </div>
                        <div className={`flex justify-center items-center w-36 h-8 ${receiptBgColor} mt-5 mr-5 rounded-md`}>
                          <p className="text-white">Total Lectures: {feesdetails.total_hours}</p>
                        </div>
                      </div>
                      : null}
                    <div className="flex justify-between items-center mt-5">
                      <div className="flex flex-col">
                        <div className=" relative flex justify-center items-center">
                          <div className="absolute left-0 rounded-full border-2 border-red-600">
                            <div className={`w-12 h-12 rounded-full border-2 border-white ${receiptBgColor} flex justify-center items-center`} style={{ marginTop: '-0.4px' }}>
                              <TbCurrencyRupee className="font-bold text-3xl text-white" />
                            </div>
                          </div>
                          <div className="border-2 border-red-600 rounded-full ml-2">
                            <input type="text" className="w-48 h-10 border-2 p-2 pl-14 border-red-600 rounded-full text-2xl font-bold" disabled value={facultyhistory.transaction_id.amount} style={{ margin: '1px' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div className="">
                        <p className={`${receiptTextColor} font-bold text-sm ml-1 `}>Admin: <span className="text-black">{admin}</span></p>
                      </div>
                      <div>

                        <p className={`${receiptTextColor} font-bold`}>Signature with stamp</p>
                      </div>
                    </div>
                  </div>
                </ReceiptMainDiv>
                {print && <ReceiptMainDiv className={`border-4 rounded-3xl border-red-600 mx-auto mt-4`} >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <img src="/images/logo.png" style={{ maxWidth: '250px' }} alt="" />
                      <div className={`${receiptTextColor} w-48 font-bold`}>
                        <p>E-35, Sumel-8, Safal Market, Nr. Ajit Mill Char Rasta, Rakhial, Ahmedabad.</p>
                        <p className="pt-2">Mobile: 8747382919</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                      <div className={`${receiptBgColor} w-26 rounded-md flex justify-center items-center`}>
                        <p className="text-sm text-white py-1 px-2 ">TEACHER RECEIPT</p>
                      </div>
                      <div>
                        <p className={`${receiptTextColor} font-bold`}>Receipt No: <span className="text-black">{facultyhistory.salary_receipt_id}</span></p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                      <div className="">
                        <p className={`${receiptTextColor} font-bold italic`}>Name: <span className="text-black">{facultyhistory.staff_id.basic_info_id.full_name}</span></p>
                      </div>
                      <div>
                        <p className={`${receiptTextColor} font-bold italic`}>Date: <span className="text-black">{date}</span></p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className={`${receiptTextColor} font-bold italic`}>The sum of Rupees: <span className="text-black"></span>{inWords(facultyhistory.transaction_id.amount)}</p>
                    </div>
                    <div className="mt-5">
                      <p className={`${receiptTextColor} font-bold italic`}>
                        By {
                          facultyhistory.transaction_id?.is_by_upi
                            ?
                            'UPI'
                            :
                            facultyhistory.transaction_id?.is_by_cheque
                              ?
                              "Cheque"
                              :
                              null
                        }: <span className="text-black">{
                          facultyhistory.transaction_id?.is_by_upi
                            ?
                            facultyhistory.transaction_id?.upi_no
                            :
                            facultyhistory.transaction_id?.is_by_cheque
                              ?
                              facultyhistory.transaction_id?.cheque_no
                              :
                              ' CASH'

                        }</span>
                      </p>
                    </div>
                    {isHourly &&
                      <div className="flex">
                        <div className={`flex justify-center items-center w-36 h-8 ${receiptBgColor} mt-5 mr-5 rounded-md`}>
                          <p className="text-white">Per Lecture: {feesdetails.rate_per_hour}</p>
                        </div>
                        <div className={`flex justify-center items-center w-36 h-8 ${receiptBgColor} mt-5 mr-5 rounded-md`}>
                          <p className="text-white">Total Lectures: {feesdetails.total_hours}</p>
                        </div>
                      </div>

                    }
                    <div className="flex justify-between items-center mt-5">
                      <div className="flex flex-col">
                        <div className=" relative flex justify-center items-center">
                          <div className="absolute left-0 rounded-full border-2 border-red-600">
                            <div className={`w-12 h-12 rounded-full border-2 border-white ${receiptBgColor} flex justify-center items-center`} style={{ marginTop: '-0.4px' }}>
                              <TbCurrencyRupee className="font-bold text-3xl text-white" />
                            </div>
                          </div>
                          <div className="border-2 border-red-600 rounded-full ml-2">
                            <input type="text" className="w-48 h-10 border-2 p-2 pl-14 border-red-600 rounded-full text-2xl font-bold" disabled value={facultyhistory.transaction_id.amount} style={{ margin: '1px' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div className="">
                        <p className={`${receiptTextColor} font-bold text-sm ml-1 `}>Admin: <span className="text-black">{facultyhistory.admin_id.username}</span></p>
                      </div>
                      <div>

                        <p className={`${receiptTextColor} font-bold`}>Signature with stamp</p>
                      </div>
                    </div>
                  </div>
                </ReceiptMainDiv>}
              </div>
              <div className="flex justify-center items-center">
                <button className="flex justify-center items-center my-5 bg-indigo-900 py-1 px-3 rounded-md hover:bg-indigo-800" onClick={(e) => setModel(true)}>
                  <MdModeEditOutline className="text-white text-lg my-1" />

                  <span className="text-white text-sm pl-1">Edit</span>

                </button>
                <ReactToPrint
                  trigger={() => (
                    <button className="mx-5 bg-indigo-900 py-1 px-3 rounded-md hover:bg-indigo-800">
                      <span className="text-white text-sm">Download/Print</span>
                    </button>
                  )}
                  content={() => printRef.current}
                  onBeforeGetContent={() => {
                    return new Promise((resolve) => {
                      setPrint(true);
                      resolve();
                    });
                  }}
                  onAfterPrint={() => setPrint(false)}
                />
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

const ReceiptMainDiv = styled.div`
  max-width: 700px;
  position: relative;
  &:before{
    content: "";
    background: url('images/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
`


export default Receipt_teacher