const express = require("express");
const { getAllTasks, createTask, getTask, DeleteTask, updateTask } = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).delete(DeleteTask).patch(updateTask)



module.exports = router;

// Library and package