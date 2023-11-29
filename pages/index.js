import Complete from '@/components/Complete';
import UnComplete from '@/components/UnComplete';
import { useState, useEffect } from 'react';
import { createTask, getTasks , deleteTask , updateTask } from './api/api';

export default function Home() {
  const [completedTask, setCompletedTask] = useState([]);
  const [unCompletedTask, setUnCompletedTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTodo ,setCompletedTodo] = useState(false);

  const fetchTasks = async () => {
    const data = await getTasks();
    const notCompletedTodos = data?.uncompleted;
    const completedTodos = data?.completed;
    setCompletedTask(completedTodos);
    setUnCompletedTask(notCompletedTodos)
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;

    await createTask(newTask);
    setNewTask('');
    fetchTasks();
  };

  const handleDeleteTask = async (id, type) => {
    await deleteTask(id, type);
    fetchTasks();
  };

  const handleUpdateTask = async (id, type, sort) => {
    await updateTask(id, type, sort);
    fetchTasks();
  };

  const handleToggleCompleted = async (id, checkStatus, sortStatus ) => {
    const type = checkStatus ? "2" : "1";
    const sort = sortStatus ? true: false;
    console.log("checkStatus  , id , sort " ,type , id , sort )
    await updateTask(id, type, sort);
    fetchTasks();
  };


  return (
    <div style={{width:"800px"}}>
      <h1>Todo App</h1>
      <div >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{backgroundColor:"pink"}}
        />
        <button 
        style={{border:"2px solid blue" , borderRadius:"5px"}}
        onClick={handleAddTask}>Add Task</button>
      </div>
      <div style={{display: "flex" , justifyContent:'space-between'}}>

<div>
    <h4>Complete</h4>
  <ul>
  {completedTask?.map((task) => (
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
      </div>
    </div>
  );
}
