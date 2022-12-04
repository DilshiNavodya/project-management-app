const mongoose = require('mongoose')

const Assignee = new mongoose.Schema({
    projectid: {type: String, required: true},
    taskid: {type: String, required: true},
    assigneeid: {type: String, required:true},
    name: {type: String, required:true},
}, {collection: 'assignee-data'})

const model = mongoose.model('AssigneeData', Assignee)

module.exports = model