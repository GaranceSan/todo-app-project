import React from "react";
// import { useState } from "react";

import styles from "./Form.module.css";

function Form({ handleSubmit, formErrors, taskFocus }) {
  console.log("formErrors in Form", formErrors);
  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <div className={styles.inputBox}>
        <label htmlFor="task"> Il faut : </label>
        <input
          id="task"
          name="task"
          type="text"
          required
          placeholder="ecrire une tache"
          onFocus={() => taskFocus()}
        />
        {formErrors.task.length ? (
          <ul>
            {formErrors.task.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
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
