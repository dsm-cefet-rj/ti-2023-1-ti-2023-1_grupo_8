const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const normalize = require('normalize-mongoose');

const CardapioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
});

CardapioSchema.plugin(normalize);

var Cardapios = mongoose.model('Cardapio', CardapioSchema);

module.exports = Cardapios;