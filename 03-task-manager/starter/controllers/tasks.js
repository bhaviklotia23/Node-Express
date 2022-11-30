const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError("No task found"), 404);
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true
  });
  if (!task) {
    return next(createCustomError("No task found"), 404);
  }
  res.status(200).json({ task });
});

const DeleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError("No task found"), 404);
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  DeleteTask
};
