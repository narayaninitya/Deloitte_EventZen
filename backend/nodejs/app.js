import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import attendeeRoutes from './src/routes/attendeeRoute.js';
import cors from 'cors';
import authAttendee from './src/routes/authAttendee.js';
import authOrganizer from './src/routes/authOrganizer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI= process.env.MONGO_URI
app.use(cors());

mongoose.connect(MONGO_URI)
    .then(()=>
        console.log("MongoDB Connected"))
    .catch(err => console.log(err));
    
app.use(express.json());

app.use('/api/attendees', attendeeRoutes);

app.use('/api/auth/attendee', authAttendee);
app.use('/api/auth/organizer', authOrganizer);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})


