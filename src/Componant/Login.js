import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginAdmmin } from "../hooks/usePost";
import { toast } from "react-toastify";
import Loginimage from "./Loginimage";
import { getToken, setToken } from "../AuthProvider";

const Login = ({ setUser }) => {
  const requestLogin = useLoginAdmmin();
  React.useEffect(() => {
    console.log(requestLogin);
    if (requestLogin.isSuccess) {
      toast.success("Login SuccuesFull");
      setToken("token", requestLogin.data.token);
      setUser(() => {
        return getToken("token");
      });
    }
    if (requestLogin.isError) {
      toast.error(requestLogin.error.response.data.error);
    }
  }, [requestLogin.isSuccess, requestLogin.isError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    requestLogin.mutate(data);
    console.log(data);
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
                type="submit"
                className="border-2 bg-[#494BF5] w-64 py-2 rounded-md hover:bg-[#7D97F4]"
              >
                <span className="text-white">
                  {requestLogin.isLoading ? "Login......" : "Login"}
                </span>
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
