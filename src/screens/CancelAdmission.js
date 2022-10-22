import React, {useState, useEffect} from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Componant/Loader';
import { IoIosArrowBack } from "react-icons/io";
import { TbCurrencyRupee } from "react-icons/tb";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import {AxiosError} from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import {getStudentDetails, tranferFees, cancelAdmission} from '../hooks/usePost';
import { IoClose } from "react-icons/io5";
import Toaster from '../hooks/showToaster';
import SweetAlert from '../hooks/sweetAlert';

function CancelAdmission() {
    const location = useLocation();
    const navigate = useNavigate();
    
    location.state == null ?? navigate('/')

    const {student_id} = useParams();
    const admin_id = '632324e55f67f65bf8a5f53a'
    
    const [studentDetails, setStudentDetails] = useState({
        full_name: location.state.studDetails.personal.basic_info_id.full_name,
        class_name: location.state.studDetails.academic.class_id.class_name,
        medium: location.state.studDetails.academic.class_id.medium,
        stream: location.state.studDetails.academic.class_id.stream,
        net_fees: location.state.studDetails.fees.net_fees,
        discount: location.state.studDetails.fees.discount,
        pending_fees: location.state.studDetails.fees.pending_amount,
        academic_start_date:  location.state.studDetails.academic.date
    })

    const [searchModel, setSearchModel] = useState(false);
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [amountModel, setAmountModel] = useState(false);
    const [amount, setAmount] = useState('');
    const [securityPin, setSecurityPin] = useState('');
    const [payeeId, setPayeeId] = useState('');
    const [payeePendingAmount, setPayeePendingAmount] = useState(0);
    const [errors, setErrors] = useState({
        amount: '',
        security_pin: '',
    })
    
    async function searchStudent() {
        try{
            const regex = new RegExp(/^[!@#\$%\^\&*\)\(+=._-]+$/)
            if(searchValue == '' || searchValue == ' ' || regex.test(searchValue)){
                return;
            }
            setLoading(true);
            const res = await getStudentDetails(searchValue)
       
            setLoading(false);
            setdata(
                res?.data?.data?.students_detail?.length > 0 
                ? 
                    res?.data?.data?.students_detail.filter((item)=>{
                        return item.personal.student_id != student_id
                    }) 
                : 
                    null
            );
        }
        catch(err){
            setLoading(false);
            if(err instanceof AxiosError){
                Toaster("error",err.response.data.message);
            }
            else{
                Toaster("error", err.message);
            }
        }
    }

    const handleCloseSearchModel = ()=>{
        setSearchValue('')
        setdata([]);
        setSearchModel(false);
    }

    const handleCloseAmountModel = () =>{
        setAmountModel(false);
        setErrors({
            amount: '',
            security_pin: ''
        })
        setAmount('');
        setSecurityPin('');
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);

        const regex = new RegExp(/^[0-9]+$/)

        if(regex.test(e.target.value) == true){
            setErrors((prevData)=>{
                return{
                    ...prevData,
                    amount: ''
                }
            })
        }
        else{
            setErrors((prevData)=>{
                return{
                    ...prevData,
                    amount: '*Enter only numbers'
                }
            })
        }
    }

    const handlePinChange = (e) => {
        setSecurityPin(e.target.value)
        if(e.target.value != ''){
            setErrors((prevData)=>{
                return{
                    ...prevData,
                    security_pin: ''
                }
            })
        }
    }

    const handleCancelAdmission = async () =>{
        try{
            SweetAlert('Are you sure to Cancel Admission', 'Student admission will be cancel and removed from the class', 'warning')
            .then( async (result)=>{
                if(result.isConfirmed){
                    const res = await cancelAdmission(student_id)
            
                    if(res.data.success){
                        Toaster('success', res.data.message)
                        navigate('/')
                    }
                    else{
                        Toaster('error', 'Something went wrong')
                    }
                }
            })
        }
        catch(err){
            if(err instanceof AxiosError){
                Toaster("error",err.response.data.message);
            }
            else{
                Toaster("error", err.message);
            }
        }
    }

    const handleSubmit = async () =>{
        let err = 0;

        if(amount == ''){
            err++;
            setErrors((prevData)=>{
                return{
                    ...prevData,
                    amount: '*Please enter amount'
                }
            })
        }

        if(securityPin == ''){
            err++;
            setErrors((prevData)=>{
                return{
                    ...prevData,
                    security_pin: '*Please enter security PIN'
                }
            })
        }

        if(err > 0){
            return;
        }

        if(amount > amountToPay){
            return setErrors((prevData)=>{
                return{
                    ...prevData,
                    amount: '*Entered amount should be less than (Amount To Pay)'
                }
            })
        }

        if(amount > payeePendingAmount){
            return setErrors((prevData)=>{
                return{
                    ...prevData,
                    amount: "*Entered amount should be less than Payee's pending amount"
                }
            })
        }

        if(errors.amount != '' || errors.security_pin != ''){
            return;
        }

        try{
            setLoading(true);
            const res = await tranferFees({
                payer_fees_id: location.state.studDetails.fees._id,
                payee_id: payeeId, 
                amount, 
                admin_id,
                security_pin: securityPin
            })

            setLoading(false);

            if(res.data.success){
                const newPendingFees = res.data.fees_details.pending_amount;

                Toaster('success', res.data.message)
                setStudentDetails((prevData)=>{
                    return {
                        ...prevData,
                        pending_fees: newPendingFees,
                    }
                })

                //resetting values
                setErrors({
                    amount: '',
                    security_pin: ''
                })
                setAmount('');
                setSecurityPin('');
                setSearchValue('')
                setdata([]);
                setAmountModel(false);
                setSearchModel(false);
            }
            else{
                Toaster("error", res.data.message);
            }
        }
        catch(err){
            setLoading(false);
            if(err instanceof AxiosError){
                Toaster("error",err.response.data.message);
            }
            else{
                Toaster("error", err.message);
            }
        }
    }

    useEffect(() =>{
        //Fetching new student details
        async function fetchStudentDetails(){
            let studentDetails = await getStudentDetails(student_id);
            studentDetails = studentDetails.data.data.students_detail[0]

            setStudentDetails({
                full_name: studentDetails.personal.basic_info_id.full_name,
                class_name: studentDetails.academic.class_id.class_name,
                medium: studentDetails.academic.class_id.medium,
                stream: studentDetails.academic.class_id.stream,
                net_fees: studentDetails.fees.net_fees,
                discount: studentDetails.fees.discount,
                pending_fees: studentDetails.fees.pending_amount,
                academic_start_date:  studentDetails.academic.date
            })
        }

        fetchStudentDetails();
    },[])

    let academicDate = new Date(studentDetails.academic_start_date);

    const daysStudied = Math.round( ( new Date().getTime() - new Date(studentDetails.academic_start_date).getTime() ) / (1000 * 3600 * 24) );
    const feesPerDay = Math.round(studentDetails.net_fees / 365);
    const daysStudiedAmount = daysStudied * feesPerDay;
    const feesPaid = (studentDetails.net_fees + studentDetails.discount) - studentDetails.pending_fees;

    let amountToPay = feesPaid - daysStudiedAmount;

    return (
        <section className="relative">
            {
                amountModel
                ?
                    <div className={`w-full h-full absolute opacity-100 z-40`}>
                        <div className= "relative w-2/4 bg-white shadow-md p-10 mx-auto mt-16">
                            <button
                                onClick={handleCloseAmountModel}
                                className="absolute top-0 right-0 translate-x-3 -translate-y-3 font-bold bg-red-700 p-0.5 rounded-full"
                            >
                                <IoClose className="text-xl text-white"/>
                            </button>
                            <div className='w-full text-center'>
                                <h4 className="text-2xl text-gray-600 font-bold">Amount Verification</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center p-10 mt-3">
                                <div className="w-3/4">
                                    <h4 className="text-lg font-xl font-medium">Enter Amount:</h4>
                                    <input type="text" value={amount} className="w-full text-lg px-3 py-1 rounded-md mt-2 border border-gray-500 focus:outline-none focus:ring-2" placeholder="Enter amount" onChange={handleAmountChange} />
                                    {
                                        errors.amount != '' 
                                        ? 
                                            <small className="text-red-700">{errors.amount}</small>  
                                        : 
                                            null
                                    }
                                    
                                </div>
                                <div className="w-3/4 mt-5">
                                    <h4 className="text-lg font-xl font-medium">Enter Security PIN:</h4>
                                    <input type="password" value={securityPin} className="w-full text-lg px-3 py-1 rounded-md mt-2 border border-gray-500 focus:outline-none focus:ring-2" placeholder="Enter security PIN" onChange={handlePinChange} />
                                    {
                                        errors.security_pin != '' 
                                        ? 
                                            <small className="text-red-700">{errors.security_pin}</small>  
                                        : 
                                            null
                                    }
                                </div>
                                <div className="w-3/4 mt-10 text-center">
                                    <button disabled={loading} className={`w-full text-white ${loading ? 'opacity-50' : 'opacity-100'} bg-blue-600 hover:bg-blue-400 rounded-md px-5 py-2`} onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    null
            }
            {
                searchModel
                ?
                    <div className={`${amountModel ? 'opacity-50 z-30' : ''}`}>
                        <div className={`w-full h-full absolute opacity-100 z-20`}>
                            <div className= "relative w-4/5 bg-white shadow-md p-10 mx-auto mt-16">
                                <button
                                    onClick={handleCloseSearchModel}
                                    className="absolute top-0 right-0 translate-x-3 -translate-y-3 font-bold bg-red-700 p-0.5 rounded-full"
                                >
                                    <IoClose className="text-xl text-white"/>
                                </button>
                                <div className="">
                                    <h1 className="text-3xl  font-bold text-darkblue-500">Transfer Fees</h1>

                                    <div className="px-2 py-2 flex mt-7 items-center justify-center">
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e)=> setSearchValue(e.target.value)}
                                        className="w-2/3 shadow-xl px-3 py-2 rounded-l-lg outline-none    "
                                        placeholder="Search Student (By : ID , Name , Whatsapp Number)"
                                    ></input>
                                    <button
                                        onClick={searchStudent}
                                        className="bg-darkblue-500 px-2 py-1 rounded-r-lg shadow-2xl transition duration-200 hover:text-gray-300"
                                    >
                                        <AiOutlineSearch className="text-3xl font-bold hover:scale-125  text-white transition duration-400" />
                                    </button>
                                    </div>
                                </div>
                                <div className="p-4 mt-8 ">
                                    
                                    {
                                    loading
                                    ?
                                        <Loader/>
                                    :

                                        (
                                        data?.length > 0 
                                        ? (
                                            <div className="p-4 bg-whrounded">
                                            <h1 className="font-bold text-2xl text-darkblue-500"> </h1>
                                            {/* Recipet table  */}
                                            <div>
                                                <div className=" bg-white rounded-lg shadow">
                                                <div className="border rounded-lg border-gray-100">
                                                    <div className="py-4 md:py-6 pl-8">
                                                    <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">
                                                        Students List
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
                                                            Medium
                                                            </th>
                                                            <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                                            Stream
                                                            </th>
                                                            <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                                            Net Fees
                                                            </th>
                                                            <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                                            Pending
                                                            </th>
                                                            <th className="font-bold text-left px-10 lg:px-6 xl:px-0">
                                                            Action
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="w-full">
                                                            {data.map((m, index) => {
                                                            return (
                                                                <tr key={index} className={`${m.fees.pending_amount > 0 ? 'bg-red-100' : 'bg-green-100'} border-b-1 border-gray-200 h-20 text-sm leading-none text-gray-800 border-b border-gray-100`}>
                                                                <td className="pl-10"> 
                                                                <img
                                                                    src="images/user.png"
                                                                    className="w-14 shadow-2xl h-14 rounded-full"
                                                                    alt={m.personal.student_id}
                                                                    ></img>
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <span className="font-bold">
                                                                        {m.personal.student_id}
                                                                    </span>
                                                                </td>
                                                                <td className=" px-10 lg:px-6 xl:px-0">
                                                                    {m.personal.basic_info_id.full_name}
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <span className="">
                                                                    {m.personal.contact_info_id.whatsapp_no}
                                                                    </span>
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <p className="">
                                                                    <span className="">
                                                                        {m.academic.class_id.class_name}
                                                                    </span>
                                                                    </p>
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <p className="">
                                                                    <span className="">
                                                                        {m.academic.class_id.medium}
                                                                    </span>
                                                                    </p>
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <p className="">
                                                                    <span className="">
                                                                        {m.academic.class_id.stream.toLowerCase() == 'none' ? '--' : m.academic.class_id.stream}
                                                                    </span>
                                                                    </p>
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <p className="">
                                                                    <span className="">
                                                                        {m.fees.net_fees}
                                                                    </span>
                                                                    </p>
                                                                </td>
                                                                <td className="px-10 lg:px-6 xl:px-0">
                                                                    <p className="">
                                                                    <span className="">
                                                                        {m.fees.pending_amount}
                                                                    </span>
                                                                    </p>
                                                                </td>
                                                                <td className="">
                                                                    <span className="">
                                                                        <button className={`${m.fees.pending_amount <= 0 ? 'disabled:opacity-40' : 'bg-darkblue-500 hover:bg-blue-900'} bg-darkblue-500 rounded-lg  duration-200 transition text-white px-7 font-bold py-2`} 
                                                                        onClick={()=> {
                                                                            setPayeeId(m.personal.student_id);
                                                                            setPayeePendingAmount(m.fees.pending_amount)
                                                                            setAmountModel(true)
                                                                            setAmount(m.fees.pending_amount)
                                                                        }} 
                                                                        disabled={m.fees.pending_amount <= 0 ? true : false}>
                                                                        Pay
                                                                        </button>
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
                                        ) 
                                        : (
                                            <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
                                            <IoMdInformationCircle className="text-xl text-red-600" />

                                            <h1 className="text-red-800">No Student Found </h1>
                                            </div>
                                        )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    null
            }
            <div className={`
                ${searchModel 
                ? 
                    amountModel 
                    ? 
                        'opacity-0 bg-white z-10' 
                    : 
                        'opacity-20 bg-white z-10'  
                : 
                    'opacity-100'
                }`}>
                <div className="flex justify-between p-5">
                    <h1 className="text-3xl  font-bold text-darkblue-500">Cancel Admission</h1>
                    <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
                        <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                        <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                    </div>
                </div>
                <div className="py-8 mx-20 my-5 bg-white">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-2/3">
                            <h4 className="text-xl font-bold tracking-wider uppercase">{studentDetails.full_name}</h4>
                        </div>
                        <div className="w-2/3 flex mt-5">
                            <div className="">
                                <h4 className="text-lg tracking-wide text-gray-600">Class: <span className="font-normal text-black">{studentDetails.class_name}</span></h4>
                            </div>
                            <div className="ml-10">
                                <h4 className="text-lg tracking-wide text-gray-600">Medium: <span className="font-normal text-black">{studentDetails.medium}</span></h4>
                            </div>
                            <div className="ml-10">
                                <h4 className="text-lg tracking-wide text-gray-600">Stream: <span className="font-normal text-black">{studentDetails.stream}</span></h4>
                            </div>
                        </div>
                        <div className="w-2/3 mt-5 flex">
                            <div>
                                <h4 className="text-lg  text-gray-600">Total Fees: <span className="font-normal text-black">{studentDetails.net_fees + studentDetails.discount}</span></h4>
                            </div>
                            <div className="ml-10">
                                <h4 className="text-lg  text-gray-600">Net Fees: <span className="font-normal text-black">{studentDetails.net_fees}</span></h4>
                            </div>
                            <div className="ml-10">
                                <h4 className="text-lg  text-gray-600">Discount: <span className="font-normal text-black">{studentDetails.discount}</span></h4>
                            </div>
                            <div className="ml-10">
                                <h4 className="text-lg  text-gray-600">Pending Fees: <span className="font-normal text-black">{studentDetails.pending_fees}</span></h4>
                            </div>
                        </div>  
                        <div className="w-2/3 mt-5">
                            <h4 className="text-lg  text-gray-600">Academic Start Date:  
                                <span className="font-normal text-black">
                                    {' ' + academicDate.getDate() + '/' + (academicDate.getMonth()+1) + '/' + academicDate.getFullYear()}
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-2/3 mt-8">
                            <h4 className="text-xl font-medium">Calculation :</h4>
                        </div>
                        <div className="w-2/3 flex justify-between mt-3">
                            <div className="w-56 flex flex-col justify-center items-center bg-purple-100 rounded-md px-7 py-3">
                                <div className="flex justify-center items-center">
                                    <h4 className="text-lg  text-gray-900">Days Studied</h4>
                                    <span className="text-lg font-medium text-black ml-2">({daysStudied})</span>
                                </div>
                                <span className="text-xl font-medium text-black flex justify-center items-center">
                                    <TbCurrencyRupee/>{daysStudiedAmount}
                                </span>
                            </div>
                            <div className="w-56 flex flex-col justify-center items-center bg-teal-100 rounded-md px-7 py-1">
                                <h4 className="text-lg  text-gray-900">Fees Paid</h4>
                                {/* <span className="text-lg font-medium text-black">{pendingDays}</span> */}
                                <span className="text-xl font-medium text-black flex justify-center items-center">
                                    <TbCurrencyRupee/>{feesPaid}
                                </span>
                            </div>
                            <div className="w-56 flex flex-col justify-center items-center bg-blue-100 rounded-md px-7 py-1">
                                <h4 className="text-lg  text-gray-900">Fees Per Day </h4>
                                <span className="text-lg font-medium text-black flex justify-center items-center"><TbCurrencyRupee/> {feesPerDay }</span>
                            </div>
                        </div>
                        <div className="flex mt-7 w-full flex flex-col justify-center items-center">
                            <div className="w-2/3 flex flex-col justify-center items-center bg-gray-200 rounded-md py-5">
                                {
                                    amountToPay < 0
                                    ?
                                        <h4 className="flex justify-center items-center text-xl  text-gray-900"> Amount to Receive <GiReceiveMoney className="ml-2 text-3xl text-green-700"/></h4>
                                    : 
                                        <h4 className="flex justify-center items-center text-xl  text-gray-900"> Amount to Pay <GiPayMoney className="ml-2 text-3xl text-red-700"/></h4>
                                }
                                <span className="font-bold text-black text-4xl flex justify-center items-center mt-2"> 
                                    <TbCurrencyRupee/> 
                                    {Math.abs(amountToPay)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <button className="bg-white-500 border-2 border-darkblue-500 text-darkblue-500 hover:bg-darkblue-500 hover:text-white rounded-md px-4 py-1" onClick={handleCancelAdmission}>Cancel Admission</button>
                        {

                            amountToPay > 0
                            ?
                                <button className="ml-5 bg-white-500 border-2 border-darkblue-500 text-darkblue-500 hover:bg-darkblue-500 hover:text-white rounded-md px-5 py-1" onClick={()=>{setSearchModel(true)}}>Transfer to student</button>
                            :
                                null
                                
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CancelAdmission