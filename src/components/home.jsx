import React, { useState } from "react";
import { useEffect, useContext } from "react";
import TodoContext from "../todoContext";
import { useNavigate } from "react-router-dom";
import ShowTodos from "./showTodos";
import "./home.css";

export default function Home() {
  const { user, addtodos, Gettodos, todos, Logout } = useContext(TodoContext);

  const navigate = useNavigate();
  //this function will be get all the updated todos of the current user

  //if component load first time
  useEffect(() => {
    //if user does not exixt
    if (!user) {
      navigate("/");
    } else {
      //otherwise fetch the data
      Gettodos();
    }
  }, []);

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  return (
    <div className="homes">
      <div className="main">
        <div className="mainhome">
          <h1 className="homeheader">Welcome {user && user.name}</h1>

          <button className="logout" onClick={Logout} >
            Logout
          </button>
          <br></br>

          <div className="home">
            <h3 className="header">Add Todo</h3>
            <input
              className="hometodo"
              onChange={(e) => setTitle(e.currentTarget.value)}
              value={Title}
              type="text"
              placeholder="Title"
            />
            <br />
            <br />
            <textarea
              className="textarea"
              placeholder="Description..."
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={Description}
            ></textarea>
            <br />
            <br />
            <button
              className="addbutten"
              onClick={() => {
                addtodos(Title, Description);
                setDescription("");
                setTitle("");
              }}
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          margin: 10,
          padding:10
          
        }}
      >
        {todos.map((item, index) => (
          <ShowTodos
            id={item._id}
            Title={item.Title}
            Description={item.Description}
            Completed={item.Complete}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
