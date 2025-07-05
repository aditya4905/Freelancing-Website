import React, { useState} from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import useAuth from "./useauth";
import RazorpayPayment from "./RazorpayPayment";
const AssignProject = () => {
  


  const navigate = useNavigate();
  let [data, setData] = useState({});
  const { curr} = useAuth();
  const client = curr;
  let { id } = useParams();
  const[cost, setcost]= useState(0); 
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true); // Enable the "Assign Project" button
  };
  
  const handleClick = async (e) => {

    data.lancer_id = id;

    data.client_id = client;
    let data2 = data;
    try {
      console.log(data2);
      const response = await fetch("https://man-go.onrender.com/signupp", {
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


  const handlecost=(e)=>{
    setData({ ...data, [e.target.id]: e.target.value });
    setcost(e.target.value);
  }

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
                onChange={(e) => handlecost(e)}
              />
              <div className="relative">
                  <RazorpayPayment cost={cost}   onPaymentSuccess={handlePaymentSuccess}/>
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
             disabled={!isPaymentSuccessful}             
          >
            Assign Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignProject;
