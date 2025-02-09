import './index.css'

function FormTask({title, description, setTitle, setDescription, addTask}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask();
    };

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
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
                <button onClick={handleSubmit}>Post</button>
          </form>
        </>
    )

}

export default FormTask;
