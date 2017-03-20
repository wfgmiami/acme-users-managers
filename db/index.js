const conn = require('./conn');
const User = require('./User');

User.belongsTo(User, {as: 'manager'});
User.hasMany(User, {as: 'subordinates', foreignKey: 'managerId'});

const sync = ()=> conn.sync({ force: true});

const users = ['Curly', 'Larry', 'Moe', 'Shep'];

const seed = ()=>{
  return sync()
  .then(() => Promise.all(users.map( user => User.create({ name: user }) )))
}

module.exports = {
  seed,
  sync,
  models:{
    User
  }
}
