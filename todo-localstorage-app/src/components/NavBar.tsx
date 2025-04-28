import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>
          Todo App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === '/'}
              style={{ marginRight: '1rem' }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add"
              active={location.pathname === '/add'}
            >
              Add Task
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
