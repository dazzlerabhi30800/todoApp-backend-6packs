import React from "react";

const TodoComp = ({ task, deleteHandler, updateHandler }) => {
  return (
    <div className="todo">
      <div>
        <h4>{task?.title}</h4>
        <p>{task?.description}</p>
      </div>
      <div>
        <input
          onChange={() => updateHandler(task._id)}
          type="checkbox"
          checked={task.isCompleted}
        />
        <button onClick={() => deleteHandler(task._id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoComp;
