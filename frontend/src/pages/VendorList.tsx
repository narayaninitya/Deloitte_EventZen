import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface Vendor {
  id: string;
  vendorName: string;
  services: string;
  contactInfo: string;
}

interface VendorListProps {
  eventId: string;
  refreshData: () => void;
}

const VendorList: React.FC<VendorListProps> = ({ eventId, refreshData }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isAddingVendor, setIsAddingVendor] = useState(false);
  const [newVendor, setNewVendor] = useState({ vendorName: '', services: '', contactInfo: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Vendor>>({});

  // Fetch vendors for the specific event
  useEffect(() => {
    fetchVendors();
  }, [eventId]);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/vendors/event/${eventId}`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to fetch vendors');
    }
  };

  // Handle vendor deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/vendors/${id}`);
      toast.success('Vendor deleted successfully');
      fetchVendors();
      refreshData();
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast.error('Failed to delete vendor');
    }
  };

  // Handle adding a new vendor
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/vendors`, { ...newVendor, eventId });
      toast.success('Vendor added successfully');
      setIsAddingVendor(false);
      setNewVendor({ vendorName: '', services: '', contactInfo: '' });
      fetchVendors();
      refreshData();
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Failed to add vendor');
    }
  };

  // Handle editing a vendor
  const handleEdit = (vendor: Vendor) => {
    setEditingId(vendor.id);
    setEditForm({
      vendorName: vendor.vendorName,
      services: vendor.services,
      contactInfo: vendor.contactInfo,
    });
  };

  // Handle updating a vendor
  const handleUpdate = async () => {
    if (!editForm || !editingId) return;
    try {
      await axios.put(`http://localhost:8080/api/vendors/${editingId}`, editForm);
      toast.success('Vendor updated successfully');
      setEditingId(null);
      setEditForm({});
      fetchVendors();
      refreshData();
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast.error('Failed to update vendor');
    }
  };

  // Handle input changes for the add/edit forms
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isAddingVendor) {
      setNewVendor((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Vendors</h2>
        <button
          onClick={() => setIsAddingVendor(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Vendor
        </button>
      </div>

      {/* Add Vendor Form */}
      {isAddingVendor && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleAddVendor} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
              <input
                type="text"
                name="vendorName"
                value={newVendor.vendorName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service</label>
              <input
                type="text"
                name="services"
                value={newVendor.services}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="text"
                name="contactInfo"
                value={newVendor.contactInfo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingVendor(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Vendor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Vendors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white p-6 rounded-lg shadow">
            {editingId === vendor.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.vendorName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <input
                    type="text"
                    name="services"
                    value={editForm.services}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={editForm.contactInfo}
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
                <h3 className="text-lg font-medium text-gray-900">{vendor.vendorName}</h3>
                <p className="text-gray-500">{vendor.services}</p>
                <p className="text-sm text-gray-500 mt-2">{vendor.contactInfo}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(vendor)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(vendor.id)}
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

export default VendorList;