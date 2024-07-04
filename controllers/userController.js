const User = require("../models/user");
const md5 = require("md5");
require("dotenv").config();

const getUsers = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.query.key === process.env.API_KEY) {
    if (req.query.login && req.query.password) {
      let error;
      User.find()
        .then((users) => {
          let obj;
          users.forEach((user) => {
            if (user.login === req.query.login) {
              if (user.password === md5(req.query.password).toString()) {
                obj = user;
              } else {
                error = "Логин или пароль неверны";
              }
            } else {
              if (error !== "Логин или пароль неверны")
                error = "Аккаунт не найден";
            }
          });
          if (obj) {
            res
              .json({
                status: 200,
                data: obj,
              })
              .status(200);
          } else {
            res.json({
              status: 404,
              message: error,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (req.query.login && !req.query.password) {
      res.json({
        status: 400,
        message: "Password Missing",
      });
    } else if (req.query.login && !req.query.password) {
      res.json({
        status: 400,
        message: "Login Missing",
      });
    } else if (req.query.key === process.env.API_KEY && req.query._id) {
      res.json(await User.findById(req.query._id).exec());
    } else {
      res.json({
        status: 400,
        message: "Queries missed",
      });
    }
  } else if (req.query.key !== process.env.API_KEY) {
    res.status(403).send("Invalid Api Key");
  } else {
    res.status(403).send("Api Key is required");
  }
};

const createUser = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { login, password } = req.body;
  if (req.query.key === process.env.API_KEY) {
    let isAllow = true;
    User.find()
      .then((users) => {
        users.forEach((user) => {
          if (user.login == login) {
            res
              .status(400)
              .json({ status: 400, message: "Login already exists" });
            isAllow = false;
          }
        });
        if (isAllow) {
          const user = new User({ login, password });
          user.password = md5(user.password).toString();
          user.save().then((result) =>
            res
              .json({
                data: result,
                status: 200,
                message: "Аккаунт успешно создан",
              })
              .status(200)
          );
        }
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.query.key !== process.env.API_KEY) {
    res.status(403).send("Invalid Api Key");
  } else {
    res.status(403).send("Api Key is required");
  }
};

module.exports = {
  getUsers,
  createUser,
};
