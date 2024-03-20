import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./NavBar1.css";

function NavBar1() {
  return (
    <Navbar className="landnavbar" expand="md">
      <NavbarBrand href="/">Task Management</NavbarBrand>
      <Nav className="landml-auto" navbar>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar1;
