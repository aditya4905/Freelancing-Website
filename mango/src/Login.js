import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  let { id } = useParams();
  console.log(id);
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // console.log("hi");
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), //send syntax
      });

      const data = await response.json();
      if (!response.ok || data.flag == 3 ) {
        alert(data.message);
        navigate("/login");
      } else {
        localStorage.setItem("user", data.result.username);
        localStorage.setItem("flag", data.flag);
        // console.log(localStorage.getItem('user'));
        const k = localStorage.getItem("user");

        navigate("/home");
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Could not submit data");
    }
  };

  const handleClick2 = async (e) => {
    navigate("/signup");
  };
  const handleClick3 = async (e) => {
    navigate("/signupclient");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="bg-black px-10 pt-20 rounded-lg shadow-lg w-3/12 h-4/6">
        <h2 className="text-3xl font-bold text-white mb-6 ">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-white mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            className="w-full py-2 px-3 rounded-md bg-gray-300 text-black"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            className="w-full py-2 px-3 rounded-md bg-gray-300 text-black"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline "
            onClick={(e) => handleClick(e)}
          >
            Login
          </button>
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => handleClick2(e)}
          >
            Freelancer Register
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2  rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => handleClick3(e)}
          >
            Client Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
