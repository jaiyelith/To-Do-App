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
    setTasks,
  } = useTaskManager();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [pendingTasks, setPendingTasks] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const calculatePendingTasks = (taskList) => {
    return taskList.filter((task) => !task.status).length;
  };

  useEffect(() => {
    setPendingTasks(calculatePendingTasks(tasks));
  }, [tasks]);

  const handleTaskStatusChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = !updatedTasks[index].status;
    setTasks(updatedTasks);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (taskName.trim().length < 3) {
      setErrorMessage("Solo puedes añadir tareas mayores a 3 caracteres");
      return;
    }
    setErrorMessage("");

    createTask({
      name: taskName,
      status: false,
      description: taskDescription,
    });
    setTaskName("");
    setTaskDescription("");
  };

  const handleDeleteTask = (index) => deleteTask(index);

  const handleUpdateTask = (index, updatedName, updatedDescription) =>
    updateTask(index, { name: updatedName, description: updatedDescription });

  const handleDescriptionChange = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].description = e.target.value;
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    const completedTaskIndexes = tasks.reduce((indexes, task, index) => {
      if (task.status) indexes.push(index);
      return indexes;
    }, []);

    if (completedTaskIndexes.length > 0) {
      const updatedTasks = tasks.filter((task, index) => !completedTaskIndexes.includes(index));
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Añade una nueva tarea"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Task
              task={task}
              onStatusChange={() => handleTaskStatusChange(index)}
              onDelete={() => handleDeleteTask(index)}
              onUpdate={(updatedName) =>
                handleUpdateTask(index, updatedName, task.description)
              }
            />
            <textarea
              rows="4"
              cols="50"
              value={task.description}
              onChange={(e) => handleDescriptionChange(e, index)}
              placeholder="Descripción (opcional)"
            ></textarea>
          </li>
        ))}
      </ul>
      <p>Aún tienes {pendingTasks} tareas pendientes.</p>
      <div className="clear-container">
        <button  className="limpiar-tareas" onClick={handleClearAll}>Limpiar tareas completadas</button>
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


