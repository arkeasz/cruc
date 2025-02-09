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

router.patch('/:id', async (req, res) =>    {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedTask)   {
            return res.status(400).json({ message: "Task not found" });
        }

        res.json(updatedTask)
    } catch (err)   {
        res.status(500).json({ message: err.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const { title, description, userId, status = "pending", priority = "medium", tags = [] } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newTask = new Task({
            title,
            description,
            userId,
            status,
            priority,
            tags
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) =>   {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router;
