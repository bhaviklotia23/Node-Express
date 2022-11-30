// ---------------- // 1st step // ----------------------- //

const express = require("express");
const app = express();
const connectDb = require("./db/connect"); // ---- 2nd step
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error");

// ----------------------------------------

// ---------------- // 3rd step // ----------------------- //

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

// ---------------- // 2nd step // ----------------------- //
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
