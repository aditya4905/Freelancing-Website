import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userPro from "./user.png";
import proimage from "./pro.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const curr = localStorage.getItem("user");
  const whichUser = localStorage.getItem("flag");

  const isLoggedIn = curr ? true : false;

  let ProfileLink;
  console.log(whichUser);  
  if (whichUser !== "1") ProfileLink = "../profile/" + curr;
  else ProfileLink = "../ProfileClient/" + curr;

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleServiceClick = (service) => {
    navigate("../developers/" + service);
    console.log("Selected service:", service);
  };

  const handleClicklogin = () => {
    navigate("../login");
  };

  const handleClicklogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("flag");
    navigate("../home");
  };

  return (
    <div className="sticky h-2/12 top-0 z-50 bg-teal-100 flex justify-between items-center">
      <div className="pl-10">
        {/* Adjusted img tag */}
        <a href="/home">
          <img
            src={proimage}
            className="w-40 h-40 cursor-pointer "
            alt="Logo"
          />
        </a>
      </div>

      <div className="flex mr-3">
        <a
          className="mr-5 text-2xl text-gray-800 hover:text-blue-600"
          href="/home"
        >
          Home
        </a>
        {/* <a className="ml-5 text-2xl mr-5 cursor-pointer text-gray-800 hover:text-blue-600">
          Premium
        </a> */}
        {/* Dropdown for Services */}
        <div
          className="relative ml-5"
          onMouseEnter={handleDropdownToggle}
          onMouseLeave={handleDropdownToggle}
        >
          <div className="text-2xl cursor-pointer outline-none focus:outline-none hover:text-blue-600">
            Services
          </div>
          {isDropdownOpen && (
            <div className="absolute  shadow-lg rounded-md bg-white">
              <ul className="py-1 px-4 z-200">
                <li
                  className=" py-2 cursor-pointer hover:bg-blue-200"
                  onClick={() => handleServiceClick("WebDeveloper")}
                >
                  Web Developer
                </li>
                <li
                  className=" py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleServiceClick("AppDeveloper")}
                >
                  App Developer
                </li>
                <li
                  className=" py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleServiceClick("LogoMaking")}
                >
                  Logo Making
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {isLoggedIn ? (
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img
                src={userPro}
                alt="Profile"
                className="rounded-full h-12 w-14 cursor-pointer pr-4 mb-2"
              />
              <a className="text-blue-900 underline" href={ProfileLink}>
                {curr}
              </a>
            </div>
            <button
              className="ml-4 text-white bg-gray-800 hover:bg-gray-700 pl-1 rounded"
              onClick={handleClicklogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            className="h-12 m-4 px-4 text-white bg-gray-800 hover:bg-gray-700  rounded"
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
