import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import "../assets/css/dashboard.css";
import BounceLoader from "react-spinners/BounceLoader";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// 給 DataTable 用的自定義樣式
// https://react-data-table-component.netlify.app/?path=/docs/api-custom-styles--docs
const customStyles = {
  headCells: {
    style: {
      fontSize: 15 + "px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: 13 + "px",
      fontWeight: 500,
    },
  },
};
const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const MIN_LOADING_TIME = 2000; // 最小加載時間為2秒
  const MySwal = withReactContent(Swal);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="flex">
            <Link to={`/dashboard/edit-contact/${row._id}`}><FaPenToSquare className="table-icon1 mx-1 text-xl cursor-pointer text-green-600" /></Link>
            <FaRegTrashCan className="table-icon2 mx-1 text-xl cursor-pointer text-red-600" onClick={() => handleDelete(row._id)} />
          </div>
        </>
      ),
    },
  ];

  // 如果 API 在 5 秒內回應，載入狀態仍然會顯示整整 5 秒。
  // 如果 API 花費超過 5 秒，載入狀態將持續到數據被接收和處理完畢。
    const fetchContacts = async () => {
      startTimeRef.current = Date.now();
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/contactmsyt/contacts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setContacts(res.data.contacts);
        }
      } catch (err) {
        console.log(err);
      } finally {
        const elapsedTime = Date.now() - startTimeRef.current;
        const remainingTime = Math.max(MIN_LOADING_TIME - elapsedTime, 0);

        timeoutRef.current = setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    };
  useEffect(() => {
    fetchContacts();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDelete = (id) => {
    
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // call api...
      axios
        .delete(`${import.meta.env.VITE_API_URL}/contactmsyt/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          
          MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          // 可以執行刪除操作，再重打一次 get 請求（http://127.0.0.1:3000/contactmsyt/contacts）
          // 這樣就不用等待下一次渲染
          fetchContacts();
          
        })
        .catch((err) => {
          MySwal.fire({
            title: "Error!",
            text: "Error Occurred",
            icon: "error"
          });
        });

      }
    });
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="#0e766e"
          ></BounceLoader>
        </div>
      ) : (
        <div className="contact-list">
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyles}
            pagination
          />
          {contacts.length === 0 ? <h1>Add a Contact</h1> : <></>}
        </div>
      )}
    </>
  );
};

export default Contacts;
