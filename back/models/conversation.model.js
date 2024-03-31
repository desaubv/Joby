const { Schema, model } = require('mongoose');

const schema = new Schema({

    userId1: { type: String, required: true },
    userId2: { type: String, required: true },
    conversationIndex: { type: Number, required: true },

},{
    timestamps: true
})

module.export = model('conversation', schema);