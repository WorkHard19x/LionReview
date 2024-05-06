import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';
import '../styles/Layout.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Placeholder for dropdown state
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 650);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to track if search input is visible
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for user dropdown
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

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
  const userDropdownRef = useRef(null); // Reference for the user dropdown

  // Function to handle outside click
  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      menuRef.current && !menuRef.current.contains(event.target)&&
      userDropdownRef.current && !userDropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsMenuOpen(false); // Close the menu when clicking outside or clicking FaBars again
      setIsUserDropdownOpen(false); // Close the user dropdown when clicking outside

    }
  };

  useEffect(() => {
    if (isDropdownOpen || isMenuOpen || isUserDropdownOpen) {
      // Bind the event listener for clicks outside the dropdown and menu
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      // Unbind the event listener when dropdown and menu are closed
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen, isMenuOpen, isUserDropdownOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleToggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchButtonClick = () => {
    setIsSearchVisible(true); // Show the search input when the search button is clicked
  };

  const handleToggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    console.log('Email value:', emailValue);
    setEmail(emailValue);
  };
  
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    console.log('Password value:', passwordValue);
    setPassword(passwordValue);
  };
  

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });
  
  //     if (response.ok) {
  //       // Login successful
  //       const data = await response.json();
  //       setUsername(data.username); // Set the username from the response data
  //       setName(data.name); // Set the name state with the received data
  //       setIsLoggedIn(true);
  //       setIsLoginFormOpen(false);
  //       localStorage.setItem('isLoggedIn', 'true');
  //       localStorage.setItem('name', data.name); // Set the name in local storage
  //       localStorage.setItem('email', data.username); // Set the name in local storage
  //       console.log('Login successful');
  //     } else {
  //       // Login failed, handle the error
  //       console.error('Login failed');
  //       setRegistrationMessage('Gmail or Password incorrect');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during login:', error);
  //     alert('Error occurred during login');
  //   }
  // };
const handleLogin = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      // Login successful
      const data = await response.json();
      setUsername(data.username);
      setName(data.name);
      setIsLoggedIn(true);
      setIsLoginFormOpen(false);
      
      // Store user's name in local storage
      sessionStorage.setItem('loggedInUserEmail', data.email); // Or localStorage.setItem('loggedInUserEmail', enteredEmail);

      localStorage.setItem('name', data.name);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', data.username);
      
      console.log('Login successful');
    } else {
      // Login failed, handle the error
      console.error('Login failed');
      setRegistrationMessage('Email or Password incorrect');
    }
  } catch (error) {
    console.error('Error occurred during login:', error);
    alert('Error occurred during login');
  }
};





  
  useEffect(() => {
    if (name !== '') {
      console.log('Name after login:', name);
    }
  }, [name]);
  
  

  const handleLogout = async () => {
    console.log("Logout button clicked"); // Check if handleLogout is triggered

    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Logout response:', response);
  
      if (response.ok) {
        // Logout successful
        console.log('Logout successful');
      
        // Update state to reflect user is logged out
        setIsLoggedIn(false);
        setIsUserDropdownOpen(false); // Close the user dropdown
        localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
        window.location.hash = '/login';

      }else {
        // Handle error if logout fails
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
      alert('Error occurred during logout');
    }
  };
  
  
  


useEffect(() => {
  // Check login status from local storage
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  setIsLoggedIn(loggedIn);
}, []);




const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    setRegistrationMessage("Passwords don't match");
    return;
  }

  try {
    const emailExistsResponse = await fetch(`${API_BASE_URL}/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    const emailExistsData = await emailExistsResponse.json();

    if (!emailExistsResponse.ok) {
      // Handle error response
      setRegistrationMessage(emailExistsData.message);
      return;
    }

    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const registerData = await registerResponse.json();

    if (registerResponse.ok) {
      // Registration successful
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRegistrationMessage('Registration successful');
      window.location.hash = '#login';
    } else {
      // Handle error response
      setRegistrationMessage(registerData.message);
    }
  } catch (error) {
    console.error('Error occurred during registration:', error);
    setRegistrationMessage('Error occurred during registration');
  }
};

  
  


  const location = useLocation();
  useEffect(() => {
      const hash = location.hash;
      if (hash) {
          toggleSection(hash.substring(1));
      } else {
          toggleSection('login');
          toggleSection('blue');
      }
  }, [location]);


  document.querySelectorAll('.login-p span, .register-p span').forEach(span => {
    span.style.color = 'white';
});

function toggleSection(sectionId) {
  const sections = document.querySelectorAll('.section-login');

  sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections by default
  });

  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) { // Check if the section exists
      sectionToShow.style.display = 'block'; // Show the selected section

      // Update link colors if the links exist
      const loginLink = document.querySelector('.login-p a');
      const registerLink = document.querySelector('.register-p a');
      const loginSpan = document.querySelector('.login-p span');
      const registerSpan = document.querySelector('.register-p span');


      if (loginLink && registerLink) {
          if (sectionId === 'login') {
              loginLink.classList.add('active-link');
              registerLink.classList.remove('active-link');
                 // Add null check
                    loginSpan.style.color = 'blue';
                
          } else if (sectionId === 'register') {
              loginLink.classList.remove('active-link');
              registerLink.classList.add('active-link');
                 // Add null check
                    registerSpan.style.color = 'blue';
                
          }
      }
  }
}

const [loginColor, setLoginColor] = useState('blue');
const [registerColor, setRegisterColor] = useState('white');

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
           

              {isLoginFormOpen && (
                    <div className="login-form-overlay">
                      <div className="login-form-container">
                          <div className="login-scale">
                              <div className="login-register">
                              <p className="login-p">
                                  <a href="#login" onClick={() => { toggleSection('login') }} className="active-link">
                                    <span >Login</span>
                                  </a>
                                </p>

                                <p className="register-p">
                                  <a href="#register" onClick={() => { toggleSection('register') }}>
                                    <span >Register</span>
                                  </a>
                                </p>
                              </div>
                                  <div className="section-login" id="login">
                                        <h2>Login</h2>
                                        <p>Username</p>
                                        <input type="text" placeholder="Username" value={email} onChange={handleEmailChange} />
                                        <p>Password</p>
                                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                        <p>
                                        <Button variant="outline-dark" onClick={handleLogin} style={{marginBottom:'1rem'}}>Login</Button>
                                        </p>
                                  </div>
                                  <div className="section-login" id="register" style={{display: 'none'}}>
                                      <form onSubmit={handleSubmit}>
                                      {registrationMessage && <p style={{ color: 'red' }}>{registrationMessage}</p>}

                                        <h2>Register</h2>
                                        <p>Name</p>
                                        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                                        <p>Gmail</p>
                                        <input type="text" placeholder="Gmail" value={email} onChange={handleEmailChange} />
                                        <p>Password</p>
                                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                        <p>Re-Enter Password</p>
                                        <input type="password" placeholder="Re-Enter Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                                        <p>
                                        <Button variant="outline-dark" onClick={handleSubmit} style={{marginBottom:'1rem'}}>Register</Button>
                                        </p>
                                        </form>
                                        {/* <div className="login-gmail">
                                                  <div className='login-in'>
                                                  <a href="#">
                                                      <p>Register with Gmail 
                                                      <i class="fa-brands fa-google" style={{marginLeft:'1rem', fontSize:'2rem'}}></i>
                                                      </p>
                                                  </a>
                                              </div>
                                        </div> */}
                                  </div>
                          </div>
                      </div>
                    </div>

                  )}
              {isLoggedIn ? (
                <div className="user-profile">
                  <div className="profile-info">
                  </div>
                  <Button
                    variant="outline-light"
                    className="mr-sm-4"
                    onClick={handleToggleUserDropdown}
                  >
                    <FaUser  />
                    <span style={{marginLeft:'0.5rem'}}>{name}</span>
                    
                  </Button>
                  {isUserDropdownOpen && (
                      <div className="user-dropdown">
                      <p><a href={isLoggedIn ? '/Profile' : '#login'}>{isLoggedIn ? 'Profile' : 'Login'}</a></p>
                        {/* <p><a href="/Profile" onClick={handleLogout}>Profile</a></p> */}
                        <p><a href="#logout" onClick={handleLogout}>Logout</a></p>
                      </div>
                    )}
                </div>
              ) : (
                <Button
                  variant="outline-light"
                  className="mr-sm-4"
                  onClick={handleToggleLoginForm}
                >
                  <FaUser />
                </Button>
              )}
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
