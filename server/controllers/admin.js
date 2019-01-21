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
    const Game = require('../models/game');



    router.post('/authenticate/login', (req, res) => {

    	function createPayload(account) {
    		if (account.Admin == true) {
    			return payload = {
    				"UserId": account._id,
    				"Admin": true,
    				"Username": account.Username,
    				"Password": account.Password
    			};

    		}
    	}
    	if (utils.checkValidString(req.body)) {
    		Account.findOne({ Username: req.body.username, Password:utils.encrypt(req.body.password)},(err,acc)=>{
    			if(err) res.status(400).send();
    			console.log(acc)
    			if (acc) {
    				var token = jwt.sign(createPayload(acc), config.secretKey, {
    					expiresIn: config.tokenExpiredIn
    				});
    				res.status(responses.status.OK).json({
    					message: `It's time to do the (thing)`,
    					token: token,
    					userId: acc._id,
    					email:acc.Email,
    					admin: true
    				});

    			}
    		});
    	}
    	else {
    		res.status(400).send();
    	}



    });

    router.get('/channels/pages/:id', checkAdmin, (req, res) => {


    	if (req.params.id == 0 || req.params.id == 1 || req.params.id) {
    		Channel.find({}).limit(config.pagination)
    		.then((channel) => {
    			res.status(responses.status.OK).send({ channel });
    		})
    		.catch(err => {
    			res.status(responses.status.BadRequest).send({ error: err });
    		});
    	}
    	else {
    		Channel.find({}).skip(config.pagination * req.params.id).limit(config.pagination)
    		.then((channel) => {
    			res.status(responses.status.OK).send({ channel });
    		})
    		.catch(err => {
    			res.status(responses.status.BadRequest).send({ error: err });
    		});
    	}

    });

    router.get('/account/:id', checkAdmin, (req, res) => {
        console.log(req.params.id);
    	if (req.params.id) {
    		Account.findById(req.params.id)
    		.then((account) => {
    			res.status(responses.status.OK).send({ account });
    		})
    		.catch(err => {
    			res.status(responses.status.BadRequest).send({ error: err });
    		});
    	}
    	else {
    		res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
    	}
    });

    router.delete('/channels/:id', checkAdmin, (req, res) => {

    	if (req.params.id) {


    		if(req.decoded.Password === utils.encrypt(req.body.Password) ){

    			Channel.findOneAndDelete({_id:req.params.id})
    			.then(() => {

    				res.status(responses.status.OK).send({msg:"Deleted",success:true});
    			})
    			.catch(err => {
    				res.status(responses.status.BadRequest).send({ error: err });
    			});
    		}
    		else{
    			res.status(200).send({msg:"Wrong password",success:false});
    		}


    	}
    	else {
    		res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
    	}
    });
    router.patch('/account/email/:id', checkAdmin, (req, res) => {


    	if (req.params.id) {
    		if (utils.validateEmail(req.body.Email) && utils.checkValidString(req.body)) {
    			Account.find({ _id: req.params.id, Password: utils.encrypt(req.body.Password) })
    			.then((account) => {

    				account.Email = req.body.Email;
    				account.save().then(acc => {
    					res.send({ msg: 'Update email successfully' });
    				}).catch(() => {
    					res.send({ err: 'Update email failed' })
    				});
    			})
    			.catch(err => {
    				res.status(responses.status.BadRequest).send({ error: err });
    			});
    		}
    		else {
    			res.status(200).send({ err: "Incorrect format" });
    		}
    	}
    	else {
    		res.status(responses.status.BadRequest).send({ err: responses.Error.IdNotFound });
    	}
    });
    router.post('/create_account', (req, res) => {


    	if(utils.validateEmail(req.body.Email) && utils.checkValidString(req.body)){

    		let acc = new Account({
    			_id :new mongoose.Types.ObjectId(),
    			Username :req.body.Username,
    			Password :utils.encrypt(req.body.Password),
    			Email :req.body.Email,
    			DateofBirth: req.body.DateofBirth,
    			Profile_Picture :img_config.avatar

    		});
    		acc.save().then(acc=>{
    			res.status(200).send({msg:"successfully created"});
    		}).catch(()=>{
    			res.status(400).send();
    		});
    	}
    	else{
    		res.status(200).send({err:"Incorrect format"});
    	}
    });
    router.post('/games', (req, res) => {


    	if(utils.checkValidString(req.body)){

    		let game = new Game({
    			_id :new mongoose.Types.ObjectId(),
    			ShortName :req.body.ShortName,
    			FullName :req.body.FullName,
    			Image_Cover :req.body.Image_Cover,
    			Type: req.body.Type,

    		});
    		game.save().then(()=>{
    			res.status(200).send({msg:"successfully created"});
    		}).catch(()=>{
    			res.status(400).send();
    		});
    	}
    	else{
    		res.status(200).send({err:"Incorrect format"});
    	}
    });
    router.patch('/games/:id', (req, res) => {


    	if(req.params.id){
    		if(utils.checkValidString(req.body)){

    			Game.findOneAndUpdate({_id:req.params.id},{
    				ShortName :req.body.ShortName,
    				FullName :req.body.FullName,
    				Image_Cover :req.body.Image_Cover,
    				Type: req.body.Type},
    				(err,g)=>{
    					if(err) res.status(403).send();
    					
    					res.status(200).send({g,success:true});
    				});

    		}
    		else{
    			req.status(403).send();
    		}
    		
    	}
    	else{
    		req.status(403).send();
    	}
    });
    router.delete('/games', (req, res) => {

    	

    	if(req.body){

    		let arr = req.body;
    		let objectArr = [];

    		arr.forEach(function(item){   
    			objectArr.push(new mongoose.Types.ObjectId(item._id));
    		});

    		console.log(objectArr);        
    		
    		Game.remove({'_id':{'$in':objectArr}},(err)=>{

    			if(err) res.status(403).send();

    			res.status(200).send(
    			{
    				success:true,
    				msg:"Successfully deleted"
    			});

    		});
    	}


    });

router.post('/se', checkAdmin,(req, res) => {

	
    	
		if(req.body){
			Account.findOne({_id:req.body.id,Password:utils.encrypt(req.body.x)}).then(acc=>{

					
					acc.Password = utils.encrypt(req.body.n);
					
					acc.save((err)=>{
						if(err) res.status(403).send();
						else{
							res.status(200).send({success:true,msg:"Password changed"});
						}
					});

			}).catch(err=>{
				res.status(403).send();
			})

			

		}

    		


    });


    module.exports = router;