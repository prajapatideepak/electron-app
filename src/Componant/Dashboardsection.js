import React from "react";
import { NavLink } from "react-router-dom";
import { GiSchoolBag } from "react-icons/gi";
import { TbSchool } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import Loginimage from "../Componant/Loginimage";
import { getToken, setToken } from "../AuthProvider";
import { NasirContext } from "../NasirContext";

const Dashboardsection = () => {
  const { changeSection, section } = React.useContext(NasirContext);
  function handleSectionChange(s) {
    setToken("section", s);
    changeSection();
  }
  return (
    <>
      <section className="h-full w-full flex justify-center items-center ">
        <div className="flex w-full h-screen overflow-hidden ">
          <div className="hidden lg:flex flex-1 justify-center items-center sm:hidden">
            <img src="images/20943993.jpg" alt="" />
          </div>

          <div className="flex flex-1 flex-col justify-center items-center bg-[#E9EFFD]">
            <div className="dashboardselection mb-28">
              <div className="mb-5">
                <h2 className="text-3xl text-[#0F0673] font-bold tracking-wider">
                  Dashboard Selection
                </h2>
              </div>
              <div className="btn flex justify-center ">
                <div>
                  <div
                    onClick={(e) => handleSectionChange("primary")}
                    className="primary flex items-center justify-between bg-[#fec7c2] text-[#0F0673] mb-5 w-60 py-2 rounded-xl cursor-pointer   hover:bg-[#fe786c]"
                  >
                    <div className="flex items-center justify-start mx-2">
                      <GiSchoolBag className="text-2xl mx-2 " />
                      <h1 className="font-semibold text-lg">Primary</h1>
                    </div>
                    <div className="mt-1 mr-3 ">
                      <BiChevronRight className=" text-2xl font-extrabold" />
                    </div>
                  </div>
                  <div
                    onClick={(e) => handleSectionChange("secondary")}
                    className="primary flex items-center justify-between bg-[#fec7c2] text-[#0F0673] mb-5 w-60 py-2 rounded-xl cursor-pointer   hover:bg-[#fe786c]"
                  >
                    <div className="flex items-center justify-start mx-2">
                      <TbSchool className="text-2xl mx-2 " />
                      <h1 className="font-semibold text-lg">Secondary</h1>
                    </div>
                    <div className="mt-1 mr-3 ">
                      <BiChevronRight className=" text-2xl font-extrabold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboardsection;
