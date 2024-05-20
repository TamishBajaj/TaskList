import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask, alert, setAlert }) => {
  const [taskName, setTaskName] = useState('');
  const [description,setDescription]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) {
      setAlert({ show: true, message: 'Please enter a task name', type: 'danger' });
      return;
    }
    addTask(taskName,description);
    setTaskName('');
  };

  return (
    <form className='taskForm' onSubmit={handleSubmit}>
      
      <h1>Task Manager</h1>

      <h2>Add a Task here</h2>
      <div className='formControl'>
        <input
          type="text"
          name="name"
          className='taskInput'
          placeholder="e.g. wash dishes"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          name="description"
          className='taskInput'
          placeholder="Give Description "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        <button type="submit" className='sbmt_btn'>Submit</button>
      </div>
      {alert.show && <div className='alert_btn'>{alert.message}</div>}
    </form>
  );
};

export default TaskForm;
