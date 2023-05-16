import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { FiLogOut } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
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
                <NavDropdown
                  title={user.name}
                  align={{ lg: "end" }}
                  menuVariant="dark"
                  className="fs-5"
                >
                  <NavDropdown.Item as={Link} to="/">
                    <BsPersonFill className="me-2" /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/login" onClick={logoutHandler}>
                    <FiLogOut className="me-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
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
