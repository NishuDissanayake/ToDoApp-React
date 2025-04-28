import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Task } from '../types/task';

function AddTaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required!");
      return;
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const newId = storedTasks.length > 0 ? Math.max(...storedTasks.map(t => t.id)) + 1 : 1;

    const newTask: Task = {
      id: newId,
      title,
      description,
      isCompleted: false,
    };

    storedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    navigate('/');
  };

  return (
    <div>
      <h2 className="mb-4">Add New Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <Button type="submit">Add Task</Button>
      </Form>
    </div>
  );
}

export default AddTaskPage;
