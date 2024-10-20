const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000

 mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
    console.log('Connected to MongoDB');
 })
 .catch((err) => {
    console.error('Error connecting to MongoDB', err);
 });

 app.use(express.json());

 const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
 });

 const Todo = mongoose.model('Todo', todoSchema);

 app.post('/api/todo', async (req, res) => {
    try {
        const {text} = req.body;
        const todo = new Todo({ text, completed: false});
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create Todo'});
    }   
 });

app.get('/api/todo', async (req, res) => {
    try {
        const todo = await Todo.find();
        res.json(todo);
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve Todo'});
    }
});

app.put('/api/todo/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { text, completed } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { text, completed}, {new: true});
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update Todo'});
    }
});

app.delete('/api/todo/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete job'});
    }
});

 app.listen(port, () => {
    console.log(`Server is running is port ${port}`);
 });


