const Task = require("../models/task");
require("dotenv").config();

const getTasks = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.query.key === process.env.API_KEY) {
    let result = [];
    if (req.query.userId) {
      Task.find()
        .then((tasks) => {
          if (tasks.length > 0) {
            tasks.forEach((task) => {
              if (task.userId === req.query.userId) {
                result.push(task);
              }
            });
            res.json({
              status: 200,
              data: result,
            });
          } else {
            res
              .json({
                status: 204,
                message: "Ничего не найдено",
              })
              .status(204);
          }
        })
        .catch((err) => {
          res.json({
            message: err.message,
          });
        });
    } else {
      res.json({
        status: 400,
        message: "Missing userId",
      });
    }
  } else if (req.query.key !== process.env.API_KEY) {
    res.status(403).send("Invalid Api Key");
  } else {
    res.status(403).send("Api Key is required");
  }

  //   res.send("tasks");
};

const createTask = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.query.key === process.env.API_KEY) {
    const { title, striked, userId } = req.body;
    if ((title, striked, userId)) {
      const newTask = new Task({
        title,
        striked,
        userId,
      });

      newTask.save().then((data) => {
        res.json({
          status: 200,
          message: "Таск создан успешно",
          data: data,
        });
      });
    } else {
      res.json({
        status: 400,
        message: "Не хватает данных",
      });
    }
  } else if (req.query.key !== process.env.API_KEY) {
    res.status(403).send("Invalid Api Key");
  } else {
    res.status(403).send("Api Key is required");
  }
};

const updateTask = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { _id, title, striked } = req.body;
  if (req.query.key === process.env.API_KEY) {
    const updated = await Task.findByIdAndUpdate(
      _id,
      {
        title: title,
        striked: striked,
      },
      { new: true }
    );
    res
      .json({
        status: 200,
        response: "Task updated succesfull",
        data: updated,
      })
      .status(200);
  } else if (req.query.key !== process.env.API_KEY) {
    res.status(403).send("Invalid Api Key");
  } else {
    res.status(403).send("Api Key is required");
  }
};

const deleteTask = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.query.key === process.env.API_KEY) {
    if (req.query._id) {
      Task.findByIdAndDelete(req.query._id)
        .then((data) => {
          res
            .json({
              status: 200,
              message: "Task deleted succesfull",
              data: data,
            })
            .status(200);
        })
        .catch((err) => {
          res
            .json({
              status: 500,
              message: err.message,
            })
            .status(500);
        });
    } else {
      res
        .json({
          status: 400,
          message: "Task Id required",
        })
        .status(400);
    }
  } else if (req.query.key !== process.env.API_KEY) {
    res.status(403).send("Invalid Api Key");
  } else {
    res.status(403).send("Api Key is required");
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
