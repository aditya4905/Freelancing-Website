import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [curr, setCurr] = useState(null);
  const [whichUser, setWhichUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwt");
      if (token) {
        try {
          const response = await fetch("https://man-go.onrender.com/decode", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setCurr(data.decoded.user);
          setWhichUser(data.decoded.flag);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { curr, whichUser, loading, setCurr, setWhichUser };
};

export default useAuth;
