import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
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
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>REC<i className="fas fa-record-vinyl"></i>RD ON THE BLOCK</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ?
                <>
                <Nav.Link>Welcome,{userInfo.name}</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                  </>
                :
              <LinkContainer to="/login">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              }
              <LinkContainer to="/cart">
                <Nav.Link>Cart</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
