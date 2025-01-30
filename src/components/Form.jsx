import React, { useRef } from "react";
import "./form.css";

const Form = ({ data, setData }) => {
  let title = useRef("");
  let description = useRef("");
  let dueDate = useRef("");
  let priority = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();
    let obj = {
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
      priority: priority.current.value,
    };
    try {
      const response = await fetch("http://localhost:5050/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        let data = await fetch("http://localhost:5050/todos/");
        let todos = await data.json();
        setData(todos);
        title.current.value = ''
        description.current.value = ''
        dueDate.current.value = ''
        priority.current.value = ''
      }
    } catch (err) {
      console.log("found error");
    }
  }
  return (
    <div className="formbox">
      <form action="" className="form" onSubmit={handleSubmit}>
        <label htmlFor="">Title :</label>
        <input
          ref={title}
          type="text"
          placeholder="Enter Todo Title"
          required
        />
        <label htmlFor="">Description :</label>
        <input
          ref={description}
          type="text"
          placeholder="Enter Todo Description"
          required
        />
        <label htmlFor="">DueDate :</label>
        <input
          ref={dueDate}
          type="date"
          placeholder="Enter Todo Date"
          required
        />
        <label htmlFor="">Choose Priority :</label>
        <select ref={priority} name="" id="">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
