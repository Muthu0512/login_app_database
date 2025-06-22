import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({handleLogin}) => {
    const navigate=useNavigate()
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/login?email=${user.email}&password=${user.password}`;
    try {
      const response = await axios.get(url);
      console.log(response);
      console.log(user);

      if (response.status === 200) {
        setError(response.data.message);
        handleLogin()
        navigate("/home")
      }
    } catch (error) {
      const errMsg = error.response.data.message;
      setError(errMsg);
    }
  };
  return (
    <div className="login">
      <h2 className="heading">Login Page</h2>
      <form onSubmit={handleSubmit}  >
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br></br>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br></br>
        <button className="button" type="submit">Submit</button>
      </form>

      {error && <h2 className="error">{error}</h2>}

      <p className="message">
        don't have an account? <Link className="link" to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
