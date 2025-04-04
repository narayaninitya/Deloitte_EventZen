import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Clock, MapPin, Users, DollarSign, Tag } from 'lucide-react';
import eventZenHome from '../assets/images/eventzen-home.png';
import about from '../assets/images/about.jpg';
import eventOrganizer from '../assets/images/Event-organizer.png';
import lightfast from '../assets/images/light-fast.png';
import readysolution from '../assets/images/ready-solutions.png'; 
import smartattendee from '../assets/images/smart-manage.png';


function Home() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState<Array<{
    _id: string;
    eventName: string;
    eventDateTime: string;
    capacityLimits: number;
    pricing: number;
    categoryTheme: string;
    _class: string;
    orgmail?: string; 
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events');
        const data = await response.json();
        setUpcomingEvents(data.slice(0, 3)); // Get first 3 events
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback dummy data based on provided format
        setUpcomingEvents([
          {
            _id: "67e10fed9648aa51c060db03",
            eventName: "Tech Conference 2023",
            eventDateTime: "2023-12-01T10:00:00.000+00:00",
            capacityLimits: 500,
            pricing: 100,
            categoryTheme: "Technology",
            _class: "com.eventzen.webapp.entities.Event"
          },
          {
            _id: "67e1233d9648aa51c060db05",
            eventName: "Tech Conference 2025",
            eventDateTime: "2024-01-01T10:00:00.000+00:00",
            capacityLimits: 500,
            pricing: 100,
            categoryTheme: "Technology",
            _class: "com.eventzen.webapp.entities.Event"
          },
          {
            _id: "67e528ac78478c30503958e3",
            eventName: "Tech Conference 2029",
            eventDateTime: "2023-12-01T10:00:00.000+00:00",
            capacityLimits: 500,
            pricing: 100,
            categoryTheme: "Technology",
            orgmail: "soumik@gmail.com",
            _class: "com.eventzen.webapp.entities.Event"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-indigo-900" />
              <span className="ml-2 text-xl font-bold text-indigo-900">
                EventFlow
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-indigo-900 transition-colors">About</a>
              <a href="#features" className="text-gray-600 hover:text-indigo-900 transition-colors">Features</a>
              <a href="#events" className="text-gray-600 hover:text-indigo-900 transition-colors">Events</a>
              <button
                onClick={() => navigate('/auth/attendee')}
                className="px-6 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-indigo-900">
                Transform Your Event Experience
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Skip the hassle and dive straight into creating remarkable events. Our lightning-fast platform gives you everything you need to plan, manage, and execute unforgettable experiences.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/auth/attendee')}
                  className="px-8 py-3 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors flex items-center"
                >
                  Join an Event
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => {
                  const aboutSection = document.querySelector('#about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  }}
                  className="px-8 py-3 border-2 border-indigo-900 text-indigo-900 rounded-lg hover:bg-indigo-900 hover:text-white transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
              src={eventZenHome}
              alt="Event planning illustration"
              
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div id="events" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and join amazing events happening near you
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                  <div className="mb-4 text-indigo-900 font-bold text-xl">{event.eventName}</div>
                  <div className="flex items-center mb-3 text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{formatDate(event.eventDateTime)} at {formatTime(event.eventDateTime)}</span>
                  </div>
                  <div className="flex items-center mb-3 text-gray-600">
                    <Users className="w-5 h-5 mr-2 text-orange-500" />
                    <span>Capacity: {event.capacityLimits} attendees</span>
                  </div>
                  <div className="flex items-center mb-3 text-gray-600">
                    <DollarSign className="w-5 h-5 mr-2 text-orange-500" />
                    <span>${event.pricing}</span>
                  </div>
                  <div className="flex items-center mb-5 text-gray-600">
                    <Tag className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{event.categoryTheme}</span>
                  </div>
                  <button 
                    className="w-full py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    onClick={() => navigate(`/auth/attendee`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <button 
              className="px-8 py-3 border-2 border-indigo-900 text-indigo-900 rounded-lg hover:bg-indigo-900 hover:text-white transition-colors"
              onClick={() => navigate('/auth/attendee')}
            >
              Browse All Events
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Event Management That Works For You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is built to make your event planning experience seamless and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <img
                src={lightfast}
                alt="Light and Fast"
                className="w-32 h-32 object-contain mb-6"
              />
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Light & Fast
              </h3>
              <p className="text-gray-600">
                Our platform is optimized for speed, so you don't need to wait around. Create and manage events in minutes, not hours.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <img
                src={readysolution}
                alt="Ready-made Sections"
                className="w-32 h-32 object-contain mb-6"
              />
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Ready-made Solutions
              </h3>
              <p className="text-gray-600">
                Start with our professionally designed templates for registration, ticketing, and promotion. Just add your details and you're ready to go.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <img
                src={smartattendee}
                alt="Attendee Management"
                className="w-32 h-32 object-contain mb-6"
              />
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Smart Attendee Management
              </h3>
              <p className="text-gray-600">
                Easily track registrations, send personalized communications, and get real-time analytics on your event's performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Organize Event Section */}
      <div id="organize" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={eventOrganizer}
                alt="Event organizer illustration"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                Ready to Organize Your Own Event?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Whether it's a small workshop or a large conference, EventFlow gives you all the tools you need to create memorable experiences for your attendees. Our platform handles the technical details so you can focus on what matters most.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-orange-100 rounded-full">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-indigo-900">Simple Event Creation</h3>
                    <p className="text-gray-600">Create your event in minutes with our intuitive form builders</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-orange-100 rounded-full">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-indigo-900">Powerful Analytics</h3>
                    <p className="text-gray-600">Get real-time insights into registrations, attendance, and engagement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-orange-100 rounded-full">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-indigo-900">Seamless Communication</h3>
                    <p className="text-gray-600">Keep your attendees informed with automated emails and notifications</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/auth/organizer')}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                Become an Organizer
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                Why EventFlow Stands Out
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    Blazing Fast Performance
                  </h3>
                  <p className="text-gray-600">
                    Our platform loads in milliseconds, ensuring your attendees never experience frustrating wait times
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    Smart Management
                  </h3>
                  <p className="text-gray-600">
                    Easily manage your events with our intuitive dashboard, designed for both organizers and attendees
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    Seamless Registration
                  </h3>
                  <p className="text-gray-600">
                    Simplify the registration process with our ready-made solutions that require minimal setup
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={about}
                alt="Features illustration"
              />
            </div>
          </div>
        </div>
      </div>

    

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-indigo-900" />
                <span className="ml-2 text-xl font-bold text-indigo-900">
                  EventFlow
                </span>
              </div>
              <p className="mt-4 text-gray-600">
                Creating seamless event experiences that bring people together
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 mb-4">For Attendees</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-900">Find Events</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-900">Ticketing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 mb-4">For Organizers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-900">Create Events</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-900">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-900">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600">© 2025 EventFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
