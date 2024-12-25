import React, { useState } from 'react';

const FAQ = ({ theme }) => {
  const questions = [
    "What is MoviePortal?",
    "How much does MoviePortal cost?",
    "Can I try MoviePortal for free?",
    "Where can I watch movies on MoviePortal?",
    "What content can I watch on MoviePortal?",
    "Can I share my MoviePortal account with my family?",
  ];

  const answers = [
    "MoviePortal is a streaming service offering exclusive movies, TV shows, and original content for film enthusiasts.",
    "MoviePortal costs $9.99 per month after a free 7-day trial. Prices may vary by region.",
    "Yes, MoviePortal offers a 7-day free trial for new users. Some promotions may also include extended trials.",
    "You can watch MoviePortal on various devices, including smart TVs, laptops, tablets, and mobile phones through our dedicated app.",
    "MoviePortal features a wide variety of exclusive films, documentaries, series, and premium content for movie lovers.",
    "Yes, you can share MoviePortal with your family by using Family Sharing, allowing up to five members to enjoy the service simultaneously.",
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerClasses = theme === 'dark' ? "bg-gradient-to-r from-indigo-800 via-indigo-900 to-black text-white py-16" : "bg-base text-gray-800 py-16";
  const cardClasses = theme === 'dark' 
    ? "border-b p-4 border-gray-700 pb-4 mb-2 transition-all duration-300 hover:bg-indigo-700 rounded-xl"
    : "border-b p-4 border-gray-400 pb-4 mb-2 transition-all duration-300 hover:bg-gray-500 rounded-xl";
  const textClasses = theme === 'dark' ? "mt-4 text-sm text-gray-300" : "mt-4 text-sm text-gray-800";
  const titleClasses = theme === 'dark' ? "text-4xl font-bold text-center mb-12 text-shadow-lg" : "text-4xl font-bold text-center mb-12 text-gray-900";

  return (
    <div className={containerClasses}>
      <h2 className={titleClasses}>
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto">
        {questions.map((question, index) => (
          <div
            key={index}
            className={cardClasses}
          >
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center cursor-pointer text-lg font-semibold"
            >
              <span>{question}</span>
              <span
                className={`transform transition-all duration-800 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
              >
                ⌄
              </span>
            </div>
            {activeIndex === index && (
              <p className={textClasses}>{answers[index]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
