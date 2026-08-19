const BASE_URL = "http://localhost:5000";

// GET all tasks
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return await response.json();
};

// CREATE a new task
export const createTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
};

// UPDATE a task
export const updateTask = async (id, task) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
};

// DELETE a task
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return await response.json();
};