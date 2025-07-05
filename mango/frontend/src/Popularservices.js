import React from "react";

const PopularServices = () => {
  const services = [
    {
      name: "Web Development",
      imageUrl: "/images/s2.png",
      description: "Building modern websites",
      link: "/services/web-development",
    },
    {
      name: "Graphic Design",
      imageUrl: "/images/s3.png",
      description: "Creating stunning visuals",
      link: "/services/graphic-design",
    },
    {
      name: "Digital Marketing",
      imageUrl: "/images/s1.png",
      description: "Promoting your business online",
      link: "/services/digital-marketing",
    },
    {
      name: "SEO",
      imageUrl: "/images/s4.png",
      description: "Optimizing search engine visibility",
      link: "/services/seo",
    },
    {
      name: "Content Writing",
      imageUrl: "/images/s5.png",
      description: "Crafting engaging content",
      link: "/services/content-writing",
    },
    {
      name: "Social Media Management",
      imageUrl: "/images/s6.png",
      description: "Managing social media presence",
      link: "/services/social-media-management",
    },
    {
      name: "Business",
      imageUrl: "/images/s10.png",
      description: "Managing social media presence",
      link: "/services/Business",
    },
    {
      name: "consulting",
      imageUrl: "/images/s9.png",
      description: "Consulting  ",
      link: "/services/consulting",
    },
  ];

  return (
    <div className="py-12 px-6 md:px-20 bg-gray-50">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Popular Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
         <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
         <a href={service.link}>
           <img className="w-full h-60 object-cover" src={service.imageUrl} alt={service.name} />
         </a>
         <div className="p-3 h-30">
           <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
           <p className="text-sm text-gray-700 mt-2">{service.description}</p>
         </div>
       </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
