const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const addTask = async (title, description) => {
    if (!title) return;
    if (!description) "";
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok)  {
        throw new Error("Error to post task");
      }

      return await response.json();
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
};

export const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
};
