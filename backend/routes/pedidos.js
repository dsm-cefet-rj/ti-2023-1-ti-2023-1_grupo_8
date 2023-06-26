/*var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const pedido = require('../models/pedidos');

router.use(bodyParser.json());

router.route('/')
  .get(async (req, res, next) => {
    try {
      const pedidoBanco = await pedido.find({});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(pedidoBanco);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Internal Server Error' });
    }
  })
  .post((req, res, next) => {
    pedido.create(req.body)
      .then((pedido) => {
        console.log('Pedido criado ', pedido);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedido);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: 'Internal Server Error' });
      });
  });

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const resp = await pedido.findOne({ id: req.params.id });
      if (resp != null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      } else {
        res.statusCode = 404;
        res.json({ error: 'Pedido not found' });
      }
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Internal Server Error' });
    }
  })
  .delete((req, res, next) => {
    pedido.findOneAndRemove({ id: req.params.id })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: 'Internal Server Error' });
      });
  })

  .patch((req, res, next) => { // Alteração aqui
    pedido.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }) // Alteração aqui
      .then((pedido) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedido);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: 'Internal Server Error' });
      });
  })





  .put((req, res, next) => {
    pedido.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true })
      .then((pedido) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedido);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: 'Internal Server Error' });
      });
  });

module.exports = router;*/

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Pedidos = require('../models/pedidos');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

// Função para gerar IDs sequenciais de 1 a 20
async function gerarIDsSequenciais() {
  const pedidos = await Pedidos.find({});
  const idsUsados = pedidos.map(pedido => pedido.id);
  for (let i = 1; i <= 20; i++) {
    if (!idsUsados.includes(i)) {
      return i;
    }
  }
  throw new Error('Não foi possível gerar um ID sequencial para o pedido.');
}

/* GET pedidos listing. */
router.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const pedidos = await Pedidos.find({}).maxTime(5000);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(pedidos);
    } catch (err) {
      next(err);
    }
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const novoID = await gerarIDsSequenciais();
      req.body.id = novoID;
      const pedido = await Pedidos.create(req.body);
      console.log('Pedido criado: ', pedido);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(pedido);
    } catch (err) {
      next(err);
    }
  });

router.route('/:id')
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOne({ id: req.params.id }) // Busca por id sequencial
      .then((pedido) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedido);
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Pedidos.deleteOne({ id: req.params.id }) // Deleta por id sequencial
      .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
      })
      .catch((err) => next(err));
  })

  .patch(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOneAndUpdate({ id: req.params.id }, {
      $set: req.body
    }, { new: true })
      .then((pedido) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedido);
      })
      .catch((err) => next(err));
  })

  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOneAndUpdate({ id: req.params.id }, {
      $set: req.body
    }, { new: true })
      .then((pedido) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedido);
      })
      .catch((err) => next(err));
  });

module.exports = router;


