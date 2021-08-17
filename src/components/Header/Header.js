import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container ,NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin )
  
  const logoutHandler = () => {
    //console.log("logout")
    dispatch(logout())
  }
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>REC<i className="fas fa-record-vinyl"></i>RD ON THE BLOCK</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ?
                <>
                <Nav.Link>Welcome, {userInfo.name}</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                  </>
                :
              <LinkContainer to="/login">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              }
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item >Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-bag"></i></Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
