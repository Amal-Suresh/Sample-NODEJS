var express = require("express");
const session = require("express-session");
const { response } = require("../app");
var router = express.Router();
var nocache = require("nocache");

// middileware 

function middlechecker(req, res, next) {
  if (req.session.user) {
  next();
  } else {;
    res.redirect("/");
  }
}

/* GET home page. */

router.get("/", nocache(), function (req, res, next) {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("index")
  }
});
const user = { 
  login: "user@gmail.com",
  pass: '1234'
};
// submit

router.post("/submit", (req, res) => {
 const {email,password} = req.body;
  if (user.login == email && user.pass == password) {
    req.session.user = true;
    res.redirect("/home");
  } else {
    res.render("index",{ fail: true });
  } 
});
// home 

router.get("/home",middlechecker,(req, res) => {
    res.render("home");
  });

  // logout

router.get("/logout", (req, res) => {
  req.session.user = false;
  res.redirect("/");
});

// list

router.get("/list", middlechecker, (req, res) => {
  const list=[
    {data:"amal"},
  {data:"arun"},
  {data:"bibin"},
  {data:"kichu"}]
  res.render("list", {list});
});

// table

router.get("/table", middlechecker, (req, res) => {
  const table=[
    {slno:1,
      name:"Amal",
      place:"Wayanad",
      mobno:9900998877},
  {slno:2,
    name:"Subith",
    place:"Kannur",
    mobno:8800338822},
  {slno:3,
    name:"Prasad",
    place:"Palakkad",
    mobno:9900220033}];
  res.render("table", { table });
});

// cads

router.get("/card", middlechecker, (req, res) => {


  const crdDetail=[
    {source:"https://imgd.aeplcdn.com/476x268/bw/models/honda-cbr-650r-standard20210330171401.jpg ",
    brand:"CBR 650 R",discription:"650cc Inline 4 cylinder 81 hp"},
    {source:"https://ic1.maxabout.us/autos/tw_india//N/2020/9/new-kawasaki-z900-candy-lime-green.jpg ",
    brand:"Z 900",discription:"900 cc Inline 4 cylinder"},
    {source:" https://images.triumphmotorcycles.co.uk/media-library/images/motorcycles/roadsters-supersports/street%20triple/family%20page%20revamp/street-triple-rs-revamp-955x537.jpg ",
    brand:"STREET TRIPLE RS",discription:"1200 cc Inline 3 cylinder"}]
  res.render("card", {crdDetail});
});


module.exports = router;