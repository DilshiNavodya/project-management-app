const mongoose = require('mongoose')

const Project = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required:true},
}, {collection: 'project-data'})

const model = mongoose.model('ProjectData', Project)

module.exports = model