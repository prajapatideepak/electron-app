import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate , useLocation } from "react-router-dom";
import { Facultydetails, salarypay } from "../hooks/usePost"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Componant/Loader";




export default function Salary() {
  const location = useLocation()
  // ------------------------
  // ----- All Usestate ------
  // ------------------------
  const [is_hourly, setishourly] = React.useState('0');
  const [isloading, setloading] = React.useState(true)
  const [fee, setFee] = React.useState('');
  const [amount, setamount] = React.useState(false);
  const [payment, setPayment] = React.useState('');
  const [paymenterror, setpaymenterror] = React.useState(false);
  const [cash, setcash] = React.useState(true);
  const [upi, setupi] = React.useState(false);
  const [chaque, setchaque] = React.useState(false);
  const [chaqueno, setchaqueno] = React.useState('');
  const [upierror, setupierror] = React.useState(false);
  const [chaqueerror, setchaqueerror] = React.useState(false);
  const [amounterror, setamounterror] = React.useState(false);
  const [upino, setupino] = React.useState('');
  const [toggle, setToggle] = React.useState(false);
  const [model, setModel] = React.useState(false);
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState(false);
  const [salaryData, setSalaryData] = React.useState({
    hour: "",
    amount: "",
  });

  const admin = {
    id: 42,
    name: "Shad rajput ",
  };

  // --------------------------------
  // ----- Corrent_Date_formate ------
  // -------------------------------
  var today = new Date();
  var date =
    today.getDate() +
    " / " +
    (today.getMonth() + 1) +
    " / " +
    today.getFullYear();

  // ------------------------
  // ----- Payment_type ------
  // ------------------------
  function handleCash(e) {
    setPayment(e.target.value)
    setcash(true)
    setupi(false)
    setchaque(false)
    setupino("")
    setchaqueno("")
  }
  function handleUpi(e) {
    setPayment(e.target.value);
    setcash(false)
    setupi(true)
    setchaque(false)
    setchaqueno("")

  }
  function handleCheque(e) {
    setPayment(e.target.value);
    setcash(false)
    setupi(false)
    setchaque(true)
    setupino("")

  }



  // ------------------------
  // ----- salary_type ------
  // ------------------------
  function handleFixed(e) {
    setFee("");
    setamount(false)
    setishourly(e.target.value);
    setToggle(false);

  }

  function handleLecture(e) {
    setishourly(e.target.value);
    setToggle(true);
    setamount(true)
    setFee("");
  }


  // ------------------------------------
  // ----- Chaque_number Validation ------
  // ------------------------------------
  function genreciept() {
    let error = 0
    if (fee == "") {
      error++;
      setamounterror(true)
    }
    if (upi && upino == "") {
      return setupierror(true)
    }
    if (chaque && chaqueno == "") {
      return setchaqueerror(true)
    }



    if (error > 0) {
      return;
    } else {
      setModel(true);

    }
  }
  // ------------------------
  // ----- Payment_PIN ------
  // ------------------------
  const regtoast = () => { toast.success("Salary Reciept Genrate Successfully!!") }
  const errtoast = () => { toast.success("Something Wrong") }
  const navigate = useNavigate();
  async function handlePINsubmit() {
    const gen_reciept = ({
      staff_id: params.id,
      is_hourly: is_hourly,
      admin: admin.name,
      name: faculty.basic_info_id.full_name,
      is_by_cheque: chaque ? 1 : 0,
      is_by_upi: upi ? 1 : 0,
      is_by_cash: cash ? 1 : 0,
      cheque_no: payment == 3 ? chaqueno : -1,
      upi_no: payment == 2 ? upino : '-1',
      amount: fee,
      total_amount: fee,
      total_hours: salaryData.hour,
      rate_per_hour: salaryData.amount,
    });
    console.log(gen_reciept)
    const SPIN = 1111;
    if (pin == SPIN) {

       const res = await salarypay(gen_reciept)
      console.log(res.data.data.salaryreceipt.salary_receipt_id, "res")
       if (res.data.success == true) {
         const salary_receipt_id = res.data.data.salaryreceipt.salary_receipt_id
        // navigate(`/salary/Receipt_teacher/${salary_receipt_id}`) 
        
        navigate(`/salary/Receipt_teacher/${salary_receipt_id}`, { state: { prevPath: "generate_receipt" } });
        regtoast()
      } else {
         errtoast({
           invalid_pin: res.data.message
         });
       }

    } else {
      setError(true);
    }
  }

  // ----------------------------------
  // ----- Lecturedbase_calculation ------
  // ------------------------------------
  function calculateSalary() {
    setFee(salaryData.hour * salaryData.amount);
    setToggle(false);
  }

  // -----------------------
  // ----- API WORKS -------
  // -----------------------
  const params = useParams();

  const [faculty, setfaculty] = React.useState();
  React.useEffect(() => {
    async function fetchfacultdata() {
      const res = await Facultydetails(params.id);
      setfaculty(() => res.data.one_staff_Details)
      setloading(false)
    }
    fetchfacultdata()
  }, [])

  if (isloading) {
    return <Loader />
  }

  return (
    <>
    <div className="relative bg-student-100 py-6">
      {model && (
        <div className="flex justify-center mt-4   bg-white ">
          <div className="absolute h-2/5 mx-auto  opacity-100 shadow-2xl rounded      bg-white w-2/3 z-50">
            <div className="flex justify-end">
              <button
                onClick={(e) => setModel(!model)}
                className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700"
              >
                <AiFillCloseCircle />
              </button>
            </div>

            <div className="mt-7">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-darkblue-500 px-6 ">
                  Confirm Payment{" "}
                </h1>

              </div>
              <div className="flex  justify-between px-7 py-3">
                <div>
                  <h1 className="font-bold uppercase">Name :{faculty.basic_info_id.full_name}</h1>

                </div>
                <div className="text-sm">
                  <h4>Date : {date}</h4>
                </div>
              </div>

              <div className="flex px-12 py-5  space-x-4">
                <span className="px-4 py-1 bg-green-200 text-green-900 font-bold text-sm rounded shadow-xl ">
                  Paid : {fee}
                </span>

                <span className="px-4 py-1 bg-blue-200 text-darkblue-500 font-bold text-sm rounded shadow-xl ">
                  Total : {fee}
                </span>
              </div>


              <div className="flex justify-between">
                <div className="px-6 py-3 font-bold text-darkblue-500 ">
                  <h2>* Paid by :  {payment == 1 ? 'cash' : payment == 2 ? 'UPI' : 'Cheque'}</h2>
                  {payment != 1 ? <h2>* {payment == 2 ? "UPI NO" : payment == 3 ? "Cheque No" : null} :  {payment == 2 ? upino : payment == 3 ? chaqueno : null}</h2> : null}
                  <h3 >* Recived by  : <span className="uppercase">{admin.name}</span></h3>
                </div>
                <div>

                  <div className="border-2 mx-8 mt-6  w-fit flex items-center border-secondory-text">
                    <input
                      type="text"
                      className="p-1 px-3 outline-none "
                      placeholder="Enter Security PIN"
                      onChange={(e) => setPin(e.target.value)}
                    />
                    <button
                      className="px-4 py-1 bg-darkblue-500 text-white "
                      onClick={handlePINsubmit}
                    >
                      Submit
                    </button>
                  </div>
                  {error && (
                    <h1 className=" text-red-700  mx-7 text-sm px-1 my-1 font-bold">
                      {" "}
                      Please Enter Valid PIN
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`mt-2 bg-student-100 min-h-screen px-12  py-6 ${model && "opacity-5"
          } `}
      >
        <h1 className="font-bold text-3xl text-darkblue-500 ">
          Generate Salary Reciept
        </h1>
        <div className="bg-white px-1 py-5 mt-9 shadow-2xl rounded-2xl ">
          <div className="flex pt-4  justify-between  relative">
            <div className="space-y-2 px-7 text-sm ">

              <h2 className="font-bold text-lg uppercase ">Name : {faculty?.basic_info_id.full_name} </h2>
            </div>
            <div className="p-6 pt-0 font-serif">
              <h3 className=""> Date : {date}</h3>
            </div>
          </div>




          <div className="flex justify-between ">
            <div className="left ">
              <div className="salary_type">
                <div className="flex items-center space-x-2 py-4 px-6">
                  <strong className="text-xl"> Salary Type :</strong>
                  <input
                    type="radio"
                    name="salary"
                    id="fixed"
                    className=""
                    checked={is_hourly == 0 ? "checked" : ""}
                    value="0"
                    onChange={handleFixed}
                  />
                  <span> Fixed Salary </span>

                  <input
                    type="radio"
                    name="salary"
                    id="lectured"
                    className=""
                    value="1"
                    checked={is_hourly == 1 ? "checked" : ""}
                    onClick={handleLecture}
                  />
                  <span> Per Lecture </span>
                </div>
                {toggle ? (
                  <div>
                    <div className="flex border-2 mx-6 border-secondory-text w-fit  rounded-lg">
                      <h1> </h1>
                      <input
                        type="text"
                        placeholder="Enter Total hour"
                        className=" placeholder-black p-1 outline-none border-2 m-1"
                        value={salaryData.hour}
                        onChange={(e) =>
                          setSalaryData({ ...salaryData, hour: e.target.value })
                        }
                      />

                      <input
                        type="text"
                        placeholder="Enter Rate "
                        className=" placeholder-black outline-none p-1 border-2 m-1"
                        value={salaryData.amount}
                        onChange={(e) =>
                          setSalaryData({ ...salaryData, amount: e.target.value })
                        }
                      />

                      {
                        <button
                          className="bg-darkblue-500 font-bold text-white px-5"
                          onClick={calculateSalary}
                        >
                          Submit
                        </button>
                      }
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex px-6 justify-between items-center pt-4">
                <div className="flex items-center border-2  shadow-2xl border-secondory-text w-fit  rounded-3xl">
                  <span className="py-2 bg-darkblue-500 text-white mr-4 font-bold border-2 border-secondory-text rounded-full p-2">
                    <FaRupeeSign />
                  </span>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    disabled={amount}
                    className="px-2  mr-4 text-xl font-bold outline-none w-20"
                    value={fee}
                    onChange={(e) => { setFee(e.target.value); setamounterror(false) }}
                  />

                </div>
              </div>{amounterror && (
                <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                  {" "}
                  Please Enter Amount
                </h1>
              )}
            </div>

            <div className=" right payment_type mt-2">
              <div className="">
                <div className="flex items-center space-x-2 py-4 px-6">
                  <strong className="text-xl">By : </strong>
                  <input
                    type="radio"
                    name="paymethod"
                    id="Cash"
                    className=""
                    value="1"
                    checked={cash == true ? "checked" : ""}

                    onChange={handleCash}
                  />
                  <span> Cash </span>
                  <input
                    type="radio"
                    name="paymethod"
                    id="upi"
                    className=""
                    value="2"
                    checked={upi == true ? "checked" : ""}

                    onChange={handleUpi}
                  />
                  <span> UPI </span>
                  <input
                    type="radio"
                    name="paymethod"
                    id="cheque"
                    className=""
                    value="3"
                    checked={chaque == true ? "checked" : ""}
                    onChange={handleCheque}
                  />
                  <span> Cheque </span>
                </div>
                {upi ? (
                  <div>
                    <div className="flex border-2 mx-6 border-darkblue-500 w-fit ">
                      <h1> </h1>
                      <input
                        type="text"
                        placeholder="Enter UPI Number"
                        className=" placeholder-black p-1"
                        name="upi_no"
                        value={upino}
                        onChange={(e) => { setupino(e.target.value); setupierror(false) }}
                      />
                    </div>{upierror && (
                      <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                        {" "}
                        Please Enter UPI Number
                      </h1>
                    )}
                  </div>
                ) : null}
                {chaque ? (
                  <div>
                    <div className="flex border-2 mx-6 border-darkblue-500 w-fit ">
                      <h1> </h1>
                      <input
                        type="text"
                        placeholder="Enter Chaque Number"
                        className=" placeholder-black p-1 active:outline-none"
                        name="cheque_no"
                        value={chaqueno}
                        onChange={(e) => { setchaqueno(e.target.value); setchaqueerror(false) }}
                      />

                    </div>{chaqueerror && (
                      <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                        {" "}
                        Please Enter Chaque Number
                      </h1>
                    )}
                  </div>
                ) : null}

              </div>
            </div>
          </div>





          <div className="text-sm flex justify-between items-center uppercase font-bold font-mono mt-4 ">
            <h1 className="px-6"> admin : {admin.name}</h1>
            <button
              className="px-7  mx-7 py-2 text-base tracking-widest
           font-semibold uppercase bg-darkblue-500
            text-white 
            
            transition
            duration-500   
            rounded-md 
            hover:shadow-2xl
            

            "
              onClick={genreciept}
            >
              Generate
            </button>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}
