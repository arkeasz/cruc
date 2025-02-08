import { useEffect, useState } from 'react'
import Task from '../Task';
import './index.css';
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

    console.log(API_URL)
    const addTask = async () => {
      if (!title || !description) return alert("Title and description are required");
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
        setData((prevData) => [...prevData, newTask])
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
        <div>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addTask}>➕ Agregar</button>
          </div>
          <div className='tasks'>
              {
                data.length === 0
                  ? (<p>No hay tareas disponibles</p>)
                  : (
                      data.map((task) => (
                          <Task
                            title={task.title}
                            description={task.description}
                            id={task._id}
                            onDelete={deleteTask}
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
