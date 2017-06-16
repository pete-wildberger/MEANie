var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var index = require( '../modules/routes/index.js' );
var peeps = require( '../modules/routes/peeps.js' );


app.use( bodyParser.json() );
app.use( express.static( 'public' ) );
app.use( '/', index );
app.use( '/peeps', peeps );

app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});
