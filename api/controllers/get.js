import Task from "../models/task.js";

const getTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export default getTask;
