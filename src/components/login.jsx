import TodoContext from "../todoContext";
import { useState } from "react";
import { useContext } from "react";
import "./login.css";

import img from "./logo/img.jpg"

import { Link } from "react-router-dom";




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(TodoContext);

  const handlesubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  const inlineStyles = {
    textDecoration: 'none',
    

  }

  return (
    <div className="mainlogin" >


      <div className="log">
        <div>
          <img className="img" src={img} />
        </div>
        <form onSubmit={handlesubmit}>
          <h1>Login</h1>
          <h1 className="line"></h1>
          <br />
          <br />

          <div className="input-container">
            <label>
              
          
                   <input

                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.currentTarget.value)}


              />
            </label>
          </div>

          <br />
          <label>
         
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

          </label>
          <br />

          <div className="link" >

            <Link to="/signup" style={inlineStyles}> Register Here</Link>
          </div>


          <br />
          <br />

          <input type="submit" value="Login" />
          <br></br>
        </form>
      </div>
    </div>
  );
}

export default Login;
