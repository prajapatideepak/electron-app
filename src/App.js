import React, {useEffect} from 'react';
import Sidebar from "./Componant/sidebar";
import Searchbar from "./Componant/searchbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Myclass from "./screens/Myclass";
import Class from "./Componant/class"
import ChangeYear from "./Componant/ChangeYear";
import Profilestudent from "./Componant/ProfileStudent";
import Studenthistory from "./Componant/Studenthistory";
import Fee from "./screens/Fee";
import Faculty from "./screens/Faculty";
import Help from "./screens/Help";
import Reciept from "./screens/Reciept";
import Report from "./screens/Report";
import Studentregister from "./screens/Studentregister";
import Changepassword from "./Componant/Changepassword";
import FeesDetail from "./screens/FeesDetail";
import ReciptScreen from "./screens/ReciptScreen";
import Salary from "./screens/Salary";
import Dashboard from "./screens/Dashboard";
import Updateprofile from "./Componant/Updateprofile";
import AdminLogin from "./screens/AdminLogin";
import Profilefaculty from "./Componant/Profilefaculty";
import Staffhistory from "./Componant/Staffhistory";
import Addadmin from "./Componant/Addadmin";
import Transfer from "./Componant/Transfer";
import Dashboardsection from "./Componant/Dashboardsection";
import UpdateStudentReceipt from './screens/UpdateStudentReceipt';
import CancelAdmission from './screens/CancelAdmission';
function App() { 
  return (
    <>
      <div className="bg-[#f5f7ff] min-h-screen flex">
        {<Sidebar />}
        <div className="w-full">
          {<Searchbar />}
          <div className="relative" style={{minHeight: 'calc(100% - 70px)'}}>
            <Routes>
              <Route exact path="/admin-login" element={<AdminLogin />} />
              <Route exact path="/dashboardsection" element={<Dashboardsection />} />
              <Route exact path="/dashboardsection/dashboard" element={<Dashboard />} />
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="myclass" element={<Myclass />} />
              <Route exact path='/myclass/class' element={<Class/>} />
              <Route exact path='/myclass/class/ChangeYear' element={<ChangeYear/>} />
              <Route exact path='/myclass/class/Transfer' element={<Transfer/>} />
              <Route exact path='/myclass/class/Transfer/class' element={<Class/>} />
              <Route exact path='/myclass/class/Profilestudent' element={<Profilestudent/>} />
              <Route exact path='/myclass/class/Profilestudent/Studenthistory' element={<Studenthistory/>} />
              <Route exact path="fee" element={<Fee />} />
              <Route exact path="fee/FeesDetail" element={<FeesDetail />} />
              <Route exact path="/faculty" element={<Faculty />} />
              <Route exact path='faculty/Profilefaculty' element={<Profilefaculty/>} />
              <Route exact path='faculty/Profilefaculty/Staffhistory' element={<Staffhistory/>} />
              <Route exact path="help" element={<Help />} />
              <Route exact path="receipt/receipt" element={<Reciept />} />
              <Route exact path="/reciept/recipet/Editreceipt/FeesDetail" element={<FeesDetail />} />
              <Route exact path="receipt" element={<ReciptScreen />} />
              <Route exact path="receipt/FeesDetail" element={<FeesDetail />} />
              <Route exact path="/receipt/update/student" element={<UpdateStudentReceipt />} />
              <Route exact path="report" element={<Report />} />
              <Route exact path="studentregister" element={<Studentregister />} />
              <Route path="/fee/:id" element={<FeesDetail />} />
              <Route path="/salary/:id" element={<Salary />} />
              <Route exact path="/Componant/Updateprofile" element={<Updateprofile />} />
              <Route exact path="/Componant/Changepassword" element={<Changepassword />}/>
              <Route exact path="/Componant/Addadmin" element={<Addadmin />}/>
              <Route exact path="/cancelAdmission/:student_id" element={<CancelAdmission />}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
