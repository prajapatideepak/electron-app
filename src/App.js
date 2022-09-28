import React, { useEffect } from "react";

import AdminLogin from "./screens/AdminLogin";

import Dashboardsection from "./Componant/Dashboardsection";
import DashboardMenu from "./Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = React.useState(!true);
  const [section, setSection] = React.useState(!true);
  return (
    <div>
      {user ? (
        <div>
          <Routes>
            <Route exact path="/" element={<AdminLogin setUser={setUser} />} />
          </Routes>
        </div>
      ) : !section ? (
        <DashboardMenu />
      ) : (
        <Dashboardsection setSection={setSection} />
      )}
    </div>
  );
}

export default App;
