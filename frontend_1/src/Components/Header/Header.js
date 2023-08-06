import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

function Header({setSearch}) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state)=>state.userLogin)
  const {userInfo} = userLogin; 
  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">React-MERN-APP</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setSearch(e.currentTarget.value)}
              />
            </Form>
          </Nav>
          {userInfo? (<Nav style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => logoutHandler()}>
                Logout{" "}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>):(<Nav style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link></Nav>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
