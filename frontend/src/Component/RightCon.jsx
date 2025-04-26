import React, { useState } from "react";
import { useData } from "../Context/TodoData";
// Define filter options
const filterOptions = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "inProgress" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];
const RightCon = () => {
  const { todos, toggleDone, deleteTodo } = useData();
  const [filter, setFilter] = useState("all"); // State to manage filter

  // Filter todos based on filter value
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.status === true;
    if (filter === "inProgress") return todo.status === false;
    if (filter === "high") return todo.priority === "high";
    if (filter === "medium") return todo.priority === "medium";
    if (filter === "low") return todo.priority === "low";
    return true; // "all" filter shows all todos
  });

  return (
    <div className="w-full md:w-2/2 h-full p-6 bg-gray-900 text-white rounded-lg shadow-lg overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Todo List</h2>
      <div className="mb-4 md:flex md:space-x-0 md:space-y-0 space-x-2 space-y-2 gap-4">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-md ${
              filter === option.value ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400">No tasks to display.</p>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition-all ${
                todo.status ? "bg-green-600" : "bg-gray-800"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold">{todo.title} </h3>
                <p className="text-sm text-slate-300">
                  {todo.status ? "Completed" : "In Progress"}
                </p>
              </div>
              <div className=" md:flex  gap-3 items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium   
                    ${todo.priority === "high" && "bg-red-500 text-white"} 
                    ${todo.priority === "medium" && "bg-yellow-500 text-white"}
                    ${todo.priority === "low" ? "bg-green-500" : ""}`}
                >
                  {todo.priority === "high"
                    ? "High"
                    : todo.priority === "medium"
                    ? "Medium"
                    : "Low"}
                </span>
                <button
                  className={`px-4 py-2 ${
                    !todo.status
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-800"
                  }  text-white rounded-md  active:scale-95 transition-all`}
                  onClick={() => toggleDone(todo._id)}
                >
                  {todo.status ? "Undo" : "Done"}
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:scale-95 transition-all"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RightCon;
