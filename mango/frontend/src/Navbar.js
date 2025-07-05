import React, { useState, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useauth";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { curr, whichUser, setCurr, setWhichUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
  const fetchNotifications = useCallback(async () => {
    if (whichUser === 2) {
      try {
        const response = await fetch("https://man-go.onrender.com/fetchproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: curr }),
        });
        const data = await response.json();
        setNotifications(data.response);
      } catch (err) {
        console.log(err);
      }
    }
  }, [whichUser, curr]); // Memoizing the function
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]); // Now you can safely use it in the dependency array

  const isLoggedIn = curr ? true : false;
  const profileLink = whichUser !== 1 ? `../profile/${curr}` : `../ProfileClient/${curr}`;



  const handleNotificationsDropdownToggle = () => {
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
    if (!isNotificationsDropdownOpen) {
      fetchNotifications();
    }
  };

  const handleServiceClick = (service) => {
    navigate(`../developers/${service}`);
  };

  const handleLoginClick = () => {
    navigate("../login");
  };

  const handleLogoutClick = async () => {
    setCurr(null);
    setWhichUser(null);
    await Cookies.remove("jwt");
    navigate("./");
  };

  const handleAccept = async (id) => {
    try {
      const data = { username: curr, id };
      await fetch("https://man-go.onrender.com/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const data = { username: curr, id };
      await fetch("https://man-go.onrender.com/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-teal-100 flex justify-between items-center h-20 shadow-md px-6">
      {/* Left side (Logo and Home) */}
      <div className="flex items-center space-x-6">
        <a href="/home">
          <img src='/images/Mango.png' className="w-20 h-10 cursor-pointer" alt="Logo" />
        </a>
       
        <DropdownButton id="dropdown-basic-button" title="Services" className="custom-dropdown">
          <Dropdown.Item onClick={() => handleServiceClick("WebDeveloper")}>Web Developer</Dropdown.Item>
          <Dropdown.Item onClick={() => handleServiceClick("AppDeveloper")}>App Developer</Dropdown.Item>
          <Dropdown.Item onClick={() => handleServiceClick("LogoMaking")}>Logo Making</Dropdown.Item>
        </DropdownButton>


      </div>

      {/* Right side (Profile, Notifications, Login/Logout) */}
      <div className="flex items-center space-x-6">
        {isLoggedIn && whichUser === 2 && (
          <div className="relative">
            <img
              src='/images/bell.png'
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
                      className="py-2 pr-3 flex justify-between items-center cursor-pointer hover:bg-teal-200"
                      onClick={() => navigate(`../viewproject/${notification._id}`)}
                    >
                      <span className="text-lg font-medium">{notification.name}</span>
                      <span className="flex space-x-1">
                        <img
                          src='/images/right.png'
                          className="h-6 w-6 cursor-pointer"
                          alt="Accept"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(notification._id);
                          }}
                        />
                        <img
                          src='/images/wrong.png'
                          className="h-7 w-7 cursor-pointer"
                          alt="Reject"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(notification._id);
                          }}
                        />
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
            <a href={profileLink}>
              <img
                src='/images/user.png'
                alt="Profile"
                className="rounded-full h-12 w-12 cursor-pointer"
              />
            </a>
            <button
              className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
              onClick={handleLogoutClick}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
