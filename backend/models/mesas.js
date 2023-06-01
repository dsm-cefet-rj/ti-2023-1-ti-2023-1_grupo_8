const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const normalize = require('normalize-mongoose');

const MesaSchema = new Schema({
    nome: {
        type: Number,
        required: true,
    },
    cadeiras: {
        type: Number,
        required: true,
    },
    garcom: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    pedidos: {
        type: Array,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
});

MesaSchema.plugin(normalize);

var Mesas = mongoose.model('Mesa', MesaSchema);

module.exports = Mesas;

