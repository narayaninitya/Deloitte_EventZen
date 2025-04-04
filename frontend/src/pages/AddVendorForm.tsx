import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AddVendorFormProps {
  eventId: string;
  onAdd: () => void;
}

const AddVendorForm: React.FC<AddVendorFormProps> = ({ eventId, onAdd }) => {
  const [vendorName, setVendorName] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/vendors`, {
        name: vendorName,
        service,
        eventId,
      });
      toast.success('Vendor added successfully');
      onAdd();
      setVendorName('');
      setService('');
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Failed to add vendor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add a New Vendor</h3>
      <input
        type="text"
        placeholder="Vendor Name"
        value={vendorName}
        onChange={(e) => setVendorName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Service Provided"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Add Vendor
      </button>
    </form>
  );
};

export default AddVendorForm;