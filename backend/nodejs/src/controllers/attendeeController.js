import Attendee from '../models/attendeeModel.js';
import nodemailer from 'nodemailer';

// Helper function to send confirmation emails
const sendConfirmationEmail = async (email, name, eventName) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_APP_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_APP_USER,
    to: email,
    subject: 'Event Registration Confirmation',
    text: `Dear ${name},\n\nThank you for registering for the event "${eventName}".\n\nWe look forward to seeing you there!\n\nBest regards,\nEventZen Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error.message);
  }
};

// Create an attendee
export const createAttendee = async (req, res) => {
  try {
    const { name, phone, email, event_name, event_id } = req.body;

    const existingAttendee = await Attendee.findOne({ email });
    if (existingAttendee) {
      return res.status(400).json({ message: 'An attendee with this email already exists.' });
    }

    const newAttendee = new Attendee({ name, phone, email, event_name, event_id });
    const savedAttendee = await newAttendee.save();

    await sendConfirmationEmail(email, name, event_name,event_id);
    savedAttendee.confirmation_sent = true;
    await savedAttendee.save();

    res.status(201).json({
      message: 'Attendee registered successfully',
      attendee_id: savedAttendee._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all attendees
export const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single attendee by ID
export const getAttendeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json(attendee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Get attendees by event ID
export const getAttendeesByEventId = async (req, res) => {
  try {
    const { event_id } = req.params;
    const attendees = await Attendee.find({ event_id });
    if (!attendees) {
      return res.status(404).json({ message: 'Attendees not found' });
    }
    res.status(200).json(attendees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an attendee
export const updateAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, ticket_status, payment_status } = req.body;

    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    if (name) attendee.name = name;
    if (phone) attendee.phone = phone;
    if (email) attendee.email = email;
    if (ticket_status) attendee.ticket_status = ticket_status;
    if (payment_status) attendee.payment_status = payment_status;

    const updatedAttendee = await attendee.save();
    res.status(200).json({ message: 'Attendee updated successfully', attendee: updatedAttendee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Update an attendee by event ID
export const updateAttendeeByEventId = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { ticket_status, payment_status } = req.body;

    const attendee = await Attendee.find({ event_id });
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    if (ticket_status) attendee.ticket_status = ticket_status;
    if (payment_status) attendee.payment_status = payment_status;

    const updatedAttendee = await attendee.save();
    res.status(200).json({ message: 'Attendee updated successfully', attendee: updatedAttendee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


//Delete an attendee by event ID
export const deleteAttendeeByEventId = async (req, res) => {
  try {
    const { event_id } = req.params;
    const deletedAttendee = await Attendee.findByIdAndDelete({ event_id });
    if (!deletedAttendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete an attendee
export const deleteAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendee = await Attendee.findByIdAndDelete(id);
    if (!deletedAttendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};