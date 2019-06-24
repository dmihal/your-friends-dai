const { User } = require('./db');

module.exports.getUser = id => User.findByPk(id);

module.exports.addUser = async user => {
  if (!user.id) {
    throw new Error('Invalid user');
  }

  await User.findOrCreate({
    where: { id: user.id },
    defaults: user,
  });
}

module.exports.setAddress = async (userId, address) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  console.log(user);
  user.address = address;
  user.last_checkin = new Date(),
  await user.save();
}

module.exports.maybeUpdateUser = user => {
  // TODO
}

module.exports.clearAddress = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.address = null;
  user.last_checkin = new Date(),
  await user.save();
}
