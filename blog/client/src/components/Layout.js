import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Placeholder for dropdown state
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 650);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to track if search input is visible

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 650);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reference to the dropdown and menu elements
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // Function to handle outside click
  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      menuRef.current && !menuRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsMenuOpen(false); // Close the menu when clicking outside or clicking FaBars again
    }
  };

  useEffect(() => {
    if (isDropdownOpen || isMenuOpen) {
      // Bind the event listener for clicks outside the dropdown and menu
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      // Unbind the event listener when dropdown and menu are closed
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen, isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchButtonClick = () => {
    setIsSearchVisible(true); // Show the search input when the search button is clicked
  };

  return (
    <div>
      <div style={{ backgroundColor: 'rgb(17, 17, 17)' }}>
        <Navbar variant="dark" expand="lg" style={{ padding: '1rem', marginLeft: '20px' }}>
          <Navbar.Brand href="/">
            <img src="/images/logo.png" alt="Your Logo" style={{ maxHeight: '50px', marginRight: '1rem' }} />
          </Navbar.Brand>
          {(isMenuOpen || !isSmallScreen) && (
            <div className="categories-movies" ref={dropdownRef}>
              <span style={{ position: 'relative' }}>
                <Nav.Link onClick={handleToggleDropdown}>
                  Categories {isDropdownOpen ? '▲' : '▼'}
                </Nav.Link>
                <div className={`dropdown-content-layout ${isDropdownOpen ? 'show' : ''}`}>
                <div className='row'>
                    <div className='columns'>
                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container">
                            <img
                            src="/images/korean.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay">Korean </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container2">
                            <img
                            src="/images/chinese.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay2">China </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container3">
                            <img
                            src="/images/japan.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay3">Japan </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container4">
                            <img
                            src="/images/taiwan.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay4">Taiwan </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container5">
                            <img
                            src="/images/thailand.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay5">Thailand </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container6">
                            <img
                            src="/images/hongkong.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay6">Other </span>
                        </span>
                        </NavDropdown.Item>
                        
                    </div>
                    <div className='columns-second'>
                    <span style={{ color: 'blue',paddingLeft:'4.5rem' ,fontSize:'21px' }}>{'\u25B6'}<span style={{color:'white'}}>Genres</span></span>

                    <p><a href="#action/3.1">Romantic</a></p>
                    <p><a href="#action/3.1">Costume & Period</a></p>
                    <p><a href="#action/3.1">Action</a></p>
                    <p><a href="#action/3.1">Crime& Mystery</a></p>
                    <p><a href="#action/3.1">Thriller & Suspense</a></p>
                    <p><a href="#action/3.1">Animation</a></p>
                    <p><a href="#action/3.1">Fantasy</a></p>


                    </div>
                </div>
                </div>
              </span>
              <Nav.Link href="#movies" style={{ marginLeft: '1rem' }} ref={menuRef}>Movies</Nav.Link>
            </div>
          )}
          <div className="search-login">
            {isSearchVisible && (
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              </Form>
            )}
            {/* Show the search button */}
            <Button variant="outline-light" onClick={handleSearchButtonClick} className="mr-sm-3"><FaSearch /></Button>
            {/* Show the user button */}
            <Button variant="outline-light" className="mr-sm-4"><FaUser /></Button>
          </div>
          {isSmallScreen && (
            <Button variant="dark" className="navbar-toggler" onClick={handleToggleMenu} >
              <FaBars />
            </Button>
          )}
        </Navbar>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
