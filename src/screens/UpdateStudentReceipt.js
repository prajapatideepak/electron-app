import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import {updateStudentReceipt} from '../hooks/usePost';
import { AxiosError } from "axios";
import Toaster from '../hooks/showToaster';
import { NasirContext } from "../NasirContext";

export default function UpdateStudentReceipt() {
  const location = useLocation();

    const student = {
        name: location.state.receiptDetails.full_name,
        fees: location.state.receiptDetails.amount,
        class_name: location.state.receiptDetails.class_name,
        stream: location.state.receiptDetails.stream,
        rollno: location.state.receiptDetails.roll_no,
        batch: location.state.receiptDetails.batch,
        receipt_no: location.state.receiptDetails.receipt_no,
        medium: location.state.receiptDetails.medium,
        amount: location.state.receiptDetails.amount,
        discount: location.state.receiptDetails.discount,
        is_by_cash: location.state.receiptDetails.is_by_cash,
        is_by_cheque: location.state.receiptDetails.is_by_cheque,
        is_by_upi: location.state.receiptDetails.is_by_upi,
        upi_no: location.state.receiptDetails.upi_no,
        cheque_no: location.state.receiptDetails.cheque_no
    };
  const { admin } = React.useContext(NasirContext);

  const [fee, setFee] = React.useState(student?.amount);
  const [discount, setDiscount] = React.useState(student?.discount == 0 ? '' : student?.discount);
  const [chequeNo, setChequeNo] = React.useState(student?.cheque_no == -1 ? '' : student?.cheque_no);
  const [upiNo, setUpiNo] = React.useState(student?.upi_no == "-1" ? '' : student?.upi_no);
  const [payment, setPayment] = React.useState("cash");
  const [toggleCheque, setToggleCheque] = React.useState(student?.is_by_cheque);
  const [toggleUpi, setToggleUpi] = React.useState(student?.is_by_upi);
  const [toggleCash, setToggleCash] = React.useState(student?.is_by_cash);

  const [deduction, setDeduction] = React.useState(student?.discount);
  const [discountAppliedMsg, setDiscountAppliedMsg] = React.useState(student?.discount > 0 ? false : true);
  const [model, setModel] = React.useState(false);
  const [pin, setPin] = React.useState(""); 
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [errors, setErrors]  = React.useState({
      amount: '',
      discount: '',
      upi: '',
      cheque: '',
      invalid_pin: '' 
  });


  var today = new Date();
  var date =
    today.getDate() +
    " / " +
    (today.getMonth() + 1) +
    " / " +
    today.getFullYear();

  function handleDiscount(e) {
    if(discount == '' ){
        setErrors((prevData)=>{
            return{
                ...prevData,
                discount: '*Please enter discount'
            }
        })
        return;
    }
    if(Number(discount) > Number(fee)){
        return;
    }
    if(fee == '' || fee == 0 || fee == undefined){
        setErrors((prevData)=>{
            return{
                ...prevData,
                amount: '*Please enter amount'
            }
        })
        return;
    }
    setFee(fee - discount);
    setDeduction(discount);
    setDiscountAppliedMsg(false);
  }

  function handleRemoveDiscount(){
    setFee( Number(fee) + Number(deduction) );
    setDeduction(0);
    setDiscountAppliedMsg(true);
  }

  function handlePaymentMethod(e) {
    setUpiNo('')
    setChequeNo('')
    setErrors((prevData) => {
        return {
        ...prevData,
        upi: ''
        }
    })
    setErrors((prevData) => {
        return {
        ...prevData,
        cheque: ''
        }
    })
      if(e.target.value == 1){
        setPayment(e.target.value);
        setToggleCash(true);
        setToggleCheque(false);
        setToggleUpi(false);
      }
      else if(e.target.value == 2){
        setPayment(e.target.value);
        setToggleCheque(false);
        setToggleCash(false)
        setToggleUpi(true);
      }
      else{
        setPayment(e.target.value);
        setToggleUpi(false);
        setToggleCash(false);
        setToggleCheque(true);
      }   
  }

  const handleFeesValidation = (e)=>{
      const regex = new RegExp(/^[0-9]+$/)

      let err = 0;
    if(regex.test(e.target.value)){
        err++;
        setErrors((prevData) => {
            return {
            ...prevData,
            amount: ''
            }
        })
    }
    else{
        err++;
        setErrors((prevData) => {
            return {
                ...prevData,
                amount: '*Enter only numbers'
            }
        })
    }

    if(Number(e.target.value) < (discount ? Number(discount) : 0) ){
        err++;
        setErrors((prevData) => {
            return {
                ...prevData,
                amount: '*Amount should be greater than Discount'
            }
        })
    }
    if(err > 0){
        setFee(e.target.value);
        return;
    }
    setDeduction(0);
    setDiscountAppliedMsg(true);
  }

  const handleDiscountValidation = (e)=>{
      const regex = new RegExp(/^[0-9]+$/)
    if(e.target.value != ''){
        if(regex.test(e.target.value)){
            setErrors((prevData) => {
                return {
                ...prevData,
                discount: ''
                }
            })
        }
        else{
            setErrors((prevData) => {
                return {
                    ...prevData,
                    discount: '*Enter only numbers'
                }
            })
        }
    }
    else{
        setErrors((prevData) => {
            return {
                ...prevData,
                discount: ''
            }
        })
    }

    if(Number(e.target.value) > Number(fee)){
        setErrors((prevData) => {
            return {
                ...prevData,
                discount: '*Discount should be less than Amount'
            }
        })
    }
    setDiscount(e.target.value)
  }

  const handleUpiNo = (e) =>{
      const regex = new RegExp(/^[0-9 A-Za-z@]+$/)

    if(regex.test(e.target.value)){
        setErrors((prevData) => {
            return {
            ...prevData,
            upi: ''
            }
        })
    }
    else{
        setErrors((prevData) => {
            return {
                ...prevData,
                upi: '*Enter only numbers'
            }
        })
    }
    setUpiNo(e.target.value)
  } 
  const handleChequeNo = (e) =>{
      const regex = new RegExp(/^[0-9]+$/)

    if(regex.test(e.target.value)){
        setErrors((prevData) => {
            return {
            ...prevData,
            cheque: ''
            }
        })
    }
    else{
        setErrors((prevData) => {
            return {
                ...prevData,
                cheque: '*Enter only numbers'
            }
        })
    }
      setChequeNo(e.target.value)
  }


  const onSubmit = () =>{
      let err = 0;
      if(fee == ''){
          err++;
          setErrors((prevData) => {
              return {
                ...prevData,
                amount: '*Please enter amount'
              }
          })
      }
      if(toggleUpi && upiNo == ''){
         err++;
          setErrors((prevData) =>{
            return {
                ...prevData,
                upi: '*Please Enter UPI Number'
            }
          })
      }
      if(toggleCheque && chequeNo == ''){
         err++;
          setErrors((prevData) =>{
            return {
                ...prevData,
                cheque: '*Please Enter Cheque Number'
            }
          })
      }
      if((errors.amount != '' && errors.amount != undefined) || (errors.upi != '' && errors.upi != undefined) || (errors.cheque != '' && errors.cheque != undefined)){
          err++;
        }
      
      if(err == 0){
          setPayment(
            toggleCheque
            ?
                'Cheque'
            :
                toggleUpi
                ?
                    'UPI'
                :
                    'Cash'
          )
        setModel(true);
      }
      else{
          return;
      }

  }


  const navigate = useNavigate();
  async function handlePINsubmit() {
      try{
        const feesData = {
            fees_receipt_id: student.receipt_no,
            is_by_cash: toggleCash ? 1 : 0,
            is_by_cheque: toggleCheque ? 1 : 0,
            is_by_upi: toggleUpi ? 1 : 0,
            cheque_no: chequeNo,
            upi_no: upiNo,
            amount: Number(fee) + Number(deduction),
            discount: deduction,
            method: payment,
            admin_id: admin._id,
            security_pin: pin
        };

        setIsAuthenticating(true)
        
        const res = await updateStudentReceipt(feesData)

        if (res.data.success == true) {
            Toaster('success', 'Receipt updated successfully')
            navigate("/receipt/receipt", {state:{isStaff: false, fees_receipt_id: student.receipt_no, prevPath: location.pathname, is_cancelled: 0}});
        } else {
            setErrors({
                invalid_pin: res.data.message
            });
        }
        setIsAuthenticating(false)
      }
      catch(err){
        setIsAuthenticating(false)
          if(err instanceof AxiosError){
            setErrors({
                invalid_pin: err.response?.data?.message
            });
          }
          else{
              setErrors({
                invalid_pin: err.response?.data?.message
            });
          }
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
                onClick={(e) => {
                    setModel(!model); 
                    setErrors((prevData)=>{
                        return {
                            ...prevData,
                            invalid_pin: ''
                        }
                    }); 
                }}
                className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700"
              >
                <AiFillCloseCircle />
              </button>
            </div>

            <div className="mt-7">
              <h1 className="text-2xl font-bold text-darkblue-500 px-6 ">
                Confirm Payment
              </h1>
              <div className="flex  justify-between px-7 py-3">
                <div>
                    <h1 className="font-bold">NAME : {student.name.toUpperCase()}</h1>
                    <h2 className="text-sm"> Class: {student.class_name}
                        <span className="ml-5">Medium: {student.medium}</span>
                        <span className="ml-5">Stream: {student.stream}</span>
                    </h2>
                    <h2 className="text-sm">Roll no : {student.rollno} </h2>
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
                  Total : {Number(fee) + Number(deduction)}
                </span>
              </div>
        <div className="flex justify-between">
              <div className="px-6 py-3 text-darkblue-500 ">
                <h2 className="font-bold">* Paid by : <span className="font-medium text-gray-600">{payment}</span></h2>
                {
                    toggleCheque
                    ?
                        <h2 className="font-bold">* Cheque No: <span className="font-medium text-gray-600">{chequeNo}</span></h2>
                    :
                        toggleUpi
                        ?
                            <h2 className="font-bold">* UPI ID: <span className="font-medium text-gray-600">{upiNo}</span></h2>
                        :
                            null
                }
                <h3 className="font-bold">* Admin: <span className="font-medium text-gray-600">{admin.username}</span></h3>
              </div>

              <div className="border-2 mx-8 mt-6 h-8 rounded  w-fit flex items-center border-darkblue-500">
                <input
                  type="password"
                  className=" px-3 outline-none "
                  placeholder="Enter Security PIN"
                  onChange={(e) => setPin(e.target.value)}
                />
                <button
                  disabled={isAuthenticating}
                  className={`px-4 py-1 ${isAuthenticating ? 'bg-darkblue-300' : 'bg-darkblue-500'} text-white`}
                  onClick={handlePINsubmit}
                >
                  {isAuthenticating ? 'verifying...' : 'Submit'}
                </button>
              </div>

        </div>
            {
              errors.invalid_pin != '' 
              ? 
                <h1 className=" text-red-700  text-sm my-1 font-bold w-full pr-44  text-right">
                    {errors.invalid_pin}
                </h1>
              :
                null
            }
            </div>
          </div>
        </div>
        </div>
      )}
      <div className={`mt-2 bg-student-100  px-12  py-2 ${model && "opacity-20"} `}
      >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl text-darkblue-500 ">
          Update Fees Receipt
        </h1>
        <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
            <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
            <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
        </div>

      </div>
        <div className="bg-white px-1 py-3 mt-9 shadow-2xl rounded-2xl ">
          <div className="flex py-4  justify-between  relative">
            <div className="space-y-2 px-7 text-sm">
                <div className="bg-darkblue-500 w-48 p-1">
                    <p className="text-md text-white font-bold text-center font-mono tracking-wide">Receipt No: {student.receipt_no}</p>
                </div>
                <h2 className="font-bold text-lg tracking-wide">NAME : {student.name.toUpperCase()}</h2>
                <h2 className="text-[16px] tracking-wide"> Class: {student.class_name}
                    <span className="ml-5">Medium: {student.medium}</span>
                    <span className="ml-5">Stream: {student.stream}</span>
                </h2>
                <h3 className="text-[16px] tracking-wide">Roll no: {student.rollno}</h3>
            </div>
            <div className="px-7 font-mono">
                <h3 className=""> Date : {date}</h3>
                <h6> Batch : {student.batch}</h6>
            </div>
          </div>

          <div className="flex px-6 justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center border-2 shadow-2xl border-darkblue-500 w-fit  rounded-3xl">
                <span className="py-2 bg-darkblue-500 text-white ml-[-1px] mr-4 font-bold border-2 border-darkblue-500 rounded-full p-2">
                  <FaRupeeSign />
                </span>
                <input
                  type="text"
                  className="px-2 mr-4 text-xl font-bold outline-none w-32"
                  placeholder="Enter fees"
                  value={fee}
                 
                  onChange={handleFeesValidation}
                />
              </div>
              {errors.amount != '' ? (<small className="text-red-700 mt-2">{errors.amount}</small>) : null}
            </div>
            <div className=" items-center ml-24">
              <h1 className="font-bold  text-xl">
                Discount : <span> {deduction}</span>
              </h1>
              {discountAppliedMsg ? (
                <div className="flex flex-col">
                  <div className="flex rounded-l-md border-2 mr-2 my-2 h-8 rounded-r-lg border-darkblue-500 items-center">
                    <input
                      placeholder="Enter Discount "
                      className="outline-none px-2 py-0 w-32 rounded-l-md "
                      value={discount}
                      onChange={handleDiscountValidation}
                    />
                    <button
                      className=" text-white py-1  px-4 bg-darkblue-500 rounded-r-md"
                      onClick={handleDiscount}
                    >
                      Apply
                    </button>
                  </div>
                  {errors.discount != '' ? (<small className="text-red-700">{errors.discount}</small>) : null}
                </div>
              ) 
              : 
                <div className="flex flex-col items-end">
                  <h1 className="text-green-800 font-bold">
                    Discount Applied Successfully !
                  </h1>
                  <button className="text-center hover:bg-red-300 text-white bg-red-400 rounded-md px-3 py-2 mt-2" onClick={()=> handleRemoveDiscount()}>
                    Remove Discount
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="flex flex-col py-4 px-6">
            <div className="flex items-center space-x-2">
                <strong className="text-xl"> By</strong>
                <input
                type="radio"
                name="payment_method"
                id="sme"
                className=""
                value="1"
                checked={toggleCash ? 'checked' : ''}
                onChange={handlePaymentMethod}
                />
                <span> Cash </span>
                <input
                type="radio"
                name="payment_method"
                id="sme"
                className=""
                value="2"
                checked={toggleUpi ? 'checked' : ''}
                onChange={handlePaymentMethod}
                />
                <span> UPI </span>
                <input
                type="radio"
                name="payment_method"
                id="sme"
                className=""
                value="3"
                checked={toggleCheque ? 'checked' : ''}
                onChange={handlePaymentMethod}
                />
                <span> Cheque </span>
            </div>
          </div>
          {
            toggleCheque
            ? 
              <div className="flex flex-col mx-6">
                <div className="flex border-2 border-darkblue-500 w-fit ">
                  <input
                    type="text"
                    placeholder="Enter Cheque Number"
                    className="placeholder-black p-1"
                    value={chequeNo}
                    onChange={handleChequeNo}
                  />
                </div>
                {errors.cheque != '' ? (<small className="text-red-700 mt-2">{errors.cheque}</small>) : null}
              </div>
            : 
              null
          }
          {
            toggleUpi 
            ? 
              <div className="flex flex-col mx-6">
                <div className="flex border-2 border-darkblue-500 w-fit">
                  <input
                    type="text"
                    placeholder="Enter Upi Number/id"
                    className=" placeholder-black p-1"
                    value={upiNo}
                    onChange={handleUpiNo}
                  />
                </div>
                {errors.upi != '' ? (<small className="text-red-700 mt-2">{errors.upi}</small>) : null}
              </div>
            : 
              null
          }

          <div></div>
          <div className="text-sm flex justify-between items-center uppercase font-bold font-mono tracking-wide mt-4 ">
            <h1 className="px-6"> admin : {admin.username}</h1>
            <button
              className="px-7  mx-7 py-2 text-base tracking-widest
           font-semibold uppercase bg-darkblue-500
            text-white 
            
            transition
            duration-500   
            rounded-md 
            hover:shadow-2xl
            

            "
              onClick={onSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
