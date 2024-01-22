const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Read data from Excel file and store it in an array
const workbook = xlsx.readFile('TodoList.xlsx');  // Update to the correct file name
const sheetName = workbook.SheetNames[0];
const todosArray = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: ['id', 'user_id', 'Name', 'title', 'description'] });

// CRUD API

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todosArray);
});

// Get todo by id
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid id');
    }

    const todo = todosArray.find((item) => item.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Create new todo
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    newTodo.id = todosArray.length + 1;
    todosArray.push(newTodo);
    res.json(newTodo);
});

// Update todo by id
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid id');
    }

    const updatedTodo = req.body;
    const index = todosArray.findIndex((item) => item.id === id);

    if (index !== -1) {
        todosArray[index] = { ...todosArray[index], ...updatedTodo };
        res.json(todosArray[index]);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Delete todo by id
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid id');
    }

    const index = todosArray.findIndex((item) => item.id === id);

    if (index !== -1) {
        const deletedTodo = todosArray.splice(index, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
