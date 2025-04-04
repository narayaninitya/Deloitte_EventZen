import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Pencil, Trash2 } from 'lucide-react';

interface Attendee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  event_name: string;
  ticket_status: 'Pending' | 'Confirmed' | 'Cancelled';
  payment_status: 'Paid' | 'Unpaid' | 'Refunded';
}

interface AttendeeListProps {
  eventId: string;
  refreshData: () => void;
}

const AttendeeList: React.FC<AttendeeListProps> = ({ eventId, refreshData }) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Attendee>>({});

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendees/event/${eventId}`);
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
      toast.error('Failed to fetch attendees');
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendees/${_id}`);
      toast.success('Attendee deleted successfully');
      fetchAttendees();
      refreshData();
    } catch (error) {
      console.error('Error deleting attendee:', error);
      toast.error('Failed to delete attendee');
    }
  };

  const handleEdit = (attendee: Attendee) => {
    setEditingId(attendee._id);
    setEditForm({
      name: attendee.name,
      phone: attendee.phone,
      email: attendee.email,
      event_name: attendee.event_name,
      ticket_status: attendee.ticket_status,
      payment_status: attendee.payment_status,
    });
  };

  const handleUpdate = async () => {
    if (!editForm || !editingId) return;
    try {
      await axios.put(`http://localhost:5000/api/attendees/${editingId}`, editForm);
      toast.success('Attendee updated successfully');
      setEditingId(null);
      setEditForm({});
      fetchAttendees();
      refreshData();
    } catch (error) {
      console.error('Error updating attendee:', error);
      toast.error('Failed to update attendee');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Attendees</h2>
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
          {attendees.length} registered
        </span>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendees.map((attendee) => (
              <tr key={attendee._id}>
                {editingId === attendee._id ? (
                  <td colSpan={6} className="px-6 py-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={handleChange}
                            name="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            value={editForm.email || ''}
                            onChange={handleChange}
                            name="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="tel"
                            value={editForm.phone || ''}
                            onChange={handleChange}
                            name="phone"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ticket Status</label>
                          <select
                            value={editForm.ticket_status || ''}
                            onChange={handleChange}
                            name="ticket_status"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                          <select
                            value={editForm.payment_status || ''}
                            onChange={handleChange}
                            name="payment_status"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </div>
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
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(attendee.ticket_status)}`}>
                        {attendee.ticket_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(attendee.payment_status)}`}>
                        {attendee.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(attendee)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(attendee._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendeeList;
