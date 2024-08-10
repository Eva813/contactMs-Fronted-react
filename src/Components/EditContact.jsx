import React, {useEffect} from "react";
import "../assets/css/form.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Validation from "../Components/validation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from 'react-icons/fa6'

const EditContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const {id} = useParams();
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
        .put(`${process.env.REACT_APP_API_URL}/contactmsyt/update-contact/`+id, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            // 成功創建新用戶，要有提示
            toast.success("Contact Updated Successfully", {
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
        });

      console.log("Form submitted");
    
  };

  // 取得 EditContact 的 data

  useEffect(() => {
    const fetchContacts = async () => {
      
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/contactmsyt/contact/`+id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          // value 會更新
          setValues({
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
          });
        }
      } catch (err) {
        console.log(err);
      } 
    };

    fetchContacts();

  }, []);
  
  return (
    <div className="form-container h-[92dvh] flex justify-center items-center bg-cover bg-center bg-fixed">
      <form
        className="form w-[500px] bg-white bg-opacity-70 rounded-lg shadow-lg p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-center text-lg">Edit account</h2>
        <div className="mb-4 flex items-center">
          <FaUserPlus className="font-bold text-lg" />
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control w-full ml-2.5 p-2 mb-4 border-0 border-b border-solid border-[#2b2a2a] bg-transparent placeholder-gray-800 focus:outline-none"
            name="name"
            onChange={handleInput}
            value={values.name}
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
            value={values.email}
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
            value={values.phone}
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
            value={values.address}
          />
        </div>
        
        <button className="bg-teal-700 text-white py-2 w-full border-none rounded cursor-pointer font-bold mt-2 mb-2">
          Updated
        </button>
      </form>
    </div>
  );
}

export default EditContact;
