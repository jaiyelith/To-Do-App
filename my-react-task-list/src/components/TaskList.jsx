import Task from "./Task";
import { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([
    { name: "Hacer entregas de Ada", status: true },
    { name: "Pasear a firulais", status: false },
    { name: "Hacer mercado", status: true },
    { name: "Pagar recibos", status: false },
  ]);

  useEffect(() => {
    // Cargar tareas desde el localStorage al cargar la página
    const tareasGuardadas = JSON.parse(localStorage.getItem("tasks"));
    if (tareasGuardadas) {
      setTasks(tareasGuardadas);
    }
  }, []);

  useEffect(() => {
    // Almacenar tareas en el localStorage cada vez que cambien
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const handleTaskStatusChange = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, taskIndex) =>
        taskIndex === index ? { ...task, status: !task.status } : task
      )
    );
  };


  return (
    <>
      <div>
        <input type="text" placeholder="Añade una nueva tarea" />
        <button>+</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Task
              name={task.name}
              status={task.status}
              onStatusChange={() => handleTaskStatusChange(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
