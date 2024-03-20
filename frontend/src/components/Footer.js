import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; 
import { Button, Input } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <Container>
        <Row>
          <Col className="footer-column">
            <h4 className="footer-heading">Discover More</h4>
            <p className="footer-text">
              Welcome to our task management website. We provide a seamless and
              efficient solution for organizing your tasks and boosting
              productivity. Stay organized and focused with our powerful
              features and intuitive interface.
            </p>
            <p className="footer-text">
              Our mission is to help individuals and teams accomplish their
              goals effectively. Join us on this journey towards success!
            </p>
          </Col>
          <Col>
            <div className="links-column">
              <h4 className="footer-heading">Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="/" className="footer-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="footer-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="/login" className="footer-link">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/signup" className="footer-link">
                    Signup
                  </a>
                </li>
              </ul>
              <div className="position-for-link">
                <p className="footer-text">
                  Stay updated with the latest news and tips by subscribing to
                  our newsletter.
                </p>
                <form className="footer-form">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="footer-input"
                  />
                  <Button type="submit" className="footer-button">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
