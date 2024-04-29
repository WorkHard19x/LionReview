import React from 'react'
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.css';


function Bottom() {
    return (
        <footer className="footer">
          <div className="footer-column">
            <ul className="social-icons">
              <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>

              {/* Add more social icons as needed */}
            </ul>
          </div>
          <div className="footer-column1">

            <ul>
            <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-column2">
            <ul>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookies Policy</a></li>
              <li><a href="#">Copyright Policy</a></li>

            </ul>
          </div>
        </footer>
      );
    };

export default Bottom
