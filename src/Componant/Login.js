import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <section className="h-full w-full flex justify-center items-center ">
        <div className="login">
          <div className="mb-10">
            <h2 className="text-3xl text-[#0F0673] font-bold text-center tracking-wider">
              Admin Login
            </h2>
          </div>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center"
          >
            <div className="mt-3 sm:px-5 flex flex-col">
              <input
                type="text"
                {...register("username", { required: "Field is required" })}
                className={`border-2 outline-none rounded-md h-10 w-64  px-2 ${
                  errors.username && "border-red-600"
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <small className="text-red-700 mt-2">
                  {errors.username.message}
                </small>
              )}
            </div>
            <div className="mt-3 flex flex-col">
              <input
                type="password"
                {...register("password", { required: "Field is required" })}
                className={`border-2 outline-none rounded-md h-10 w-64 px-2 ${
                  errors.password && "border-red-600"
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <small className="text-red-700 mt-2">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="mt-10">
              <button
                onClick={(e) => setUser(false)}
                className="border-2 bg-[#494BF5] w-64 py-2 rounded-md hover:bg-[#7D97F4]"
              >
                <span className="text-white">Login</span>
              </button>
            </div>
          </form>
          <div className="mt-5 flex justify-center">
            <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
              Forgot Password?
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
