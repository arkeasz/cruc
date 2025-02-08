function Task({title, description, id}) {
    return (
      <>
        <div>
          <p className="title">
            {title}
          </p>
          <p>
            {description}
          </p>
      
        </div>
      </>
    )
  }

export default Task
