import React, { useEffect, useRef, useState } from "react";
import "./showTodos.css";

const showTodos = ({ data, setData }) => {
  const [form, setForm] = useState(false);
  let title = useRef("");
    let description = useRef("");
    let dueDate = useRef("");
    let priority = useRef("");
    let status = useRef('')
  
    async function handleSubmit(e) {
      e.preventDefault();
      let obj = {
        title: title.current.value,
        description: description.current.value,
        dueDate: dueDate.current.value,
        priority: priority.current.value,
        status:status.current.value
      };
      try {
        const response = await fetch(`http://localhost:5050/todos/update/${form}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
          let data = await fetch("http://localhost:5050/todos/");
          let todos = await data.json();
          setData(todos);
          title.current.value = ''
          description.current.value = ''
          dueDate.current.value = ''
          priority.current.value = ''
          status.current.value = ''
          setForm(false)
      } catch (err) {
        console.log("found error");
      }
    }

  async function handleDelete(id) {
    try {
      let call = await fetch(`http://localhost:5050/todos/delete/${id}`, {
        method: "DELETE",
      });
      let data = await fetch("http://localhost:5050/todos/");
      let todos = await data.json();
      setData(todos);
    } catch (err) {
      console.log("error");
    }
  }

  function handleEdit(id) {
    setForm(id)
  }



  return (
    <>
      <div className="container">
        {data.map((ele) => (
          <div key={ele._id} className="box">
            <h3>{ele.title}</h3>
            <h3>{ele.description}</h3>
            <h4>{ele.status}</h4>
            <h4>{ele.dueDate}</h4>
            <h4>{ele.priority}</h4>
            <button onClick={() => handleEdit(ele._id)}>Edit</button>
            <button onClick={() => handleDelete(ele._id)}>Delete</button>
            {form == ele._id &&  (
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
                <label htmlFor="">Choose Status :</label>
                <select ref={status} name="" id="">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <input type="submit" value="Submit" />
              </form>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default showTodos;
