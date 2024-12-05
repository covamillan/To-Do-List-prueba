import { useState } from "react";
import "./Item.scss";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleComplete: (id: number) => void;
  handleEditTodo: (id: number, currentText: string) => void;
  deleteTodo: (id: number) => void;
}

const Item = ({
  todo,
  toggleComplete,
  handleEditTodo,
  deleteTodo,
}: TodoItemProps) => {
  const [modifiersVisible, setModifiersVisible] = useState(false);

  const toggleModifiers = () => {
    setModifiersVisible(!modifiersVisible);
  };

  return (
    <div className="item-card">
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <div>
        <button className="checkbox" onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? "X" : "✓"}
        </button>
        <div
          className="modifiers"
          style={{
            width: modifiersVisible ? "5rem" : "0",
          }}
        >
          <button onClick={() => handleEditTodo(todo.id, todo.text)}>✎</button>
          <button onClick={() => deleteTodo(todo.id)}>🗑</button>
        </div>
        <button className="expander" onClick={toggleModifiers}>
          ...
        </button>
      </div>
    </div>
  );
};

export default Item;
