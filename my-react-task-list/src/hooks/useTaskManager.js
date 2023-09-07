import { useState } from 'react';

export default function useTaskManager() {
  const [tasks, setTasks] = useState([]);
  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = !updatedTasks[index].status;
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
    setTasks(updatedTasks);
  };

  return {
    tasks,
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTask,
    setTasks,
  };
}