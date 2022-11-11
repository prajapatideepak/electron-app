import React from "react";

import AdminLogin from "./screens/AdminLogin";
import Profilefaculty from "./Componant/Profilefaculty";
import Staffhistory from "./Componant/Staffhistory";
import Addadmin from "./Componant/Addadmin";
import Transfer from "./Componant/Transfer";
import Dashboardsection from "./Componant/Dashboardsection";
import DashboardMenu from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import { getToken } from "./AuthProvider";
import { NasirContext } from "./NasirContext";

function App() {
  const { token, section } = React.useContext(NasirContext)
  
  return (
    <div className="bg-[#f5f7ff] min-h-screen flex">
      <Sidebar />
      <div className="w-full">
        <Searchbar /> 
        <div className="relative" style={{minHeight: 'calc(100% - 70px)'}}>
          <Routes>
            <Route exact path="/" element={<AdminLogin />} />
            <Route exact path="/dashboardsection" element={<Dashboardsection />} />
            <Route exact path="/dashboardsection/dashboard" element={<Dashboard />} />
            <Route exact path="dashboard" element={<Dashboard />} />
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
            <Route exact path="reciept/recipet" element={<Reciept />} />
            <Route exact path="/reciept/recipet/Editreciept/FeesDetail" element={<FeesDetail />} />
            <Route exact path="reciept" element={<ReciptScreen />} />
            <Route exact path="reciept/FeesDetail" element={<FeesDetail />} />
            <Route exact path="report" element={<Report />} />
            <Route exact path="studentregister" element={<Studentregister />} />
            <Route path="/fee/:id" element={<FeesDetail />} />
            <Route path="/salary/:id" element={<Salary />} />
            <Route exact path="/Componant/Updateprofile" element={<Updateprofile />} />
            <Route exact path="/Componant/Changepassword" element={<Changepassword />}/>
            <Route exact path="/Componant/Addadmin" element={<Addadmin />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
