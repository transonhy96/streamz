const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const mongoose = require('mongoose');
const utils = require('../utils');
const responses = require('../responses');
const img_config = require('../resources/imur');
const keygen = require('../generators');
const config = require('../config');
const jwt = require('jsonwebtoken');
const checkJwt = require('../middlewares/checkJwt');
const moment = require('moment');

const _ = require('lodash');
/*****************************************************************************
 * 
 *                          Khach va user co the truy cap
 * 
 * 
 **************************************************************************/
router.get('/pages/:id', (req, res) => {
 
    let channelProjection = {
      Password:false,
      StreamKey:false,
      BroadCast_Path:false,
      Created_At:false,
      Update_At:false
    }
    if(req.params.id ==0 || req.params.id ==1 || req.params.id){
      Channel.find({},channelProjection).limit(config.pagination)
      .then((channel) => {
        res.status(responses.status.OK).send({ channel });
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
    }
    else{
      Channel.find({},channelProjection).skip(config.pagination*req.params.id).limit(config.pagination)
      .then((channel) => {
        res.status(responses.status.OK).send({ channel });
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
    }
    

 
});



router.get('/:id', (req, res) => {
  if (req.params.id) {
    Channel.findById(req.params.id)
      .then((channel) => {
        res.status(responses.status.OK).send({ channel });
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});

router.get('/:id', (req, res) => {
 let channelProjection = {
	Password:false
};
    Channel.find({})
      .then((channel) => {
        res.status(responses.status.OK).send( channel );
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
  
  
   
});


router.get('/game_id/:id', (req, res) => {
  
  if (req.params.id) {
    Channel.find({Current_Streaming_Game:req.params.id})
      .then((channel) => {
        
        res.status(responses.status.OK).send({ channel });
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});

router.post('/authenticate/login', (req, res) => {

  
  if (utils.checkValidString(req.body)) {
    Channel.findOne({
      Username: req.body.username
    }, (err, channel) => {
      
      if (err) res.status(responses.status.BadRequest).send({ err: responses.Error.UserNamePassWordNotFound });

      if (!channel) {
        res.status(responses.status.NotFound).json({
          message: responses.Error.UserNamePassWordNotFound
        });
      } else if (channel) {


        if (channel.Password != utils.encrypt(req.body.password)) {
          res.status(responses.status.NotFound).json({
            message: responses.Error.UserNamePassWordNotFound
          });
        } else {

          var token = jwt.sign(createPayload(channel), config.secretKey, {
            expiresIn: config.tokenExpiredIn
          });
          res.status(responses.status.OK).json({
            message: `It's time to do the (thing)`,
            token: token,
            userId:channel._id,
            friend:channel.Friends,
            following:channel.Followings
          });

        }

      }

    });



  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.MissingField });
  }



});

router.post('/signup', (req, res) => {
  
  
  if (utils.checkValidString(req.body)) {

    if(utils.validateEmail(req.body.email)){
      let _id = new mongoose.Types.ObjectId();
     
      let key = req.body.username;
      
      const channel = new Channel({

      _id,
      Username:req.body.username,
      Password:utils.encrypt(req.body.password),
      Email:req.body.email,
      DateofBirth:new Date(Date.parse(req.body.dateofbirth)),
      StreamKey: key,
      BroadCast_Path: config.broadcast,
      Profile_Picture: img_config.avatar,
      Profile_Banner: img_config.cover,
      VideoPlayer_Banner: img_config.cover
    });
      
    channel.save((err,chan)=>{
      
      if(err){
        res.status(responses.status.OK).send({ err: err._message ,dublicate:true});
      }
      else{
        res.status(responses.status.OK).send({ chan });
      }
    });
    }
    else{
      res.status(responses.status.BadRequest).send({ err: responses.Error.EmailIncorrectFormated });
    }

  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.MissingField });
  }



});
/*****************************************************************************
 * 
 *                        Chi user co the truy cap
 * 
 * 
 **************************************************************************/

  
router.get('/username/:username',(req,res)=>{

  if(req.params.username){

    Channel.findOne({Username:req.params.username})
    .then(channel=>{
      res.status(responses.status.OK).send(channel);
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
    })

  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
  }

});
router.patch('/increaseView/:username',(req,res)=>{
  

  if(req.params.username){

    Channel.findOneAndUpdate({Username:req.params.username},{$inc: { Views: 1 }})
    .then(channel=>{

      console.log(channel);
      res.status(responses.status.OK).send({increase:true});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
    })

  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
  }

});
router.patch('/:id/dashboard/setting',checkJwt, (req, res) => {
  
  if(req.params.id){
    if (utils.checkValidString(req.body)) {
      const updateChannel = {
        Live_Title: req.body.Live_Title,
        Go_Live_Notification: req.body.Go_Live_Notification,
        Current_Streaming_Game: req.body.Current_Streaming_Game,
        Language: req.body.Language
      }
    Channel.findByIdAndUpdate(req.params.id,updateChannel,(err,chan)=>{

      
        if(err){
          res.status(400).send(err);
        }
        res.status(responses.status.OK).send({msg:"Update Successfully"});
    })

  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.MissingField });
  }
  }
  else{
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
  



});
router.patch('/changeNotification/:id',checkJwt, (req, res) => {


  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      
      if(channel.Notification){
        channel.Notification = false;
      }
      else{
        channel.Notification = true;
      }
      channel.save();

    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
router.patch('/changeMature/:id', checkJwt,(req, res) => {


  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      
      if(channel.Mature_Content){
        channel.Mature_Content = false;
      }
      else{
        channel.Mature_Content= true;
      }
      channel.save();

    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
//Delete Channel
router.delete('/:id', (req, res) => {
  if (req.params.id) {
    Channel.findById(req.params.id, (err, channel) => {
      if (err) res.status(responses.status.BadRequest).send({ error: err });
      channel.remove();
      res.status(responses.status.Ok).send({ msg: responses.Message.SuccessfulDeleted });
    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
//Add Follower
router.patch('/addfollow/:id',checkJwt, (req, res) => {

  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      
     var temp = channel.Followers;
    
      
      if(_.isEmpty(temp)){
        
        temp.push(req.body.user);
        
        
      }
      
      else{
        temp.forEach(element => {
          if(element.userId == req.body.user.userId){
            res.send({alrearyFollowed:true,err:"Can not follow"});
          }
          else{
            temp.push(req.body.user);
          }
        });
      
      }
      channel.Followers = temp;
      channel.save((err,chan)=>{
        if(err) res.send({err:"Can not add follower"});
        res.send({msg:"Follower added successfully",followed:true});
      })


    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
router.patch('/unfollow/:id',checkJwt, (req, res) => {

  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      
     let temp = channel.Followers;
    let newarr =[];
      
      if(_.isEmpty(temp)){
        
        res.status(403).send();
        
        
      }
      
      else{
        
          newarr =temp.find((element ,i)=> {
          if(element.userId == req.body.user.userId){
            temp.splice(i,1);
          }
          
        });

        console.log(newarr)
      
      }
      channel.Followers = newarr;
      channel.save((err,chan)=>{
        if(err) res.send({err:"Can not unfollo"});
        res.send({msg:"Unfollow successfully",unfollow:true});
      })


    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
router.patch('/removefollowing/:id',checkJwt, (req, res) => {

  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      console.log(channel.Followings)
     let temp = channel.Followings;
    let newarr =[];
      
      if(_.isEmpty(temp)){
        
        res.status(403).send();
        
        
      }
      
      else{
        
          newarr =temp.find((element ,i)=> {
          if(element.userId == req.body.user.userId){
            temp.splice(i,1);
          }
          
        });

        console.log(newarr)
      
      }
      channel.Followers = newarr;
      channel.save((err,chan)=>{
        if(err) res.send({err:"Can not remove following"});
        res.send({msg:"Remove following  successfully",remove:true});
      })


    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
router.patch('/addfollowing/:id',checkJwt, (req, res) => {

  if (req.params.id) {
   
    Channel.findById(req.params.id).then(channel => {
      
     var temp = channel.Followings;
     
      
      if(_.isEmpty(temp)){
        
        temp.push(req.body.user);
        
        
      }
      
      else{
        temp.forEach(element => {
          if(element.userId == req.body.user.userId){
            res.send({alrearyFollowing:true,err:"Can not follow"});
          }
          else{
            temp.push(req.body.user);
          }
        });
      
      }
      channel.Followings = temp;
      channel.save((err,chan)=>{
        if(err) res.send({err:"Can not add following"});
        res.send({msg:"Following added successfully",following:true});
      })


    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
router.patch('/VideoPlayer_Banner/:id',checkJwt, (req, res) => {


  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      if (utils.checkValidString(req.body)) {
        channel.VideoPlayer_Banner = req.body.VideoPlayer_Banner ||channel.Profile_Picture;
      
        channel.save(
          (err, updatechannel) => {
            if (err) res.status(responses.status.BadRequest).send({ err: err._message });
            res.status(responses.status.OK).send(updatechannel);
          });
      }
      else {
        res.status(responses.status.Forbidden).send({ err: responses.Error.MissingField });
      }


    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
router.patch('/:id/profile_setting', (req, res) => {


  if (req.params.id) {
    Channel.findById(req.params.id).then(channel => {
      if (utils.checkValidString(req.body)) {
        channel.Profile_Picture = req.body.Profile_Picture ||channel.Profile_Picture;
        channel.Profile_Banner = req.body.Profile_Banner || channel.Profile_Banner;
        channel.Bio = req.body.Bio
        channel.save(
          (err, updatechannel) => {
            if (err) res.status(responses.status.BadRequest).send({ err: err._message });
            res.status(responses.status.OK).send(updatechannel);
          });
      }
      else {
        res.status(responses.status.Forbidden).send({ err: responses.Error.EmailIncorrectFormated });
      }


    });
  }
  else {
    res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
  }
});
function createPayload(channel){
  if(channel.Admin == true)
          {
            return payload = {
              "UserId":channel._id,
              "Admin":true,
              "Username":channel.Username,
              "Password":channel.Password
          };
            
          }
         return payload = {
              "UserId":channel._id,
              "Admin":false,
              "Username":channel.Username,
              "Password":channel.Password
          };
}
module.exports = router
