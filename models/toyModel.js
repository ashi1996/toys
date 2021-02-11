const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")

let toySchema = new mongoose.Schema({
  name:String,
  info:String,
  category:String,
  img_url:String,
  price:Number,
  user_id:String,
  date_created:{
    type:Date, default:Date.now
  }
})

exports.ToyModel = mongoose.model("toys",toySchema);

// exports.genToken = (_id) => {
//   let token = jwt.sign({_id},"monkeysSecret",{expiresIn:"60mins"});
//   return token;
// }



exports.validToy = (_bodyUser) => {

  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    info:Joi.string().min(2).max(100).required(),
    category:Joi.string().min(2).max(100).required(),
    img_url:Joi.string().min(2).max(500).required(),
    price:Joi.number().min(1).required()
  })
// אם יש טעות יחזיר מאפיין שיש בו אירור
  return joiSchema.validate(_bodyUser);
}


// exports.validLogin = (_bodyUser) => {
// // בדיקה בצד שרת בשביל הלוג אין שיש אימייל ופאס
// // בPAYLOAD מהצד לקוח
//   let joiSchema = Joi.object({
//     email:Joi.string().min(2).max(100).email().required(),
//     pass:Joi.string().min(2).max(100).required()
//   })
// // אם יש טעות יחזיר מאפיין שיש בו אירור
//   return joiSchema.validate(_bodyUser);
// }

