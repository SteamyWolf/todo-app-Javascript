const mongoose = require('mongoose');

const addedTodosSchema = mongoose.Schema({
    id: Number,
    todo: String,
    complete: Boolean,
    category: String
})

module.exports = mongoose.model('CompletedTodo', addedTodosSchema, 'completedTodos')