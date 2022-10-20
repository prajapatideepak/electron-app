import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function FeesDetail({ match }) {
  const [data] = React.useState([
    {
      id: 1,
      name: "Prajapati Deepak",
      fees: 8000,
      photo: "images/deepak.png",
      mobile: "7359150166",
      class: "10th",
      stream: "Commerce",
      rollno: "09",
      batch: "2022-23",
    },
    {
      id: 2,
      name: "Shad Rajput",
      fees: 1200,
      photo: "images/deepak.png",
      mobile: "7359150166",
      class: "10th",
      stream: "Commerce",
    },
    {
      id: 1,
      name: "Sadikali Don",
      fees: 1200,
      photo: "images/deepak.png",
      mobile: "7359150166",
      class: "10th",
    },
    {
      id: 1,
      name: "monu sarpanch",
      fees: 1200,
      photo: "images/deepak.png",
      mobile: "7359150166",
      class: "10th",
    },
    {
      id: 1,
      name: "inayat khalil",
      fees: 8000,
      photo: "images/deepak.png",
      mobile: "7359150166",
      class: "10th",
    },
  ]);

  const student = data[0];
  const [fee, setFee] = React.useState(0);
  const [discount, setDiscount] = React.useState("");
  const [payment, setPayment] = React.useState("cash");
  const [toggle, setToggle] = React.useState(false);

  const [deduction, setDeduction] = React.useState(0);
  const [show, setShow] = React.useState(true);
  const [model, setModel] = React.useState(false);
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState();
  const [feesData, setFeesData] = React.useState({});

  const admin = {
    id: 42,
    name: "Shad rajput ",
  };

  React.useEffect(() => {
    setFee(student.fees / 10);
    console.log("gg");
  }, [student]);

  var today = new Date();
  var date =
    today.getDate() +
    " / " +
    (today.getMonth() + 1) +
    " / " +
    today.getFullYear();

  function handleDiscount() {
    let d = (fee * discount) / 100;
    setFee(fee - d);
    setDeduction(d);
    setShow(false);
  }

  function handlePayemnt(e) {
    setPayment(e.target.value);
    setToggle(false);
  }

  function handleCheque(e) {
    setPayment(e.target.value);
    setToggle(true);
  }

  const navigate = useNavigate();
  function handlePINsubmit() {
    setFeesData({
      name: student.name,
      stream: student.stream,
      rollno: student.rollno,
      batch: student.batch,
      date: date,
      paid: fee,
      discount: deduction,
      total: fee + deduction,
      method: payment,
      admin: admin.name,
    });
    const SPIN = 1111;
    console.log("Clicked");
    // eslint-disable-next-line eqeqeq
    if (pin == SPIN) {
      console.log(pin);

      navigate("/reciept/recipet", feesData);
    } else {
      setError(true);
    }
  }

  return (
    <div className="relative bg-student-100 py-3 ">
      
      {model && (
        <div className='absolute w-full h-full  z-30 ' >

        <div className="flex justify-center mt-4   bg-white ">
          <div className="absolute h-2/3 mx-auto  opacity-100 shadow-2xl rounded      bg-white w-2/3 z-50">
            <div className="flex justify-end">
              <button
                onClick={(e) => setModel(!model)}
                className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700"
              >
                <AiFillCloseCircle />
              </button>
            </div>

            <div className="mt-7">
              <h1 className="text-2xl font-bold text-darkblue-500 px-6 ">
                Confirm Payment{" "}
              </h1>
              <div className="flex  justify-between px-7 py-3">
                <div>
                  <h1 className="font-bold">Name : {student.name}</h1>
                  <h6 className="uppercase text-sm">
                    Stream : {student.stream}
                  </h6>
                  <h2>Roll no : {student.rollno} </h2>
                </div>
                <div className="text-sm">
                  <h4>Date : {date}</h4>
                  <h2>Batch : {student.batch}</h2>
                </div>
              </div>

              <div className="flex px-12 py-5  space-x-4">
                <span className="px-4 py-1 bg-green-200 text-green-900 font-bold text-sm rounded shadow-xl ">
                  Paid : {fee}
                </span>
                <span className="px-4 py-1 bg-red-200 text-red-900 font-bold text-sm rounded shadow-xl ">
                  Discount : {deduction}
                </span>
                <span className="px-4 py-1 bg-blue-200 text-darkblue-500 font-bold text-sm rounded shadow-xl ">
                  Total : {fee + deduction}
                </span>
              </div>
        <div className="flex justify-between">
              <div className="px-6 py-3 font-bold text-darkblue-500 ">
                <h2>* Paid by {payment}</h2>
                <h3>* Recived By {admin.namerounded}</h3>
              </div>

              <div className="border-2 mx-8 mt-6 h-8 rounded  w-fit flex items-center border-darkblue-500">
                <input
                  type="text"
                  className=" px-3 outline-none "
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

        </div>
              {error && (
                <h1 className=" text-red-700  text-sm my-1 font-bold w-full pr-44  text-right">
                  {" "}
                  Please Enter Valid PIN
                </h1>
              )}
            </div>
          </div>
        </div>
        </div>
      )}
      <div className={`mt-2 bg-student-100  px-12  py-2 ${model && "opacity-20"} `}
      >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl text-darkblue-500 ">
          Generate Fees Reciept
        </h1>
        <div className="btn cursor-pointer ml-5 h-10 w-24 rounded-md bg-white text-left border  overflow-hidden " id="btn" onClick={() => navigate(-1)}>
        <div className="icons  h-9 w-40 flex ml-2 items-center " id="icons">
          <FaArrowLeft className="text-2xl text-darkblue-500  " />
          <span className="ml-3 text-lg text-darkblue-500 font-semibold">Back</span>
        </div>
      </div>

      </div>
        <div className="bg-white px-1 py-3 mt-9 shadow-2xl rounded-2xl ">
          <div className="flex py-4  justify-between  relative">
            <div className="space-y-2 px-7 text-sm ">
              <h1 className="bg-darkblue-500 text-blue-50  flex justify-center text-sm ">
                {" "}
                Reciept No : {3242}
              </h1>
              <h2 className="font-bold text-lg ">Name : {student.name}</h2>
              <h2 className=""> Stream : {student.stream}</h2>
              <h3>Roll no : {student.rollno}</h3>
            </div>
            <div className="p-6 font-serif">
              <h3 className=""> Date : {date}</h3>
              <h6> Batch : {student.batch}</h6>
            </div>
          </div>

          <div className="flex px-6 justify-between items-center">
            <div className="flex items-center border-2  shadow-2xl border-darkblue-500 w-fit  rounded-3xl">
              <span className="py-2 bg-darkblue-500 text-white mr-4 font-bold border-2 border-darkblue-500 rounded-full p-2">
                <FaRupeeSign />
              </span>
              <input
                type="text"
                className="px-2 mr-4 text-xl font-bold outline-none w-20"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div className=" items-center ml-24">
              <h1 className="font-bold  text-xl">
                {" "}
                Discount : <span> {deduction}</span>{" "}
              </h1>
              {show ? (
                <div className="flex space-x-3  rounded-l-md border-2 m-2 h-8 rounded-r-lg border-darkblue-500 items-center">
                  <input
                    placeholder="Enter Percentage "
                    className="outline-none px-2 py-0 w-32 rounded-l-md "
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <button
                    className=" text-white py-1  px-4 bg-darkblue-500 rounded-r-md"
                    onClick={handleDiscount}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <h1 className="text-green-800 font-bold">
                  Discount Applied Successfully !
                </h1>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 py-4 px-6">
            <strong className="text-xl"> By</strong>
            <input
              type="radio"
              name="pmethod"
              id="sme"
              className=""
              value="cash"
              onChange={handlePayemnt}
            />
            <span> Cash </span>
            <input
              type="radio"
              name="pmethod"
              id="sme"
              className=""
              value="UPI"
              onChange={handlePayemnt}
            />
            <span> UPI </span>
            <input
              type="radio"
              name="pmethod"
              id="sme"
              className=""
              value="Cheque"
              onChange={handleCheque}
            />
            <span> Cheque </span>
          </div>
          {toggle ? (
            <div>
              <div className="flex border-2 mx-6 border-darkblue-500 w-fit ">
                <h1> </h1>
                <input
                  type="text"
                  placeholder="Enter Cheque Number"
                  className=" placeholder-black p-1"
                />
                {/* <button className="bg-darkblue-500 text-blue-100 px-5">
                Submit
              </button> */}
              </div>
            </div>
          ) : null}

          <div></div>
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
              onClick={(e) => setModel(true)}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
