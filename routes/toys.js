const express = require("express");
const {ToyModel ,validToy } = require("../models/toyModel");
const {authToken} = require('../middlewares/auth');
const router = express.Router();

router.get("/", async(req,res) => {
  try{

    let perPage = 10;
    let page = (req.query.page)? Number(req.query.page):0;
    let searchQ = req.query.s;
    let regSearchQ = RegExp(searchQ , "i") 

    if(searchQ){
      let toysData = await ToyModel.find({$or:[{name:regSearchQ},{info:regSearchQ}]})
      .limit(perPage)
      .skip(perPage*page)
       return res.json(toysData)
    }

    let toysData = await ToyModel.find({})
    .limit(perPage)
    .skip(perPage*page)
    res.json(toysData)

  }
  catch(err){
    console.log(err);
    res.status(400).json({err:err});
  }  
})

///////////////////////////////////////////////////////////////////////
router.get("/cat/:cat", async(req,res) => {
  try{

    let perPage = 10;
    let page = (req.query.page)? Number(req.query.page):0;
    let catSearch = req.params.cat;
    let regSerchCat = RegExp(catSearch , "i") 

    let toysData = await ToyModel.find({category:regSerchCat})
    .limit(perPage)
    .skip(perPage*page)
    res.json(toysData)

  }
  catch(err){
    console.log(err);
    res.status(400).json({err:err});
  }  
})

//////////////////////////////////////////////////////////////////////
router.get("/prices", async(req,res) => {
  try{

    
    let min = Number(req.query.min);
    let max = Number(req.query.max);
    let perPage = 10;
    let page = (req.query.page)? Number(req.query.page):0;
    
    let toysData = await ToyModel.find({})
    .limit(perPage)
    .skip(perPage*page)

    let toyAfterFilter = toysData.filter(item =>{
      return item.price >= min && item.price <= max;
    })

    res.json(toyAfterFilter)
    
  }
  catch(err){
    console.log(err);
    res.status(400).json({err:err});
  }  
})



router.post("/", authToken ,async(req,res) => {
  let validBody = validToy(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{

    let toy = new ToyModel(req.body)
    toy.user_id = req.userData._id
    await toy.save()
    res.status(201).json(toy)

  }
  catch(err){
    console.log(err);
    res.status(400).json({err:err});
  }  
})


router.put("/:editId", authToken ,async(req,res) => {
  let validBody = validToy(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let id = req.params.editId
    let toy = await ToyModel.updateOne({_id:id , user_id: req.userData._id}, req.body)
    res.json(toy)
  }
  catch(err){
    console.log(err);
    res.status(400).json({err:err});
  }  
})


router.delete("/:delId", authToken ,async(req,res) => {

  try{
    let id = req.params.delId
    let toy = await ToyModel.deleteOne({_id:id , user_id: req.userData._id})
    res.json(toy)
  }
  catch(err){
    console.log(err);
    res.status(400).json({err:err});
  }  
})
















// router.get("/", async(req,res) => {
//   try{

//     let perPage = 10;
//     let page = (req.query.page)? Number(req.query.page):0;
//     let searchQ = req.query.s;

//     let toysData = await ToyModel.find({$or:[{name:searchQ},{info:searchQ}]})
//     .limit(perPage)
//     .skip(perPage*page)

//     res.json(toysData)

//   }
//   catch(err){
//     console.log(err);
//     res.status(400).json({err:err});
//   }  

// })



module.exports = router;