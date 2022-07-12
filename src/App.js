import { useState } from "react";
import "./App.css";
import Todos from "./components/TodoList/Todos/Todos";
import About from "./components/TodoList/About/About";

function App() {
  const [selectPage, setSelectPage] = useState("");

  const handlePageOnChange = (event) => {
    const { name, value } = event.target;

    setSelectPage({
      ...selectPage,
      [name]: value,
    });
  };

  console.log("Page:", selectPage);
  return (
    <div>
      Select Page
      <select name="SelectPage" id="cars" onChange={handlePageOnChange}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      {selectPage.SelectPage === "private" ? <Todos /> : <About />}
    </div>
  );
}

export default App;
