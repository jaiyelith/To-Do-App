import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useTaskManager from "../hooks/useTaskManager";
import Task from "./Task";
import "./Task.css";

function TaskList() {
  const {
    tasks,
    createTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
    setTasks,
  } = useTaskManager();
  const [taskName, setTaskName] = useState("");
  const [pendingTasks, setPendingTasks] = useState(0);

  const calculatePendingTasks = (taskList) => {
    return taskList.filter((task) => !task.status).length;
  };

  useEffect(() => {
    setPendingTasks(calculatePendingTasks(tasks));
  }, [tasks]);

  const handleTaskStatusChange = (index) => {
    updateTaskStatus(index);
    setPendingTasks(calculatePendingTasks(tasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      createTask({ name: taskName, status: false });
      setTaskName("");
    }
  };

  const handleDeleteTask = (index) => deleteTask(index);

  const handleUpdateTask = (index, updatedName) =>
    updateTask(index, { name: updatedName });

  const handleInputChange = (e) => setTaskName(e.target.value);

  const handleClearAll = () => {
    const completedTaskIndexes = tasks.reduce((indexes, task, index) => {
      if (task.status) indexes.push(index);
      return indexes;
    }, []);

    if (completedTaskIndexes.length > 0) {
      const updatedTasks = tasks.filter(
        (task, index) => !completedTaskIndexes.includes(index)
      );
      setTasks(updatedTasks); //
    }
  };

  return (
    <>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Añade una nueva tarea"
          value={taskName}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onStatusChange={() => handleTaskStatusChange(index)}
            onDelete={() => handleDeleteTask(index)}
            onUpdate={(updatedName) => handleUpdateTask(index, updatedName)}
          />
        ))}
      </ul>

      <p>Aún tienes {pendingTasks} tareas pendientes.</p>
      <div className="clear-container">
        <button onClick={handleClearAll}>Limpiar tareas completadas</button>
      </div>
    </>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  createTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
};

export default TaskList;