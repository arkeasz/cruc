import express from "express";
import Task from "../models/task.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const {title, description, userId} = req.body;

        if (!title || !description)   {
            return res.status(400).json({ message: "Title and userId are required" });
        }
        const newTask = new Task({ title, description, userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) =>   {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router;
