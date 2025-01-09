// EventsSection.js
import React, { useState } from 'react';
import { Instagram, Calendar, Clock, MapPin, Users } from 'lucide-react';
import "../css/Event.css";

function Star(props) {
  return (
    <div 
      className="absolute rounded-full animate-twinkle"
      style={{
        width: props.size,
        height: props.size,
        top: `${props.top}%`,
        left: `${props.left}%`,
        backgroundColor: 'white',
        boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
        animationDelay: `${props.animationDelay}s`,
      }}
    />
  );
}

function EventCard({ event }) {
  return (
    <div className="group card-flip aspect-square">
      {/* Front of card */}
      <div className="card-front absolute w-full h-full">
        <div className="relative h-full overflow-hidden rounded-xl bg-gray-900/30 backdrop-blur-sm border border-purple-500/20">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />
          
          <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center">
            <h3 className="text-lg font-bold text-white mb-2">
              {event.title}
            </h3>
            <span className="inline-block bg-purple-600/80 text-white text-xs px-3 py-1 rounded-full">
              {event.category}
            </span>
          </div>
        </div>
      </div>

      {/* Back of card */}
      <div className="card-back absolute w-full h-full">
        <div className="h-full rounded-xl bg-gray-900/90 backdrop-blur-md border border-purple-500/40 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              {event.title}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-purple-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 mr-2 text-purple-400" />
                <span>{event.participants} expected</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-3">
              {event.description}
            </p>
          </div>
          
          <a
            href={event.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 py-2 rounded-lg transition-all duration-300 border border-purple-500/30 hover:border-purple-500/60"
          >
            <Instagram className="w-4 h-4" />
            <span>View on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function EventSection() {
  const events = [
    { 
      id: 1, 
      title: "Technical Workshop",
      date: "15 Jan 2024",
      time: "10:00 AM - 2:00 PM",
      venue: "Main Auditorium",
      category: "Odd sem",
      participants: "150+",
      description: "Join us for an immersive technical workshop featuring cutting-edge technologies and hands-on sessions.",
      image: "/api/placeholder/400/200",
      instagramLink: "https://instagram.com/techworkshop"
    },
    { 
      id: 2, 
      title: "Cultural Night",
      date: "20 Feb 2024",
      time: "6:00 PM - 10:00 PM",
      venue: "Open Air Theatre",
      category: "Zephyr",
      participants: "500+",
      description: "Experience a magical evening of music, dance, and theatrical performances.",
      image: "/api/placeholder/400/200",
      instagramLink: "https://instagram.com/culturalnight"
    },
    { 
      id: 3, 
      title: "Technical Symposium",
      date: "10 Mar 2024",
      time: "9:00 AM - 5:00 PM",
      venue: "Convention Center",
      category: "Even Sem",
      participants: "300+",
      description: "Showcase your technical prowess and compete with the brightest minds.",
      image: "/api/placeholder/400/200",
      instagramLink: "https://instagram.com/techsymposium"
    },
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Odd sem', 'Even Sem', 'Zephyr'];

  // Create stars array
  const stars = Array(50).fill().map(() => ({
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3
  }));

  // Filter events based on active category
  const filteredEvents = events.filter(event => 
    activeCategory === 'All' ? true : event.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          .animate-twinkle {
            animation: twinkle 3s infinite ease-in-out;
          }
          .card-flip {
            perspective: 1000px;
            transform-style: preserve-3d;
          }
          .card-front,
          .card-back {
            backface-visibility: hidden;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .card-back {
            transform: rotateY(180deg);
          }
          .group:hover .card-front {
            transform: rotateY(180deg);
          }
          .group:hover .card-back {
            transform: rotateY(0deg);
          }
        `}
      </style>

      {/* Star background */}
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-black/50 to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <h2 className="text-5xl font-bold mb-12 text-center text-white bg-clip-text">
          Events
        </h2>
        
        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                activeCategory === category
                  ? 'bg-purple-600/80 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventSection;
