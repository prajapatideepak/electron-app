import React from "react";

import AdminLogin from "./screens/AdminLogin";

import Dashboardsection from "./Componant/Dashboardsection";
import DashboardMenu from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import { getToken } from "./AuthProvider";

function App() {
  const [user, setUser] = React.useState(() => {
    return getToken("token");
  });
  console.log(user);
  const [section, setSection] = React.useState(() => {
    return getToken("section");
  });
  return (
    <div>
      {!user ? (
        <div>
          <Routes>
            <Route path="/*" element={<AdminLogin setUser={setUser} />} />
          </Routes>
        </div>
      ) : section ? (
        <DashboardMenu setSection={setSection} />
      ) : (
        <Dashboardsection setSection={setSection} />
      )}
    </div>
  );
}

export default App;
