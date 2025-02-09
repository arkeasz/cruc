import Task from "../models/task.js";

const postTask = async (req, res) => {
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
}

export default postTask
