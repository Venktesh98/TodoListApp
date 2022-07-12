import React, { useState } from "react";
import RenderTable from "../../Table/RenderTable";
import "./Todos.css";

const initialTodoValues = {
  todoName: "",
  todoDesc: "",
  todoStatus: "completed",
};

const Todos = () => {
  const [values, setValues] = useState(initialTodoValues);
  const [todoData, setTodoData] = useState([]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event, todoValues) => {
    event.preventDefault();
    console.log("In handle Submit", todoValues);
    setTodoData([...todoData, todoValues]);
  };
  console.log("todoData:", todoData);

  return (
    <div className="todo">
      <div className="todo-form">
        <form
          onSubmit={(event) => handleSubmit(event, values)}
          className="todo-submit-form"
        >
          <div className="todo-items">
            Name
            <input type="text" onChange={handleOnChange} name="todoName" />
          </div>
          <div className="todo-items">
            Description
            <input type="text" onChange={handleOnChange} name="todoDesc" />
          </div>
          <div className="todo-items">
            Status
            <select name="todoStatus" id="cars" onChange={handleOnChange}>
              <option value={values.todoStatus}>Completed</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>

      <RenderTable todoData={todoData} />
    </div>
  );
};

export default Todos;
