import './index.css'

function Task({title, description, id, onDelete}) {
    return (
      <>
        <div className='task'>
          <div className="info">
            <h3> {title} </h3>
            <p>
              {description}
            </p>
          </div>
          <div className="buttons">
            <button className='button' onClick={() => onDelete(id)}>🗑️ Delete</button>
            <button className='button'>⇧ Update</button>
          </div>
        </div>
      </>
    )
  }

export default Task
