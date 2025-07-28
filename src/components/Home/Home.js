'use client';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Feature } from '../Features/Feature';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import Video from '../Video/Video';
import Channels from '../Channels/Channels';
import SubscribeCTA from '../SubscribeCTA/SubscribeCTA';

const HomePage = () => {
  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <Hero />

        {/* Video Section */}
        <Video />

        <hr className="mt-[100px] border-gray-100 border-t-2" />

        {/* Features Section */}
        <div className="scroll-section opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
          <Feature />
        </div>

        <hr className="mt-[100px] border-gray-100 border-t-2" />

        {/* Channels Section */}
        <Channels />

        {/* Subscribe CTA Section */}
        <SubscribeCTA />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
