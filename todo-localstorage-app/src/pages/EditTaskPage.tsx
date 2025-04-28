import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useTaskContext } from '../contexts/TaskContext';

function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, setTasks } = useTaskContext(); // ✅ use context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const task = tasks.find(t => t.id === Number(id));
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [id, tasks]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTasks = tasks.map(task =>
      task.id === Number(id) ? { ...task, title, description } : task
    );

    setTasks(updatedTasks);
    navigate('/');
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
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
      </Col>
    </Row>
  );
}

export default EditTaskPage;
