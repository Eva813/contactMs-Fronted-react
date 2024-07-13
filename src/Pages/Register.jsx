import React from "react";
import "../assets/css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Validation from "../Components/validation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = Validation(values);
    setErrors(error);
    if (error.name === "" && error.email === "" && error.password === "") {
      // if all fields are empty，it is no front error
      // 調用 api 來創建新用戶
      axios
        .post("http://127.0.0.1:3000/contactmsyt/register", values)
        .then((res) => {
          if (res.data.success) {
            // 成功創建新用戶，要有提示
            toast.success("Account Created Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
            });
            // 成功後跳轉到登錄頁面
            navigate("/login");
          }
        })
        .catch((error) => {
          // 如果有錯誤，要有提示
          console.log(error);
          if (error.response.data.errors) {
            setServerErrors(error.response.data.errors);
            toast.error(serverErrors[0].msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true
            })
          } else {
            console.log(error);
          }
        });

      console.log("Form submitted");
    }
  };
  return (
    <div className="form-container flex justify-center items-center h-screen bg-cover bg-center bg-fixed">
      <form
        className="form bg-slate-50 bg-opacity-70 rounded-lg shadow-md p-5 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-center text-lg">Create account</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="form-label block text-sm font-bold mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control w-full p-2 border-box mt-1"
            name="name"
            onChange={handleInput}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="form-label block text-sm font-bold mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control w-full p-2 border-box mt-1"
            name="email"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="form-label block text-sm font-bold mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            placeholder="********"
            className="form-control w-full p-2 border-box mt-1"
            name="password"
            onChange={handleInput}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        {/* {serverErrors.length > 0 &&
          serverErrors.map((error, index) => {
            return (
              <p key={index} className="text-red-500 text-sm">
                {error.msg}
              </p>
            );
          })} */}
        <button className="bg-teal-700 text-white py-2 w-full border-none rounded cursor-pointer font-bold mt-2 mb-2">
          Register
        </button>
        <p>
          Already Registered?{" "}
          <Link
            to="/login"
            className="text-teal-700 underline underline-offset-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
