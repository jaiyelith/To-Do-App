import { useState } from "react";
import PropTypes from "prop-types";
import "./task.css";

function Task({ task, onStatusChange, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name || "");
  const [originalTaskName, setOriginalTaskName] = useState(task.name || "");

  const handleCheckboxChange = () => onStatusChange();

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalTaskName(updatedTaskName);
  };

  const handleSaveClick = () => {
    if (updatedTaskName.trim() !== "") {
      onUpdate(updatedTaskName, task.description);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setUpdatedTaskName(originalTaskName);
    setIsEditing(false);
  };

  const handleInputChange = (e) => setUpdatedTaskName(e.target.value);

  const handleDeleteClick = () => {
    const confirmation = window.confirm(
      "Si eliminas esta tarea luego no podrás revertir esta acción. ¿Estás seguro?"
    );

    if (confirmation) {
      onDelete();
    }
  };

  return (
    <div className="task-container">
      <input
        type="checkbox"
        checked={task.status || false}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTaskName}
            onChange={handleInputChange}
            className="task-input"
            autoFocus
          />
          <button className="boton-guardar" onClick={handleSaveClick}>
            Guardar
          </button>
          <button className="boton-cancelar" onClick={handleCancelClick}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <p className={`task ${task.status ? "tareas-completadas" : ""}`}>
            {task.name || ""}
          </p>
          <button className="boton-editar" onClick={handleEditClick}>
            Editar
          </button>
          <button className="boton-cancelar" onClick={handleDeleteClick}>
            Eliminar
          </button>
        </>
      )}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;


  