const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

class User extends Sequelize.Model {}
User.init({
  id: { type: Sequelize.STRING, primaryKey: true },
  token: { type: Sequelize.STRING, allowNull: true },
  address: { type: Sequelize.STRING, allowNull: true },
  last_checkin: { type: Sequelize.DATE, allowNull: true },
  name: { type: Sequelize.STRING, allowNull: false },
  picture: { type: Sequelize.STRING, allowNull: true },
}, { sequelize, modelName: 'user' });

sequelize.sync();

module.exports.User = User;
