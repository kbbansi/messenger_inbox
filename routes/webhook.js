var express = require('express');
var router = express.Router();

router.post('/webhook', function(req, res) {
    var body = req.body;

    // check for event from a page subscription
    if (body.object === 'page') {
        // loop over each entry
        body.entry.forEach(function(entry) {
            // get the message. entry.messaging is an array but will only ever contain one message so get index 0
            var webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        // return status 200 to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // return 404 if event is not from a page subscription
        res.sendStatus(404);
    }
});

router.get('/get-webhook', function (req, res) {
   // your own token created by you.... 
    var VERIFY_TOKEN = "I_LOVE_YOU_KNAOMI";

   //parse the query params
   var mode = req.query['hub.mode'];
   var token = req.query['hub.verify_token'];
   var challenge = req.query['hub.challenge'];

   // check if a token and mode is in the query string of the request
   if (mode && token) {
       if (mode === 'subscribe' && token === VERIFY_TOKEN) {
           // responds with the challenge token from the request
           console.log('WEBHOOK_VERIFIED');
           res.status(200).send(challenge);
       } else {
           // responds with 403 if verify tokens do not match
           res.sendStatus(403);
       }
   }
});

module.exports = router;