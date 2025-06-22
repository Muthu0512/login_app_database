import {React} from "react"
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import Login from "./components/Login"
import InvalidPage from "./components/InvalidPage"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Noaccess from "./components/Noaccess"
import { useState } from "react"
import "./App.css"


const App=()=>{
  const [isLogged,setIsLogged]=useState(false)

  const handleLogin=()=>{
    setIsLogged(true)
  }
  return(
    

   <BrowserRouter>

   <nav className="navbar">
    <Link className="link" to="/">Login</Link>|
    <Link className="link" to="/signup">Sign Up</Link>
   </nav>
   <Routes>
    <Route path="/" element={<Login handleLogin={handleLogin}></Login>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/home" element={isLogged?<Home></Home>:<Noaccess></Noaccess>}></Route>
    <Route path="*" element={<InvalidPage></InvalidPage>}></Route>
   </Routes>
   </BrowserRouter>
  )
}
export default App