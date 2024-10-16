const users = require("../../data/users-data");

module.exports = {
  get,
  register,
  login,
};

function get() {
  console.log(users);
  return users;
}

function register(newUser) {
  users.push(newUser);
  return newUser;
}
function login({ username, password }) {
  const userObj = users.find((user) => {
    return user.username === username;
  });
  return userObj.password === password;
}
