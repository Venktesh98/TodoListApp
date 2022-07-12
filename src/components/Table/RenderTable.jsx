import "./RenderTable.css";

import React from "react";

const RenderTable = ({ todoData }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
        {todoData?.map((todoItem, index) => (
          <tr key={index}>
            <td>{todoItem.todoName}</td>
            <td>{todoItem.todoDesc}</td>
            <td>{todoItem.todoStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RenderTable;
