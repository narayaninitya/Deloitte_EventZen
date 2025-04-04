import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface Venue {
  id: string;
  venueName: string;
  address: string;
  capacity: number;
  amenities: string;
  pricing: number; 
}

interface VenueListProps {
  eventId: string;
  refreshData: () => void;
}

const VenueList: React.FC<VenueListProps> = ({ eventId, refreshData }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isAddingVenue, setIsAddingVenue] = useState(false);
  const [newVenue, setNewVenue] = useState({
    venueName: '',
    address: '',
    capacity: '',
    amenities: '',
    pricing: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Venue>>({
    venueName: '',
    address: '',
    capacity: 0,
    amenities: '',
    pricing: 0,
  });

  useEffect(() => {
    fetchVenues();
  }, [eventId]);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/venues/event/${eventId}`);
      const fetchedVenues = response.data.map((venue: Venue) => ({
        ...venue,
        capacity: venue.capacity || 0, 
        pricing: venue.pricing || 0, 
      }));
      setVenues(fetchedVenues);
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast.error('Failed to fetch venues');
    }
  };

  // Handle venue deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/venues/${id}`);
      toast.success('Venue deleted successfully');
      fetchVenues();
      refreshData();
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast.error('Failed to delete venue');
    }
  };

  const handleAddVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/venues`, {
        ...newVenue,
        capacity: parseInt(newVenue.capacity, 10),
        pricing: parseInt(newVenue.pricing, 10),
        eventId,
      });
      toast.success('Venue added successfully');
      setIsAddingVenue(false);
      setNewVenue({ venueName: '', address: '', capacity: '', amenities: '', pricing: '' });
      fetchVenues();
      refreshData();
    } catch (error) {
      console.error('Error adding venue:', error);
      toast.error('Failed to add venue');
    }
  };

  const handleEdit = (venue: Venue) => {
    setEditingId(venue.id);
    setEditForm({
      venueName: venue.venueName,
      address: venue.address,
      capacity: venue.capacity,
      amenities: venue.amenities,
      pricing: venue.pricing,
    });
  };

  // Handle updating a venue
  const handleUpdate = async () => {
    if (!editForm || !editingId) return;
    try {
      await axios.put(`http://localhost:8080/api/venues/${editingId}`, editForm);
      toast.success('Venue updated successfully');
      setEditingId(null);
      setEditForm({});
      fetchVenues();
      refreshData();
    } catch (error) {
      console.error('Error updating venue:', error);
      toast.error('Failed to update venue');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isAddingVenue) {
      setNewVenue((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Venues</h2>
        <button
          onClick={() => setIsAddingVenue(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Venue
        </button>
      </div>

      {/* Add Venue Form */}
      {isAddingVenue && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleAddVenue} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Venue Name</label>
              <input
                type="text"
                name="venueName"
                value={newVenue.venueName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={newVenue.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={newVenue.capacity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amenities</label>
              <input
                type="text"
                name="amenities"
                value={newVenue.amenities}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pricing</label>
              <input
                type="number"
                name="pricing"
                value={newVenue.pricing}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingVenue(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Venue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Venues List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white p-6 rounded-lg shadow">
            {editingId === venue.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Venue Name</label>
                  <input
                    type="text"
                    name="venueName"
                    value={editForm.venueName || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={editForm.capacity || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amenities</label>
                  <input
                    type="text"
                    name="amenities"
                    value={editForm.amenities || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pricing</label>
                  <input
                    type="number"
                    name="pricing"
                    value={editForm.pricing || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900">{venue.venueName}</h3>
                <p className="text-gray-500">{venue.address}</p>
                <p className="text-sm text-gray-500 mt-2">Capacity: {venue.capacity} people</p>
                <p className="text-sm text-gray-500">Amenities: {venue.amenities}</p>
                <p className="text-sm text-gray-500">Pricing: ${venue.pricing}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(venue)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
