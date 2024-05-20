import React from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';
import { FaArrowAltCircleRight } from "react-icons/fa";

import roc from '../assets/rocket.gif'
const TaskList = ({ tasks, deleteTask }) => {
  if (tasks.length < 1) {
    return <h5 className='emptyList'>No tasks in your list</h5>;
  }

  return (
    <section className='tasksContainer'>
      {tasks.map((task) => {
        const { completed, _id: taskID, name ,description} = task;
        return (
          <div key={taskID} className='singleTask'>
            <img src={roc} className='icn'/>
            <h5 className={completed ?  "taskcom": "task_li"} >
             {name}
            </h5>

            <p className='desc'>
              {description}
            </p>
            <div className='taskLinks'>
              <Link to={`/edit-task/${taskID}`} className='editLink'>
                <h2>Edit</h2>
              </Link>
              <button type="button" className='deleteBtn' onClick={() => deleteTask(taskID)}>
                <h3>delete</h3>
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TaskList;
