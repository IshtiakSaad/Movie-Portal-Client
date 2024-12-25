import React from 'react';

const ReasonsToJoin = ({ theme }) => {
  const reasons = [
    {
      title: "Enjoy on your TV",
      description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      icon: "📺",
    },
    {
      title: "Download your shows to watch offline",
      description: "Save your favorites easily and always have something to watch.",
      icon: "⬇️",
    },
    {
      title: "Watch everywhere",
      description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      icon: "🔭",
    },
    {
      title: "Create profiles for kids",
      description: "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      icon: "🎭",
    },
  ];

  const containerClasses = theme === 'dark' ? "w-5/6 lg:w-3/4 mx-auto text-white py-16" : "w-5/6 lg:w-3/4 mx-auto bg-base-200 text-gray-400 py-16";
  const cardClasses = theme === 'dark' 
    ? "bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 p-6 flex flex-col items-center justify-center rounded-xl shadow-lg w-full sm:w-64 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    : "bg-gradient-to-b from-indigo-600 via-indigo-800 to-black p-6 flex flex-col items-center justify-center rounded-xl shadow-lg w-full sm:w-64 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl";
  const iconClasses = theme === 'dark' ? "bg-pink-500 text-white text-2xl rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-xl transition-all duration-300 transform hover:scale-110" : "bg-white text-white text-2xl rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-xl transition-all duration-300 transform hover:scale-110";
  const headingClasses = theme === 'dark' ? "text-4xl font-extrabold text-center text-zinc-200 mb-12 leading-tight" : "text-4xl font-extrabold text-center text-gray-900 mb-12 leading-tight";


  return (
    <div className={containerClasses}>
      <h2 className={headingClasses}>
        More Reasons to Join
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={cardClasses}
          >
            <div className={iconClasses}>
              {reason.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
            <p className="text-sm text-gray-300">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToJoin;
