import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateAdmin } from "../hooks/usePost";
import { NasirContext } from "../NasirContext";
import "../Styles/Studentform.css";
import { useNavigate } from "react-router-dom";
import Validator from "../hooks/validator";
import { AxiosError } from "axios";
import { FaUserEdit } from "react-icons/fa";
import Toaster from "../hooks/showToaster";

const valid = new Validator();
valid.register({
  photo: {
    required: [false],
  },
  full_name: {
    required: [true, "Field is required"],
    pattern: [/^[A-Za-z ]+$/, "Please enter only characters"],
  },
  email: {
    required: [true, "Field is required"],
    pattern: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email",
    ],
  },
  whatsapp_no: {
    required: [true, "Field is required"],
    pattern: [/^[0-9]*$/, "Please enter only numbers"],
    length: [10, "Number should be of 10 digits"],
  },
  alternate_no: {
    required: [false],
    pattern: [/^[0-9]*$/, "Please enter only numbers"],
    length: [10, "Number should be of 10 digits"],
  },
  security_pin: {
    required: [true, "Field is required"],
    pattern: [/^[0-9]*$/, "Please enter only numbers"],
    minLength: [4, "Security pin should be of at least 4 digits"],
  },
  dob: {
    required: [true, "Field is required"],
  },
  address: {
    required: [true, "Address is required"],
  },
});

const Updateprofile = () => {
  const { admin } = React.useContext(NasirContext);
  const [img, setImg] = useState("images/user.png");
  const [data, setData] = React.useState({ admin });
  const [date, setDate] = React.useState("");
  const [basic_info_id, setBasicinfoid] = React.useState({});
  const [contact_info_id, setContactinfoid] = React.useState({});
  const [isEdiable, setEditable] = React.useState(false);
  const updateAdmin = useUpdateAdmin();

  const { changeSection } = React.useContext(NasirContext);
  const navigate = useNavigate();
  const [isloading, setloading] = React.useState(true);
  const server = "http://localhost:4000/";
  const [toggle, setToggle] = React.useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const defaultImage = "http://localhost:4000/user_default@123.png";
  const [oldadminDetails, setOldadminyDetails] = useState({});
  const [state, setState] = React.useState(true);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);
  const [newDate, setnewDate] = useState("");
  const [studDetails, setadminDetails] = useState({}); //Only used to pass data to next page
  const [adminInputController, setadminInputController] = useState({
    photo: "",
    full_name: "",
    email: "",
    whatsapp_no: "",
    alternate_no: "",
    security_pin: "",
    address: "",
    dob: "",
  });

  let admin_details;
  let admin_data;
  const setadmin = () => {
    admin_details = admin_details;
    setadminDetails(admin_details);

    let dob = new Date(admin_details?.staff_id?.basic_info_id?.dob);
    dob = `${dob.getFullYear()}-${
      dob.getMonth() + 1 < 10 ? "0" + (dob.getMonth() + 1) : dob.getMonth() + 1
    }-${dob.getDate() < 10 ? "0" + dob.getDate() : dob.getDate()}`;

    admin_data = {
      photo: admin_details?.staff_id?.basic_info_id.photo,
      full_name: admin_details?.staff_id?.basic_info_id.full_name,
      email: admin_details?.staff_id?.contact_info_id.email,
      whatsapp_no: admin_details?.staff_id?.contact_info_id.whatsapp_no,
      alternate_no:
        admin_details?.staff_id?.contact_info_id.alternate_no == ""
          ? "--"
          : admin_details?.staff_id?.contact_info_id.alternate_no,
      security_pin: admin_details?.security_pin,
      address: admin_details?.staff_id?.contact_info_id.address,
      dob: dob,
    };

    const photo = admin_details?.staff_id?.basic_info_id.photo;
    setImg(photo != "" ? server + photo : defaultImage);
    setadminInputController(admin_data);

    setOldadminyDetails(admin_data);

    valid.fieldsValue = {
      full_name: admin_data.full_name ?? admin_data.full_name,
      email: admin_data.email ?? admin_data.email,
      whatsapp_no: admin_data.whatsapp_no ?? admin_data.whatsapp_no,
      alternate_no: admin_data.alternate_no ?? admin_data.alternate_no,
      security_pin: admin_data.security_pin ?? admin_data.security_pin,
      dob: admin_data.dob ?? admin_data.dob,
      address: admin_data.address ?? admin_data.address,
    };
  };
  React.useEffect(() => {
    async function admindata() {
      try {
        admin_details = await admin;
        setadmin();
        setloading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          Toaster("error", err.response.data.message);
        } else {
          Toaster("error", err.message);
        }
      }
    }
    admindata();
  }, [admin]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm();

  function handleedit(e) {
    e.preventDefault();
    setadminInputController((prevData) => {
      return {
        ...prevData,
        alternate_no:
          adminInputController.alternate_no == "--"
            ? ""
            : adminInputController.alternate_no,
      };
    });
    setIsEnable(false);
    setToggle(true);
  }

  function handleCancel(e) {
    e.preventDefault();
    setState(valid.clearErrors());
    let dob = new Date(admin?.staff_id?.basic_info_id?.dob);
    dob = `${dob.getFullYear()}-${
      dob.getMonth() + 1 < 10 ? "0" + (dob.getMonth() + 1) : dob.getMonth() + 1
    }-${dob.getDate() < 10 ? "0" + dob.getDate() : dob.getDate()}`;

    setadminInputController(() => {
      return {
        full_name: admin?.staff_id?.basic_info_id.full_name,
        email: admin?.staff_id?.contact_info_id.email,
        whatsapp_no: admin?.staff_id?.contact_info_id.whatsapp_no,
        alternate_no:
          admin?.staff_id?.contact_info_id.alternate_no == ""
            ? "--"
            : admin?.staff_id?.contact_info_id.alternate_no,
        security_pin: admin?.security_pin,
        address: admin?.staff_id?.contact_info_id.address,
        dob: dob,
      };
    });
    setIsEnable(true);
    setToggle(false);
  }

  function handleChange(e) {
    e.preventDefault();

    let name = e.target.name;
    let value = e.target.value;

    valid.validate({
      fieldName: name,
      value: value,
    });

    setadminInputController((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  React.useEffect(() => {
    if (updateAdmin.isSuccess) {
      Toaster("success", "Profile Updated Successfully");
      localStorage.removeItem("section");
      changeSection();
    }
  }, [updateAdmin.isSuccess]);
  const onSubmit = async (data) => {
    data.dob = newDate;
    updateAdmin.mutate(data);
    reset();
  };

  return (
    <>
      {admin ? (
        <section className="">
          <form
          className="flex justify-center items-center  w-full h-full"
            onSubmit={(e) => setState(valid.handleSubmit(e, onSubmit))}
          >
            <div className="w-2/3 grid grid-cols-1 rounded-lg drop-shadow-md truncate bg-white p-10 my-10">
              <div className="title mb-5">
                <h1 className="text-3xl text-center font-medium text-[#020D46]">
                  Update Profile
                </h1>
              </div>
              <div className=" flex flex-col items-center gap-5">
                <div div className="flex lg:flex-row md:flex-col gap-4 mt-7">
                  <div className="fullname">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Full Name
                      </span>
                      <input
                        type="text"
                        name="full_name"
                        disabled={isEnable}
                        value={adminInputController.full_name}
                        onChange={handleChange}
                        placeholder="First Name, Middle Name, Last Name"
                        className={`w-72 mt-1 block  px-3 py-2 bg-white border  border-slate-300 
                        rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                        ${valid.errors?.full_name != "" && "border-red-600" }
                        `}
                      />
                      {valid.errors?.full_name != "" ? (
                        <small className="text-red-600 mt-3">
                          *{valid.errors?.full_name}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="email">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        name="email"
                        value={adminInputController.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className={`w-72 mt-1 block px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm 
                        shadow-sm placeholder-slate-400 outline-none
                        ${valid.errors?.email != "" && "border-red-600"}
                        `}
                      />
                      {valid.errors?.email != "" ? (
                        <small className="text-red-600 mt-3">
                          *{valid.errors?.email}
                        </small>
                      ) : null}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4">
                  <div className="whatsappno">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        WhatsApp No
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        name="whatsapp_no"
                        placeholder="Enter Your WhatsApp No"
                        value={adminInputController.whatsapp_no}
                        onChange={handleChange}
                        className={`w-72 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm 
                        shadow-sm placeholder-slate-400 outline-none
                        ${valid.errors?.whatsapp_no != "" && "border-red-600"}
                        `}
                      />
                      {valid.errors?.whatsapp_no != "" ? (
                        <small className="text-red-600 mt-3">
                          *{valid.errors?.whatsapp_no}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="mobileno">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Mobile No
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        name="alternate_no"
                        value={adminInputController.alternate_no}
                        onChange={handleChange}
                        placeholder="Enter Your Mobile No"
                        className={`w-72 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm 
                        shadow-sm placeholder-slate-400 outline-none
                        ${valid.errors.alternate_no != "" && "border-red-600"}
                        `}
                      />
                      {valid.errors?.alternate_no != "" ? (
                        <small className="text-red-600 mt-3">
                          *{valid.errors?.alternate_no}
                        </small>
                      ) : null}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4">
                  <div className="security_pin">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Security pin
                      </span>
                      <input
                        type="text"
                        disabled={isEnable}
                        name="security_pin"
                        value={adminInputController.security_pin}
                        onChange={handleChange}
                        placeholder="Enter Your Security pin"
                        className={`w-72 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm 
                        shadow-sm placeholder-slate-400 outline-none
                         ${
                           valid.errors.security_pin != "" && "border-red-600"
                         }`}
                      />
                      {valid.errors?.security_pin != "" ? (
                        <small className="text-red-600 mt-3">
                          *{valid.errors?.security_pin}
                        </small>
                      ) : null}
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
                        value={adminInputController.address}
                        onChange={handleChange}
                        name="address"
                        placeholder="Enter Your Address"
                        className={`w-72 mt-1 block w-full px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm
                         placeholder-slate-400 outline-none
                          ${valid.errors.address != "" && "border-red-600"}`}
                      />
                      {valid.errors?.address != "" ? (
                        <small className="text-red-600 mt-3">
                          *{valid.errors?.address}
                        </small>
                      ) : null}
                    </label>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col gap-4">
                  <div className="dateofbirth">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Date Of Birth
                      </span>
                      <input
                        disabled={isEnable}
                        type="date"
                        name="dob"
                        onChange={(e) => setnewDate(e.target.value)}
                        defaultValue={adminInputController.dob}
                        className={`w-72 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 
                        rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                         ${valid.errors.dob != "" && "border-red-600"}`}
                      />
                      {valid.errors.dob && (
                        <small className="text-red-700">
                          {" "}
                          {valid.errors.dob.message}{" "}
                        </small>
                      )}
                    </label>
                  </div>
                  <div className="btn mt-5 flex justify-end w-72">
                    {!toggle ? (
                      <button
                        type="button"
                        onClick={handleedit}
                        className="py-2 px-8 w-full gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center"
                      >
                        <FaUserEdit className="text-xl" />
                        Edit
                      </button>
                    ) : null}
                    {toggle ? (
                      <div>
                        <div className="flex  pl-3 border-secondory-text w-fit  space-x-3 rounded-lg">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="py-2 px-4 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center"
                          >
                            <FaUserEdit className="text-xl" />
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isLoadingOnSubmit}
                            className={`py-2 px-3 gap-2 bg-darkblue-500  hover:bg-white border-2 hover:border-darkblue-500 text-white 
                          ${
                            isLoadingOnSubmit ? "opacity-40" : "opacity-100"
                          } hover:text-darkblue-500 font-medium rounded-md tracking-wider flex justify-center items-center`}
                          >
                            <FaUserEdit className="text-xl" />
                            {isLoadingOnSubmit ? "Loading..." : "SUBMIT"}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      ) : (
        "......"
      )}
    </>
  );
};

export default Updateprofile;
