import React, { useEffect } from "react";
import Sidebar from "./Componant/sidebar";
import Searchbar from "./Componant/searchbar";
import { Routes, Route } from "react-router-dom";
import Myclass from "./screens/Myclass";
import Class from "./Componant/class";
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
import { Addadmin } from "./Componant/Addadmin";
import Transfer from "./Componant/Transfer";
import Receipt_teacher from "./Componant/Receipt_teacher";
import Dashboardsection from "./Componant/Dashboardsection";
import { usegetAdmin } from "./hooks/usePost";
import { useQuery } from "react-query";
import { VerifyAdmin } from "./AuthProvider";
import Whatsapp from "./Componant/Whatsapp";
import { NasirContext } from "./NasirContext";
import AdminList from "./screens/AdminList";
import UpdateStudentReceipt from './screens/UpdateStudentReceipt';
import CancelAdmission from './screens/CancelAdmission';
import Salarydetails from "./Componant/Salarydetails";

function DashboardMenu({ setSection }) {
  const { setAdmin, login } = React.useContext(NasirContext);
  const adminData = useQuery("admin", usegetAdmin);

  useEffect(() => {
    login()
  }, [])

  if (adminData.isSuccess) {
    setAdmin(adminData.data.data);
  }

  return !adminData.isSuccess ? (
    <div class="flex bg-[#f5f7ff]  items-center h-screen justify-center space-x-2 ">
      <div class="w-12 h-12 bg-blue-400 rounded-full animate-bounce"></div>
      <div class="w-12 h-12 bg-green-400 rounded-full animate-bounce"></div>
      <div class="w-12 h-12 bg-black rounded-full animate-bounce"></div>
    </div>
  ) : (
    <div className="bg-[#f5f7ff] min-h-screen flex">
      {<Sidebar />}
      <div className="w-full">
        {<Searchbar setSection={setSection} />}
        <div className="relative" style={{ minHeight: "calc(100% - 70px)" }}>
          <Routes>
            <Route exact path="/admin-login" element={<AdminLogin />} />
            <Route
              exact
              path="/dashboardsection"
              element={<Dashboardsection />}
            />
            <Route exact path="/whatsapp" element={<Whatsapp />} />
            <Route
              exact
              path="/dashboardsection/dashboard"
              element={<Dashboard />}
            />
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="myclass" element={<Myclass />} />
            <Route exact path="/myclass/class/:id" element={<Class />} />
            <Route
              exact
              path="/myclass/class/ChangeYear"
              element={<ChangeYear />}
            />
            <Route
              exact
              path="/myclass/class/:id/Transfer"
              element={<Transfer />}
            />
            <Route
              exact
              path="/myclass/class/Transfer/class"
              element={<Class />}
            />
            <Route
              exact
              path="/myclass/class/Profilestudent"
              element={<Profilestudent />}
            />
            <Route
              exact
              path='/myclass/class/Profilestudent/Studenthistory'
              element={<Studenthistory />}
            />
            <Route exact path="fee" element={<Fee />} />
            <Route exact path="fee/FeesDetail" element={<FeesDetail />} />
            <Route exact path="/faculty" element={<Faculty />} />
            <Route
              exact
              path="/faculty/Profilefaculty/:id"
              element={<Profilefaculty />}
            />
            <Route
              exact
              path="Profilefaculty/Staffhistory/:id"
              element={<Staffhistory />}
            />
            <Route exact path='/Staffhistory/Receipt_teacher/:id' element={<Receipt_teacher />} />
            <Route exact path="help" element={<Help />} />
            <Route exact path="receipt/receipt" element={<Reciept />} />
            <Route
              exact
              path="/reciept/recipet/Editreceipt/FeesDetail"
              element={<FeesDetail />}
            />
            <Route exact path="receipt" element={<ReciptScreen />} />
            <Route exact path="receipt/FeesDetail" element={<FeesDetail />} />
            <Route exact path="report" element={<Report />} />
            <Route exact path="studentregister" element={<Studentregister />} />
            <Route path="/fee/:id" element={<FeesDetail />} />
            <Route path="/salary/:id" element={<Salary />} />
            <Route path="/salary/Salarydetails/:id" element={<Salarydetails />} />
              <Route path="/salary/Receipt_teacher/:id" element={<Receipt_teacher />} />
            <Route
              exact
              path="/Componant/Updateprofile"
              element={<Updateprofile />}
            />
            <Route
              exact
              path="/Componant/Changepassword"
              element={<Changepassword />}
            />
            <Route exact path="/Componant/Addadmin" element={<Addadmin />} />
            <Route exact path="/Componant/AdminList" element={<AdminList />} />
            <Route exact path="/cancelAdmission/:student_id" element={<CancelAdmission />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;