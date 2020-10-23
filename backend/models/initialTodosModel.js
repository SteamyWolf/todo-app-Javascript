const mongoose = require('mongoose');

const initialSchema = mongoose.Schema({
    id: Number,
    todo: String,
    complete: Boolean,
    category: String
});

module.exports = mongoose.model('Todo', initialSchema, 'todos')