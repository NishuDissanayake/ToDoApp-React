import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useTaskContext } from '../contexts/TaskContext';

function AddTaskPage() {
  const navigate = useNavigate();
  const { tasks, setTasks } = useTaskContext(); // ✅ use context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required!");
      return;
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    const newTask = {
      id: newId,
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    navigate('/');
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
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
      </Col>
    </Row>
  );
}

export default AddTaskPage;
