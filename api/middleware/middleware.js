const Users = require("../users/users-model");
const users = require("../../data/users-data");

function validateUsername(req, res, next) {
  const { username } = req.body;
  const isValidUsername = (usersArray, usernameToCheck) => {
    return usersArray.some((user) => user.username === usernameToCheck);
  };
  if (
    username &&
    typeof username === "string" &&
    username.trim().length > 0 &&
    !isValidUsername(users, username)
  ) {
    next();
  } else {
    next({
      status: 400,
      message:
        "Invalid or existing username. Please choose a different username.",
    });
  }
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (
    password &&
    typeof password === "string" &&
    password.trim().length > 0 &&
    password.length > 6
  ) {
    next();
  } else {
    next({
      status: 400,
      message:
        "Invalid password. Password must be a string and at least 7 characters long.",
    });
  }
}

async function authenticateUser(req, res, next) {
  try {
    const { username } = req.body;
    const isValidUsername = (usersArray, usernameToCheck) => {
      return usersArray.some((user) => user.username === usernameToCheck);
    };

    if (!isValidUsername(users, username)) {
      return next({ status: 401, message: "Invalid username or password" });
    }

    const isValid = await Users.login(req.body);

    if (isValid) {
      return next();
    } else {
      return next({ status: 401, message: "Invalid username or password" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { validateUsername, validatePassword, authenticateUser };
