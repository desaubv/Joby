const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    pic: { type: String, required: true },
    description: { type: String, required: true },
    branches: { type: Array, required: true },
},{
    timestamps: true
});

module.exports = model('enterprise', schema);