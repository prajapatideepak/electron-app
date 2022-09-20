import React from "react";
import { AiFillEye, AiOutlineSearch } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function ReciptScreen() {
  const [data, setdata] = React.useState([]);

  function loadData() {
    setdata([
      ...data,
      {
        id: 324,
        name: "Monu mistri",
        paid: 720,
        discount: 80,
        total: 800,
        admin: "Sadik Ali",
        mobile: "7359150166",
        date: "22/10/22",
      },
    ]);
  }
  return (
    <div className="bg-student-100 m-1 min-h-screen py-10 px-14">
      <div className="">
      
        <h1 className="text-3xl  font-bold text-darkblue-500">Recipt</h1>

        <div className="px-2 py-2 flex mt-7 items-center justify-center">
          <input
            type="text"
            className="w-2/3 shadow-xl px-3 py-2 rounded-l-lg outline-none    "
            placeholder="Search Recipt  (BY : ID , Name , Whatsapp Number)"
          ></input>
          <button
            onClick={loadData}
            className="bg-darkblue-500 px-2 py-1 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
          >
            <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-white transition duration-400" />
          </button>
        </div>
      </div>

      <div className="p-4 mt-8 ">
        {data.length > 0 ? (
          <div className="p-4 bg-whrounded  ">
            <h1 className="font-bold text-2xl text-darkblue-500"> </h1>
            {/* Recipet table  */}
            <div className="">
              <div className=" bg-white rounded-lg shadow mb-14">
                <div className="border rounded-lg border-gray-100">
                  <div className="py-4 md:py-6 pl-8">
                    <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                      Student List
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <thead>
                        <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                          <th className="font-normal text-left pl-10">Date</th>
                          <th className="font-normal text-left  px-10 lg:px-6 xl:px-0">
                            Reciept No
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Student Name
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Paid
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Discount
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            total
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Admin
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Detail
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {data.map((m) => {
                          return (
                            <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                              <td className="pl-8">{m.date}</td>
                              <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                #{m.id}
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                {m.name}
                              </td>
                              <td className="font-medium px-10 lg:px-6 xl:px-0">
                                <span className="bg-green-200 px-4 text-green-900 font-bold rounded">
                                  {" "}
                                  {m.paid}{" "}
                                </span>
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                <p className="">
                                  <span className="bg-red-200 px-4 text-red-900 font-bold rounded">
                                    {m.discount}{" "}
                                  </span>
                                </p>
                              </td>
                              <td>
                                <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                  {m.total}
                                </span>
                              </td>
                              <td>
                                <span>{m.admin}</span>
                              </td>
                              <td className="px-5  ">
                                <span>
                                  <NavLink to={"/reciept/recipet"}>
                                    <AiFillEye className="text-xl cursor-pointer" />
                                  </NavLink>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className=" bg-white rounded-lg shadow">
                <div className="border rounded-lg border-gray-100">
                  <div className="py-4 md:py-6 pl-8">
                    <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                      Staff List
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <thead>
                        <tr className="bg-gray-100 h-16 w-full text-sm leading-none font-bold text-darkblue-500">
                          <th className="font-normal text-left pl-10">Date</th>
                          <th className="font-normal text-left  px-10 lg:px-6 xl:px-0">
                            Reciept No
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Staff Name
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Salary Type
                          </th>
                       
                        
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Amount
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Admin
                          </th>
                          <th className="font-normal text-left px-10 lg:px-6 xl:px-0">
                            Detail
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {data.map((m) => {
                          return (
                            <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                              <td className="pl-8">{m.date}</td>
                              <td className=" px-10 font-bold lg:px-6 xl:px-0">
                                #{m.id}
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                {m.name}
                              </td>
                              <td className="px-10 lg:px-6 xl:px-4 ">
                                <span className="">
                                  {" "}
                                  {m.paid}{" "}
                                </span>
                              </td>
                             
                              <td>
                                <span className="bg-blue-200 px-4 text-darkblue-500 font-bold rounded">
                                  {m.total}
                                </span>
                              </td>
                              <td>
                                <span>{m.admin}</span>
                              </td>
                              <td className="px-5  ">
                                <span>
                                  <NavLink to={"/reciept/recipet"}>
                                    <AiFillEye className="text-xl cursor-pointer" />
                                  </NavLink>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
            <IoMdInformationCircle className="text-xl text-red-600" />

            <h1 className="text-red-800">Recipt Not avaiable </h1>
          </div>
        )}
      </div>
    </div>
  );
}
