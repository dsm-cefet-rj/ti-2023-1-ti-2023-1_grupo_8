/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const normalize = require('normalize-mongoose');

const PedidoSchema = new Schema({
    nome: {
        type: String,
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

    idmesa: {
        type: Number,
        required: true,
    },

  

});

PedidoSchema.plugin(normalize);

var Pedidos = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedidos;*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const mesaSchema = new Schema({
    nome: {
        type: String,
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

    idmesa: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },

});

mesaSchema.plugin(normalize);

const Pedidos = mongoose.model('pedido', mesaSchema);

// Função para gerar IDs sequenciais de 1 a 20
async function gerarIDsSequenciais() {
    const pedidos = await Pedidos.find({});
    const idsUsados = pedidos.map(pedido => pedido.id);
    for (let i = 1; i <= 20; i++) {
        if (!idsUsados.includes(i)) {
            return i;
        }
    }
    throw new Error('Não foi possível gerar um ID sequencial para a pedido.');
}

// Middleware para atribuir um ID sequencial antes de salvar a pedido
mesaSchema.pre('save', async function (next) {
    if (!this.id) {
        const idsUsados = await Pedidos.distinct('id');
        for (let i = 1; i <= 20; i++) {
            if (!idsUsados.includes(i)) {
                this.id = i;
                break;
            }
        }
    }
    next();
});


module.exports = Pedidos;