import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AddVenueFormProps {
  eventId: string;
  onAdd: () => void;
}

const AddVenueForm: React.FC<AddVenueFormProps> = ({ eventId, onAdd }) => {
  const [venueName, setVenueName] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/venues`, {
        name: venueName,
        capacity: parseInt(capacity, 10),
        eventId,
      });
      toast.success('Venue added successfully');
      onAdd();
      setVenueName('');
      setCapacity('');
    } catch (error) {
      console.error('Error adding venue:', error);
      toast.error('Failed to add venue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add a New Venue</h3>
      <input
        type="text"
        placeholder="Venue Name"
        value={venueName}
        onChange={(e) => setVenueName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Add Venue
      </button>
    </form>
  );
};

export default AddVenueForm;