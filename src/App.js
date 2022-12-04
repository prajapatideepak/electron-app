import React from "react";

import Dashboardsection from "./Componant/Dashboardsection";
import DashboardMenu from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import { NasirContext } from "./NasirContext";
import AdminLogin from "./screens/AdminLogin";
import ErrorBoundary from "./Componant/ErrorBound";

function App() {
  const { token, section } = React.useContext(NasirContext);

  return (
    <div>
      {!token ? (
        <div>
          <ErrorBoundary>
            <Routes>
              <Route path="/*" element={<AdminLogin />} />
            </Routes>
          </ErrorBoundary>
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
