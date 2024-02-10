import React, { useState, useContext } from "react";
import TodoContext from "../todoContext";
import { Link } from "react-router-dom";
import "./otpFrom.css"

const ChangePassword = () => {
  const [email, setemail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const { changePassword } = useContext(TodoContext);

  const handleSubmit = () => {
    changePassword(email, code, password);
  };

  const inlineStyles = {
    textDecoration: "none",
    color: "blue",
    padding: "10px",
  };

  return (
    <div className="otpfrom">
      <div className="otpfrom1">
        <div className="forgetpassword">
          <h2>Set Password</h2>
        </div>
        <div>
          <input
            value={email}
            type="email"
            placeholder="Enter Email"
            className="input"
            onChange={(e) => setemail(e.currentTarget.value)}
          />
        </div>
        <div>
          <input
            value={code}
            type="text"
            placeholder="Enter OTP"
            className="input"
            onChange={(e) => setCode(e.currentTarget.value)}
          />
        </div>
        <div>
          <input
            value={password}
            type="password"
            placeholder="Enter New Password"
            className="input"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="forget-email-submit">
          <button onClick={handleSubmit} className="button">
            Submit
          </button>
        </div>
        <div className="link">
          <Link to={"/Forget-password"} style={inlineStyles}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
