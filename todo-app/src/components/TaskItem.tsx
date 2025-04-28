import React from 'react';
import { Task } from '../types/task';
import { useTasks } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';

function TaskItem({ task }: { task: Task }) {
  const { dispatch } = useTasks();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE', payload: task.id });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: 'DELETE', payload: task.id });
    }
  };

  return (
    <tr style={{ backgroundColor: task.isCompleted ? '#f0f0f0' : 'white' }}>
      <td style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', padding: '8px' }}>
        {task.title}
      </td>
      <td style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', padding: '8px' }}>
        {task.description}
      </td>
      <td style={{ padding: '8px' }}>
        <button onClick={handleToggle}>
          {task.isCompleted ? "Completed" : "Pending"}
        </button>
      </td>
      <td style={{ padding: '8px' }}>
        <Link to={`/edit/${task.id}`} style={{ marginRight: '8px' }}>Edit</Link>
        <button onClick={handleDelete} style={{ color: 'red' }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
