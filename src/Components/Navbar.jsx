import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-teal-700 text-white flex justify-between p-3 px-11">
      <div className="flex items-center">
        <Link to="/" className="text-3xl mr-5 no-underline text-white" aria-label="Return to homepage">
          CONTACT MS
        </Link>
      </div>
      <div className="flex items-center">
        {/* <Link to="/" className="text-white no-underline ml-5 hover:underline underline-offset-4">About</Link> */}
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-white no-underline ml-5 hover:underline underline-offset-4"
            >
              Contact Dashboard
            </Link>
            <Link
              to="/register"
              className="text-white no-underline ml-5 hover:underline underline-offset-4"
            >
              {user.name}
            </Link>
            <Link
              to="/logout"
              className="text-white no-underline ml-5 hover:underline underline-offset-4"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white no-underline ml-5 hover:underline underline-offset-4"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white no-underline ml-5 hover:underline underline-offset-4"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
