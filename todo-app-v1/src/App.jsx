import "./App.css";
import { FiTrash } from "react-icons/fi";
import React from "react";
import {Form} from  "./components/Form";
import { TaskList } from "./components/TaskList";



function App() {

  const [lists, setLists] = React.useState([])
   
 
  React.useEffect(()=>{
    async function getLists(){
      const listData = await Promise.resolve(
        [
          {
            id: 1,
            name: "shopping",
            todos: [
              {
                id: 1,
                task: "pain",
                done: true,
              },
              {
                id: 2,
                task: "soupe",
                done: false,
              },
              {
                id: 3,
                task: "yaourts",
                done: false,
              },
          ]}]
      ) 
      setLists(listData)
    }
    getLists();
  }, [])
  return (
    <>
      <div>
        <h1>TO DO LIST APP</h1>
      </div>
      <Form />
  
      <TaskList tasks={lists.length? lists[0].todos : null} name="Garance"/>
 
      </>
  );
}


export default App;

//components 

