import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <p>No tasks available. <Link to="/add">Add one!</Link></p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Title</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Description</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Status</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
