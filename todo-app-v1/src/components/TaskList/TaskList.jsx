
function TaskList({name,tasks}){
    return(
      <>
      <h2>{name}</h2>
      <ul>
        {name && tasks ? 
        (
          tasks.map((taskItem)=>{
          return (
          <li key={taskItem.id}> 
          <span>{taskItem.done? "done" : "X"}</span>
          {taskItem.task}</li>)
        })
        ) : 
        (null)}
      </ul>
    </>
    )
  }

  export {TaskList};