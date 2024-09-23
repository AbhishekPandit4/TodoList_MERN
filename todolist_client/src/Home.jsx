import React, { useState } from "react";
import Crecat from "./Crecat";

export default function Home() {
  const [todo, setTodo] = useState("");
  return (
    <div>
      <h1>Todo List</h1>
      <Crecat />

      {todo.length === 0 ? (
        <div>
          <h2>No Reacord</h2>
        </div>
      ) : (
        todo.map((item) => {
          {
            item.todo;
          }
        })
      )}
    </div>
  );
}
