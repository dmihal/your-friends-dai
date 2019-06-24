const users = {};

module.exports.getUser = id => users[id];

module.exports.addUser = user => {
  if (!user.id) {
    throw new Error('Invalid user');
  }
  users[user.id] = user;
}

module.exports.setAddress = (userId, address) => {
  if (!users[userId]) {
    throw new Error('User not found');
  }
  users[userId].address = address;
}

module.exports.clearAddress = (userId) => {
  if (!users[userId]) {
    throw new Error('User not found');
  }
  users[userId].address = null;
}
