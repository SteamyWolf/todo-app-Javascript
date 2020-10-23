const express = require('express');
const router = express.Router();
const AddedTodo = require('../models/addedTodosModel');

//ENTERED: /addedTodos/

//ROUTES
router.get('/', async (req, res) => {
    try {
        const todos = await AddedTodo.find();
        res.json(todos);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    const todo = new AddedTodo({
        id: req.body.id,
        todo: req.body.todo,
        complete: req.body.complete,
        category: req.body.category
    })
    try {
        const todoSave = todo.save();
        res.json(todoSave)
    } catch (error) {
        console.log({message: 'Did not save correctly'})
    }
})

//EXPORT
module.exports = router;
