import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReactToPrint from 'react-to-print';
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io"
import { AiFillEye } from 'react-icons/ai';
import { MdLocalPrintshop } from 'react-icons/md';
import { Tooltip } from "@material-tailwind/react";
import { FaUserEdit } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import '../Styles/Studentform.css';
import { useParams } from "react-router-dom";
import { Facultydetails, Facultyhistory, Update_faculty } from "../Hooks/usePost";
import { toast } from "react-toastify";
import Loader from "./loader";



const Profilefaculty = () => {
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  // -------------------------------
  // -------- Profile Image --------
  // -------------------------------
  const [img, setImg] = useState("./images/profile.jpeg");
  const [call, setcall] = React.useState(true)
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();

  function handlemale(e) {
    setgender(e.target.value)
  }
  function handlefemale(e) {
    setgender(e.target.value)
  }

  const Toaster = () => { toast.success('Profile updated successfully') }
  const errtoast = () => { toast.error("Something Wrong") }
  const onSubmit = async (data) => {
    Object.assign(data, { faculty_id: params.id })
    const res = await Update_faculty(data)
    if (res.data.success == true) {

      Toaster()
      setcall(!call)
      setToggle(false);
    } else {
      errtoast(res.data.message)
    }
  }

  const navigate = useNavigate();

  const [toggle, setToggle] = React.useState(false)
  function handleedit(e) {
    setToggle(true);
  }
  function hendlecancel(e) {
    setToggle(false);
  }

  // ---------------------------------------------------------------------------------
  // -----------------------  API WORKS   --------------------------------------------
  // ---------------------------------------------------------------------------------
  const params = useParams();
  const [facultydetails, setfacultydetails] = React.useState();
  const [facultysalary, setfacultysalary] = React.useState([]);
  const [Totalpaid, setTotalpaid] = React.useState([]);
  const [isloading, setloading] = React.useState(true)
  const [gender, setgender] = useState("");
  // -----------------------------
  // ------ form_details --------
  // -----------------------------
  useEffect(() => {
    async function fetchfacultdata() {
      const res = await Facultydetails(params.id);
      setfacultydetails(() => res.data.one_staff_Details);
      console.log(res)
      setgender(() => res.data.one_staff_Details.basic_info_id?.gender);
      setloading(false)
    }
    fetchfacultdata()
  }, [call])

  console.log(gender, "gender")
  //   // --------------------------------
  //   // -----   Date_birth    ----------
  //   // -------------------------------
  let dob = new Date(facultydetails?.basic_info_id.dob);
  dob = `${dob.getFullYear()}-${(dob.getMonth() + 1) < 10 ? "0" + (dob.getMonth() + 1) : (dob.getMonth() + 1)}-${dob.getDate() < 10 ? "0" + dob.getDate() : dob.getDate()}`
  // // //  --------------------------------
  // //   ----- Joinign_Date  ------------
  // //   -------------------------------
  let doj = new Date(facultydetails?.joining_date);
  doj = `${doj.getFullYear()}-${(doj.getMonth() + 1) < 10 ? "0" + (doj.getMonth() + 1) : (doj.getMonth() + 1)}-${doj.getDate() < 10 ? "0" + doj.getDate() : doj.getDate()}`



  // -----------------------------------------------------------------------------
  // ------------------------------Table_details----------------------------------
  // -----------------------------------------------------------------------------
  useEffect(() => {
    async function fetchfacultdata() {
      const res = await Facultyhistory(params.id);
      setfacultysalary(() => res.data.staff_History)
      setTotalpaid(() => res.data.staff_History)
      setloading(false)
    }
    fetchfacultdata()
  }, [])


  // -----------------------------
  // ------ Last_paid -----------
  // -----------------------------
  var LastPaid = facultysalary ? facultysalary[facultysalary?.length - 1] : null;
  // -----------------------------
  // ------ Totale_paid ----------
  // -----------------------------

  let calculateTotalpaid = 0;
  for (let i = 0; i < Totalpaid.length; i++) {
    calculateTotalpaid += Totalpaid[i].transaction_id.amount
  }

  // --------------------------------
  // ------Last_paid_date------------
  // --------------------------------

  var today = new Date(LastPaid?.transaction_id?.date);
  var date =
    today.getDate() +
    " / " +
    (today.getMonth() + 1) +
    " / " +
    today.getFullYear();



  if (isloading) {
    return <Loader />
  }


  return (
    <>
      <div className="title  flex items-center justify-between  m-5 pt-4">

        <h1 className="text-3xl text-center font-medium text-[#020D46] ">
          {facultydetails?.basic_info_id?.full_name} Profile :
        </h1>
        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
          <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
        </div>
      </div>
      <section className=" p-10 pt-3 ">
        <div class="overflow-x-auto relative  sm:rounded-lg bg-white p-10  space-y-5 w-full">

          <form className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
            <div className=" w-full grid grid-cols-1 rounded-lg  truncate  pb-5 pt-10 ">
              <div className=" flex flex-col items-center gap-4">
                <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                  <img src={img} width="100%" height="100%" alt="student profile" />
                  <div className='profile_img_overlay flex flex-col justify-center items-center'>
                    <input type='file' className="rounded-md w-16" onChange={onImageChange} />

                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4 ">
                  <div className="full_name">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Full Name
                      </span>
                      <input
                        type="text" disabled={toggle ? false : true} defaultValue={facultydetails.basic_info_id.full_name}
                        placeholder="First Name, Middle Name, Last Name"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.full_name && 'border-red-600'}`}
                        {...register("full_name", { required: "Fullname is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                        onKeyUp={() => {
                          trigger('full_name')
                        }}
                      />
                      {errors.full_name && (<small className="text-red-700">{errors.full_name.message}</small>)}
                    </label>
                  </div>
                  <div className="email">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        type="text" disabled={toggle ? false : true}
                        placeholder="Enter Your Email" defaultValue={facultydetails.contact_info_id.email}
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.email && 'border-red-600'}`}
                        {...register("email", { required: "Email is required", pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Please enter valid email" } })}
                        onKeyUp={() => {
                          trigger('email')
                        }}
                      />
                      {errors.email && (<small className="text-red-700">{errors.email.message}</small>)}
                    </label>
                  </div>
                  <div className="whatsapp_no">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        WhatsApp No
                      </span>
                      <input
                        type="text" disabled={toggle ? false : true}
                        placeholder="Enter Your WhatsApp No" defaultValue={facultydetails.contact_info_id.whatsapp_no}
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.whatsapp_no && 'border-red-600'}`}
                        {...register("whatsapp_no", { required: "Whatsapp no is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" }, minLength: { value: 10, message: "Please enter valida whatsapp no" } })}
                        onKeyUp={() => {
                          trigger('whatsapp_no')
                        }}
                      />
                      {errors.whatsapp_no && (<small className="text-red-700">{errors.whatsapp_no.message}</small>)}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4 items-center">


                  <div className="dob">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Date Of Birth
                      </span>
                      <input
                        type="date" disabled={toggle ? false : true} defaultValue={dob}
                        className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm  placeholder-slate-400 outline-none ${errors.dob && 'border-red-600'}`}
                        {...register("dob", { required: "Date of birth is required" })}
                      />

                      {errors.dob && (<small className="text-red-700">{errors.dob.message}</small>)}
                    </label>
                  </div>
                  <div className="gender w-60">
                    <label className="block">
                      <span className="block text-sm font-medium  text-slate-700">
                        Gender
                      </span>
                      <div className={` border  border-slate-300 mt-1 rounded-md h-10 flex justify-center items-center space-x-5 ${errors.gender && 'border-red-600'} `}>
                        <div className="male ">

                          <label for="gender" className="m-2">
                            Male
                          </label>
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male" disabled={toggle ? false : true}
                            checked={gender == 'male' ? 'checked' : ''}
                            className="  hover:cursor-pointer"
                            {...register("gender", { required: "Gender is required" })}
                            onChange={handlemale}
                          />
                        </div>
                        <div className="female">
                          <label for="gender" className="m-2">
                            Female
                          </label>
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female" disabled={toggle ? false : true}
                            checked={gender == 'female' ? 'checked' : ''}
                            className="   hover:cursor-pointer"
                            {...register("gender", { required: "Gender is required" })}
                            onChange={handlefemale}
                          />

                        </div>

                      </div>
                    </label>
                    {errors.gender && (<small className="text-red-700">{errors.gender.message}</small>)}
                  </div>
                  <div className="role">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Role
                      </span>
                      <input
                        type="text" disabled={toggle ? false : true} defaultValue={facultydetails.role}
                        placeholder="Enter Your Role"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.role && 'border-red-600'}`}
                        {...register("role", { required: "Role is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                        onKeyUp={() => {
                          trigger('role')
                        }}
                      />
                      {errors.role && (<small className="text-red-700">{errors.role.message}</small>)}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4">

                  <div className="address">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Address
                      </span>
                      <input
                        type="text" disabled={toggle ? false : true}
                        placeholder="Enter Your Address" defaultValue={facultydetails.contact_info_id.address}
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.address && 'border-red-600'}`}
                        {...register("address", { required: "Address is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                        onKeyUp={() => {
                          trigger('address')
                        }}
                      />
                      {errors.address && (<small className="text-red-700">{errors.address.message}</small>)}
                    </label>
                  </div>
                  <div className="joining_date">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Date Of Joining :
                      </span>
                      <input
                        type="date" disabled={toggle ? false : true} defaultValue={doj}
                        className={`w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.joining_date && 'border-red-600'}`}
                        {...register("joining_date", { required: "Date of joining is required" })}
                      />

                      {errors.joining_date && (<small className="text-red-700">{errors.joining_date.message}</small>)}
                    </label>
                  </div>
                  <div className="btn mt-5 flex justify-center w-60">
                    {!toggle ? (

                      <div
                        onClick={handleedit}
                        className="bg-blue-900 hover:bg-white hover:cursor-pointer border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                      >
                        <FaUserEdit className="text-3xl" />

                        <h1 className=" ml-2 text-xl">Edit</h1>
                      </div>) : null}
                    {toggle ? (
                      <div>
                        <div className="flex  mx-6 border-secondory-text w-fit  space-x-3 rounded-lg">
                          <button
                            type="submit" onClick={hendlecancel}
                            className="bg-blue-900 hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider "
                          >
                            <FaUserEdit className="text-2xl" />

                            <h1 className=" ml-2 text-lg">CANCEL</h1>
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-900 hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider p-1"
                          >
                            <FaUserEdit className="text-2xl" />

                            <h1 className=" ml-2 text-lg">SUBMIT</h1>
                          </button>

                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>




              </div>
            </div>
          </form>
          <div className="pt-10 space-y-5">
            <ReactToPrint
              trigger={() => (
                // <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'>
                <button id='print' className="text-3xl bg-class5-50 rounded-md text-white p-1">
                  <MdLocalPrintshop />
                </button>
                // </Tooltip>
              )}
              content={() => componentRef.current}
              onBeforeGetContent={(e) => {
                return new Promise((resolve) => {
                  setIsPrint(true);
                  resolve();
                });
              }}
              onAfterPrint={() => setIsPrint(false)}
            />

            <div ref={componentRef} className='p-5 pt-3 pb-0'>
              <table class="w-full text-sm text-center bg-class5-50 rounded-xl ">
                <thead class="text-xs text-gray-700 uppercase dark:bg-[#D9D9D9]">
                  <tr className='text-white text-base'>

                    <th scope="col" class="py-7 px-5 text-center ">Total Paid</th>
                    <th scope="col" class="py-7 px-5 text-center ">LastPaid</th>
                    <th scope="col" class="py-7 px-5 text-center ">Date</th>
                    <th scope="col" class={`py-7 px-5 text-center  ${isPrint ? "hidden" : "block"}`}>Action</th>
                  </tr>
                </thead>
                {Totalpaid.length > 0 ? (
                  <tbody className='bg-white border items-center '>

                    <tr class=" border-b">

                      <td class="py-7 px-5 text-center ">
                        {calculateTotalpaid}
                      </td>
                      <td class="py-7 px-5 text-center ">
                        {LastPaid?.transaction_id.amount}
                      </td>
                      <td class="py-7 px-5 text-center ">
                        {date}
                      </td>
                      <td class={`py-7 px-5 text-center  ${isPrint ? "hidden" : "block"}`}>
                        <div className='flex justify-center space-x-2'>
                          <NavLink className="nav-link" to={`/Profilefaculty/Staffhistory/${facultydetails._id}`}>
                            <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-xl text-darkblue-500"><AiFillEye /></a></Tooltip>

                          </NavLink>
                        </div>
                      </td>
                    </tr>




                  </tbody>
                ) : (
                  <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
                    <IoMdInformationCircle className="text-xl text-red-600" />

                    <h1 className="text-red-800">Recipt Not avaiable </h1>
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profilefaculty;















