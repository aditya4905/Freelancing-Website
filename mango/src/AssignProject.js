import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const AssignProject = () => {
  


  const navigate = useNavigate();
  let [data, setData] = useState({});
  const client = localStorage.getItem("user");
  let { id } = useParams();


  
  const handleClick = async (e) => {
    console.log(id);
    data.lancer_id = id;

    data.client_id = client;
    let data2 = data;
    try {
      console.log(data2);
      const response = await fetch("http://localhost:5000/signupp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2), //send syntax
      });
     

      const data = await response.json();
      alert(data.message);  
      if (!response.ok) {
        console.log('herererererererer');
      } else {
        console.log("here");  
        navigate('/profile/'+id);
      }
    } catch (error) {
      console.log(error);
      alert("Could not submit data");
    }
  };

  



  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };


  const handleInput = (e) => {
    setData({ ...data, [e.target.id]: e.target.value }); // Send the data to the backend ....
  };

  return (
    <div>
      <Navbar />

      <div className="mx-auto container  mt-8">
        {" "}
        {/*mx-auto */}
        <h2 className="text-2xl font-bold mb-4">Assign Project</h2>
        <div className="flex flex-col">
          {/* Project Name */}
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-bold mb-2"
            >
              Project Name:
            </label>

            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded py-2 px-3 w-full"
              placeholder="Enter project name"
              onChange={(e) => handleInput(e)}
            />
          </div>

          {/* Deadline */}

          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-bold mb-2">
              Deadline:
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-300 rounded py-2 px-3 w-full"
              onChange={(e) => handleInput(e)}
            />
          </div>

          {/* {cost} */}
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-bold mb-2">
              Cost:
            </label>
           <div className="flex items-center">
              <input
                type="text"
                id="cost"
                className="border border-gray-300 rounded-l py-2 px-3 w-full"
                placeholder="Enter project cost"
                onChange={(e) => handleInput(e)}
              />
              <div className="relative">
                <select
                  className="appearance-none border border-gray-300 rounded-r py-2 px-3 bg-white text-gray-700 font-semibold"
                  value={selectedCurrency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                </select>
              </div>

          </div>
        </div>

          {/* Project Demands */}
          <div className="mb-4">
            <label
              htmlFor="projectDemands"
              className="block text-sm font-bold mb-2"
            >
              Project Demands:
            </label>
            <textarea
              id="description"
              className="border border-gray-300 rounded py-2 px-3 w-full"
              rows="4"
              placeholder="Enter project demands"
              onChange={(e) => handleInput(e)}
            ></textarea>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-10 flex justify-end">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded   focus:outline-none focus:shadow-outline"
             onClick={handleClick}
          >
            Assign Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignProject;
