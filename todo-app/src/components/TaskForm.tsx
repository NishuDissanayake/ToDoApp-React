import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';

interface TaskFormProps {
  mode: 'add' | 'edit';
  taskId?: number;
}

function TaskForm({ mode, taskId }: TaskFormProps) {
  const { tasks, dispatch } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'edit' && taskId !== undefined) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [mode, taskId, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Title and Description cannot be empty.');
      return;
    }

    if (mode === 'add') {
      dispatch({
        type: 'ADD',
        payload: { title, description },
      });
    } else if (mode === 'edit' && taskId !== undefined) {
      dispatch({
        type: 'EDIT',
        payload: { id: taskId, title, description },
      });
    }

    // ✅ Immediately navigate
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Title:</label><br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Description:</label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button type="submit" style={{ padding: '8px 16px' }}>
        {mode === 'add' ? 'Add Task' : 'Update Task'}
      </button>
    </form>
  );
}

export default TaskForm;
