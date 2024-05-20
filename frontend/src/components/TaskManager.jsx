import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/tasks');
      setTasks(data.tasks);
    } catch (error) {
      setAlert({ show: true, message: 'There was an error, please try later.', type: 'danger' });
    }
    setLoading(false);
  };

  useEffect(() => {
    showTasks();
  }, []);

  const addTask = async (taskName,description) => {
    try {
      await axios.post('http://localhost:3000/api/v1/tasks', { name: taskName , description:description});
      showTasks();
      setAlert({ show: true, message: 'Success, task added', type: 'success' });
    } catch (error) {
      setAlert({ show: true, message: 'Error, please try again', type: 'danger' });
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      setAlert({ show: true, message: 'Error, please try again', type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <div className='container'>
      <TaskForm addTask={addTask} alert={alert} setAlert={setAlert} />
      {loading ? <p className='loadingText'>Loading...</p> : <TaskList tasks={tasks} deleteTask={deleteTask} />}
    </div>
  );
};

export default TaskManager;
