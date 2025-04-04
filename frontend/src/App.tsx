import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AttendeeForm from './pages/AttendeeForm';
import OrganizerDashboard from './pages/OrganizerDashboard';
import EventCreation from './pages/EventCreation';
import EventDashboard from './pages/EventDashboard';
import AttendeeAuth from './pages/auth/AttendeeAuth';
import OrganizerAuth from './pages/auth/OrganizerAuth';
import AttendeeProfile from './pages/AttendeeProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendee" element={<AttendeeForm />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/create-event" element={<EventCreation />} />
          <Route path="/event/:eventId" element={<EventDashboard />} />
          <Route path="/auth/attendee" element={<AttendeeAuth />} />
          <Route path="/auth/organizer" element={<OrganizerAuth />} />
          <Route path="/attendee/profile" element={<AttendeeProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
