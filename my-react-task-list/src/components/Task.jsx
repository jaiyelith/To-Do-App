import './task.css'

function Task (tareas){
  const {name, status} = tareas;
  return (
    <div className='container'>
      <p className={`tareas ${status ? 'tareas-completadas' : 'tareas-incompletas'}`}>{name} </p>     
    </div>
  )
}

export default Task