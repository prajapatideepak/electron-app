import React from "react";

import Dashboardsection from "./Componant/Dashboardsection";
import DashboardMenu from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import { getToken } from "./AuthProvider";
import { NasirContext } from "./NasirContext";
import AdminLogin from "./screens/AdminLogin"

function App() {
  const { token, section } = React.useContext(NasirContext);


  return (
    <div>
      {!token ? (
        <div>
          <Routes>
            <Route path="/*" element={<AdminLogin />} />
          </Routes>
        </div>
      ) : !section ? (
        <Dashboardsection />
      ) : (
        <DashboardMenu />
      )}
    </div>
  );
}

export default App;
