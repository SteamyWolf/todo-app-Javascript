const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv/config')

const port = process.env.PORT || 3000

//MIDDLEWARE: Functions that execute when routes are hit
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//ROUTES
const initialTodosRoutes = require('./backend/routes/InitialTodosRoutes');
app.use('/initialTodos', initialTodosRoutes);

const addedTodosRoutes = require('./backend/routes/addedTodosRoutes');
app.use('/addedTodos', addedTodosRoutes);



//CONNECTION TO DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true});

//LISTENING
app.listen(port, () => {
    console.log(`TODO App listening on port ${port}`)
})