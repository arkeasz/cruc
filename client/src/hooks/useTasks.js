import { useEffect, useState } from 'react';
import { fetchTasks, addTask as addTaskApi, deleteTask as deleteTaskApi } from '../services/api';

export const useTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setData(tasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async () => {
    try {
      const newTask = await addTaskApi(title, description);
      setData((prevData) => [...prevData, newTask]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setData((prevData) => prevData.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return { data, loading, error, title, description, setTitle, setDescription, addTask, deleteTask };
};
