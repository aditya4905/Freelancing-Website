import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PremiumMatch = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMatchFreelancers = async () => {
   navigate("/Matchfreelancer");
  };

  return (
    <div className="bg-teal-400 h-[75vh] flex flex-col md:flex-row items-center px-6 md:px-20 py-12">
      {/* Left Section */}

   
      <div className="md:w-1/2 space-y-6">
      <img
        src="/images/Ma.png"
        alt="Mango Pro"
        className="block  w-48 py-0 md:mx-0"
      />
        <h1 className="text-4xl font-bold text-gray-900">

          The <span className="text-green-900">premium</span> freelance solution for businesses
        </h1>
        <div className="space-y-4 text-gray-700">
          <p className="font-semibold">✅ Dedicated hiring experts</p>
          <p>Count on our AI-powered matching to find the right talent.</p>
          <p className="font-semibold">✅ Satisfaction guarantee</p>
          <p>Order confidently, with guaranteed refunds for unsatisfactory deliveries.</p>
          <p className="font-semibold">✅ Advanced management tools</p>
          <p>Seamlessly integrate freelancers into your team and projects.</p>
          <p className="font-semibold">✅ Flexible payment models</p>
          <p>Pay per project or opt for hourly rates.</p>
        </div>
        <button
          onClick={handleMatchFreelancers}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900"
        >
          Try Now
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
        <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
          <img
            src="/images/freelancer-placeholder.png"
            alt="Freelancer at work"
            className="w-full rounded-md"
          />
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md text-sm font-bold">
            Project Status: 92%
          </div>
          <div className="mt-4 text-gray-900 font-bold text-lg">$8,900</div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMatch;