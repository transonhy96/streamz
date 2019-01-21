const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const AccountSchema = new Schema({
  _id: {
    type:ObjectId
  },
  Username:{
    type:String,
    required:true
  },
  Password:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  DateofBirth:{
    type:Date,
    default:Date.now()
  },
  Profile_Picture:{
    type:String,
    required:true
  },
  Admin:{
    type:Boolean,
    default:false
  },
  CreatedAt:{
    type:Date,
    default:Date.now()
  },
  UpdatedAt:{
    type:Date,
    default:Date.now()
  },
});


module.exports = mongoose.model('Account',AccountSchema);
