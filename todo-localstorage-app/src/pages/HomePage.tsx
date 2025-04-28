import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleToggle = (id: number) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleDelete = (id: number) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. <Link to="/add">Add one</Link>!</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.title}</td>
                <td style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.description}</td>
                <td>{task.isCompleted ? 'Completed' : 'Pending'}</td>
                <td>
                  <Button size="sm" variant="success" onClick={() => handleToggle(task.id)} className="me-2">
                    Toggle
                  </Button>
                  <Button variant="warning" size="sm" href={`/edit/${task.id}`} className="me-2">
                  Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default HomePage;
