import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTask.css';

import imh from '../assets/webthree-2.gif'

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ name: '',description: '',completed: false });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);

  const showTask = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/tasks/${id}`);
      setTask({ name: data.task.name,description:data.task.description, completed: data.task.completed });
    } catch (error) {
      setAlert({ show: true, message: 'Error, please try again', type: 'danger' });
    }
    setLoading(false);
  };

  useEffect(() => {
    showTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`http://localhost:3000/api/v1/tasks/${id}`, task);
      setAlert({ show: true, message: 'Success, task updated', type: 'success' });
    } catch (error) {
      setAlert({ show: true, message: 'Error, please try again', type: 'danger' });
    }
    setLoading(false);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (

    
    <div className='container'>

      <img src={imh} className='top'/>
      {loading ? <p className='loadingText'>Loading...</p> :

      
        <form className='singleTaskForm' onSubmit={handleSubmit}>
          <h4>Edit Task</h4>
          <div className='formControl'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className='edit_frm'
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
          </div>
          <div className='formControl'>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className='edit_frm'
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>
          <div className='formControl'>
            <div>
            <label htmlFor="completed">Completed</label>
            </div>
            <div>
            <input
              type="checkbox"
              id="completed"
              checked={task.completed}
              className='chk_bx'
              onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            />
            </div>
            
          </div>
          <button type="submit" className='form_btn'>Edit</button>
         
        </form>
        
        
      }
    </div>
  );
};

export default EditTask;
