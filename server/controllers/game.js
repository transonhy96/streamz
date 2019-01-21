const express = require('express')
const router = express.Router();
const Game = require('../models/game');
const mongoose =require('mongoose');
const utils = require('../utils');
const responses =require('../responses');
const protectRoute = require('../middlewares/protectRoute');
const config = require('../config');

//Get all Games
router.get('/', (req, res)=>{
  Game.find({}).sort({Views:-1})
    .then((game)=>{
        res.status(responses.status.OK).send(game);
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});
router.get('/top1',(req,res)=>{
  Game.find({}).sort({Views:-1}).limit(1).then(g=>{
    res.send({g});
  }).catch(()=>{
    res.status(403).send();
  })
})
router.get('/pages/:id', (req, res)=>{

  
  let id = req.params.id;


  if(req.params.id ==1){
   

      Game.find({}).sort({Views:-1}).limit(config.pagination)

      .then((game) => {

        Game.countDocuments({}, function(err, count){
          res.status(responses.status.OK).send({ game , 
          total:count,
          page_size:config.pagination,
          next_page:'http://localhost:3000/api/games/pages/2'
          });
        
        });

        
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
    }
    else{
      
      
      Game.find({}).sort({CreatedAt:-1}).skip(config.pagination).limit(config.pagination)
      .then((game) => {
        Game.countDocuments({}, function(err, count){
          id = Number(id)+1;
          res.status(responses.status.OK).send({ game , 
          total:count,
          page_size:config.pagination,
          next_page:`http://localhost:3000/api/games/pages/${id}`
          });
        
        });
      })
      .catch(err => {
        res.status(responses.status.BadRequest).send({ error: err });
      });
    }
});
//get Game by Id
router.get('/game_id/:id', (req, res)=>{
  if(req.params.id){
      Game.findById(req.params.id)
        .then((game)=>{
            res.status(responses.status.OK).send(game);
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
router.get('/type/:id', (req, res)=>{
  if(req.params.id){
      Game.find({Type:{ $elemMatch: { _id:req.params.id} }})
        .then((game)=>{
            res.status(responses.status.OK).send(game);
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

router.post('/name', (req, res)=>{
  if(utils.checkValidString(req.body)){
      Game.findOne({FullName:req.body.name})
        .then((game)=>{
          
            res.status(responses.status.OK).send(game);
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
router.get('/islike/:name', (req, res)=>{
  if(req.params.name){
      Game.find({FullName: RegExp(`^${req.params.name}`)})
        .then((game)=>{
            res.status(responses.status.OK).send({game});
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
// Create Game
router.post('/',protectRoute,(req,res)=>{
 
      if(utils.checkValidString(req.body) ){
            const Ngame = new Game({

              _id: new mongoose.Types.ObjectId(),
              ShortName:req.body.ShortName,
              FullName:req.body.FullName,
              Image_Cover:req.body.Image_Cover,
              Views:0,
              Type:req.body.Type

            });
            Ngame.save()
              .then(game=>{
                res.status(responses.status.OK).send({game});
              })
              .catch(err=>{
                res.status(responses.status.NotFound).send({err:err._message});
              });
      }
      else{
        res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
      }
  
});
/* Increase views
* @params(id)
*/
router.patch('/increase/:id',(req,res)=>{
  if(req.params.id)
  {
    
      Game.findByIdAndUpdate(req.params.id,{$inc: { Views: 1 }}, (err,game)=>{
        if(err){
          res.status(responses.status.BadRequest).send({err:err._message});
        } 
        else{
          res.status(responses.status.OK).send({msg:'Increased'})
        }     
        
      });
      
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
};
});
//Update Game
router.patch('/:id',protectRoute,(req,res)=>{

  
  if(req.params.id){
    Game.findById(req.params.id).then(game=>{
        if(utils.validateEmail(req.body.Email)){
          game.ShortName       = req.body.ShortName;
          game.FullName    = req.body.FullName;
          game.Iamge_Cover    = req.body.Iamge_Cover;
          game.Type = game.Type.push(req.body.Type);
          game.UpdatedAt = Date.now();
          game.save(
            (err,updateGame)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updateGame);
            });
           }
        else{
            res.status(responses.status.Forbidden).send({err:responses.Error.EmailIncorrectFormated});
          }
          

          });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Delete Game
router.delete('/:id',protectRoute, (req, res)=>{
  if(req.params.id){
      Game.findById(req.params.id,(err,Game)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        Game.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});


module.exports = router