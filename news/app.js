const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us4.api.mailchimp.com/3.0/lists/cec3fffe11";

  const options = {
    method: "POST",
    auth: "rahul1:16aa3ab275fd236ca975e45cac5367c5-us4"
  };

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + '/success.html')
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });
    request.write(jsonData)
    request.end()
});

app.post('/failure', function (req, res) {
  res.redirect('/')
})

app.post("/success", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server Started");
});

// api key
// 16aa3ab275fd236ca975e45cac5367c5-us4
// listid
// cec3fffe11
