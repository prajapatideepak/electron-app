/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Styles/Studentform.css";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Receipt_student from "../Componant/Receipt_student";
import Receipt_teacher from "../Componant/Receipt_teacher";
import { searchReceipt, getAdminVerification } from '../hooks/usePost';
import { AxiosError } from "axios";
import Toaster from '../hooks/showToaster';
import Loader from "../Componant/Loader";
import { NasirContext } from "../NasirContext";

const Reciept = () => {
  const location = useLocation();

  let isStaff = location.state?.isStaff;
  let isSalaried = location.state?.isSalaried ? location.state?.isSalaried : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();
  const [model, setModel] = React.useState(false);
  
  const navigate = useNavigate();
  const printRef = useRef();
  const [print, setPrint] = useState(false);
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState('');
  const [receiptDetails, setReceiptDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { admin } = React.useContext(NasirContext);

    const admin_id = admin._id;

    try{
      const admin_details = await getAdminVerification({username: data.Username, password: data.Password});
      
      if(admin_details.data.success == 'verified'){
         navigate("/receipt/update/student", {state: {receiptDetails}});  
         return
      }
    }
    catch(error){
      if(error instanceof AxiosError){
        setError(error.response.data.error);
      }
      else{
        setError(error.message);
      }
    }
  };

  function inWords (num) {
    let a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
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

  useEffect(()=>{
    async function getReceiptDetails(){
      if(isStaff){
        //call staff receipt api
      }
      else{
        try{
          let receipt_details = await searchReceipt(location.state.fees_receipt_id);
          
          receipt_details = receipt_details.data.student_receipts[0]
          setReceiptDetails(()=>{
            let date = new Date(receipt_details?.academics[0].fees[0].fees_receipt[0].date).toLocaleString()
            date = date.split(',')[0]
  
            let amountInWords = inWords(receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].amount)
            return {
              receipt_no: receipt_details?.academics[0].fees[0].fees_receipt[0].fees_receipt_id,
              stream: receipt_details?.academics[0].class[0].stream,
              medium: receipt_details?.academics[0].class[0].medium,
              date,
              roll_no: receipt_details?.student_id,
              class_name: receipt_details?.academics[0].class[0].class_name,
              batch: `${receipt_details?.academics[0].class[0].batch_start_year}-${receipt_details?.academics[0].class[0].batch_end_year}`,
              full_name: receipt_details?.basic_info[0].full_name,
              amount_in_words: amountInWords,
              is_by_cash: receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].is_by_cash,
              is_by_upi: receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].is_by_upi,
              is_by_cheque: receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].is_by_cheque,
              upi_no: receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].upi_no,
              cheque_no: receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].cheque_no,
              amount: receipt_details?.academics[0].fees[0].fees_receipt[0].transaction[0].amount,
              discount: receipt_details?.academics[0].fees[0].fees_receipt[0].discount,
              admin: receipt_details?.academics[0].fees[0].fees_receipt[0].admin[0].username
            }
          });
        }
        catch(err){
          setLoading(false);
          if(err instanceof AxiosError){
            Toaster('success', err.response?.data?.message)
          }
          else{
             Toaster('success', err.message)
          }
        }
      }
    }
    getReceiptDetails()
  },[])

  if(loading){
    return <Loader/>
  }

  return (
    <section className="relative">
     {model && (
        <div className='absolute w-full h-full  z-30 ' >
          <div className='flex justify-center  '>
            <div className='h-2/2 mx-auto  opacity-100 shadow-2xl rounded  mt-20 bg-white w-1/2 z-50'>
              <div className=''>
                <div className='flex justify-end '>
                  <button onClick={(e) => {setModel(!model); reset(); setError('')}} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>
                      <AiFillCloseCircle />
                  </button>
                </div>
                <div className='mt-7'>
                  <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Super Admin Authentication</h1>

                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className=" p-5">
                      <div className="title flex justify-center pb-3  ">
                        <img src="/images/User.png" alt="" className="rounded-full w-1/5 relative drop-shadow-2xl  " />
                      </div>
                      <div className=" grid grid-cols-1 rounded-lg drop-shadow-md truncate   ">
                        <div className=" flex flex-col items-center gap-5">
                          <div className="Username">
                            <label className="relative block">
                              <span className="absolute flex items-center pl-2 mt-2">
                                <FaUserAlt className="h-5 w-5 fill-slate-500"/>
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
                                type="password"
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
                              {/* <button
                            type="button"
                            onClick={handleClick}
                            className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                          >
                            Clear
                          </button> */}

                          
                              <button
                                type="submit"
                                className="bg-blue-900 drop-shadow-2xl hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-10 w-24 rounded-md tracking-wider"
                              >
                                SUBMIT
                              </button>
                            </div>
                          </div>
                          {
                            error != '' && error != undefined
                            ?
                              <p className="text-red-700">{error}</p>
                            :
                              null
                          }     
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
      <div className="flex justify-between pt-8 pb-4 px-6">
        <h2 className=" font-bold text-darkblue-500 text-3xl">Receipt</h2>
        {
          location?.state?.prevPath != '/receipt/update/student' && location?.state?.prevPath != '/receipt/FeesDetail'
          ?
            <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => {
                navigate(-1)
              }}>
                <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
            </div>
          :
            null
        }
      </div>
     
      <div ref={printRef}>
        {isStaff ? <Receipt_teacher isSalaried={isSalaried}/> : <Receipt_student receiptDetails={receiptDetails}/>}
        { print 
          ? 
            isStaff 
            ? 
              <Receipt_teacher isSalaried={isSalaried}/> 
            : 
              <Receipt_student receiptDetails={receiptDetails}/>
          : 
          null
        }

      </div>
      <div className="flex justify-center items-center">
        {
          location?.state?.is_cancelled == 0
          ?
            <button className="flex justify-center items-center my-5 bg-indigo-900 py-1 px-3 rounded-md hover:bg-indigo-800"  onClick={(e) => setModel(true)}>
              <MdModeEditOutline className="text-white text-lg my-1" />
              
                <span className="text-white text-sm pl-1">Edit</span>
            
            </button>
          :
            null
        }
        <ReactToPrint
          trigger={() => (
            <button className="mx-5 bg-indigo-900 my-5 py-1 px-3 rounded-md hover:bg-indigo-800">
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
    </section>
  );
};

export default Reciept;
