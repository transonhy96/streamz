const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.use((req,res,next)=>{


  var token = req.headers['x-access-token'] || req.body.token || '';

  
  if (token) {
   
    jwt.verify(token, config.secretKey, function(err, decoded) {     

      
      
      if (err) {
        return res.json({err: 'Failed to authenticate token.' });    
      }
       else {
        Channel.find({Username:decoded.Username,Password:decoded.Password}).then(channel=>{
          
          if(channel) 
          {      
          
            req.decoded = decoded; 
            next();
          }
          else{
            return res.status(200).send({ 
              
              err: 'No token provided. You are enter restricted area' 
          });
          }
        })
        
      }
    });

  } else {

    return res.status(200).send({ 
         
        err: 'No token provided. You are enter restricted area' 
    });

  }
});
module.exports =router;