// TodoCard.js

import React from "react";
import { Card, CardContent, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoCard({ todo, toggleTodoCompletion, deleteTodo }) {
  const handleToggleCompletion = () => {
    toggleTodoCompletion(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggleCompletion}
            color="primary"
          />
          <Typography
            variant="body1"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </Typography>
          <IconButton
            onClick={handleDeleteTodo}
            style={{ marginLeft: "auto" }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoCard;
