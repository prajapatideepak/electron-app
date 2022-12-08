import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useCreateAdmin } from "../hooks/usePost";
import { toast } from "react-toastify";
import FormData from "form-data";

export const Addadmin = () => {
  const [img, setImg] = useState("/images/user.png");
  const createPost = useCreateAdmin();

  React.useEffect(() => {
    if (createPost.isSuccess) {
      toast.success("Registration SuccuesFull");
    }
    if (createPost.isError) {
      toast.error(createPost.error.response.data.error);
    }
  }, [createPost.isSuccess, createPost.isError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const OnSubmit = (data) => {
    createPost.mutate(data);
  };

  const handleClick = (e) => {
    reset();
  };

  return (
      <div className="flex justify-center items-center bg-[#f5f7ff] absolute w-full h-full">
        <div className=" h-2/3 mx-auto opacity-100 shadow-2xl rounded bg-white w-3/4 z-50 mt-[-30px] ">
          <div className="">
            <div className="">
              <h1 className="text-2xl font-bold text-darkblue-500 text-center py-7 ">
                Admin Registration
              </h1>

              <form
                className="flex justify-center items-center "
                onSubmit={handleSubmit(OnSubmit)}
                encType="multipart/form-data"
              >
                <div className=" w-full grid grid-cols-1 rounded-lg truncate bg-white pb-5  ">
                  <div className=" flex flex-col items-center gap-4">
                    <div className="flex lg:flex-row  gap-4">
                      <div className="username">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Username
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your username"
                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.username && "border-red-600"
                            }`}
                            {...register("username", {
                              required: "username is required",
                              pattern: {
                                value: /^[A-Za-z0-9]+$/,
                                message: "Please enter only characters",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("username");
                            }}
                          />
                          {errors.username && (
                            <small className="text-red-700">
                              {errors.username.message}
                            </small>
                          )}
                        </label>
                      </div>
                      <div className="Password">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Password
                          </span>
                          <input
                            type="password"
                            placeholder="Enter Your Password"
                            className={` xl:w-52 2xl:w-60 mt-1 block px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.password && "border-red-600"
                            }`}
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 4,
                                message: "Please enter atleast 4 characters",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("password");
                            }}
                          />
                          {errors.password && (
                            <small className="text-red-700">
                              {errors.password.message}
                            </small>
                          )}
                        </label>
                      </div>
                      <div className="pin">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Security Pin
                          </span>
                          <input
                            type="input"
                            placeholder="Enter Security Pin"
                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.security_pin && "border-red-600"
                            }`}
                            {...register("security_pin", {
                              required: "Security Pin is required",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Please enter only numbers",
                              },
                               minLength: {
                                value: 4,
                                message: "Please enter atleast 4 digits",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("security_pin");
                            }}
                          />

                          {errors.security_pin && (
                            <small className="text-red-700">
                              {errors.security_pin.message}
                            </small>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="flex lg:flex-row   gap-4 ">
                      <div className="fullname">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Full Name
                          </span>
                          <input
                            type="text"
                            placeholder="First Name, Middle Name, Last Name"
                            className={`xl:w-52 2xl:w-60 mt-1 block px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.full_name && "border-red-600"
                            }`}
                            {...register("full_name", {
                              required: "Fullname is required",
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Please enter only characters",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("full_name");
                            }}
                          />
                          {errors.full_name && (
                            <small className="text-red-700">
                              {errors.full_name.message}
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
                            type="text"
                            placeholder="Enter Your Email"
                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.email && "border-red-600"
                            }`}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please enter valid email",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("email");
                            }}
                          />
                          {errors.email && (
                            <small className="text-red-700">
                              {errors.email.message}
                            </small>
                          )}
                        </label>
                      </div>
                      <div className="whatsappno">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            WhatsApp No
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your WhatsApp No"
                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.whatsapp_no && "border-red-600"
                            }`}
                            {...register("whatsapp_no", {
                              required: "Whatsapp no is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter only numbers",
                              },
                              minLength: {
                                value: 10,
                                message: "Please enter valid whatsapp no",
                              },
                              maxLength: {
                                value: 10,
                                message: "Please enter valid whatsapp no",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("whatsapp_no");
                            }}
                          />
                          {errors.whatsapp_no && (
                            <small className="text-red-700">
                              {errors.whatsapp_no.message}
                            </small>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="flex lg:flex-row  gap-4">
                      <div className="mobileno">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Mobile No
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your Mobile No"
                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.mobileno && "border-red-600"
                            }`}
                            {...register("mobileno", {
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter only numbers",
                              },
                              minLength: {
                                value: 10,
                                message: "Please enter valida mobile no",
                              },
                              maxLength: {
                                value: 10,
                                message: "Please enter valid mobile no",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("mobileno");
                            }}
                          />
                          {errors.mobileno && (
                            <small className="text-red-700">
                              {errors.mobileno.message}
                            </small>
                          )}
                        </label>
                      </div>
                      <div className="dateofbirth">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Date Of Birth
                          </span>
                          <input
                            type="date"
                            className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.dob && "border-red-600"
                            }`}
                            {...register("dob", {
                              required: "Date of birth is required",
                            })}
                          />

                          {errors.dob && (
                            <small className="text-red-700">
                              {errors.dob.message}
                            </small>
                          )}
                        </label>
                      </div>
                      <div className="gender">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Gender
                          </span>
                          <div
                            className={`xl:w-52 2xl:w-60 border border-slate-300 mt-1  rounded-md h-10 flex justify-center items-center space-x-5 outline-none ${
                              errors.gender && "border-red-600"
                            }`}
                          >
                            <div className="male ">
                              <label htmlFor="gender" className="m-2">
                                Male
                              </label>
                              <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Male"
                                className="  hover:cursor-pointer"
                                {...register("gender", {
                                  required: "Gender is required",
                                })}
                              />
                            </div>
                            <div className="female">
                              <label htmlFor="gender" className="m-2">
                                Female
                              </label>
                              <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                className="   hover:cursor-pointer"
                                {...register("gender", {
                                  required: "Gender is required",
                                })}
                              />
                            </div>
                          </div>
                        </label>
                        {errors.gender && (
                          <small className="text-red-700">
                            {errors.gender.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="flex lg:flex-row  gap-4">
                      <div className="qualification">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Qualification
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your Qualification"
                            className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.qualification && "border-red-600"
                            }`}
                            {...register("qualification", {
                              required: "Qualification is required",
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Please enter only characters",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("qualification");
                            }}
                          />
                          {errors.qualification && (
                            <small className="text-red-700">
                              {errors.qualification.message}
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
                            type="text"
                            placeholder="Enter Your Address"
                            className={`xl:w-52 2xl:w-60 mt-1 block px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.address && "border-red-600"
                            }`}
                            {...register("address", {
                              required: "Address is required",
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Please enter only characters",
                              },
                            })}
                            onKeyUp={() => {
                              trigger("address");
                            }}
                          />
                          {errors.address && (
                            <small className="text-red-700">
                              {errors.address.message}
                            </small>
                          )}
                        </label>
                      </div>
                      <div className="dateofjoining">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Date Of Joining
                          </span>
                          <input
                            type="date"
                            className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${
                              errors.dateofjoining && "border-red-600"
                            }`}
                            {...register("dateofjoining", {
                              required: "Date of joining is required",
                            })}
                          />

                          {errors.dateofjoining && (
                            <small className="text-red-700">
                              {errors.dateofjoining.message}
                            </small>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="flex lg:flex-row   gap-10">
                      <div className="btn mt-5 flex justify-center w-60">
                        <button
                          type="button"
                          className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                          onClick={handleClick}
                        >
                          Clear
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-900  hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                        >
                          <h1 className="">
                            {createPost.isLoading
                              ? "Saving..."
                              : createPost.isSuccess
                              ? "Saved !"
                              : createPost.isError
                              ? "Error"
                              : "Submit"}
                          </h1>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};
