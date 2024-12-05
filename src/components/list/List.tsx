import { FormEvent, useState } from "react";
import Filter from "../filter/Filter";
import useTodos from "../../hooks/useTodo";
import { AnimatePresence, motion } from "framer-motion";
import Item from "../item/Item";
import "./List.scss";
import { Header } from "../header/Header";

const List = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();

  const [input, setInput] = useState<string>("");
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);

  const [searchText, setSearchText] = useState<string>("");
  const [filterValue, setFilterValue] = useState<
    "all" | "completed" | "not completed"
  >("all");
  const handleEditTodo = (id: number, currentText: string) => {
    setCurrentItemId(id);
    setInput(currentText);
  };

  const handleAddOrUpdateTodo = (event: FormEvent) => {
    event.preventDefault();
    if (currentItemId !== null) {
      updateTodo(currentItemId, input);
      setCurrentItemId(null);
    } else {
      addTodo(input);
    }
    setInput("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterValue === "completed" && !todo.completed) return false;
    if (filterValue === "not completed" && todo.completed) return false;
    if (
      searchText &&
      !todo.text.toLowerCase().includes(searchText.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <main className="list">
      <section className="about">
        <Header />
        <section className="separator-mobile" />
        <div className="scroll-container">
          <p>
            Hi! My name is
            <a
              href="https://www.linkedin.com/in/covadongamillangutierrez/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <></> Covadonga Millán.
            </a>
          </p>
          <p>
            You can add a new task or modify it later by clicking the edit
            button.
          </p>
          <form onSubmit={handleAddOrUpdateTodo}>
            <input
              type="text"
              required
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                currentItemId !== null ? "Edit todo" : "Add a new task"
              }
            />
            <button type="submit">
              {currentItemId !== null ? "Update" : "Add"}
            </button>
          </form>
          <p>
            You can also filter by text or view only completed or incomplete
            tasks.
          </p>
          <Filter
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      </section>
      <section className="separator" />
      <section className="items">
        {filteredTodos.length > 0 ? (
          <ul>
            {filteredTodos.map((todo) => (
              <AnimatePresence mode="popLayout">
                <motion.li
                  className="item"
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, x: -400, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <Item
                    todo={todo}
                    toggleComplete={toggleComplete}
                    handleEditTodo={handleEditTodo}
                    deleteTodo={deleteTodo}
                  />
                </motion.li>
              </AnimatePresence>
            ))}
          </ul>
        ) : (
          <p>There are no tasks here yet, feel free to add one!</p>
        )}
      </section>
    </main>
  );
};

export default List;
