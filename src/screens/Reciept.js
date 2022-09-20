/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import "../Styles/Studentform.css";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Receipt_student from "../Componant/Receipt_student";
// import Receipt_teacher from "../Componant/Receipt_teacher";

const Reciept = ({ }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();
  const [model, setModel] = React.useState(false);

  const onSubmit = (data) => {
    if (data.newpassword !== data.confirmpassword) {
      document.getElementById("msg").style.display = "flex";
    } else {
      document.getElementById("msg").style.display = "none";
    }
  };


  

  const navigate = useNavigate();
  const printRef = useRef();
  const [print, setPrint] = useState(false);
  const [feesData, setFeesData] = React.useState({});
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState();
  function handleBack() {}

  function handlePINsubmit() {
    setFeesData({
        username : "Nasir",
        password : 1234
    });
   
    const username = "Nasir";
    const password = 1234;
    console.log("Clicked");
    // eslint-disable-next-line eqeqeq
    if (username == username && password == password ) {
      console.log(pin);

      navigate("/reciept/FeesDetail", feesData);
    } else {
      setError(true);
    }
  }



 
  return (
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
                      {/* <button
                    type="button"
                    onClick={handleClick}
                    className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                  >
                    Clear
                  </button> */}

                  
                      <button onClick={handlePINsubmit}
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
      <div className={`bg-slate-100 ${model && "opacity-20"}`} ref={printRef}>
      <div className="flex justify-between  pt-8 px-6">
        <h2 className=" font-bold text-darkblue-500 text-3xl">Receipt</h2>
        <div className="btn cursor-pointer ml-5 h-10 w-24 rounded-md bg-white text-left border  overflow-hidden " id="btn" onClick={() => navigate(-1)}>
            <div className="icons  h-9 w-40 flex ml-2 items-center " id="icons">
              <FaArrowLeft className="text-2xl text-darkblue-500  " />
              <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
            </div>
          </div>
      </div>
     
      <div >
      
        <Receipt_student isSalaried={true} />
        {print && <Receipt_student isSalaried={true} />}
      </div>
      <div className="flex justify-center items-center">
        <button className="flex justify-center items-center my-5 bg-indigo-900 py-1 px-3 rounded-md hover:bg-indigo-800"  onClick={(e) => setModel(true)}>
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
    </section>
  );
};

export default Reciept;
