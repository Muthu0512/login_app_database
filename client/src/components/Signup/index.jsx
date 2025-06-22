import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import axios  from "axios"



const Signup=()=>{

    const [user,setUser]=useState({})
    const [err,setError]=useState()
    const navigate=useNavigate()

    const  handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(user)
        try {
            const response= await axios.post("http://localhost:5000/signup",user)

            if(response.status===201){
                
                setError("")
                navigate("/")
            }
            
        
        } catch (error) {
           let errMsg=error.response.data.message 
           setError(errMsg)
        }
        
        
    }

   
    return (
       <div className="signup">
        <h2 className="heading">Sign Up Page</h2>
        <form onSubmit={handleSubmit}  className="signup-form">
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" onChange={(e)=>setUser({...user,email: e.target.value})} /><br></br>
            <label htmlFor="password">Password :</label>
            <input type="password" id="password" onChange={(e)=>setUser({...user,password:e.target.value})} /><br></br>  
            <button type="submit" className="button">Submit</button>
        </form>

         {err && <h2 className="error">{err}</h2>}

        <p className="message"> if you are an already a user ........ <Link className="link" to={"/"}>Login</Link> </p>
       </div>
    )
}

export default Signup