import React from 'react';
import {  deleteTask , updateTask} from "../pages/api/api.js"


const UnComplete = (props) => {
    const unCompletedTask = props?.unCompletedTask ;

    const handleDeleteTask = async (id, type) => {
        await deleteTask(id, type);
        fetchTasks();
      };
    
      const handleUpdateTask = async (id, type, sort) => {
        await updateTask(id, type, sort);
        fetchTasks();
      };

  return (
    <div>
    <h4> not complete</h4>
  <ul>
  {unCompletedTask?.map((task) => (
    <li key={task.id} style={{marginRight:"10px" , display:"flex" , justifyContent:"space-between"}}>
      {task.item}
      <div>
      <button 
      style={{backgroundColor:"red" , width: "50px"  , height:"20px" , borderRadius:"2px"}}
       onClick={() => handleDeleteTask(task.id, "2" , true)}>
        Delete
      </button>
      <button onClick={() => handleUpdateTask(task.id,task.item , task.todoStatu)}
      style={{backgroundColor:"green" , width: "50px"  , height:"20px" , borderRadius:"2px"}}
      >
        Update
      </button>
      <input
        type="checkbox"
        // checked={task.completed}
        checked={task.completDate == null? false : true}
        onChange={(e) => handleToggleCompleted(task.id , e.target.checked ,task.sort)}
      />          
      </div>
    </li>
  ))}
</ul>
  </div>
  )
}

export default UnComplete
