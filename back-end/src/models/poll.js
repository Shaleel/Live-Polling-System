const mongoose = require('mongoose');
const pollSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        correctIndex: {
            type: Number,
            required: true
        },
        responses: {
            type: Array,
            default: []
        },
        timer: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Poll', pollSchema);
