import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateAdmin } from "../hooks/usePost";
import { NasirContext } from "../NasirContext";
import "../Styles/Studentform.css";

const Updateprofile = () => {
  const { admin } = React.useContext(NasirContext);

  const [img, setImg] = useState("/images/user.png");
  const [data, setData] = React.useState(admin);
  const [date, setDate] = React.useState("");
  const [basic_info_id, setBasicinfoid] = React.useState({});
  const [contact_info_id, setContactinfoid] = React.useState({});
  const [isEdiable, setEditable] = React.useState(false);

  const updateAdmin = useUpdateAdmin();

  React.useEffect(() => {
    if (updateAdmin.isSuccess) {
      toast.success("Updated Data");
    }
    if (updateAdmin.isError) {
      toast.error(updateAdmin.error.response.data.error);
    }
  }, [updateAdmin.isSuccess, updateAdmin.isError]);

  React.useEffect(() => {
    setBasicinfoid(() => admin?.staff_id?.basic_info_id);
    setContactinfoid(() => admin?.staff_id?.contact_info_id);

    if (admin) {
      setDate(
        new Date(admin?.staff_id?.basic_info_id?.dob)
          ?.toISOString()
          .slice(0, 10)
      );
    }
  }, [admin]);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm();

  console.log(data);
  const onSubmit = () => {
    delete basic_info_id._id;
    delete contact_info_id._id;
    const adminData = {
      basic_info_id,
      contact_info_id,
      username: data.username,
      security_pin: data.security_pin,
    };

    updateAdmin.mutate(adminData);
    reset();
  };

  const handleClick = () => {
    resetField("fullname");
    resetField("email");
    resetField("whatsappno");
    resetField("mobileno");
    resetField("dateofbirth");
    resetField("security_pin");
    resetField("address");
  };

  return (
    <>
      {admin ? (
        <section className="">
          <form
            className="flex justify-center items-center "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-2/3 grid grid-cols-1 rounded-lg drop-shadow-md truncate bg-white p-10 my-10">
              <div className="title mb-5">
                <h1 className="text-3xl text-center font-medium text-[#020D46]">
                  Update Profile
                </h1>
              </div>
              <div className=" flex flex-col items-center gap-5">
                <div className="profile_img_div border-2 border-gray-500 shadow-lg">
                  <img
                    src={img}
                    width="100%"
                    height="100%"
                    alt="student profile"
                  />
                  <div className="profile_img_overlay flex flex-col justify-center items-center">
                    <input
                      //disabled={!isEdiable}
                      type="file"
                      className="rounded-md w-16"
                      onChange={onImageChange}
                    />
                  </div>
                </div>
                <div div className="flex lg:flex-row md:flex-col gap-4 mt-7">
                  <div className="fullname">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Full Name
                      </span>
                      <input
                        // disabled={false}
                        type="text"
                        value={basic_info_id?.full_name}
                        onChange={(e) =>
                          setBasicinfoid({
                            ...basic_info_id,
                            full_name: e.target.value,
                          })
                        }
                        placeholder="First Name, Middle Name, Last Name"
                        className={`w-72 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.fullname && "border-red-600"
                        }`}
                        // // {...register("fullname", {
                        // //   required: "Fullname is required",
                        // //   pattern: {
                        // //     value: /^[A-Za-z ]+$/,
                        // //     message: "Please enter only characters",
                        // //   },
                        // // })}
                        // onKeyUp={() => {
                        //   trigger("fullname");
                        // }}
                      />
                      {errors.fullname && (
                        <small className="text-red-700">
                          {" "}
                          {errors.fullname.message}{" "}
                        </small>
                      )}
                    </label>
                  </div>
                  <div className="email">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        // disabled={!isEdiable}
                        type="text"
                        value={contact_info_id?.email || " ..."}
                        onChange={(e) =>
                          setContactinfoid({
                            ...contact_info_id,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter Your Email"
                        className={`w-72 mt-1 block px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.email && "border-red-600"
                        }`}
                        // {...register("email", {
                        //   required: "Email is required",
                        //   pattern: {
                        //     value:
                        //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        //     message: "Please enter valid email",
                        //   },
                        // })}
                        // onKeyUp={() => {
                        //   trigger("email");
                        // }}
                      />
                      {errors.email && (
                        <small className="text-red-700">
                          {" "}
                          {errors.email.message}{" "}
                        </small>
                      )}
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
                        // disabled={!isEdiable}
                        type="text"
                        placeholder="Enter Your WhatsApp No"
                        value={contact_info_id?.whatsapp_no}
                        onChange={(e) =>
                          setContactinfoid({
                            ...contact_info_id,
                            whatsapp_no: e.target.value,
                          })
                        }
                        className={`w-72 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.whatsappno && "border-red-600"
                        }`}
                        // {...register("whatsappno", {
                        //   required: "Whatsapp no is required",
                        //   pattern: {
                        //     value: /^[0-9]*$/,
                        //     message: "Please enter only numbers",
                        //   },
                        //   minLength: {
                        //     value: 10,
                        //     message: "Please enter valida whatsapp no",
                        //   },
                        // })}
                        // onKeyUp={() => {
                        //   trigger("whatsappno");
                        // }}
                      />
                      {errors.whatsappno && (
                        <small className="text-red-700">
                          {" "}
                          {errors.whatsappno.message}{" "}
                        </small>
                      )}
                    </label>
                  </div>
                  <div className="mobileno">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Mobile No
                      </span>
                      <input
                        // disabled={!isEdiable}
                        type="text"
                        value={contact_info_id?.alternative_no}
                        onChange={(e) =>
                          setContactinfoid({
                            ...contact_info_id,
                            alternative_no: e.target.value,
                          })
                        }
                        placeholder="Enter Your Mobile No"
                        className={`w-72 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.mobileno && "border-red-600"
                        }`}
                        // {...register("mobileno", {
                        //   required: "Mobile no is required",
                        //   pattern: {
                        //     value: /^[0-9]*$/,
                        //     message: "Please enter only numbers",
                        //   },
                        //   minLength: {
                        //     value: 10,
                        //     message: "Please enter valida mobile no",
                        //   },
                        // })}
                        // onKeyUp={() => {
                        //   trigger("mobileno");
                        // }}
                      />
                      {errors.mobileno && (
                        <small className="text-red-700">
                          {" "}
                          {errors.mobileno.message}{" "}
                        </small>
                      )}
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
                        // disabled={!isEdiable}
                        type="text"
                        value={data?.security_pin}
                        onChange={(e) =>
                          setData({ ...data, security_pin: e.target.value })
                        }
                        placeholder="Enter Your Security pin"
                        className={`w-72 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.security_security_pin && "border-red-600"
                        }`}
                        // {...register("security_security_pin", {
                        //   required: "security_security_pin is required",
                        //   pattern: {
                        //     value: /^[A-Za-z1-9 ]+$/,
                        //     message: "Please enter only characters",
                        //   },
                        // })}
                        // onKeyUp={() => {
                        //   trigger("security_security_pin");
                        // }}
                      />
                      {errors.security_security_pin && (
                        <small className="text-red-700">
                          {" "}
                          {errors.security_security_pin.message}{" "}
                        </small>
                      )}
                    </label>
                  </div>
                  <div className="address">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Address
                      </span>
                      <input
                        // disabled={!isEdiable}

                        type="text"
                        value={contact_info_id?.address}
                        onChange={(e) =>
                          setContactinfoid({
                            ...contact_info_id,
                            address: e.target.value,
                          })
                        }
                        placeholder="Enter Your Address"
                        className={`w-72 mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.address && "border-red-600"
                        }`}
                        // {...register("address", {
                        //   required: "Address is required",
                        //   pattern: {
                        //     value: /^[A-Za-z ]+$/,
                        //     message: "Please enter only characters",
                        //   },
                        // })}
                        // onKeyUp={() => {
                        //   trigger("address");
                        // }}
                      />
                      {errors.address && (
                        <small className="text-red-700">
                          {" "}
                          {errors.address.message}{" "}
                        </small>
                      )}
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
                        // disabled={!isEdiable}
                        type="date"
                        value={date}
                        className={`w-72 hover:cursor-pointer mt-1 block w-full px-3 py-2 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                          errors.dateofbirth && "border-red-600"
                        }`}
                        {...register("dateofbirth", {
                          required: "Date of birth is required",
                        })}
                      />
                      {errors.dateofbirth && (
                        <small className="text-red-700">
                          {" "}
                          {errors.dateofbirth.message}{" "}
                        </small>
                      )}
                    </label>
                  </div>
                  <div className="btn mt-5 flex justify-between w-72">
                    <button
                      type="button"
                      onClick={handleClick}
                      className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                    >
                      Clear
                    </button>
                    {isEdiable ? (
                      <button
                        type="button"
                        // onClick={(e) => setEditable(!isEdiable)}
                        onClick={(e) => setEditable(true)}
                        className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                      >
                        Update
                      </button>
                    )}
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
