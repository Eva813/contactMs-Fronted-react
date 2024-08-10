import React from "react";
import "../assets/css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Validation from "../Components/validation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from 'react-icons/fa6'

const AddContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  // const [errors, setErrors] = useState({});
  // const [serverErrors, setServerErrors] = useState([]);
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
    // const error = Validation(values);
    // setErrors(error);

      // 調用 api 來創建新用戶
      axios
        .post(`https://contact-ms-backend-node.vercel.app/contactmsyt/add-contact`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            // 成功創建新用戶，要有提示
            toast.success("Contact Added Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
            });
            // 成功後跳轉到登錄頁面
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          // 如果有錯誤，要有提示
          console.log(error);
          // if (error.response.data.errors) {
          //   setServerErrors(error.response.data.errors);
          //   toast.error(serverErrors[0].msg, {
          //     position: "top-right",
          //     autoClose: 3000,
          //     hideProgressBar: true
          //   })
          // } else {
          //   console.log(error);
          // }
        });

      console.log("Form submitted");
    
  };
  return (
    <div className="form-container h-[92dvh] flex justify-center items-center bg-cover bg-center bg-fixed">
      <form
        className="form w-[500px] bg-white bg-opacity-70 rounded-lg shadow-lg p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-center text-lg">Add account</h2>
        <div className="mb-4 flex items-center">
          <FaUserPlus className="font-bold text-lg" />
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control w-full ml-2.5 p-2 mb-4 border-0 border-b border-solid border-[#2b2a2a] bg-transparent placeholder-gray-800 focus:outline-none"
            name="name"
            onChange={handleInput}
          />
          {/* {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} */}
        </div>
        <div className="mb-4 flex items-center">
          <FaAt className="font-bold text-lg" />
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control w-full ml-2.5 p-2 mb-4 border-0 border-b border-solid border-[#2b2a2a] bg-transparent placeholder-gray-800 focus:outline-none"
            name="email"
            autoComplete="off"
            onChange={handleInput}
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )} */}
        </div>
        <div className="mb-4 flex items-center">
          <FaPhoneFlip className="font-bold text-lg" />
          <input
            type="text"
            placeholder="Enter Phone number"
            className="form-control w-full ml-2.5 p-2 mb-4 border-0 border-b border-solid border-[#2b2a2a] bg-transparent placeholder-gray-800 focus:outline-none"
            name="phone"
            onChange={handleInput}
          />
        
        </div>
        <div className="mb-4 flex items-center">
          <FaRegAddressCard className="font-bold text-lg" />
            <input
            type="text"
            placeholder="Enter Address"
            className="form-control w-full ml-2.5 p-2 mb-4 border-0 border-b border-solid border-[#2b2a2a] bg-transparent placeholder-gray-800 focus:outline-none"
            name="address"
            onChange={handleInput}
          />
        </div>
        
        <button className="bg-teal-700 text-white py-2 w-full border-none rounded cursor-pointer font-bold mt-2 mb-2">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddContact;
