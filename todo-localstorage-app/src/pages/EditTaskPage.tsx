import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Task } from '../types/task';

function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const task = storedTasks.find(t => t.id === Number(id));
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const updatedTasks = storedTasks.map(task =>
      task.id === Number(id) ? { ...task, title, description } : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate('/');
  };

  return (
    <div>
      <h2 className="mb-4">Edit Task</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <Button type="submit">Update Task</Button>
      </Form>
    </div>
  );
}

export default EditTaskPage;
