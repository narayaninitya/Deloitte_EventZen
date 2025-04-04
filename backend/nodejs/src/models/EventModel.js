import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    eventDateTime: {
      type: Date,
      required: [true, 'Event date and time are required'],
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue', // Foreign key referencing Venue model
      required: true,
    },
    vendorIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Array of foreign keys referencing Vendor model
      },
    ],
    capacityLimits: {
      type: Number,
      required: [true, 'Capacity limit is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    pricing: {
      type: Number,
      required: [true, 'Pricing is required'],
      min: [0, 'Pricing cannot be negative'],
    },
    categoryTheme: {
      type: String,
      required: [true, 'Category/theme is required'],
      trim: true,
    },
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget', // Foreign key referencing Budget model
      required: false,
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
eventSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the Event Model
const Event = mongoose.model('Event', eventSchema);

export default Event;