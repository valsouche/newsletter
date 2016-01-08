// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://localhost/firemail');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define model =================
    var Email = mongoose.model('Emails', {
      text : String
    });

    var User = mongoose.model('Users', {
      username : String,
      email : String,
      passwd : String
    });

    var Campaign = mongoose.model('Campaigns', {
      title : String,
      describe : String,
      template : String,
      contact : String,
      creator : String,
    });

    // routes ======================================================================


    // api ---------------------------------------------------------------------
    // get all emails
    app.get('/api/emails', function(req, res) {
        // use mongoose to get all emails in the database
        Email.find(function(err, emails) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err) {
              res.send(err)
            }
            res.json(emails); // return all emails in JSON format
        });
    });

    // create email and send back all emails after creation
    app.post('/api/emails', function(req, res) {

        // create a email, information comes from AJAX request from Angular@
        Email.create({
          text : req.body.text,
          done : false
        }, function(err, email) {
            if(err) {
              res.send(err);
            }
            // get and return all the emails after you create another
            Email.find(function(err, emails) {
                if(err) {
                  res.send(err);
                }    
                res.json(emails);
            });
        });
    });

    // delete an email
    app.delete('/api/emails/:email_id', function(req, res) {
        Email.remove({
            _id : req.params.email_id
        }, function(err, Email) {
            if(err) {
              res.send(err);
            }

            // get and return all the emails after you create another
            Email.find(function(err, emails) {
                if(err) {
                  res.send(err);
                }    
                res.json(emails);
            });
        });
    });

  // Campaigns -------------------------------------------------------------

  // get all Campaigns
    app.get('/api/campaigns', function(req, res) {
        // use mongoose to get all emails in the database
        Campaign.find(function(err, campaigns) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err) {
              res.send(err)
            }
            res.json(campaigns); // return all emails in JSON format
        });
    });

// create campaign
    app.post('/api/campaigns', function(req, res) {
        // create a email, information comes from AJAX request from Angular@
        Campaign.create({
          title : req.body.title,
          describe : req.body.describe,
          done : false
        }, function(err) {
            if(err) {
              res.send(err);
            }
        });
    });

    // delete a campaign
    app.delete('/api/campaigns/:campaign_id', function(req, res) {
        Campaign.remove({
            _id : req.params.campaign_id
        }, function(err) {
            if(err) {
              res.send(err);
            }
        });
    });


 // application -------------------------------------------------------------
   app.use(express.static(__dirname + '/public/app/'));
   
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("Newsletter App started on :8080");
