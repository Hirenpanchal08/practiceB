import { createContext, useContext, useEffect, useState } from "react";
import { fetchData, SendData } from "../Constant/api.js";

const TodoData = createContext();
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = async (text, priority = "low") => {
    const newTodo = {
      text,
      status: false,
      priority, // You can make this dynamic later
    };
    const res = await SendData("/task/create", newTodo);
    setTodos((prevTodos) => [...prevTodos, res.task]);
  };
  const toggleDone = async (index) => {
    try {
      // Temporarily update the UI
      const updatedTodos = todos.map((todo) =>
        todo._id === index ? { ...todo, status: !todo.status } : todo
      );
      setTodos(updatedTodos);

      // Send the status update to the server
      const res = await SendData(`/task/update/${index}`, {
        status: !todos.find((todo) => todo._id === index).status,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update todo status");
      }
      // If the update was successful, keep the changes
    } catch (error) {
      console.log("Error updating todo status:", error.message);
      // Optionally, you can revert the local state in case of an error
      const revertedTodos = todos.map((todo) =>
        todo._id === index ? { ...todo, status: !todo.status } : todo
      );
      setTodos(revertedTodos);
    }
  };
  const deleteTodo = async (index) => {
    try {
      const updatedTodos = todos.filter((todo) => todo._id !== index);
      setTodos(updatedTodos);
      const res = await fetchData(`/task/delete/${index}`);
      if (res.status !== 200) {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };
  const getTodos = async () => {
    const res = await fetchData("/task/tasks", {});
    setTodos(res.data);
  };

  console.log(todos);
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <TodoData.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        toggleDone,
        deleteTodo,
      }}
    >
      {children}
    </TodoData.Provider>
  );
};

export const useData = () => useContext(TodoData);
