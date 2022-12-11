import React, { useEffect, useState, useRef } from "react";
import { set, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io"
import { AiFillEye } from 'react-icons/ai';
import { Tooltip } from "@material-tailwind/react";
import { FaUserEdit } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import '../Styles/Studentform.css';
import { useParams } from "react-router-dom";
import { Facultydetails, Facultyhistory, Update_faculty } from "../hooks/usePost";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Validator from '../hooks/validator';
import { AxiosError } from 'axios';


// --------------------------------------
// -------- Validation Library -----------
// --------------------------------------
const valid = new Validator();
valid.register({
  photo: {
    required: [false],
  },
  full_name: {
    required: [true, 'Full name is required'],
    pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
  },
  email: {
    required: [true, 'Email is required'],
    pattern: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter valid email"]
  },
  whatsapp_no: {
    required: [true, 'Whatsapp number is required'],
    pattern: [/^[0-9]*$/, "Please enter only numbers"],
    length: [10, "Number should be of 10 digits"]
  },
  alternate_no: {
    required: [false],
    pattern: [/^[0-9]*$/, "Please enter only numbers"],
    length: [10, "Number should be of 10 digits"]
  },
  dob: {
    required: [true, 'Date of birth is required']
  },
  gender: {
    required: [false]
  },
  role: {
    required: [true, 'Role is required'],
    pattern: [/^[A-Za-z ]+$/, "Please enter only characters"]
  },
  address: {
    required: [true, 'Address is required']
  },
  joining_date: {
    required: [true, 'Joining date is required']
  },
})

const Profilefaculty = () => {

  // --------------------------------------
  // -------- UseSatate -------------------
  // --------------------------------------
  const componentRef = useRef();
  const form = useRef(null);
  const [isEnable, setIsEnable] = useState(true);
  const [isPrint, setIsPrint] = useState(false);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);
  const params = useParams();
  const [facultysalary, setfacultysalary] = React.useState([]);
  const [Totalpaid, setTotalpaid] = React.useState([]);
  const [isloading, setloading] = React.useState(true)
  const [gender, setgender] = useState("");
  const [state, setState] = React.useState(true);
  const [photo, setphoto] = useState();
  const [call, setcall] = React.useState(true)
  const server = "http://localhost:4000/";
  const defaultImage = "http://localhost:4000/user_default@123.png";
  const [img, setImg] = useState(defaultImage);
  const [Dob, setDob] = useState();
  const [Doj, setDoj] = useState();
  const Toaster = () => { toast.success('Profile updated successfully') }
  const errtoast = () => { toast.error("Something Wrong") }
  const navigate = useNavigate();
  const [toggle, setToggle] = React.useState(false)
  const [oldFacultyDetails, setOldFacultyDetails] = useState({});
  const [data, setdata] = useState({})
  const [studDetails, setStudDetails] = useState({}); //Only used to pass data to next page
  const [facultyInputController, setFacultyInputController] = useState({
    photo: '',
    full_name: '',
    email: '',
    whatsapp_no: '',
    alternate_no: '',
    dob: '',
    gender: '',
    role: '',
    address: '',
    joining_date: '',
  })

  // ---------------------------------------------------------------------------------
  // -----------------------  API WORKS   --------------------------------------------
  // ---------------------------------------------------------------------------------
  let faculty_details
  let facul_data
  const setfacultydetails = () => {
    faculty_details = faculty_details.data.one_staff_Details;
    setStudDetails(faculty_details)
    let dob = new Date(faculty_details.basic_info_id.dob);
    dob = `${dob.getFullYear()}-${dob.getMonth() + 1 < 10 ? "0" + (dob.getMonth() + 1) : dob.getMonth() + 1}-${dob.getDate() < 10 ? "0" + dob.getDate() : dob.getDate()}`

    let joining_date = new Date(faculty_details.joining_date);
    joining_date = `${joining_date.getFullYear()}-${joining_date.getMonth() + 1 < 10 ? "0" + (joining_date.getMonth() + 1) : joining_date.getMonth() + 1}-${joining_date.getDate() < 10 ? "0" + joining_date.getDate() : joining_date.getDate()}`

    facul_data = {
      id: faculty_details._id,
      photo: faculty_details.basic_info_id.photo,
      full_name: faculty_details.basic_info_id.full_name,
      email: faculty_details.contact_info_id.email,
      whatsapp_no: faculty_details.contact_info_id.whatsapp_no,
      alternate_no: faculty_details.contact_info_id.alternate_no != '' ? faculty_details.contact_info_id.alternate_no : '--',
      dob: dob,
      gender: faculty_details.basic_info_id.gender,
      role: faculty_details.role,
      address: faculty_details.contact_info_id.address,
      joining_date: joining_date,
    }
    const photo = faculty_details.basic_info_id.photo;
    setImg(photo != '' ? server + photo : defaultImage)
    setFacultyInputController(facul_data)

    setOldFacultyDetails(facul_data)

    valid.fieldsValue = {
      full_name: facul_data.full_name ?? facul_data.full_name,
      email: facul_data.email ?? facul_data.email,
      whatsapp_no: facul_data.whatsapp_no ?? facul_data.whatsapp_no,
      alternate_no: facul_data.alternate_no ?? facul_data.alternate_no,
      dob: facul_data.dob ?? facul_data.dob,
      gender: facul_data.gender ?? facul_data.gender,
      role: facul_data.role ?? facul_data.role,
      address: facul_data.address ?? facul_data.address,
      joining_date: facul_data.joining_date ?? facul_data.joining_date,
    }
  }


  // --------------------------------
  // ------ form_details API --------
  // --------------------------------
  useEffect(() => {
    async function facultdata() {
      try {
        faculty_details = await Facultydetails(params.id);
        if (!faculty_details.data.success) {
          Toaster('error', faculty_details.data.message)
          return navigate(-1);
        }
        setfacultydetails();
        setloading(false)
      } catch (err) {
        if (err instanceof AxiosError) {
          Toaster('error', err.response.data.message);
        }
        else {
          Toaster('error', err.message);
        }
        return navigate(-1);
      }

    }
    facultdata()
  }, [call])

  const staff_id = params.id
  // -----------------------------------------------------------------------------
  // ------------------------------Table_details----------------------------------
  // -----------------------------------------------------------------------------
  useEffect(() => {
    async function fetchfacultdata() {
      const res = await Facultyhistory(staff_id);
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

  // -------------------------------
  // -------- Profile Image --------
  // -------------------------------
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };


  // --------------------------
  // -------- Form Eror -------
  // --------------------------
  const {
    formState: { errors },
  } = useForm();

  // --------------------------------
  // ------  Input Value Fatch ------- 
  // --------------------------------
  function handleChange(e) {
    e.preventDefault()

    let name = e.target.name;
    let value = e.target.value;

    valid.validate({
      fieldName: name,
      value: value
    })

    setFacultyInputController((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    });
  }

  // --------------------------------
  // ------  Send Data in API ------- 
  // --------------------------------
  const onSubmit = async (data) => {
    Object.assign(data, { photo: data.photo, staff_id })

    const formdata = new FormData(form.current);
    const http = img.split(':')
    let photo_name = '';
    if (http[0] == 'http') {
      photo_name = img.split("/")[3]
    }
    formdata.append('photo_name', photo_name);
    setIsLoadingOnSubmit(true);
    try {
      const res = await Update_faculty(staff_id, formdata)
      setIsLoadingOnSubmit(false);
      if (res.data.success == true) {
        Toaster()
        setcall(!call)
        setIsEnable(true)
        setToggle(false);
      }
    } catch (error) {
      setIsLoadingOnSubmit(false);
      if (error instanceof AxiosError) {
        Toaster('error', error.response.data.message);
      }
      else {
        Toaster('error', error.message);
      }

    }
  }

  // --------------------------------
  // ------ Form details Edit  ------- 
  // --------------------------------
  function handleedit(e) {
    e.preventDefault();
    setIsEnable(false)
    setToggle(true);
    setFacultyInputController((prevData)=>{
      return {
        ...prevData,
        alternate_no : facultyInputController.alternate_no == '--' ? '' : facultyInputController.alternate_no
      }
    })
  }

  // --------------------------------
  // ------ Form Edit Cancel ------- 
  // --------------------------------
  function hendlecancel(e) {
    e.preventDefault();
    setFacultyInputController(oldFacultyDetails)
    setState(valid.clearErrors())
    setIsEnable(true);
    setToggle(false);
  }

  if (isloading) {
    return <Loader />
  }

  return (
    <>
      <div className="title  flex items-center justify-between  m-5 pt-4">

        <h1 className="text-3xl text-center font-medium text-[#020D46] ">
          Profile
        </h1>
        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
          <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
        </div>
      </div>
      <section className=" p-10 pt-3 ">
        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10  space-y-5 w-full">
          <form ref={form} className="flex justify-center items-center "
            onSubmit={(e) => setState(valid.handleSubmit(e, onSubmit))} >
            <div className=" w-full grid grid-cols-1 rounded-lg  truncate  pb-5 pt-10 ">
              <div className=" flex flex-col items-center gap-4">
                <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                  <img src={img} name="photo_name" width="100%" height="100%" alt="student profile" />
                  {
                    !isEnable
                      ?
                      <div className='profile_img_overlay flex flex-col justify-center items-center'>
                        <input type='file' id="file" name="photo" className="rounded-md w-16" onChange={onImageChange} accept=".png, .jpg, .jpeg" />
                        {
                          img != defaultImage
                            ?
                            <button
                              className='bg-red-600 px-1 rounded text-white hover:bg-red-400 mt-5 flex items-center justify-center gap-3' onClick={() => {
                                setImg(defaultImage);
                                document.getElementById('file').value = ''
                              }}>
                              <span> Remove</span>
                            </button>
                            :
                            null
                        }
                      </div>
                      :
                      null
                  }
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4 ">
                  <div className="full_name">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Full Name
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        value={facultyInputController.full_name}
                        placeholder="First Name, Middle Name, Last Name"
                        name="full_name"
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md 
                        text-sm shadow-sm placeholder-slate-400 outline-none ${valid.errors?.full_name != '' && 'border-red-600'}`}
                        onChange={handleChange}
                      />
                      {valid.errors?.full_name != '' ? <small className="text-red-600 mt-3">*{valid.errors?.full_name}</small> : null}
                    </label>
                  </div>
                  <div className="email">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Email *
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        placeholder="Enter Your Email"
                        name="email"
                        value={facultyInputController.email}
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border 
                         border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                         ${valid.errors?.email != '' && 'border-red-600'}
                         `}
                        onChange={handleChange}
                      />
                      {valid.errors?.email != '' ? <small className="text-red-600 mt-3">*{valid.errors?.email}</small> : null}
                    </label>
                  </div>
                  <div className="whatsapp_no">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        WhatsApp No
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        placeholder="Enter Your WhatsApp No"
                        name="whatsapp_no"
                        value={facultyInputController.whatsapp_no}
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                         placeholder-slate-400 outline-none 
                         ${valid.errors?.whatsapp_no != '' && 'border-red-600'}
                         `}
                        onChange={handleChange}
                      />
                      {valid.errors?.whatsapp_no != '' ? <small className="text-red-600 mt-3">*{valid.errors?.whatsapp_no}</small> : null}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4 items-center">
                  <div className="alternate_no">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Mobile No
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        placeholder="Enter Your Mobile No"
                        name="alternate_no"
                        value={facultyInputController.alternate_no}
                        className={`w-60 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                         placeholder-slate-400 outline-none 
                         ${valid.errors?.alternate_no != '' && 'border-red-600'}
                         `}
                        onChange={handleChange}
                      />
                      {valid.errors?.alternate_no != '' ? <small className="text-red-600 mt-3">*{valid.errors?.alternate_no}</small> : null}
                    </label>
                  </div>
                  <div className="dob">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Date Of Birth
                      </span>
                      <input
                        type="date"
                        disabled={isEnable}
                        defaultValue={facultyInputController.dob}
                        name="dob"
                        className="w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm  placeholder-slate-400 outline-none"
                        onChange={handleChange}
                      />
                      {valid.errors?.dob != '' ? <small className="text-red-600 mt-3">*{valid.errors?.dob}</small> : null}
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
                            value="male"
                            disabled={isEnable}
                            checked={facultyInputController.gender.toLowerCase() == 'male'}
                            className="  hover:cursor-pointer"
                            onChange={handleChange}
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
                            value="female"
                            disabled={isEnable}
                            checked={facultyInputController.gender.toLowerCase() == 'female'}
                            className="   hover:cursor-pointer"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </label>
                    {valid.errors?.gender != '' ? <small className="text-red-600 mt-3">*{valid.errors?.gender}</small> : null}
                  </div>

                </div>
                <div className="">
                  <div className="flex lg:flex-row md:flex-col gap-4 ">
                    <div className="role">
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                          Role
                        </span>
                        <input
                          type="text"
                          disabled={isEnable}
                          value={facultyInputController.role}
                          placeholder="Enter Your Role"
                          name="role"
                          className={`w-60 mt-1 block w-full px-3 py-2 bg-white border 
                         border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                          ${valid.errors?.role != '' && 'border-red-600'}`}
                          onChange={handleChange}
                        />
                        {valid.errors?.role != '' ? <small className="text-red-600 mt-3">*{valid.errors?.role}</small> : null}
                      </label>
                    </div>
                    <div className="address">
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                          Address
                        </span>
                        <input
                          type="text"
                          disabled={isEnable}
                          placeholder="Enter Your Address"
                          value={facultyInputController.address}
                          name="address"
                          className={`w-60 mt-1 block w-full px-3 py-2 bg-white border 
                           border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                            ${valid.errors?.address != '' && 'border-red-600'}`}
                          onChange={handleChange}
                        />
                        {valid.errors?.address != '' ? <small className="text-red-600 mt-3">*{valid.errors?.address}</small> : null}
                      </label>
                    </div>
                    <div className="joining_date">
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                          Date Of Joining :
                        </span>
                        <input
                          type="date"
                          disabled={isEnable}
                          defaultValue={facultyInputController.joining_date}
                          name="joining_date"
                          className="w-60 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none"
                          onChange={handleChange}
                        />
                        {valid.errors?.joining_date != '' ? <small className="text-red-600 mt-3">*{valid.errors?.joining_date}</small> : null}
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="btn mt-5 flex justify-center w-60 ml-5">
                      {!toggle ? (
                        <button type="button" onClick={handleedit} className="py-2 px-8 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center">
                          <FaUserEdit className="text-xl" />Edit
                        </button>
                      ) :
                        null}
                      {toggle ? (
                        <div>
                          <div className="flex  pl-3 border-secondory-text w-fit  space-x-3 rounded-lg">
                            <button type="button" onClick={hendlecancel} className="py-2 px-4 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center">
                              <FaUserEdit className="text-xl" />Cancel
                            </button>
                            <button type="submit" disabled={isLoadingOnSubmit}
                              className={`py-2 px-3 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white 
                          ${isLoadingOnSubmit ? 'opacity-40' : 'opacity-100'} hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center`}>
                              <FaUserEdit className="text-xl" />
                              {isLoadingOnSubmit ? 'Loading...' : 'SUBMIT'}
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="pt-10 space-y-5">
            <div className="ml-5 flex items-center text-gray-700">
              <h3 className="text-2xl font-medium">Salary Details</h3>
            </div>
            <div ref={componentRef} className='p-5 pt-3 pb-0'>
              <table className="w-full text-sm text-center rounded-xl overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-class3-50">
                  <tr className='text-white text-base'>

                    <th scope="col" className="py-4 px-6 text-center ">Total Paid</th>
                    <th scope="col" className="py-4 px-6 text-center ">LastPaid</th>
                    <th scope="col" className="py-4 px-6 text-center ">Date</th>
                    <th scope="col" className={`py-4 px-6 text-center  ${isPrint ? "hidden" : "block"}`}>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white border items-center '>
                  {Totalpaid.length > 0 ? (

                    <tr className=" border-b">

                      <td className="py-5 px-6 text-center ">
                        {calculateTotalpaid}
                      </td>
                      <td className="py-5 px-6 text-center ">
                        {LastPaid?.transaction_id.amount}
                      </td>
                      <td className="py-5 px-6 text-center ">
                        {date}
                      </td>
                      <td className={`py-5 px-6 text-center  ${isPrint ? "hidden" : "block"}`}>
                        <div className='flex justify-center space-x-2'>
                          <NavLink className="nav-link" to={`/Profilefaculty/Staffhistory/${facultyInputController.id}`} state={{ faculty_name: facultyInputController.full_name }}>
                            <Tooltip content="Show History" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" class="text-xl text-darkblue-500"><AiFillEye /></a></Tooltip>

                          </NavLink>
                        </div>
                      </td>
                    </tr>

                  ) : (
                    <tr className="">
                      <td colSpan={7} className="bg-red-200  font-bold p-2 rounded">
                        <div className="flex space-x-2 justify-center items-center">

                          <IoMdInformationCircle className="text-xl text-red-600" />
                          <h1 className="text-red-800">Receipt not found </h1>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default Profilefaculty;















