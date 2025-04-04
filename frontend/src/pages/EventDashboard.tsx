import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Users, MapPin, Truck, Calendar, UserCircle, PlusCircle } from 'lucide-react';
import AttendeeList from './AttendeeList'; 
import VendorList from './VendorList'; 
import VenueList from './VenueList';

interface Event {
  _id: string;
  eventName: string;
  eventDateTime: string;
  venueName: string;
  capacityLimits: number;
  pricing: number;
  categoryTheme: string;
}

function EventDashboard() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeSection, setActiveSection] = useState('attendees');

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const refreshData = () => {
    fetchEventDetails();
  };

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      toast.error('Failed to fetch event details');
      navigate('/organizer');
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <UserCircle className="w-10 h-10 text-indigo-600" />
            <div>
              <h3 className="font-medium text-orange-500">Event Organizer</h3>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveSection('attendees')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeSection === 'attendees' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Attendees</span>
          </button>
          <button
            onClick={() => setActiveSection('vendors')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeSection === 'vendors' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span>Vendors</span>
          </button>
          <button
            onClick={() => setActiveSection('venue')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeSection === 'venue' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Venue</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{event.eventName}</h1>
                <p className="text-sm text-gray-500">
                  {new Date(event.eventDateTime).toLocaleDateString()} • {event.categoryTheme}
                </p>
              </div>
              <button
                onClick={() => navigate('/organizer')}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Events
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeSection === 'attendees' && <AttendeeList eventId={eventId!} refreshData={refreshData} />}
          {activeSection === 'vendors' && <VendorList eventId={eventId!} refreshData={refreshData} />}
          {activeSection === 'venue' && <VenueList eventId={eventId!} refreshData={refreshData} />}
        </main>
      </div>
    </div>
  );
}

export default EventDashboard;
