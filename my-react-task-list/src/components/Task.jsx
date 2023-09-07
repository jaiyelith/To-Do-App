import { useState } from "react";
import PropTypes from "prop-types";
import "./task.css";

function Task({ task, onStatusChange, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name || "");

  const handleCheckboxChange = () => onStatusChange();
  const handleDeleteClick = () => onDelete();
  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTaskName(task.name || "");
  };
  const handleSaveClick = () => {
    if (updatedTaskName.trim() !== "") {
      onUpdate(updatedTaskName);
      setIsEditing(false);
    }
  };
  const handleInputChange = (e) => setUpdatedTaskName(e.target.value);

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
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;