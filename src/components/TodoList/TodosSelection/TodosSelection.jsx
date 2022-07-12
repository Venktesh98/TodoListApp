import React from "react";

const TodosSelection = () => {
  return (
    <div>
      Status
      <select name="SelectPage" id="cars" onChange={handlePageOnChange}>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
    </div>
  );
};

export default TodosSelection;
