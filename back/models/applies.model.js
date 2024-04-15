const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: {type: String, require: true},
    oportunityId: {type: String, require: true},
},{
    timestamps: true
});

module.exports = model('applies', schema);