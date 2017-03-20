const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING
  },
  managerFlag: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User;
