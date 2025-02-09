import { useEffect, useState } from 'react'
import Task from '../Task';
import './index.css';
import FormTask from '../FormTask';
const API_URL = import.meta.env.VITE_API_URL;

function Tasks()  {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      };

      fetchData()
    }, []);

    const addTask = async () => {
      if (!title) return;
      try {
        const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description })
        });

        if (!response.ok)  {
          throw new Error("Error to post task");
        }
        const newTask = await response.json();

        setData((prevData) => {
          const exists = prevData.some((task) => task._id === newTask._id);
          return exists ? prevData : [...prevData, newTask];
        });
        setTitle("");
        setDescription("");
      } catch (err) {
        console.log("Error:", err)
      }
    };

    const deleteTask = async (id) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar la tarea");
        }

        setData((prevData) => prevData.filter((task) => task._id !== id));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const updateTask = async (id, updateData) =>  {
      try {
        const response = await fetch(`${API_URL}/${id}`,  {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updateData)
        });

        if (!response.ok) {
          throw new Error("Error al actualizar la tarea");
        }

        const updTask = await response.json();
        setData(prevData =>
          prevData.map(task =>
            task._id === id ? { ...task, ...updateData } : task
          )
        );
      } catch (err) {
        console.error("Error", err.message)
      }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
        <div className='section-tasks'>
          <FormTask
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            addTask={addTask}
          />
          <div className='tasks'>
              {
                data.length === 0
                  ? (<p className='dtask'>No hay tareas disponibles</p>)
                  : (
                      data.slice().reverse().map((task) => (
                        task &&
                          <Task
                            key={task._id}
                            title={task.title}
                            description={task.description}
                            id={task._id}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                          />
                        )
                      )
                    )
             }
          </div>
        </div>
      </>
    );
  }

export default Tasks;
