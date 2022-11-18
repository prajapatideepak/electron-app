import React from "react";
import { HiPlus } from "react-icons/hi"
import { GiTeacher } from "react-icons/gi"
import { FaUsers } from "react-icons/fa"
import Cards from '../asset/cards';



export default function Main() {

    return <div className="">
        <div className=" pt-5">
            <div className="flex justify-between items-center p-5 pl-8">
                <h1 className="text-3xl ">
                    Welcome Nasir
                </h1>
                <div className="button flex items-center space-x-4">
                    <button id="year-btn" className=" flex items-center text-white rounded-full px-4 p-2 bg-darkblue-500  space-x-2 ">
                            <HiPlus className="bg-white text-darkblue-500 rounded-full text-2xl"/>
                        <h1>New Student</h1>
                    </button>

                    <button id="year-btn" className=" flex items-center  bg-white p-3 py-1 rounded-full shadow-2xl space-x-1 ">
                        <select name="" id="" className="cursor-pointer text-darkblue-500 ">
                            <option value="Select">Select Year</option>
                            <option value="2022">2022</option>
                        </select>
                        {/* <FiChevronDown/> */}
                    </button>
                </div>
            </div>
        </div>
        <div className="pt-0 grid grid-cols-2 items-center justify-between">
                <div className="left  ">
                    <img src="../images/desk.webp" alt="" className=" " />
                </div>
                <Cards/>
        </div>
    </div>
}
                   


