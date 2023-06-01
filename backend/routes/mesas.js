/*


var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Mesas = require('../models/mesas');

router.use(bodyParser.json());


let mesas = [
  {
    "nome": 0,
    "cadeiras": 4,
    "garcom": "Pedro",
    "status": "ocupada",
    "pedidos": [],
    "id": 1
  },
  {
    "nome": 0,
    "cadeiras": 4,
    "garcom": "Pedro",
    "status": "livre",
    "pedidos": [],
    "id": 2
  }
];




router.route('/')


.get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(mesas)})
.get(async (req, res, next) => {

  try{
    const mesasBanco = await Mesas.find({}).maxTime(5000);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(mesasBanco);
  }catch(err){
    next(err);
  }

})





.post((req, res, next) => {

  Mesas.create(req.body)
  .then((mesa) => {
      console.log('Mesa criada ', mesa);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(mesa);
  }, (err) => next(err))
  .catch((err) => next(err));


})








router.route('/:id')

.delete((req, res, next) => {

  mesas = mesas.filter(function(value, index, arr){ 
    return value.id != req.params.id;
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.params.id);
})


.put((req, res, next) => {

  let index = mesas.map(p => p.id).indexOf(req.params.id);
  mesas.splice(index, 1, req.body);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.body);
})


module.exports = router;*/

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Mesas = require('../models/mesas');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')
.get(async (req, res, next) => {

  try{
    const MesasBanco = await Mesas.find({}).maxTime(5000);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(MesasBanco);
  }catch(err){
    next(err);
  }
    
})
.post((req, res, next) => {
  
  Mesas.create(req.body)
  .then((mesa) => {
      console.log('Mesa criado ', mesa);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(mesa);
  }, (err) => next(err))
  .catch((err) => next(err));

})

router.route('/:id')
.get((req, res, next) => {
  
  Mesas.findById(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));


})
.delete((req, res, next) => {
  
  Mesas.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));


})
.put((req, res, next) => {
  
  Mesas.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((mesa) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(mesa);
  }, (err) => next(err))
  .catch((err) => next(err));

})


module.exports = router;