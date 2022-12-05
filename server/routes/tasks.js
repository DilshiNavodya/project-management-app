const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const Assignee = require("../models/assignees.model");
const security = require("../utils/security");

router.post("/addNewTask",security.requireAuthorizedUser, async (req, res, next) => {
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
    if (respond1) {
      return res.status(200).json({ result: true });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/fetchTasks",security.requireAuthorizedUser, async (req, res, next) => {
  try {
    const respond = await Task.find({
      projectid: req.body.projectid,
    });
    return res.status(200).json({ result: respond });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/fetchAssignees",security.requireAuthorizedUser, async (req, res, next) => {
  try {
    const respond = await Assignee.find({
      $or: [
        {
          projectid: req.body.projectid,
          taskid: req.body.taskid,
        },
      ],
    });
    return res.status(200).json({ result: respond });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/changeStatus",security.requireAuthorizedUser, async (req, res, next) => {
  try {
    const respond = await Task.updateOne(
      { _id: req.body.taskid },
      { $set: { status: req.body.status } }
    );
    if (respond) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/updateTaskDetails",security.requireAuthorizedUser, async (req, res, next) => {
    const updateAssignees = async (taskid) => {
      let respond
        if(req.body.assignees) {
          respond = await Assignee.deleteMany({taskid: taskid})
        }
        if(respond) {
          req.body.assignees.map(async (data) => {
            const respond = await Assignee.create({
              projectid: req.body.projectid,
              taskid: taskid,
              assigneeid: data.value,
              name: data.label,
            });
          });
          return true;
        } else {
          return false
        }
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
    
    if (respond && respond1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    return res.status(200).json({ result: false });
  }
});

router.post("/deleteTask",security.requireAuthorizedUser, async (req, res, next) => {
    try {
      const respond = await Task.deleteOne({_id: req.body.taskid})
      if (respond) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  router.get("/fetchAllTasks",security.requireAuthorizedUser, async (req, res, next) => {
    try {
      const respond = await Task.find();
      return res.status(200).json({ result: respond });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });

  router.get("/fetchAllAssignees",security.requireAuthorizedUser, async (req, res, next) => {
    try {
      const respond = await Assignee.find();
      return res.status(200).json({ result: respond });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
