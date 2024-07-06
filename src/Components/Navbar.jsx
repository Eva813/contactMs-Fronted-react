import React from "react";

export default function NavBar() {
  return (
    <div className='bg-teal-700 text-white flex justify-between p-3 px-11'>
      <div className="flex items-center">
        <a href="" className="text-3xl mr-5 no-underline text-white">
          CONTACT MS
        </a>
      </div>
      <div className="flex items-center">
        <a href="" className="text-white no-underline ml-5 hover:underline underline-offset-4">About</a>
        <a href="" className="text-white no-underline ml-5 hover:underline underline-offset-4">Login</a>
        <a href="" className="text-white no-underline ml-5 hover:underline underline-offset-4">Register</a>
      </div>
    </div>
  );
}
