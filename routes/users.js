const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {UserModel ,validUser , validLogin, genToken} = require("../models/userModel");
const { authToken } = require('../middlewares/auth');
const router = express.Router();

/* GET users listing. */
router.get('/', async(req, res) => {
  try{
  
    let perPage = 10;
    let page = (req.query.page)? Number(req.query.page):0;

    let data = await UserModel.find({},{password:0})
    .limit(perPage)
    .skip(perPage*page)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.post("/login",async(req,res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
   
    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({msg:"user or password invalid"});
    }
    let validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(400).json({msg:"invalid password!"});  
    }
    let myToken = genToken(user._id);
    res.json({token:myToken});
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})


// Sign up new user
router.post("/", async(req,res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(201).json(_.pick(user,["_id","email","date_created","name","role"]))
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

module.exports = router;
