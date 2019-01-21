const express = require('express')
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const checkAdmin = require('../middlewares/checkAdmin');


router.use('/token',checkJwt,(req,res)=>{
	res.status(200).send({
		valid:true,
	})
});

router.use('/admin',checkAdmin,(req,res)=>{
	res.status(200).send({
		admin:true,
	});
});


module.exports  = router;