import { Routes, Route, NavLink } from "react-router-dom"
import './App.css'
import Navbar from "./components/navbar/NavBar"
import Home from "./pages/home/Home"
import Games from "./pages/games/Games"
import Profile from "./pages/profile/Profile"
import { Detail } from "./pages/detail/Detail"
import Footer from "./components/footer/Footer"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/proyectos' element={<Games/>} />
        <Route path='/detalle/:id' element={<Detail/>} />
        <Route path='/admin' element={<Profile/>} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
