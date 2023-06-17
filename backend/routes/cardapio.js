var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const cardapio = require('../models/cardapio');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')
.get(async (req, res, next) => {

  try{
    const cardapioBanco = await cardapio.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(cardapioBanco);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
    
})
.post((req, res, next) => {
  
  cardapio.create(req.body)
  .then((mesa) => {
      console.log('Mesa criado ', mesa);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(mesa);
  }, (err) => next(err))
  .catch((err) => next(err));

})

router.route('/:id')
.get(async (req, res, next) => {
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await cardapio.findById(req.params.id);
    if(resp != null){
      res.statusCode = 200;
      res.json(resp);
    }else{
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  
  }catch(errParam){
    console.log(errParam);
    res.statusCode = 404;
    res.json({});
  }  

})
.delete((req, res, next) => {
  
  cardapio.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));


})
.put((req, res, next) => {
  
  cardapio.findByIdAndUpdate(req.params.id, {
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