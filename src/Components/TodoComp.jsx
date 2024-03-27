import React from "react";
import EditComp from "./EditComp";

const TodoComp = ({
  task,
  deleteHandler,
  updateHandler,
  editHandler,
  completeEdit,
}) => {
  return (
    <div className="todo">
      {task.isEdit ? (
        <EditComp
          title={task.title}
          description={task.description}
          id={task._id}
          completeEdit={completeEdit}
        />
      ) : (
        <div>
          <h4>{task?.title}</h4>
          <p>{task?.description}</p>
        </div>
      )}
      <div>
        {!task.isEdit && (
          <input
            onChange={() => updateHandler(task._id)}
            type="checkbox"
            checked={task.isCompleted}
          />
        )}
        {!task.isEdit && (
          <button onClick={() => deleteHandler(task._id)} className="btn">
            Delete
          </button>
        )}
        {!task.isEdit && (
          <button onClick={() => editHandler(task._id)} className="btn">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoComp;
