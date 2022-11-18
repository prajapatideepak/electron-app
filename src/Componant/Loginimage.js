import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Componant/Login";
// import Logo from "../asset/admin_login.jpg";
const logo = require("../asset/admin_login.jpg");
function Loginimage() {
  return (
    <div className="hidden lg:flex flex-1 justify-center items-center sm:hidden">
      <img src={logo} alt="" />
    </div>
  );
}

export default Loginimage;
