import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {

  return (
    <>
      <Header/>
      <TaskList/>
      <div>
        <p>Aun tienes 2 tareas sin completar</p>
        <button>Limpiar todo</button>
      </div>
    </>
  )
}

export default App
