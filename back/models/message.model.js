const { Schema, model } = require('mongoose');

const schema = new Schema({
    
    conversationIndex: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
    pic: { type: String, required: false },
    date: { type: String, required: true },
    readen: { type: Boolean, required: true, default: false },
},{
    timestamps: true
});

module.exports = model('message', schema);