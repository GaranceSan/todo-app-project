import "./App.css";
import React from 'react';
import { FiTrash } from "react-icons/fi";
import {Form} from  "./components/Form";
import { TaskList } from "./components/TaskList";



function App() {

  const [todos, setTodos] = React.useState([])
   
 
  React.useEffect(()=>{
    async function getTodos(){
      const todosData = await Promise.resolve(
        [
              {
                id: 1,
                task: "acheter du pain",
                done: true,
                created: "01/09/2022",
              },
              {
                id: 2,
                task: "faire de la soupe",
                done: false,
                created:"03/03/2023",
              },
              {
                id: 3,
                task: " couper les arbres",
                done: false,
                created:"17/12/2022",
              },
          ]
      ) 
      setTodos(todosData)
    }
    getTodos();
  }, []) 

  //functions: 
  function toggleTodo(id){
    const newTodos = todos.map((todo) => {
      if (todo.id === id){
        const changedTodo = { 
          id: todo.id, 
          task: todo.task, 
          done: !todo.done, // change is happening here
          created: todo.created,
        }
        return changedTodo;
      } 
      return todo;
    })
    setTodos(newTodos)
  } //end of toggleTodo

  function deleteTodo(id){
    const deletedTodos = todos.filter((todo) => todo.id !== id );
    setTodos(deletedTodos) 
    }
  

  //JSX 
  return (
    <>
      <div>
        <h1>TO DO LIST APP</h1>
      </div>
      <Form />

      {todos.length?(
        todos.map(todo => {
          return <TodoItem 
            key={todo.id} 
            todoItem={todo} 
            toggleFn={toggleTodo} 
            deleteFn={deleteTodo}
          />
        })
      ):null}

 
      </>
  )}


export default App;

//components 

// create a new component called todo.item
function TodoItem({todoItem, toggleFn, deleteFn}){
  return(
  <li key={todoItem.id}> 
         
  <button onClick={()=> toggleFn(todoItem.id)}>{todoItem.done? "done" : "X"}</button>
  <span>{todoItem.created}</span>
  {todoItem.task}
 
  <button onClick={()=> deleteFn(todoItem.id)}><FiTrash/></button>
  </li>)

}

