import React from "react";
import { useForm } from "react-hook-form";
import { BsFillKeyFill } from "react-icons/bs";
import { IoMdUnlock } from "react-icons/io";
import { IoMdLock } from "react-icons/io";

const Changepassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    resetField,
  } = useForm();

  const onSubmit = (data) => {
    if (data.newpassword !== data.confirmpassword) {
      document.getElementById("msg").style.display = "flex";
    } else {
      document.getElementById("msg").style.display = "none";
    }
  };

  const handleClick = () => {
    resetField("oldpassword");
    resetField("newpassword");
    resetField("confirmpassword");
  };

  return (
    <>
      <section className="flex justify-center items-center absolute" style={{height: '100%'}}>
        <div className="flex w-3/5 h-3/5 overflow-hidden rounded-md bg-white shadow-lg">
            <div className="lg:flex flex-1 justify-center items-center sm:hidden">
              <img src="/images/changePassword.jpg" alt="changePassword"/>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center bg-[#E9EFFD]">
                <div className="mb-10">
                    <h2 className="text-3xl text-[#0F0673] font-bold tracking-wider">Change Password</h2>
                </div>
           <form className="flex justify-center items-center" onSubmit={handleSubmit(onSubmit)} >
            <div className="">
              <div className=" flex flex-col items-center gap-5">
                <div className="oldpassword">
                  <label className="relative block">
                    <span className="absolute flex items-center pl-2 mt-2">
                      <BsFillKeyFill className="h-5 w-5 fill-slate-500" />
                    </span>
                    <input type="text" placeholder="Enter Old Password" className={`w-60 mt-1 block py-2 pl-9 pr-3 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.oldpassword && "border-red-600"}`}
                      {...register("oldpassword", {
                        required: "Old password is required",
                      })}
                      onKeyUp={() => {
                        trigger("oldpassword");
                      }}/>
                    {errors.oldpassword && (<small className="text-red-700"> {errors.oldpassword.message} </small>
                    )}
                  </label>
                </div>
              </div>
              <div className=" flex flex-col items-center gap-5 mt-5">
                <div className="newpassword">
                  <label className="relative block">
                    <span className="absolute flex items-center pl-2 mt-2">
                      <IoMdUnlock className="h-5 w-5 fill-slate-500" />
                    </span>
                    <input type="text" id="newpassword" placeholder="Enter New Password" className={`w-60 mt-1 block py-2 pl-9 pr-3 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${ errors.newpassword && "border-red-600"}`}
                      {...register("newpassword", {
                        required: "New password is required",
                      })}
                      onKeyUp={() => {
                        trigger("newpassword");
                      }}/>
                    {errors.newpassword && (<small className="text-red-700"> {errors.newpassword.message} </small>
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
                    <input type="text" id="confirmpassword" placeholder="Enter Confirm Password" className={`w-60 mt-1 block py-2 pl-9 pr-3 bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${ errors.confirmpassword && "border-red-600"}`}
                      {...register("confirmpassword", {
                        required: "Confirm password is required",
                      })}
                      onKeyUp={() => {
                        trigger("confirmpassword");
                      }}/>
                    {errors.confirmpassword && (<small className="text-red-700">{errors.confirmpassword.message} </small>
                    )}
                    <small className="text-red-700 hidden" id="msg">Confirm password not match</small>
                  </label>
                </div>
              </div>
              <div className=" flex flex-col items-center gap-5">
                <div className="flex lg:flex-row md:flex-col gap-4">
                  <div className="btn mt-5 flex justify-between w-60">
                    <button type="button" onClick={handleClick} className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider">
                      Clear
                    </button>
                    <button type="submit" className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
           </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Changepassword;