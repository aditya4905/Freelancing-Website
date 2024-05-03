import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Pro from "./user.png";

const Developers = () => {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating2, setRating2] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/developers/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.result.length === 0) {
          alert(data.message);
          navigate("/home");
        } else {
          setItems(data.result);
         console.log(data.result); 
          
          console.log("hii");  
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

 const handleClick = (username) => {
   console.log("clicked");  
   navigate(`/profile/${username}`); // Navigate to the profile with the username as the identifier
 };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row row-cols-lg-4 g-4 ">
          {items.map((item, index) => (
            <div
              key={index}
              className="col cursor-pointer"
              onClick={() => handleClick(item.username)}
            >
              <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={Pro}
                      alt="User"
                      className="rounded-circle mb-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <hr className="black" style={{ width: "80%" }}></hr>{" "}
                    {/* Adjusted width */}
                  </div>
                  <div className="ml-3">
                    {" "}
                    {/* Margin for text */}
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="card-text mb-2">
                      Rating:{" "}
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-lg mr-1 cursor-pointer ${
                            index < item.rating
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </p>
                    <p className="card-text mb-0">Username: {item.username}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Developers;
