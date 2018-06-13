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

app.get('/', (req, res) => {
  Request.find({}).then(text =>
  res.json(text))
})


app.get('/:text', (req, res) => {
  let text = req.params.text.toLowerCase()
  console.log(`second Answer console log:`)
  Request.findOne({request: text}).then(response => {
  if(response){

    var requestData =  {

      "lang": "en",
      "query": "hey",
      "sessionId": "12345",
      "timezone": "America/New_York"
    }

    request({
      url: 'https://api.dialogflow.com/v1/query?v=20150910',
      method: "POST",
      headers: {
        "Authorization": "Bearer 819a4ef78566463e9c7c1ec294765340"
      },
      json: requestData
    }, (error, response, body) => {
      if(!error){
        var formattedResponse = body.result.fulfillment.speech
        var formattedResponse2 = [{
          request: text,
          answer: formattedResponse
        }]
        res.json(formattedResponse2)
      } else {
        res.json(error)
      }
    })




  // res.json(response)
} else {
    console.log(response)
    res.json(null)
}})})

app.post('/', (req, res) => {
  console.log(req.body)
  Request.create({request: req.body.request.toLowerCase(), answer: req.body.answer.toLowerCase()}).then(text =>
      res.json(text))
    .catch(err =>
      res.json(err)
    )
  })

  // Update Answers
