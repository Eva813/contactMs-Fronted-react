import React from "react";
import NavBar from "../Components/Navbar.jsx"; 
import Sidebar from "../Components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard flex h-[92dvh]">
        <div className="sidebar w-1/5 border-r-2 border-gray-400">
          <h1>Side bar</h1>
          <Sidebar />
        </div>
        <div className="content w-4/5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
