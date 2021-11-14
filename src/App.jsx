import "./App.css";
import Header from "./Components/Header";
import { Todos } from "./Components/Todos";
import { AddTodo } from "./Components/AddTodo";
import { Footer } from "./Components/Footer";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./Components/About";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am on delete", todo);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.getItem("todos");
  };

  const addTodo = (title, description) => {
    let SNo;
    if (todos.length === 0) {
      SNo = 0;
    } else {
      SNo = todos[todos.length - 1].SNo + 1;
    }
    const myTodo = {
      SNo: SNo,
      title: title,
      description: description,
    };
    setTodos([...todos, myTodo]);
  };

  const [todos, setTodos] = useState([initTodo]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>
              );
            }}
          ></Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}
export default App;
