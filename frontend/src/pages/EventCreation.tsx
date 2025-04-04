import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, MapPin, Users, Tag, DollarSign } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface EventForm {
  eventName: string;
  eventDateTime: string; 
  venueName: string;
  capacityLimits: number;
  pricing: number;
  categoryTheme: string;
  orgId: string;
}

function EventCreation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EventForm>({
    eventName: '',
    eventDateTime: '', 
    venueName: '',
    capacityLimits: 100,
    pricing: 0,
    categoryTheme: '',
    orgId: '',
  });


  const location = useLocation();
  const organizerId = location.state?.orgId || '';

  React.useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        orgId: organizerId,
      }));
    }, [organizerId]);
    
  const formatDateTimeForBackend = (dateTime: string): string => {
    const dateObject = new Date(dateTime);
    return dateObject.toISOString(); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
      const formattedData = {
        ...formData,
        eventDateTime: formatDateTimeForBackend(formData.eventDateTime),
      };

      await axios.post('http://localhost:8080/api/events', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Event created successfully!');
      navigate('/organizer');
    } catch (error: any) {
      console.error('Error creating event:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create event';
      toast.error(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/organizer')}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                required
                value={formData.eventName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tech Conference 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Event Date & Time
              </label>
              <input
                type="datetime-local"
                name="eventDateTime"
                required
                value={formData.eventDateTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Venue Name (Optional)
              </label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Convention Center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Capacity Limit
              </label>
              <input
                type="number"
                name="capacityLimits"
                required
                min="1"
                value={formData.capacityLimits}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Ticket Price
              </label>
              <input
                type="number"
                name="pricing"
                required
                min="0"
                step="0.01"
                value={formData.pricing}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Category/Theme
              </label>
              <input
                type="text"
                name="categoryTheme"
                required
                value={formData.categoryTheme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Technology, Music, Sports, etc."
              />
            </div>

            <input
              type="hidden"
              name="orgId"
              value={formData.orgId}
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventCreation;
