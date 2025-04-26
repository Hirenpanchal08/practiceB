import React, { useState } from "react";
import { useData } from "../Context/TodoData";

const LeftCon = () => {
  const { addTodo } = useData();
  const [todoInput, setTodoInput] = useState("");
  const [priority, setPriority] = useState("low"); // State for managing priority
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      setIsSubmitting(true); // Set loading state to true
      try {
        await addTodo(todoInput, priority); // Call the callback with both title and priority
        setTodoInput(""); // Clear input after submission
        setPriority("low"); // Reset priority to low after submission
      } catch (error) {
        console.error("Error creating todo:", error);
      } finally {
        setIsSubmitting(false); // Reset the loading state
      }
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
      bg-gray-800 
      ${isMenuOpen ? "block" : "hidden"} 
      md:block 
      md:w-1/4 w-full 
      h-full 
      rounded-lg 
      shadow-lg 
      p-6
    `}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-white">
            Create a New Todo
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Todo Input Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="todoInput" className="text-white text-lg">
                Task
              </label>
              <input
                id="todoInput"
                className="px-3 py-2 rounded-md text-md bg-gray-200 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your task..."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                required
              />
            </div>

            {/* Priority Selector */}
            <div className="flex flex-col gap-2">
              <label htmlFor="priority" className="text-white text-lg">
                Priority
              </label>
              <select
                id="priority"
                className="bg-gray-200 rounded-md p-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full py-3 ${
                isSubmitting ? "bg-gray-400" : "bg-blue-600"
              } text-white font-medium text-md rounded-md hover:bg-blue-700 active:scale-95 transition-all`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Todo"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LeftCon;
