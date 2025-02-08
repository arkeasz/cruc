import './index.css'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import Task from '../../components/Task';
// import API_URL from './data';

const API_URL = import.meta.env.VITE_API_URL;

function DataComponent()  {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Datos recibidos:", data.map((task) => task._id));

  return (
    <>
      <div>
        <h2>Lista de Productos</h2>
        <ul>
            {
              data.length === 0
                ? (<p>No hay tareas disponibles</p>)
                : (
                    data.map((task) => (
                        <Task
                          title={task.title}
                          description={task.description}
                          id={task._id}
                        />
                      )
                    )
                  )
           }
        </ul>
      </div>
    </>
  );
}


function Home() {
  return (
    <>
      <Header />
      <DataComponent/>
    </>
  )
}

export default Home
