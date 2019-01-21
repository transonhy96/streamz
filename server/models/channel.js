const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ChannelSchema = new Schema({
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
    required:true
  },
  StreamKey:{
    type:String,
    require:true
  },
  BroadCast_Path:{
    type:String,
    required:true
  },
  Bio:{
    type:String,
    default:''
  },
  Profile_Picture:{
    type:String,
    required:true
  },
  Profile_Banner:{
    type:String,
    required:true
  },
  VideoPlayer_Banner:{
    type:String,
    require:true
  },
  Current_Streaming_Game:{
    type:String,
    default:''
  },

  Mature_Content:{
    type:Boolean,
    default:false
  },
  Notification:{
    type:Boolean,
    default:false
  },
  Followers:{
    type:Array,
    default:new Array()
  },
  Friends:{
    type:Array,
    default:new Array()
  },
  Followings:{
    type:Array,
    default:new Array()
  },
  Live_Title:{
    type:String,
    default:''
  },
  Go_Live_Notification:{
    type:String,
    default:''
  },
  Tags:{
    type:Array,
    default:new Array()
  },
  Views:{
    type:Number,
    default:0
  },
  Language:{
    type:String,
    default:''
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
  }
});


module.exports = mongoose.model('Channel',ChannelSchema);
