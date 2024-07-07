import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className='bg-teal-700 text-white flex justify-between p-3 px-11'>
      <div className="flex items-center">
        <Link to="/" className="text-3xl mr-5 no-underline text-white">
          CONTACT MS
        </Link>
      </div>
      <div className="flex items-center">
        {/* <Link to="/" className="text-white no-underline ml-5 hover:underline underline-offset-4">About</Link> */}
        <Link to="/login" className="text-white no-underline ml-5 hover:underline underline-offset-4">Login</Link>
        <Link to="/register" className="text-white no-underline ml-5 hover:underline underline-offset-4">Register</Link>
      </div>
    </div>
  );
}
