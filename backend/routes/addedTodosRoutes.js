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
});

router.delete('/', async (req, res) => {
    console.log('Here at router.deleted')
    console.log(req.body.id)
    try {
        let deleteAll = await AddedTodo.deleteMany({id: req.body.id});
        res.status(200).json({message: 'All were deleted with id: 1'})
    }
    catch (err) {
        console.log(err)
    }
})

//EXPORT
module.exports = router;
