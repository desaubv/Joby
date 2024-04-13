const { Schema, model } = require('mongoose');

const schema = new Schema({
    conversationId: { type: String, required: true },
    conversationIndex: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    readen: { type: Boolean, required: true, default: false },
},{
    timestamps: true
});

module.exports = model('message', schema);