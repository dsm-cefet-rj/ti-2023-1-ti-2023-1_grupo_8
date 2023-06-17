/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const normalize = require('normalize-mongoose');

const mesaSchema = new Schema({
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

});

mesaSchema.plugin(normalize);

var Mesas = mongoose.model('mesa', mesaSchema);

module.exports = Mesas;*/


/*
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const mesaSchema = new Schema({
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
    },
});

mesaSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

mesaSchema.plugin(normalize);

var Mesas = mongoose.model('mesa', mesaSchema);

module.exports = Mesas;

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const mesaSchema = new Schema({
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
        unique: true,
    },
});

mesaSchema.plugin(normalize);

const Mesas = mongoose.model('mesa', mesaSchema);

// Função para gerar IDs sequenciais de 1 a 20
async function gerarIDsSequenciais() {
    const mesas = await Mesas.find({});
    const idsUsados = mesas.map(mesa => mesa.id);
    for (let i = 1; i <= 20; i++) {
        if (!idsUsados.includes(i)) {
            return i;
        }
    }
    throw new Error('Não foi possível gerar um ID sequencial para a mesa.');
}

// Middleware para atribuir um ID sequencial antes de salvar a mesa
mesaSchema.pre('save', async function (next) {
    if (!this.id) {
        const idsUsados = await Mesas.distinct('id');
        for (let i = 1; i <= 20; i++) {
            if (!idsUsados.includes(i)) {
                this.id = i;
                break;
            }
        }
    }
    next();
});


module.exports = Mesas;
