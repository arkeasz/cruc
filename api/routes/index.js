import express from "express";
import { updateTask, postTask, deleteTask, getTask } from "../controllers/index.js"

const router = express.Router();

router.get('/', getTask)

router.patch('/:id', updateTask)

router.post("/", postTask);

router.delete('/:id', deleteTask)

export default router;
