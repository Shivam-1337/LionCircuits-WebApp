// importing components
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavbarBrand, NavLink, NavItem } from 'reactstrap';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    // Redirect to the login page or perform other actions
    window.location.reload();
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">WebApp</NavbarBrand>
        <Nav className="mr-auto" navbar>
        </Nav>
        <Nav>
          {isAuth ? (
            <Navbar>
            <NavLink href="/" onClick={handleLogout}>Logout</NavLink>
            <NavLink href="/profile">Profile</NavLink>
            </Navbar>
          ) : (
            <NavLink href="/login">Login</NavLink>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}