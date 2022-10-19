import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Componant/Login";
import Loginimage from "../Componant/Loginimage";

function AdminLogin({ setUser }) {
  return (
    <section className="h-full w-full flex justify-center items-center ">
      <div className="flex w-full h-screen overflow-hidden ">
        <Loginimage />
        <div className="flex flex-1 flex-col justify-center items-center bg-[#E9EFFD]">
          <Login />
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
