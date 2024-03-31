const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },

    gender: { type: String, required: false },
    disabilities: { type: Array, required: false },
    ocupation: { type: String, required: false },

    schoolRecord: { type: Array, required: false },
    experience: { type: Array, required: false },
    
    pic: { type: String , required: false },
    cv: { type: Buffer , required: false },
    
    description: { type: String, required: false },
},{
    timestamps: true
});

module.exports = model("users", schema);