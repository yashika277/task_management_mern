const mongoose = require('mongoose');

// Define the schema for Task
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Export the Task model
module.exports = { Task };
