let mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Completed", "inCompleted"],
    },
    archived: {
        type: String,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

let Task = mongoose.model("taskSchema", taskSchema);

module.exports = Task;