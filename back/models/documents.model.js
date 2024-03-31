const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    file: { type: Buffer, required: true },
},{
    timestamps: true
});

module.exports = model("documents", schema);