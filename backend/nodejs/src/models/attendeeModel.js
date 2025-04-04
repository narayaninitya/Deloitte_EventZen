import mongoose from "mongoose";

// Define the Attendee Schema
const attendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: function (value) {
          // Basic phone number validation (10 digits)
          return /^[0-9]{10}$/.test(value);
        },
        message: 'Please provide a valid 10-digit phone number',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          // Email validation using regex
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: 'Please provide a valid email address',
      },
    },
    event_name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events', // Foreign key referencing Event model
      required: true, // Optional field
    },
    registration_date: {
      type: Date,
      default: Date.now, // Automatically set to the current date/time
    },
    ticket_status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'], // Only allow specific values
      default: 'Pending', // Default status
    },
    payment_status: {
      type: String,
      enum: ['Paid', 'Unpaid', 'Refunded'], // Only allow specific values
      default: 'Unpaid', // Default status
    },
    confirmation_sent: {
      type: Boolean,
      default: false, // Default value
    },
    created_at: {
      type: Date,
      default: Date.now, // Automatically set to the current date/time
    },
    updated_at: {
      type: Date,
      default: Date.now, // Automatically set to the current date/time
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

// Middleware to update `updated_at` on save
attendeeSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the Attendee Model
const Attendee = mongoose.model('Attendee', attendeeSchema);

export default Attendee;