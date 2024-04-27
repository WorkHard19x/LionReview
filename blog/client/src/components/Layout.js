import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };



  return (
    <div>
      <div style={{ backgroundColor: 'black' }}>
        <Navbar variant="dark" expand="lg" style={{ padding: '1rem', marginLeft: '20px'  }}>
          <Navbar.Brand href="#home">
            <img
            //   src="/images/korean.jpg"
              alt="Your Logo"
              style={{ maxHeight: '50px', marginRight: '1rem' }}
            />
          </Navbar.Brand>
          <div className="categories-movies">
            <span style={{position:'relative'}}>
              <Nav.Link onClick={handleToggleDropdown}>
                Categories {isDropdownOpen ? '▲' : '▼'}
              </Nav.Link>
              <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                
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
                            src="/images/korean.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay2">China </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container3">
                            <img
                            src="/images/korean.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay3">Japan </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container4">
                            <img
                            src="/images/korean.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay4">Taiwan </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container5">
                            <img
                            src="/images/korean.jpg"
                            alt='Korean'
                            style={{height: '150px', width:'210px', margin:'2rem',  border: '1px solid white' }}
                            />
                            <span className="overlay5">Thailand </span>
                        </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.1">
                        <span className="image-container6">
                            <img
                            src="/images/korean.jpg"
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
            <Nav.Link href="#movies" style={{marginLeft: '1rem'}} >Movies</Nav.Link>
          </div>
          <div className="search-login">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-light"><FaSearch /></Button>
            </Form>
            <Button variant="outline-light"><FaUser /></Button>
          </div>
        </Navbar>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
