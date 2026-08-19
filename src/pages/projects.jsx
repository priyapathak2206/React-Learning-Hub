import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api";

function Projects() {
  // Task list
  const [tasks, setTasks] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast message
  const [message, setMessage] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Create / Update loading state
  const [saving, setSaving] = useState(false);

  // Delete loading state
  const [deletingId, setDeletingId] = useState(null);

  // Currently editing task
  const [editingTaskId, setEditingTaskId] = useState(null);

  // --------------------------------------------------
  // LOAD TASKS
  // --------------------------------------------------

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTasks();

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // --------------------------------------------------
  // SHOW TOAST MESSAGE
  // --------------------------------------------------

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // --------------------------------------------------
  // CREATE / UPDATE TASK
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      setError("Task title is required");
      showMessage("❌ Please enter a task title");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // ------------------------------------------------
      // UPDATE TASK
      // ------------------------------------------------

      if (editingTaskId) {
        const currentTask = tasks.find(
          (task) => task._id === editingTaskId
        );

        const updatedTask = await updateTask(editingTaskId, {
          title: title.trim(),
          description: description.trim(),
          completed: currentTask?.completed || false,
        });

        // Update task in React state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTaskId
              ? updatedTask
              : task
          )
        );

        // Exit edit mode
        setEditingTaskId(null);

        // Clear form
        setTitle("");
        setDescription("");

        // Success toast
        showMessage("✅ Task updated successfully!");
      }

      // ------------------------------------------------
      // CREATE TASK
      // ------------------------------------------------

      else {
        const newTask = await createTask({
          title: title.trim(),
          description: description.trim(),
        });

        // Add new task to React state
        setTasks((prevTasks) => [
          ...prevTasks,
          newTask,
        ]);

        // Clear form
        setTitle("");
        setDescription("");

        // Success toast
        showMessage("✅ Task created successfully!");
      }
    } catch (err) {
      setError(err.message);

      // Error toast
      showMessage("❌ Operation failed");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // EDIT TASK
  // --------------------------------------------------

  const handleEdit = (task) => {
    setEditingTaskId(task._id);

    setTitle(task.title);

    setDescription(task.description);

    setError(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // CANCEL EDIT
  // --------------------------------------------------

  const handleCancelEdit = () => {
    setEditingTaskId(null);

    setTitle("");

    setDescription("");

    setError(null);
  };

  // --------------------------------------------------
  // DELETE TASK
  // --------------------------------------------------

  const handleDelete = async (id) => {
    // Confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    // User clicked Cancel
    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError(null);

      // Delete from backend
      await deleteTask(id);

      // Remove from React state
      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );

      // Success toast
      showMessage("✅ Task deleted successfully!");
    } catch (err) {
      setError(err.message);

      // Error toast
      showMessage("❌ Failed to delete task");
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // INITIAL LOADING
  // --------------------------------------------------

  if (loading) {
    return <Spinner />;
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div style={{ padding: "20px" }}>

      {/* PAGE TITLE */}

      <h1>Task Manager</h1>

      {/* ------------------------------------------------
          TOAST NOTIFICATION
      ------------------------------------------------ */}

      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#333",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            fontSize: "15px",
          }}
        >
          {message}
        </div>
      )}

      {/* ------------------------------------------------
          ERROR MESSAGE
      ------------------------------------------------ */}

      {error && (
        <ErrorMessage message={error} />
      )}

      {/* ------------------------------------------------
          CREATE / UPDATE FORM
      ------------------------------------------------ */}

      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >

        <h2>
          {editingTaskId
            ? "Update Task"
            : "Add New Task"}
        </h2>

        {/* TITLE */}

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        {/* DESCRIPTION */}

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: saving
              ? "not-allowed"
              : "pointer",
          }}
        >
          {saving
            ? "Saving..."
            : editingTaskId
            ? "Update Task"
            : "Add Task"}
        </button>

        {/* CANCEL BUTTON */}

        {editingTaskId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ------------------------------------------------
          TASK LIST
      ------------------------------------------------ */}

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid gray",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "8px",
            }}
          >

            {/* TASK TITLE */}

            <h3>{task.title}</h3>

            {/* TASK DESCRIPTION */}

            <p>
              {task.description}
            </p>

            {/* TASK STATUS */}

            <p>
              Status:{" "}
              {task.completed
                ? "Completed"
                : "Pending"}
            </p>

            {/* EDIT BUTTON */}

            <button
              onClick={() =>
                handleEdit(task)
              }
              style={{
                padding: "8px 15px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            {/* DELETE BUTTON */}

            <button
              onClick={() =>
                handleDelete(task._id)
              }
              disabled={
                deletingId === task._id
              }
              style={{
                padding: "8px 15px",
                cursor:
                  deletingId === task._id
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {deletingId === task._id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;