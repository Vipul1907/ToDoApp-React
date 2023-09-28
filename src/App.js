import './App.css'
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { AddCircle, Refresh } from "@mui/icons-material";
import TodoCard from "./ToDoCard";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []); // Load initial state from localStorage

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const todo = { text: newTodo, completed: false, id: Date.now() };
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? Date.now() : null,
          }
        : todo
    );

    // Separate completed and active todos
    const completedTodos = updatedTodos.filter((todo) => todo.completed);
    const activeTodos = updatedTodos.filter((todo) => !todo.completed);

    // Sort the completed todos by completion date (most recent on top)
    completedTodos.sort((a, b) =>
      a.completedAt > b.completedAt ? -1 : a.completedAt < b.completedAt ? 1 : 0
    );

    setTodos([...activeTodos, ...completedTodos]);
  };

  const resetTodos = () => {
    setTodos([]); // Clear all Todos
  };
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            TODO App
          </Typography>
          <IconButton
            color="primary"
            onClick={resetTodos}
            style={{ float: "right", marginTop: "-40px" }}
          >
            <Refresh />
          </IconButton>
          <TextField
            label="Add a new TODO"
            variant="outlined"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircle />}
            onClick={addTodo}
            style={{ marginTop: "10px" }}
          >
            Add
          </Button>
          <div>
            {todos.map((todo) => (
              <TodoCard
              key={todo.id}
              todo={todo}
              toggleTodoCompletion={toggleTodoCompletion}
              deleteTodo={deleteTodo} // Pass the deleteTodo function
            />
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
