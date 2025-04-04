import express from 'express';
import {
  createAttendee,
  getAllAttendees,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
  getAttendeesByEventId,

} from '../controllers/attendeeController.js';

const router = express.Router();

// POST /api/attendees - Register a new attendee
router.post('/', createAttendee);

// GET /api/attendees - Fetch all attendees
router.get('/', getAllAttendees);

// GET /api/attendees/:id - Fetch a single attendee by ID
router.get('/:id', getAttendeeById);

//GET /api/attendees/event/:event_id - Fetch attendees by event ID
router.get('/event/:event_id', getAttendeesByEventId);

// PUT /api/attendees/:id - Update an attendee's details
router.put('/:id', updateAttendee);

// // PUT /api/attendees/event/:event_id - Update attendees by event ID
// router.put('/event/:event_id', updateAttendeeByEventId);

// DELETE /api/attendees/:email - Delete an attendee by email
router.delete('/:id', deleteAttendee);

// // DELETE /api/attendees/event/:event_id - Delete attendees by event ID
// router.delete('/event/:event_id', deleteAttendeeByEventId);



export default router;