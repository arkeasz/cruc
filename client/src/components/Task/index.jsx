import { useEffect, useState } from 'react';
import './index.css'

function Task({title, description, id, onDelete, onUpdate}) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title || '');
  const [newDescription, setNewDescription] = useState(description || '');

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
  }, [title, description]);

  const handleUpdate = () =>  {
    if (newTitle.trim() !== '' && newDescription.trim() !== ''){
      onUpdate(id, { title: newTitle, description: newDescription });
      setEditing(false)
    }
  };



  return (
    <>
      <div className='task'>
        <div className="info">
          <h3>{title}</h3>
          <p>
            {description}
          </p>
        </div>
        <div className="buttons">
          <button className='button' onClick={() => onDelete(id)}>🗑️ Delete</button>
          <button className='button' onClick={() => setEditing(true)}>Update</button>
        </div>
          {editing && (
          <div className="modal">
            <div className="modal-content">
              <h3>Task Edit</h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Task;
