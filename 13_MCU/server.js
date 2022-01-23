const express = require('express');
const app = express();
const hostname = 'localhost';
const port = '80';
const bodyParser = require("body-parser"); //Include body-parser for collect data from form as an input

//Use bodyParser
app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

//Start MongoDb with mongoose

//Connect mongoose with mongodb

const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/MCUForm");
};

//Setting the schema
const contactFormSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    thoughts: String,
});

//Making a model from the schema
const form = mongoose.model('contactForm',contactFormSchema);


//Serving static files in static folder
app.use('/staticfiles',express.static('static')); //Here first static is the location on our website and second is the folder name.

//Setting pug as view engine or template engine
app.set('view engine', 'pug')  //Always refer docs and google


//Showing root location
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
    // document.querySelector('.home').classList.add('active');
})
app.get('/About',(req,res)=>{
    res.status(200).render('about.pug');
    // document.querySelector('.about').classList.add('active');
})
app.get('/Contact',(req,res)=>{
    res.status(200).render('contact.pug');
    // document.querySelector('.contact').classList.add('active');
})

app.post("/contact", (req, res) => {
    var myData = new form(req.body);
    myData
      .save()
      .then(() => {
        res.send("This form has submitted successfully.");
      })
      .catch(() => {
        res.status(400).send("This form has not submitted. ");
      });
  });

app.listen(80,()=>{
    console.log(`server is starting on http://${hostname}:${port}`);
})