function FormTask({title, description, setTitle, setDescription, addTask}) {
    return (
        <>
            <form>
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
          </form>
        </>
    )

}

export default FormTask;
