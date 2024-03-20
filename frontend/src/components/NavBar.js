import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./NavBar.css";
import Cookies from "js-cookie";
import axios from "axios";
function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [CookieLogOut, setCookieLogOut] = useState(null);
  const cookieId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `http://localhost:8080/login/get/${cookieId}`;
        const response = await axios.get(url);
        setCookieLogOut(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const cookieId = localStorage.getItem("userId");

    if (cookieId && !CookieLogOut) {
      fetchUserData();
    }
  }, [CookieLogOut]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    axios.put(`http://localhost:8080/login/update/${cookieId}`, {
      userName: CookieLogOut.userName,
      password: CookieLogOut.password,
      cookie: null,
    });
    Cookies.remove("rememberMeToken");
  };
  return (
    <Navbar className="navbar" expand="md">
      <NavbarBrand href="/">Task Management</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/viewtask">Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem>
        <NavItem className="LogOutNavbar">
          <NavLink href="/login" onClick={handleLogout}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
