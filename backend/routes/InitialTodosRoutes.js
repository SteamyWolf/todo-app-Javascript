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
        await todo.save();
        const todos = await InitialTodo.find();
        res.json(todos)
    } catch (error) {
        console.log({message: 'Did not save correctly'})
    }
});

router.delete('/', async (req, res) => {
    try {
        const deletedTodo = await InitialTodo.findOneAndDelete({_id: req.body._id})
        res.json(deletedTodo)
    } catch (error) {
        console.log({message: error})
    }
})

//EXPORT
module.exports = router;
