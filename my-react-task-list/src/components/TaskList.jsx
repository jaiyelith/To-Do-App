import Task from "./Task";
import { useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([
    { name: "Hacer entregas de Ada", status: true },
    { name: "Pasear a firulais", status: false },
    { name: "Hacer mercado", status: true },
    { name: "Pagar recibos", status: false },
  ]);

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
