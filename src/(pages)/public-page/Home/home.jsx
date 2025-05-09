import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../../contexts/AuthContext';

const sliderImages = [
  '/images/slider.webp',
  '/images/slider2.webp',
  '/images/front img.webp',
];

const Home = () => {
  const { user } = useAuthContext();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[100vh] bg-gray-100">
        {/* Slider with animation */}
        <div className="md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="object-cover w-full h-full"
            />
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center text-center p-8 space-y-6 bg-white">
          <motion.h1
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Eventnow
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Plan, discover, and book amazing events with ease. Whether you're an attendee or organizer, we've got you covered.
          </motion.p>

          {!user && (
            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/signin"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Sign Up
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Join eventow Section */}
      <section className="bg-[#f7fafa] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {user ? 'Get Started' : 'Join Meetnow'}
              </h2>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-xl">
              People join Eventnow to meet new people, learn new things, find support, get out of their
              comfort zones, and pursue their passions, together. Membership is free.
            </p>
            {!user && (
        <Link
          to="/signup"
          className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium transition"
        >
          Sign up
        </Link>
      )}
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/join_meetup.webp"
              alt="Join Meetnow"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;



