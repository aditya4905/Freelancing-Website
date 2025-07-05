import React, { useState } from "react";

const MatchFreelancer = () => {
  const [formData, setFormData] = useState({
    projectDescription: "",
    skills: "",
    budget: "",
    duration: "",
    frameworks: "",
    origin: "",
  });

  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5678/webhook-test/job-matching/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setFreelancers(data.freelancers);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 p-5 text-center">
        Find the Best Freelancers
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-6 bg-tealborder border-gray-200"
      >
        {[
          { label: "Project Description", name: "projectDescription", type: "textarea", placeholder: "Describe your project..." },
          { label: "Skills Required", name: "skills", type: "text", placeholder: "e.g., Web Development, React" },
          { label: "Budget ($)", name: "budget", type: "number", placeholder: "Enter your budget" },
          { label: "Duration", name: "duration", type: "text", placeholder: "e.g., 1 month" },
          { label: "Frameworks/Technologies", name: "frameworks", type: "text", placeholder: "e.g., React, Node.js" },
          { label: "Preferred Freelancer Location", name: "origin", type: "text", placeholder: "e.g., USA, Remote" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder={placeholder}
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder={placeholder}
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition-all"
        >
          Find Freelancers
        </button>
      </form>

      {loading && <p className="mt-6 text-gray-700 text-center">Loading...</p>}

      {!loading && freelancers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Top Freelancers</h2>
          <ul className="mt-4 space-y-4">
            {freelancers.map((freelancer, index) => (
              <li
                key={index}
                className="p-6 border rounded-lg bg-white shadow-md flex flex-col gap-2"
              >
                <p className="text-lg font-semibold text-gray-800">{freelancer.name}</p>
                <p className="text-gray-600">{freelancer.skills.join(", ")}</p>
                <p className="text-teal-600 font-medium">Rate: ${freelancer.rate}/hr</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchFreelancer;
