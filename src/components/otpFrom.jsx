import React, { useState } from "react";
import { useContext } from "react";
import TodoContext from "../todoContext";
import { Link } from "react-router-dom";

import "./otpFrom.css"
const ForgotPassword = () => {
  const [email, setemail] = useState("");

  const { ForgetPassword } = useContext(TodoContext);


  const inlineStyles = {
    textDecoration: "none",
    color:"blue",
    
  

  };

  return (
    <div className="otpfrom">
      <div className="otpfrom1">
        <div className="forgetpassword">
          <h2>Forgot Password</h2>{" "}
        </div>
        <div>
          {" "}
          <input
          className="forgetinput"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setemail(e.target.value)} // Use onChange to update the state
          />
        </div>

        <div className="forget-email-submit">
          {" "}
          <button
          
            onClick={() => {
              ForgetPassword(email);
            }}
          >
            Submit
          </button>
        </div>
        <div className="link">
          {" "}
          <Link to={"/"} style={inlineStyles}>Back To Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
