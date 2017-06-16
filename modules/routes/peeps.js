var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// 27017 is default mongo port
mongoose.connect('localhost:/27017/meanie');
var peepsSchema = new mongoose.Schema({
  name: String,
  location: String
});
var peepsModel = mongoose.model('peepsModel', peepsSchema);

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
  // get and send back all the things
  console.log('get peeps db');
  peepsModel.find().then(function(data) {
    res.send(data);
  });
});

router.post('/', function(req, res) {
  console.log('db req.body.name: ' + req.body.name);
  // retrieved the req.body
  // putting it into an object to be saved in the db
  var recordToAdd = {
    name: req.body.name,
    location: req.body.location
  };
  // create new record
  var newRecord = peepsModel(recordToAdd);
  newRecord.save();
});
router.delete('/:id', function(req, res) {
  console.log('db in delete' );
  peepsModel.remove({_id:req.params.id}, function(err) {
    if (!err) {
           res.send('No Erro!');
   }
   else {
           res.send('error');
   }
  });
});


module.exports = router;
