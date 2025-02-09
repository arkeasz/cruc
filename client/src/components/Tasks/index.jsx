import { useEffect, useState } from 'react'
import Task from '../Task';
import './index.css';
import FormTask from '../FormTask';
import { useTasks } from '../../hooks/useTasks';


function Tasks()  {
    const {
      data,
      error,
      loading,
      title,
      description,
      addTask,
      deleteTask,
      updateTask,
      setDescription,
      setTitle
    } = useTasks();

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
