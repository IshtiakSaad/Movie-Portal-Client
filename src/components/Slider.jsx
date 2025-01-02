import { useState } from "react";

const Slider = () => {
  const slides = [
    {
      title: "Action & Adventure",
      description:
        "Get your adrenaline pumping with the latest action-packed movies and heart-racing adventures.",
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/316882362/original/9d1861cf57d9e03987705086bf1fae46de833592/do-a-unique-movie-poster-design-film-poster.jpg",
    },
    {
      title: "Romance & Drama",
      description:
        "Indulge in heartfelt stories and intense emotions with our top romantic and dramatic films.",
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/317682775/original/e9d4f804a85dd8d50c53f6d23f81c8a6e6a4ddac/create-movie-poster-with-your-satisfaction.jpg",
    },
    {
      title: "Comedy & Family",
      description:
        "Bring laughter to your family time with the best comedy films for all ages.",
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/343322733/original/6ed0d38c50d03112d535b90c1b39a44429e3aab2/do-professional-movie-poster-design-within-24-hours.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Slider Section */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-700"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>

        {/* Content Section */}
        <div className="container mx-auto px-6 py-20 lg:py-40 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg transform hover:scale-105 transition duration-500">
            Discover Your Next Favorite Movie
          </h1>
          <h2 className="text-2xl lg:text-4xl font-semibold mb-6 text-shadow-md">{slides[currentSlide].title}</h2>
          <p className="lg:text-lg max-w-3xl mx-auto mb-10 opacity-80 text-shadow-lg">
            {slides[currentSlide].description}
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-8 mt-6">
            <button
              onClick={handlePrev}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl px-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl px-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            >
             &#8594;
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
    </div>
  );
};

export default Slider;
