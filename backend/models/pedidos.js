const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const normalize = require('normalize-mongoose');

const PedidoSchema = new Schema({
    nome: {
        type: Number,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    idmesa: {
        type: Number,
        required: true,
    },
});

PedidoSchema.plugin(normalize);

var Pedidos = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedidos;