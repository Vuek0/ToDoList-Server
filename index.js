const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoute = require("./routes/task-route");
const userRoute = require("./routes/user-route");
require("dotenv").config();
const db = `mongodb+srv://admin:${process.env.DB_PASSWORD}@medicaldb.nlxa1z5.mongodb.net/ToDoList`;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/api", taskRoute);
app.use("/api", userRoute);
mongoose.set("strictQuery", false);
mongoose
  .connect(db)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
