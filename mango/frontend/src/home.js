import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import PopularServices from "./Popularservices";
import Premium from "./Premium";

import Footer from "./footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() !== "") {
      navigate("../developers/" + searchQuery, { replace: true });
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative">
  <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
    {/* <div>
      <img
        className="h-screen w-full object-cover"
        src="/images/img1.jpg"
        alt="Slide 1"
      />
    </div> */}
    <div>
      <img
        className="h-screen w-full object-cover"
        src="/images/img2.jpg"
        alt="Slide 2"
      />
    </div>
    <div>
      <img
        className="h-screen w-full object-cover"
        src="/images/img3.jpg"
        alt="Slide 3"
      />
    </div>
  </Carousel>
  <div className="absolute top-1/4 left-20 pl-20 pt-10 rounded-md w-4/12 transform -translate-y-1/2">
    <div className="text-5xl pb-4">
      Find the right freelance service, right away
    </div>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full bg-gray-200 px-1 py-2 rounded-md outline-none"
      />
      <button
        type="submit"
        className="mt-2 bg-teal-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  </div>
</div>
<PopularServices />
<Premium/>
<Footer />

    </>
  );
}

export default Home;
