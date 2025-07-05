import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const Profile = () => {
  

  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [editedFields, setEditedFields] = useState({
    username: '',
    name: '',
    email: '',
    skills: []
  });




  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user === id) {
          navigate("/myprofile/");
          return;
        }
  
        const response = await axios.post(`https://man-go.onrender.com/myprofile/${user}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = response.data; // Axios automatically parses JSON
        setEditedFields(data.result);
        console.log(data.result.toString());
      } catch (error) {
        console.error(error);
        alert("Could not fetch data");
      }
    };
  
    fetchData();
  }, [id, navigate]);
  

    const handleClick = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post("https://man-go.onrender.com/login", editedFields, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = response.data;
        if (response.status !== 200) {
          alert(data.message);
        } else {
          localStorage.setItem("user", data.result.username);
          navigate("/myprofile/");
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Could not submit data");
      }
    };
    
 


  
  const handleFieldChange = (e) => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;
    setEditedFields({ ...editedFields, [fieldName]: fieldValue });
  };

 

  return (
    <div className="h-screen bg-gray-800 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/12">
        <h2 className="text-2xl mb-4 font-bold text-gray-800">Edit Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input
          
            type="text"
            id="username"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={editedFields.username}
            onChange={(e)=>handleFieldChange(e)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className=" border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
            value={editedFields.name}
            onChange={(e)=>handleFieldChange(e)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className=" border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            value={editedFields.email}
            onChange={(e) => handleFieldChange(e)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            className=" border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
            value={editedFields.skills}
            onChange={(e)=>handleFieldChange(e)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => handleClick(e)} // Placeholder for saveChanges function
           >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
