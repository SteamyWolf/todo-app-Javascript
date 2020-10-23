const express = require('express');
const router = express.Router();
const InitialTodo = require('../models/initialTodosModel');

//ENTERED: /initialTodos/

//ROUTES
router.get('/', async (req, res) => {
    try {
        const todos = await InitialTodo.find();
        res.json(todos);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    const todo = new InitialTodo({
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
