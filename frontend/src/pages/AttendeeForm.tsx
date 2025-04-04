import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

interface Event {
  eventId: string; 
  eventName: string;
}

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event_id: '', 
    event_name: '', 
  });

  const [events, setEvents] = useState<Event[]>([]); 

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        setEvents(response.data); 
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to load events');
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'event_id') {
      const selectedEvent = events.find((event) => event.eventId === value);
      setFormData((prev) => ({
        ...prev,
        event_id: value, 
        event_name: selectedEvent?.eventName || '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    try {
      await axios.post('http://localhost:5000/api/attendees', formData);
      alert('Attendee registered successfully');
      setFormData({
        name: '',
        phone: '',
        email: '',
        event_id: '',
        event_name: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200">
        <a href="/attendee/profile" className="text-indigo-900 hover:text-orange-500 mb-8 inline-flex items-center font-medium transition-colors">
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
        </a>
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-900">Attendee Registration</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Event Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Event:</label>
            <select
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>Select an Event</option>
              {events.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button*/}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-1/3 bg-white border border-indigo-900 text-indigo-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 bg-gradient-to-r from-indigo-800 to-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
