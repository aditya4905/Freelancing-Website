import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userPro from "./user.png";
import proimage from "./pro.svg";
import useAuth from "./useauth";
import Cookies from "js-cookie";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import bell from "./bell.png"; // Import the bell icon
import rightIcon from "./right.png"; // Import the accept icon
import wrongIcon from "./wrong.png"; // Import the reject icon
import "./style.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { curr, whichUser, loading, setCurr, setWhichUser } = useAuth();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  // const [notifications, setNotifications] = useState([]);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
 useEffect(()=>{
  fetchNotifications();
 },[curr]);
  const handleServiceClick = (service) => {
    navigate("../developers/" + service);
    console.log("Selected service:", service);
  };

  const handleClicklogin = () => {
    navigate("../login");
  };

  const handleClicklogout = async () => {
    setCurr(null); // Update state in useAuth
    setWhichUser(null); // Update state in useAuth
    await Cookies.remove("jwt");
    navigate("./");
  };

  const fetchNotifications = async () => {
    if (whichUser == 2) {
      try{
        const response = await fetch("http://localhost:5000/fetchproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id : curr}), //send syntax
      });
      const data = await response.json();
      setNotifications(data.response);
    }
    catch(err)
    {
      console.log(err);
    }
   } else {
      // Non-client notifications
      // fetch("/api/freelancer/notifications") // Replace with your freelancer notifications endpoint
      //   .then(response => response.json())
      //   .then(data => {
      //     setNotifications(data.notifications);
      //   })
      //   .catch(error => {
      //     console.error("Error fetching freelancer notifications:", error);
      //   });
    }
  };

  const [notifications, setNotifications] = useState([]);
  const handleNotificationsDropdownToggle = () => {
    if(isNotificationsDropdownOpen==0)fetchNotifications();
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
  };
 
  const handleViewProject = (id) => {
    navigate("../viewproject/" + id);
  };

  const handleAccept = async (id) => {
    console.log(`Accepted project with id: ${id}`);    
    try{

        handleNotificationsDropdownToggle();
        const data = { username: curr, id };
        const response = await fetch("http://localhost:5000/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data}), //send syntax
      });      
      fetchNotifications();
    }
    catch(err)
    {
      console.log(err);
    }
    
    // sendNotificationToClient(id, "accept");
    // transfer this project from pending to accepted category ......
  };
  const handleReject = async (id) => {
    console.log(`Rejected project with id: ${id}`);
    try{
        handleNotificationsDropdownToggle();
        const data = { username: curr, id };
        const response = await fetch("http://localhost:5000/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data}), //send syntax
      });
    }catch(err)
    {
      console.log(err);
    }
        
    // Send reject notification to client

    //sendNotificationToClient(id, "reject");
  };

  // const sendNotificationToClient = (projectId, action) => {
  //   // Replace this with your actual notification sending logic to the client
  //   fetch(`/api/sendNotification/${projectId}/${action}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       projectId,
  //       action,
  //     }),
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         console.log(`Notification sent to client for project ${projectId} (${action})`);
  //         // Optionally update UI to reflect notification sent
  //       } else {
  //         console.error(`Failed to send notification to client for project ${projectId}`);
  //         // Handle error scenario
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error sending notification:", error);
  //       // Handle error scenario
  //     });
  // };

  const isLoggedIn = curr ? true : false;
  let ProfileLink =
    whichUser != 1 ? `../profile/${curr}` : `../ProfileClient/${curr}`;

  return (
    <div className="sticky top-0 z-50 bg-teal-100 flex justify-between items-center h-20 shadow-md px-6">
      <div className="flex items-center space-x-6">
        <a href="/home">
          <img src={proimage} className="w-16 h-16 cursor-pointer" alt="Logo" />
        </a>
        <a
          className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
          href="/home"
        >
          Home
        </a>
        <DropdownButton
          id="dropdown-basic-button"
          title="Services"
          className="custom-dropdown"
        >
          <Dropdown.Item onClick={() => handleServiceClick("WebDeveloper")}>
            Web Developer
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleServiceClick("AppDeveloper")}>
            App Developer
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleServiceClick("LogoMaking")}>
            Logo Making
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="flex items-center space-x-6">
        {isLoggedIn && whichUser == 2 && (
  <div className="relative">
    <img 
      src={bell} 
      className="h-8 w-8 cursor-pointer" 
      alt="Notifications" 
      onClick={handleNotificationsDropdownToggle} 
    />
    {notifications.length > 0 && (
      <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold leading-tight text-center text-white bg-red-500 rounded-full">
        {notifications.length}
      </span>
    )}
    {isNotificationsDropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-teal-100 border border-gray-200 rounded-lg shadow-lg">
        <ul className="py-1">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="py-2  pr-3 flex justify-between items-center cursor-pointer hover:bg-teal-200"
              onClick={() => handleViewProject(notification._id)}
            >
              <span className="text-lg font-medium">{notification.name}</span>
              <span className="flex space-x-1">
                {whichUser !== "1" ? (
                  <React.Fragment>
                    <img
                      src={rightIcon}
                      className="h-6 w-6 cursor-pointer transform hover:scale-110 transition duration-200 mr-3"
                      alt="Accept"

                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(notification._id);
                      }}
                    />
                    <img
                      src={wrongIcon}
                      className="h-7 w-7 cursor-pointer transform hover:scale-110 transition duration-200 mr-2 ml-1"
                      alt="Reject"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(notification._id);
                      }}
                    />
                  </React.Fragment>
                ) : (
                  <span className="text-lg font-medium">Current State: {notification.currentCode}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}
          
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a href={ProfileLink}>
                <img
                  src={userPro}
                  alt="Profile"
                  className="rounded-full h-12 w-12 cursor-pointer"
                />
              </a>
    
            </div>
            <button
              className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
              onClick={handleClicklogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
            onClick={handleClicklogin}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
