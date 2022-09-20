import React from "react";
import { AiFillEye, AiOutlineSearch } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Fess() {
  const [data, setdata] = React.useState([]);

  function loadData() {
    setdata([
      ...data,
      {
        id: 1,
        name: "Prajapati Deepak",
        fees: 1200,
        photo: "images/user.png",
        mobile: "7359150166",
        class: "10th",
      },
    ]);
  }
  return (
    <div className="bg-student-100 m-1 min-h-screen py-10 px-14">
      <div className="">
        <h1 className="text-3xl  font-bold text-darkblue-500">Fess Pay</h1>

        <div className="px-2 py-2 flex mt-7 items-center justify-center">
          <input
            type="text"
            className="w-2/3 shadow-xl px-3 py-2 rounded-l-lg outline-none    "
            placeholder="Search Student (BY : ID , Name , Whatsapp Number)"
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
          <div className="p-4 bg-whrounded">
            <h1 className="font-bold text-2xl text-darkblue-500"> </h1>
            {/* Recipet table  */}
            <div>
              <div className=" bg-white rounded-lg shadow">
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
                          <th className="font-bold text-left pl-10">Profile</th>
                          <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                            Student ID
                          </th>
                          <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                            Name
                          </th>
                          <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                            Mobile
                          </th>
                          <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                            Class
                          </th>
                          <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {data.map((m) => {
                          return (
                            <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                              <td className="pl-10"> 
                              <img
                                src={m.photo}
                                className="w-14 shadow-2xl h-14 rounded-full"
                                alt={m.id}
                                ></img>
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                <span className="font-bold">
                                  {" "}
                                  #{m.id}{" "}
                                </span>
                              </td>
                              <td className=" px-10 lg:px-6 xl:px-0">
                                {m.name}
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                <span className="">
                                  {" "}
                                  {m.mobile}{" "}
                                </span>
                              </td>
                              <td className="px-10 lg:px-6 xl:px-0">
                                <p className="">
                                  <span className="">
                                    {m.class}{" "}
                                  </span>
                                </p>
                              </td>
                              <td className="">
                                <span className="">
                                  <NavLink to={"/reciept/FeesDetail"}>
                                  <button className=" bg-darkblue-500  rounded-lg hover:bg-blue-900  duration-200 transition text-white px-7 font-bold py-2">
                                   Pay
                                 </button>
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

