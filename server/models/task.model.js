const mongoose = require('mongoose')

const Task = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required:true},
    dueDate: {type: Date, required:true},
    Assignees: {type: Array, required:true},
    priority: {type: Number, required:true},
    status: {type: Number, required:true},
    projectid: {type: String, required:true},
}, {collection: 'task-data'})

const model = mongoose.model('TaskData', Task)

module.exports = model