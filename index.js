const express = require("express")
const request = require("request")
const parser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('./db/connection.js')
const Request = mongoose.model("Request")
app.set("view engine", "hbs")



app.listen(4000, () => {
  console.log("app listening on port 4000")
})

app.use(express.static(__dirname + '/public'))

app.use(cors())

app.use(parser.json({extended:true}));

// app.get('/', (req, res) => {
//   Request.find({}).then(text =>
//   res.json(text))
// })
//
//
// app.get('/:text', (req, res) => {
//   let text = req.params.text.toLowerCase()
//   console.log(`second Answer console log:`)
//   Request.findOne({request: text}).then(response => {
//   if(response){
//
//     var requestData =  {
//
//       "lang": "en",
//       "query": "hey",
//       "sessionId": "12345",
//       "timezone": "America/New_York"
//     }
//
//     request({
//       url: 'https://api.dialogflow.com/v1/query?v=20150910',
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer 819a4ef78566463e9c7c1ec294765340"
//       },
//       json: requestData
//     }, (error, response, body) => {
//       if(!error){
//         var formattedResponse = body.result.fulfillment.speech
//         var formattedResponse2 = [{
//           request: text,
//           answer: formattedResponse
//         }]
//         res.json(formattedResponse2)
//       } else {
//         res.json(error)
//       }
//     })
//
//
//
//
//   // res.json(response)
// } else {
//     console.log(response)
//     res.json(null)
// }})})
//
// app.post('/', (req, res) => {
//   console.log(req.body)
//   Request.create({request: req.body.request.toLowerCase(), answer: req.body.answer.toLowerCase()}).then(text =>
//       res.json(text))
//     .catch(err =>
//       res.json(err)
//     )
//   })
//
//   // Update Answers


// IBM Watson workspace SDK

// Terminal version

// Example 4: implements app actions.

var prompt = require('prompt-sync')();
// var AssistantV1 = require('watson-developer-cloud/assistant/v1');
//
// // Set up Assistant service wrapper.
// var service = new AssistantV1({
//   username: '467adfb9-96dc-43a9-935e-1d81d86b910c', // replace with service username
//   password: 'GOZ2MB7aJIzD', // replace with service password
//   version: '2018-02-16'
// });
//
// var workspace_id = '5f0e066f-992a-4015-9743-207fe356700b'; // replace with workspace ID
//
// // Start conversation with empty message.
// service.message({
//   workspace_id: workspace_id
//   }, processResponse);
//
// // Process the service response.
// function processResponse(err, response) {
//   if (err) {
//     console.error(err); // something went wrong
//     return;
//   }
//
//   var endConversation = false;
//
//   // Check for action flags.
//   if (response.output.action === 'display_time') {
//     // User asked what time it is, so we output the local system time.
//     console.log('The current time is ' + new Date().toLocaleTimeString() + '.');
//   } else if (response.output.action === 'end_conversation') {
//     // User said goodbye, so we're done.
//     console.log(response.output.text[0]);
//     endConversation = true;
//   } else {
//     // Display the output from dialog, if any.
//     if (response.output.text.length != 0) {
//         console.log(response.output.text[0]);
//     }
//   }
//
//   // If we're not done, prompt for the next round of input.
//   if (!endConversation) {
//     var newMessageFromUser = prompt('>> ');
//     service.message({
//       workspace_id: workspace_id,
//       input: { text: newMessageFromUser },
//       // Send back the context to maintain state.
//       context : response.context,
//     }, processResponse)
//   }
// }


// Online API version

var watson = require('watson-developer-cloud');

let date = new Date();
let year = date.getUTCFullYear();
let month = date.getUTCMonth() + 1;
let day = date.getUTCDay();
let newdate = String(year + "-" + month + "-" + day)
console.log(newdate)

var assistant = new watson.AssistantV1({
  username: '467adfb9-96dc-43a9-935e-1d81d86b910c',
  password: 'GOZ2MB7aJIzD',
  version: '2018-02-16'
});
assistant.message({
  workspace_id: '5f0e066f-992a-4015-9743-207fe356700b',
  input: {'text': 'Hello'}
},  function(err, response) {
  if (err)
  console.log('error:', err);
  else
  // res.json(response)
  console.log(JSON.stringify(response, null, 2));
});

app.get('/', (req, res) => {
})

app.get('/:text', (req, res) => {
  let text = req.params.text.toLowerCase()
  let params = {
  workspace_id: '5f0e066f-992a-4015-9743-207fe356700b',
  intent: text
};
  console.log(params)
assistant.listExamples(params, function(err, response) {
  if (err) {
    console.error(err);
  } else {
    res.json(response)
    console.log(JSON.stringify(response, null, 2));
  }
});
})
