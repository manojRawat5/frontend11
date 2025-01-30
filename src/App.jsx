import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ShowTodos from "./components/ShowTodos";
import Form from "./components/Form";
// "proxy": "http://localhost:5050",
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let data = await fetch("http://localhost:5050/todos/");
      let todos = await data.json();
      setData(todos);
    }
    fetchData();
  }, []);
  return (
    <>
      <Form data={data} setData={setData} />
      <ShowTodos data={data} setData={setData} />
    </>
  );
}

export default App;
