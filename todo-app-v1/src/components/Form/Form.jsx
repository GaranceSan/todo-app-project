import React from "react";
import { useState } from "react";

import styles from "./Form.module.css"


function Form () {
    const [task,setTask] = useState("");
    // console.log(task)
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  return (
    <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="task"> Il faut : </label>
            <input 
              id="task"
              name="task" 
              type="text" 
              placeholder="ecrire une tache" 
              value={task}
              onChange={(e)=> setTask(e.currentTarget.value)}
              />
          </div>
          <div>
            <button className={styles.button} type="submit">Submit</button>
          </div>
        </form>
    )
  };

  



  export {Form};