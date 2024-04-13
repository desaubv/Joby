const { Schema, model } = require('mongoose');

const schema = new Schema({

    userId1: { type: String, required: true },
    userId2: { type: String, required: true },
    conversationIndex: { type: Number, required: true, default: 0 },

},{
    timestamps: true
})

module.exports = model('conversation', schema);