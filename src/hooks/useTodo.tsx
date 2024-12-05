import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function useTodos() {
  const storedTodos = localStorage.getItem("todos");
  const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    updateTodo,
  };
}

export default useTodos;
