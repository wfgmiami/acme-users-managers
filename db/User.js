const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING
  },
  managerFlag: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
},{
  hooks:{
    beforeValidate:function(user){
      //user.managerId = null;
    }
  }
})

module.exports = User;
