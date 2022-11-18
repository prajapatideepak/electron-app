import React, { useRef } from "react";
import ReactToPrint from 'react-to-print';
import { MdLocalPrintshop } from 'react-icons/md';
import { Tooltip } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { Facultyhistory } from "../hooks/usePost"
import { useParams } from "react-router-dom";
import Loader from './Loader';



const Staffhistory = () => {

  const navigate = useNavigate();
  const componentRef = useRef();
  const [isPrint, setIsPrint] = React.useState(false);



  // -------------------------------
  // -------- API Works --------
  // -------------------------------
  const params = useParams();
  const [isloading, setloading] = React.useState(true)
  const [facultyhistory, setfacultyhistory] = React.useState(null);
  React.useEffect(() => {
    async function fetchfacultdata() {
      const res = await Facultyhistory(params.id);
      setfacultyhistory(() => res.data)
      setloading(false)
    }
    fetchfacultdata()
  }, [])

  // -----------------------------
  // ---- Table Print Fun --------
  // -----------------------------
  // const componentRef = useRef();
  // const [action , setaction] = React.useState(false)
  // const handlePrint = () => (
  //   setaction(true),
  //  useReactToPrint({
  //   content: () => componentRef.content,

  // })
  // )

  if (isloading) {
    return <Loader />
  }

  return (
    <>

      <div className='lable  text-left flex justify-between items-center mt-0 p-10'>
        <h1 className='text-[#020D46] font-bold text-3xl '>Salary History</h1>
        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
          <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
        </div>
      </div>

      <div className='FeesHistory w-3/4 bg-white p-10 rounded drop-shadow-md ml-40 space-y-5'>


        {/* <div className='btn flex justify-end'  >
          <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'><a href="#" id='print' className="text-3xl bg-darkblue-500 rounded-md text-white p-1  "><MdLocalPrintshop /></a></Tooltip>
        </div> */}
        <ReactToPrint
          trigger={() => (
            // <Tooltip content="Print" placement="bottom-end" className='text-white bg-black rounded p-2'>
            <button id='print' className="text-3xl bg-darkblue-500 rounded-md text-white p-1">
              <MdLocalPrintshop />
            </button>
            // </Tooltip>
          )}
          content={() => componentRef.current}
          onBeforeGetContent={(e) => {
            return new Promise((resolve) => {
              setIsPrint(true);
              resolve();
            });
          }}
          onAfterPrint={() => setIsPrint(false)}
        />

        <div className=" p-5 pt-3 pb-0 " ref={componentRef}>
          <div className="overflow-x-auto relative rounded-lg border  " >
            <table className="w-full text-sm text-left  ">
              <thead className="text-sm uppercase bg-darkblue-500">
                <tr className='text-white'>
                  <th scope="col" className="py-3 px-6 text-center">Reciept No</th>
                  <th scope="col" className="py-3 px-6 text-center">Date</th>
                  <th scope="col" className="py-3 px-6 text-center">Total</th>
                  <th scope="col" className="py-3 px-6 text-center">Admin</th>
                  <th scope="col" className={`py-3 px-6 text-center ${isPrint ? "hidden" : "block"}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  facultyhistory.staff_History.map((item, key) => {
                    console.log(item, "item")
                    console.log(item.date)
                    var today = new Date(item.date);
                    var date =
                      today.getDate() +
                      " / " +
                      (today.getMonth() + 1) +
                      " / " +
                      today.getFullYear();
                    return (
                      <tr className="bg-white border-b">
                        <td className="py-4 px-7 text-center">{item.salary_receipt_id}</td>
                        <td className="py-4 px-7 text-center">{date}</td>
                        <td className="py-4 px-7 text-center">{item.transaction_id.amount}</td>
                        <td className="py-4 px-7 text-center">{item.admin_id.username}</td>
                        <td className={`py-4 px-7 text-center ${isPrint ? "hidden" : "flex"}`}>
                          <div className='flex justify-center space-x-2'>
                            <NavLink className="nav-link" to={`/Staffhistory/Receipt_teacher/${item.salary_receipt_id}`} state={{ isStaff: true, isSalaried: item.is_hourly }}>

                              <Tooltip content="Show" placement="bottom-end" className='text-white bg-black rounded p-2'><span className="text-xl bg-white text-darkblue-500"><AiFillEye /></span></Tooltip>
                            </NavLink>


                          </div>
                        </td>

                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

export default Staffhistory