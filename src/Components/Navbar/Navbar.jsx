import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import { getCartItemCount } from '../../utils/cartUtils';
import './Navbar.css';

function StoreNavbar() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Update cart count when component mounts and when cart changes
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    updateCartCount();

    // Listen for storage changes to update cart count
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for cart updates
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page (you can implement this later)
      console.log('Searching for:', searchQuery);
      // For now, just navigate to home with search query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Navbar expand="lg" className="navbar-custom shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <span className="brand-text">MyStore</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <NavDropdown title="Categories" id="navbarScrollingDropdown" className="nav-dropdown-custom">
              <NavDropdown.Item href="#electronics">Electronics</NavDropdown.Item>
              <NavDropdown.Item href="#fashion">Fashion</NavDropdown.Item>
              <NavDropdown.Item href="#home">Home & Garden</NavDropdown.Item>
              <NavDropdown.Item href="#sports">Sports</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#all">All Categories</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#deals" className="nav-link-custom">Deals</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <Form.Control
                type="search"
                placeholder="Search products..."
                className="search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" type="submit" className="search-btn">
                <FaSearch />
              </Button>
            </div>
          </Form>

          <Nav className="ms-3">
            <Nav.Link as={Link} to="/MyCart" className="cart-link">
              <div className="cart-icon-container">
                <FaShoppingCart className="cart-icon" />
                {cartCount > 0 && (
                  <Badge bg="danger" className="cart-badge">
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className="cart-text">Cart</span>
            </Nav.Link>

            <Nav.Link href="#account" className="account-link">
              <FaUser className="account-icon" />
              <span className="account-text">Account</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StoreNavbar;