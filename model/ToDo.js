const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

//This is the Schema for ToDo List
const ToDoSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: false,
    },
    completed:{
        type: Boolean,
        default: false,
    }
}, 
{
    timestamps: true
});

//Exporting the Model/Schema
module.exports=Model('ToDo', ToDoSchema);