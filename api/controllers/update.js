import Task from "../models/task.js";

const updateTask = async (req, res) =>    {
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
};

export default updateTask
