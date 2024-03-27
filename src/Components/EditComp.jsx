import React, { useState } from "react";

const EditComp = ({ title, description, id, completeEdit }) => {
  const [editTitle, setEditTitle] = useState(title || "");
  const [desc, setDesc] = useState(description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await completeEdit(editTitle, desc, id);
    // console.log(completeEdit);
  };
  return (
    <form className="editForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button className="submitBtn">OK</button>
    </form>
  );
};

export default EditComp;
