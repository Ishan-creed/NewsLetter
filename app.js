const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {

   res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {

   const email = req.body.Email;
   const firstName = req.body.Fname;
   const lastname = req.body.Lname;


   var data = {
      members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields: {
               FNAME: firstName,
               LNAME: lastname
            }
         }
      ]
   }

var jsonData = JSON.stringify(data);
const url = "https://us10.api.mailchimp.com/3.0/lists/8a5f15dc2e";
const options = {
   method: "POST",
   auth: "ishan1:39842a4e598379ac11c5025aef849786-us10"
   
}
const request = https.request(url,options,function(response) {

     if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");

     }else{
      res.sendFile(__dirname + "/failure.html");
     }

   response.on("data", function (data) {
      console.log(JSON.parse(data));
   });


});

request.write(jsonData);
request.end();


});


  
app.post("/failure",function(req,res){
   res.redirect("/");
});





app.listen(process.env.PORT  || 5000, function () {

   console.log("Listening to port 5000...");
});


//API Key
//39842a4e598379ac11c5025aef849786-us10






//8a5f15dc2e