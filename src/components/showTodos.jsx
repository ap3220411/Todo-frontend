import { React, useContext } from "react";
import TodoContext from "../todoContext";
import "./showtodos.css";

export default function ShowTodos({ Title, Description, Completed, id }) {
  const { DeleteTodo, markComplete } = useContext(TodoContext);

  return (
    <div className="gettodo">
     <br></br>
      <h3 className="title">{Title}</h3>
      <br></br>
      <p className="discription">{Description}</p>
      <br></br>
      <p>
        <span className="status">Status:</span>
        {Completed == true ? "Completed" : "Pending"}
      </p>
      <div >
        <div className="mainbutton">
          <button
            className="getbutten"
            onClick={() => {
              DeleteTodo(id);
            }}
          >
            Delete
          </button>
        </div>
        <div>
          {Completed == false ? (
            <button
              className="getbutten"
              onClick={() => {
                markComplete(id);
              }}
            >
              Mark As Complete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
