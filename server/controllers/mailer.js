const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const Account = require('../models/account');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const checkAdmin = require('../middlewares/checkAdmin');
const responses = require('../responses');
const mongoose = require('mongoose');
const img_config = require('../resources/imur');
const nodemailer =  require('nodemailer');
const checkJwt = require('../middlewares/checkJwt');

router.post('/send',checkJwt,(req,res)=>{

	if(utils.checkValidString(req.body)){
		let sender = req.body.sender;
		let reciever = req.body.reciever;
		let contents = req.body.contents;
		let subject = req.body.subject;

		const transporter =  nodemailer.createTransport({ 
			service: 'Gmail',
			auth: {
				user: config.email,
				pass: config.password
			}
		});
		const mainOptions = { 
			from: sender,
			to: reciever,
			subject: subject,
			text: contents,
		}
		transporter.sendMail(mainOptions, function(err, info){
			if (err) {
				console.log(err);
				res.status(403).send();
			} else {
				res.status(200).send({msg:"Successfully email sends",
					sent:true});
			}
		});
	}
	else{
		res.status(403).send();
	}
	

});


module.exports = router;