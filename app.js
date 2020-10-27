const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv/config')
const initialTodosRoutes = require('./backend/routes/InitialTodosRoutes');
const addedTodosRoutes = require('./backend/routes/addedTodosRoutes');



const port = process.env.PORT || 3000
app.use(cors());

//MIDDLEWARE: Functions that execute when routes are hit

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//ROUTES
app.get('/hi', (req, res) => {
    res.send('Working?')
})
app.use('/initialTodos', initialTodosRoutes);

app.use('/addedTodos', addedTodosRoutes);


//CONNECTION TO DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true});

//LISTENING
app.listen(port, () => {
    console.log(`TODO App listening on port ${port}`)
})