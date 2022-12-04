const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const Assignee = require("../models/assignees.model");
const { createUserJwt } = require("../utils/tokens");
const security = require("../utils/security");
const bcrypt = require("bcrypt");

router.post("/addNewTask", async (req, res, next) => {
  const addAssignees = (taskid) => {
    req.body.assignees.map(async (data) => {
      const respond = await Assignee.create({
        projectid: req.body.projectid,
        taskid: taskid,
        assigneeid: data.value,
        name: data.label,
      });
    });
    return true;
  };
  try {
    const respond = await Task.create({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      assignees: req.body.assignees,
      priority: req.body.priority,
      status: req.body.status,
      projectid: req.body.projectid,
    });
    const respond1 = await addAssignees(respond._id);
    console.log("new task added");
    if (respond1) {
      return res.status(200).json({ result: true });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/fetchTasks", async (req, res, next) => {
  try {
    const respond = await Task.find({
      projectid: req.body.projectid,
    });
    console.log("tasks are fetched");
    return res.status(200).json({ result: respond });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/fetchAssignees", async (req, res, next) => {
  try {
    const respond = await Assignee.find({
      $or: [
        {
          projectid: req.body.projectid,
          taskid: req.body.taskid,
        },
      ],
    });
    console.log("assignees are fetched");
    return res.status(200).json({ result: respond });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/changeStatus", async (req, res, next) => {
  try {
    const respond = await Task.updateOne(
      { _id: req.body.taskid },
      { $set: { status: req.body.status } }
    );
    console.log("status changed");
    if (respond) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/updateTaskDetails", async (req, res, next) => {
    const updateAssignees = async (taskid) => {
        const respond = await Assignee.deleteMany({_id: taskid})
        req.body.assignees.map(async (data) => {
          const respond = await Assignee.create({
            projectid: req.body.projectid,
            taskid: taskid,
            assigneeid: data.value,
            name: data.label,
          });
        });
        return true;
      };
  try {
    const respond = await Task.updateOne(
      { _id: req.body.taskid },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          dueDate: req.body.dueDate,
          priority: req.body.priority,
        },
      }
    );
    const respond1 = await updateAssignees(req.body.taskid)
    console.log("task updated");
    if (respond) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/deleteTask", async (req, res, next) => {
    try {
      const respond = await Task.deleteOne({_id: req.body.taskid})
      console.log("task deleted");
      if (respond) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  router.get("/fetchAllTasks", async (req, res, next) => {
    try {
      const respond = await Task.find();
      console.log("tasks are fetched (all)");
      return res.status(200).json({ result: respond });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });

  router.get("/fetchAllAssignees", async (req, res, next) => {
    try {
      const respond = await Assignee.find();
      console.log("assignees are fetched (all)");
      return res.status(200).json({ result: respond });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
