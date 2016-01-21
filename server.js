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
    
    // a broadcast list
    
    var BroadcastList = mongoose.model('BroadcastLists', {
        title : String,
        
        // address
        // isDeleted
        
        emails: {
            address : String,
            deleted : Boolean
        }
    });
    
    //

    var User = mongoose.model('Users', {
      username : String,
      email : String,
      passwd : String
    });
    
    //

    var Campaign = mongoose.model('Campaigns', {
      title : String,
      describe : String,
      template : String,
      contact : String,
      creator : String,
      status : String
    });

    // routes ======================================================================


    // api ---------------------------------------------------------------------
    // get all emails
    app.get('/api/broadcast-lists', function(req, res) {
        // use mongoose to get all emails in the database
        BroadcastList.find(function(err, broadcastLists) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err) {
              res.send(err)
            }
            res.json(broadcastLists); // return all emails in JSON format
        });
    });
    
    /**
     * Example to get a specific entity 
    **/
    
    app.get('/api/broadcast-lists/title/:title', function(req, res) {

        BroadcastList.find(
                
                {title : req.params.title},
        
                function(err, broadcastLists) {

            if (err) {
              res.send(err)
            }

            res.json(broadcastLists); // return all emails in JSON format
        });
    });
    
    /**
     * 
     * @param {type} param1
     * @param {type} param2
     */

    app.put('/api/broadcast-lists/update/:id', function(req, res) {
        
        BroadcastList.findOne( { _id : req.params.id }, 
            function(err, broadcastList) {
                    broadcastList.title = req.body.title,
                    broadcastList.emails = req.body.emails;
                    
                    broadcastList.save(function() {
                        res.send("awesome " + req.body.title);
                    });
            }
        );
        
    });
    
    // Update templates by ID
        app.put('/api/templates/details/:id', function(req, res) {
          Template.findOne({ _id: req.params.id }, function (err, template) {
            // if (err) {
            //   req.send(err)
            // }
            template.title = req.body.title;
            template.describe = req.body.describe;
            template.content = req.body.content;
            template.save(function() {
              res.send("Template Updated !");
            });
          });
        });


    // create email and send back all emails after creation
    
    app.post('/api/broadcast-lists', function(req, res) {

        // create a email, information comes from AJAX request from Angular@
        
        BroadcastList.create({
           title: req.body.title,
           emails: req.body.emails 
        }, function(err) {
            if(err) {
              res.send(err);
            }
            else {
                res.redirect("/manage-group");
            }
        });
        
    });

    // delete a broadcast list
    
    app.delete('/api/broadcast-lists/remove/:id', function(req, res) {
        BroadcastList.remove({
            _id : req.params.id
        }, function(err) {
            if(err) {
              res.send(err);
            }
            else {
                res.redirect("/manage-group");
            }
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
          status: "En attente",
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
