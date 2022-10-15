import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query';
 import "react-toastify/dist/ReactToastify.css";
 
 const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
        <ToastContainer 
          position= "top-right"
            autoClose= {4000}
            hideProgressBar= {false}
            closeOnClick= "true"
            pauseOnHover= "true"
            draggable= "true"
        />
      </HashRouter>
    </QueryClientProvider>
);
