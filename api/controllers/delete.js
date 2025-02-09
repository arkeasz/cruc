import Task from "../models/task.js";

const deleteTask = async (req, res) =>   {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default deleteTask;
