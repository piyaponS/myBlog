import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {user ? (
        <>
          <Navbar bg="dark" variant="dark">
            <Container className="p-1">
              <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold">
                LOGO
              </Navbar.Brand>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/auth" className="fs-5">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="fs-5">
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/setting" className="fs-5">
                  setting
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar bg="dark" variant="dark">
            <Container className="p-1">
              <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold">
                LOGO
              </Navbar.Brand>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="fs-5">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="fs-5">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="fs-5">
                  Signup
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
}

export default Header;
