import Login from "./components/login";
import Signup from "./components/signup";
import "./App.css";
import TodoContext from "./todoContext";
import { Route, Routes, useNavigate } from "react-router-dom";

import ForgotPassword from "./components/otpFrom";
import ChangePassword from "./components/changePassword";


import Home from "./components/home";
import { useEffect, useState } from "react";

function App() {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);


  const login = (email, password) => {
    //try to login...

    fetch("https://todo-backend-m24s.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //id the login os success then we will store the state
        if (data.success == false) {
          alert(data.message);
        } else {
          setUser(data);
          //wewill store the data in local stoarage

          localStorage.setItem("userdata", JSON.stringify(data));

          Navigate("/Home");
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const signup = (name, email, password) => {
    fetch("https://todo-backend-m24s.onrender.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          alert("Verify Email");
          Navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log("error", err.message));
  };

  const addtodos = (Title, Description) => {
    fetch("https://todo-backend-m24s.onrender.com/todo/add-todo", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: user.Token,
      },
      body: JSON.stringify({
        Title,
        Description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert("Error While adding Todos" + data.message);
        } else {
          //if todo add successfully then show me updated todos
          Gettodos();
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const Gettodos = () => {
    //if user  not exixt so go back login page
    if (!user) return;

    fetch("https://todo-backend-m24s.onrender.com/todo/fetch-todo", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: user.Token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Error while fetching todos" + data.success);
        } else {
          setTodos(data.todos);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const DeleteTodo = (todoid) => {
    fetch(`https://todo-backend-m24s.onrender.com/todo/delete-todo/${todoid}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        Authorization: user.Token,
      },

    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Error while Delete todo" + data.success);
        } else {
          //todo delete sucessfully
          Gettodos();

        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const markComplete = (todoid) => {
    fetch(`https://todo-backend-m24s.onrender.com/todo/update-todo/${todoid}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        Authorization: user.Token,
      },
      body: JSON.stringify({ Complete: true }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.success == false) {
          alert("Error while Completed todo " + data.message);
        } else {

          Gettodos();
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const ForgetPassword = (email) => {

    fetch("https://todo-backend-m24s.onrender.com/auth/otp-send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          alert("Send Otp");
          Navigate("/change-password");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log("error", err.message));
  };

  const changePassword = (email, otpcode, password) => {

    fetch("https://todo-backend-m24s.onrender.com/auth/change-Password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        email, otpcode,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          alert("Password change successfully");
          Navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log("error", err.message));
  }








  //if user login in first time or reload the  then he cheack if your daitals in local storage and if they are change
  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      setUser(JSON.parse(localStorage.getItem("userdata")));
      Navigate("/Home");
    }
  }, []);

  //logout
  const Logout = () => {
    Navigate("/");
    localStorage.removeItem("userdata");
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      Gettodos();
    }
  }, [user]);

  return (
    <TodoContext.Provider
      value={{
        login,
        signup,
        user,
        addtodos,
        Gettodos,
        todos,
        DeleteTodo,
        markComplete,
        Logout,
        ForgetPassword,
        changePassword
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />

        <Route path="/Forget-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </TodoContext.Provider>
  );
}

export default App;
