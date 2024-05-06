import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/Profiles.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function Profile() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      toggleSection(hash.substring(1));
    } else {
      toggleSection('Profile');
      toggleSection('blue');
    }
  }, [location]);

  document.querySelectorAll('.profile-side-l-p span, .profile-side-l-s span, .profile-side-l-se span').forEach(span => {
    span.style.color = 'white';
  });

  function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.section-profile');

    sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections by default
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) { // Check if the section exists
      sectionToShow.style.display = 'block'; // Show the selected section

      // Update link colors if the links exist
      const Profile = document.querySelector('.profile-side-l-p a');
      const Subscriber = document.querySelector('.profile-side-l-s a');
      const Security = document.querySelector('.profile-side-l-se a');

      const ProfileSpan = document.querySelector('.profile-side-l-p span');
      const SubscriberSpan = document.querySelector('.profile-side-l-s span');
      const SecuritySpan = document.querySelector('.profile-side-l-se span');

      if (Profile && Subscriber) {
        if (sectionId === 'Profile') {
          Profile.classList.add('active-link');
          Subscriber.classList.remove('active-link');
          Security.classList.remove('active-link');

          ProfileSpan.style.color = 'blue';
        } else if (sectionId === 'Subscriber') {
          Profile.classList.remove('active-link');
          Subscriber.classList.add('active-link');
          Security.classList.remove('active-link');
          SubscriberSpan.style.color = 'blue';
        } else if (sectionId === 'Security') {
          Profile.classList.remove('active-link');
          Subscriber.classList.remove('active-link');
          Security.classList.add('active-link');
          SecuritySpan.style.color = 'blue';
        }
      }
    }
  }

  const [user, setUser] = useState({
    name: '', // Initialize name as empty string
    email: '',
    // Add more fields as needed
  });

  useEffect(() => {
    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
  
    // Make the API call using the logged-in user's email
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/login?email=${loggedInUserEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const userDataArray = await response.json();
          // Find the user object with the logged-in user's email
          const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
          if (loggedInUser) {
            setUser(loggedInUser);
            console.log('User data:', loggedInUser);
          } else {
            console.error('Logged-in user not found in response');
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error occurred while fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  return (
    <div className='Profile-m'>
      <div className="profile-n">
        <div className="profile-b">
          <div className="profile-tog">
            <div className="profile-tog-p">
              <div className="profile-side-l">
                <p className="profile-side-l-p">
                  <a href="#Profile" onClick={() => { toggleSection('Profile') }} className="active-link">
                    <span >Profile</span>
                  </a>
                </p>
                <p className="profile-side-l-s">
                  <a href="#Subscriber" onClick={() => { toggleSection('Subscriber') }}>
                    <span >Subscriber</span>
                  </a>
                </p>
                <p className="profile-side-l-se">
                  <a href="#Security" onClick={() => { toggleSection('Security') }}>
                    <span >Security</span>
                  </a>
                </p>
              </div>
              <div className="profile-side-r">
                <div className="section-profile" id="Profile">
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
