import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterClient = () => {
  const navigate = useNavigate();

  const [Data, handleData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log("hi");
      const response = await fetch("http://localhost:5000/signupc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data), //send syntax
      });

      const data = await response.json();
      if (!response.flag) {
        alert(data.message);
        navigate("/login"); //navigate to login page
      } else {
        navigate("../signupclient");
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Could not submit data");
    }
  };



  return (
    <div className="h-screen bg-white-900 flex justify-center items-center">
      <div className="w-4/12 bg-black rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-8 text-front">
          Sign Up
        </h2>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-white mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) =>
              handleData({ ...Data, [e.target.id]: e.target.value })
            }
            className="rounded-md  w-full p-2 bg-gray-300 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Username" className="block text-white mb-2">
            Username *
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) =>
              handleData({ ...Data, [e.target.id]: e.target.value })
            }
            className="rounded-md  w-full p-2 bg-gray-300 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-white mb-2">
            Email *
          </label>
          <input
            type="text"
            id="email"
            onChange={(e) =>
              handleData({ ...Data, [e.target.id]: e.target.value })
            }
            className="rounded-md  w-full p-2 bg-gray-300 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Password" className="block text-white mb-2">
            Password *
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              handleData({ ...Data, [e.target.id]: e.target.value })
            }
            className="rounded-md  w-full p-2 bg-gray-300 text-black"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
            onClick={(e) => handleClick(e)}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
