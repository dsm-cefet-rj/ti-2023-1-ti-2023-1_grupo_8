

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Mesas = require('../models/mesas');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

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

/* GET users listing. */
router.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const MesasBanco = await Mesas.find({}).maxTime(5000);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(MesasBanco);
    } catch (err) {
      next(err);
    }
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const novoID = await gerarIDsSequenciais();
      req.body.id = novoID;
      const mesa = await Mesas.create(req.body);
      console.log('Mesa criada: ', mesa);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(mesa);
    } catch (err) {
      next(err);
    }
  });

router.route('/:id')
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Mesas.findOne({ id: req.params.id }) // Busca por id sequencial
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Mesas.deleteOne({ id: req.params.id }) // Deleta por id sequencial
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Mesas.findOneAndUpdate({ id: req.params.id }, {
      $set: req.body
    }, { new: true })
      .then((mesa) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mesa);
      })
      .catch((err) => next(err));
  });

module.exports = router;
