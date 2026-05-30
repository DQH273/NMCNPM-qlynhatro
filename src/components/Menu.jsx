import { Navbar, Container, Nav } from "react-bootstrap";

import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Quản lý nhà trọ</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Trang chủ
            </Nav.Link>

            <Nav.Link as={NavLink} to="/hop-dong">
              Hợp đồng
            </Nav.Link>

            <Nav.Link as={NavLink} to="/hoa-don">
              Hóa đơn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
