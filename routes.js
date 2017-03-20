const router = require('express').Router();
const db = require('./db');

router.get('/users', (req,res,next)=>{
  db.models.User.findAll({ order: '"name" ASC',
    include: [ {
      model: db.models.User,
      as: 'manager'
    },
    {
      model:db.models.User,
      as: 'subordinates'
    }
    ]
  })
  .then( users => res.send(users))
  .catch(next);
})

router.get('/managers', (req,res,next)=>{
  db.models.User.findAll({ where: { managerFlag: true }})
  .then( managers => res.send(managers))
  .catch(next);
})

router.put('/users/:id', (req,res,next)=>{
  db.models.User.findById(req.params.id)
  .then( user => {
    Object.assign(user,req.body);
    return user.save();
  })
  .then( user => res.send(user))
  .catch(next);
})


module.exports = router;
