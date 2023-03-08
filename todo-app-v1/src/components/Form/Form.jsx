import React from "react";
// import { useState } from "react";

import styles from "./Form.module.css";

function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="task"> Il faut : </label>
        <input
          id="task"
          name="task"
          type="text"
          placeholder="ecrire une tache"
        />
      </div>
      <div>
        <button className={styles.button} type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export { Form };
