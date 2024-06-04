import { Routes, Route, NavLink } from "react-router-dom"
import './App.css'

const Home = () => {

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

const Proyects = () => {

  return (
    <div>
      <h1>Proyectos</h1>
    </div>
  )
}

function App() {

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/proyectos">Proyectos</NavLink></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/proyectos' element={<Proyects/>} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

export default App
