import { useContext } from "react";
import { useState } from "react";
import TodoContext from "../todoContext";
import { Link } from "react-router-dom";
import "./signup.css";
import img from "./logo/img.jpg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inlineStyles = {
    textDecoration: "none",
  };

  const { signup } = useContext(TodoContext);

  return (
    <div className="mainlogin1">
      <div className="log2">
        <div>
          <img className="img3" src={img} />
        </div>
        <h1>SignUp</h1>
        <h1 className="line4"></h1>
        <br />
        <br />
        <div>
          <label>
            <input
            value={name}
              type="text"
              placeholder="Enter Full Name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>
        </div>
        <br></br>
        <div>
          <label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              
            />
          </label>
        </div>
        <br></br>
        <label>
          <input
          value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>

        <br></br>
        <div className="link5">
          <Link to="/" style={inlineStyles}>
            {" "}
            Already Have Account
          </Link>
        </div>
        <br />
        <br />

        <button onClick={() => {signup(name, email, password)
        ;setName("");setEmail("");setPassword("");}}>signup</button>

        <br></br>
      </div>
    </div>
  );
}

export default Signup;
