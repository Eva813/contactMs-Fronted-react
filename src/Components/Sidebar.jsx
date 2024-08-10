import React from "react";
import {
  FaCubesStacked,
  FaUser,
  FaAddressCard,
  FaRegAddressCard,
  FaPowerOff,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(false);
  const getLinkClass = (isActive) =>
    ` ${
      activeLink === isActive ? "bg-[rgb(5,121,121)] text-white" : "text-black"
    } text-[16px] font-bold flex items-center w-full py-2`;
  return (
    <div className="sidebar mt-[25%]">
      <div className="sidebar-item w-full p-[10px_30px]">
        <FaCubesStacked className="text-3xl" />
      </div>
      <div
        className={`sidebar-item w-full p-[10px_30px] ${getLinkClass(0)}`}
        onClick={() => setActiveLink(0)}
      >
        <Link
          className={`sidebar-link no-underline text-[16px] font-bold flex items-center`}
        >
          <FaUser className="icon mr-[10px]" />
          Profile
        </Link>
      </div>
      <div
        className={`sidebar-item w-full p-[10px_30px] ${getLinkClass(1)}`}
        onClick={() => setActiveLink(1)}
      >
        <Link
          to="/dashboard"
          className={`sidebar-link no-underline text-[16px] font-bold flex items-center`}
        >
          <FaAddressCard className="icon mr-[10px]" />
          Contacts
        </Link>
      </div>
      <div
        className={`sidebar-item w-full p-[10px_30px] ${getLinkClass(2)}`}
        onClick={() => setActiveLink(2)}
      >
        <Link
          to="/dashboard/add-contact"
          className={`sidebar-link no-underline text-[16px] font-bold flex items-center`}
        >
          <FaRegAddressCard className="icon mr-[10px]" />
          Add Contact
        </Link>
      </div>
      <div
        className={`sidebar-item w-full p-[10px_30px] ${getLinkClass(3)}`}
        onClick={() => setActiveLink(3)}
      >
        <Link
          to="/logout"
          className={`sidebar-link no-underline text-[16px] font-bold flex items-center`}
        >
          <FaPowerOff className="icon mr-[10px]" />
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
