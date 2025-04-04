import { Schema, model } from 'mongoose';

const userOrganizerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'organizer' },
});

export default model('UserOrganizer', userOrganizerSchema);