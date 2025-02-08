import './index.css'

function Task({title, description, id, onDelete}) {
    return (
      <>
        <div className='task'>
          <h3> {title} </h3>
          <p>
            {description}
          </p>
          <button onClick={() => onDelete(id)}>🗑️ Delete</button>
          <button>⇧ Update</button>
        </div>
      </>
    )
  }

export default Task
