import { Schema, model } from 'mongoose';

const userAttendeeSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'attendee' },
});

export default model('UserAttendee', userAttendeeSchema);