import React from "react";
import LeftCon from "./LeftCon";
import RightCon from "./RightCon";

const TodoContainer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-1 p-1 w-full h-screen">
      <LeftCon />
      <RightCon />
    </div>
  );
};

export default TodoContainer;
