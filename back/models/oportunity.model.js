const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: { type: String, requred: true },
    description: { type: String, requred: true },
    experience: { type: String, requred: false },
    requeriments: { type: String, requred: false },
    responsabilities: { type: String, requred: false },
    disabilities: { type: Array, required: false },
    salary: { type: String, required: false },
    type: { type: String, required: true },
    hours: { type: String, required: true },
    typeOfWorkday: { type: String, required: true },
},{
    timestamps: true
})

module.exports = model("oportunities", schema); 