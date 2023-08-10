import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    postedby: {
        type: String,
    },

    eventname: {
        type: String,
        required: [true, 'Please enter a eventname'],
        unique: false,
    },
    organizer: {
        type: String,
        required: [true, 'Please enter an organizer'],
    },
    date: {
        type: String,
        required: [true, 'Please enter a date'],
    },
    time: {
        type: String,
        required: [true, 'Please enter a time'],
    },

    url: {
        type: String,
        required: [true, 'Please enter an url'],
    },
});

const Event = mongoose.models.events || mongoose.model('events', eventSchema);

export default Event;