function TaskStatistics({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pending = tasks.length - completed;

  return (
    <div className="card">
      <h3>Task Statistics</h3>
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {pending}</p>
    </div>
  );
}

export default TaskStatistics;