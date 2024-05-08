import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/Profiles.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function Profile() {
  const location = useLocation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    span.style.color = 'black';
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
    is_admin: false,

    // Add more fields as needed
  });

  // Define fetchUserData function
  const fetchUserData = async () => {
    try {
      const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
      const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
  
      const response = await fetch(`${API_BASE_URL}/login?email=${loggedInUserEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
      });
  
      if (response.ok) {
        const userDataArray = await response.json();
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

  useEffect(() => {
    fetchUserData();
  }, []);

  
  function handleResetPassword() {
    // Validate if all fields are filled
    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');

    if (!currentPassword || !newPassword || !confirmPassword) {
        setErrorMessage('Please fill in all fields.');
        return;
    }

    // Validate if new password matches confirm password
    if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirm password do not match.');
        return;
    }

    // Send request to backend API to reset password
    fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email, // Include user's email for identification
            current_password: currentPassword, // Include current password for authentication
            new_password: newPassword, // Include new password
            confirm_password: confirmPassword, // Include confirm password
        }),
    })
    .then(response => {
        if (response.ok) {
            // Password reset successful, clear input fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setErrorMessage('');
            setSuccessMessage('Password updated successfully!');

        } else {
            // Password reset failed, handle error
            return response.json();
        }
    })
    .then(data => {
        if (data && data.message) {
            setErrorMessage(data.message);
        }
    })
    .catch(error => {
        console.error('Error occurred during password reset:', error);
        setErrorMessage('An error occurred. Please try again later.');
    });
}


const userId = '663ab463f2ec3cc95dac205f';
  const isAdmin = true;

  // Make a POST request to update the user's admin status when the component mounts
  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/user/updateAdmin';
    const requestBody = {
      user_id: userId,
      is_admin: isAdmin
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (response.ok) {
        console.log('User admin status updated successfully');
        // Fetch user data again after updating admin status
        fetchUserData();
      } else {
        console.error('Failed to update user admin status');
      }
    })
    .catch(error => {
      console.error('Error updating user admin status:', error);
    });
  }, []);
  // Your existing code for toggleSection, user data fetching, and JSX return


  console.log('User data:', user); // Print user data to console for debugging

  
  return (
    <div className='Profile-m'>
  <div className="profile-n">
    <div className="profile-b">
      <div className="profile-tog">
        <div className="profile-tog-p">
          
          <div className="profile-side-l">
            <p className="profile-side-l-p">
              <a href="#Profile" onClick={() => { toggleSection('Profile') }} className="active-link">
                <span>Profile</span>
              </a>
            </p>
            <p className="profile-side-l-s">
              <a href="#Subscriber" onClick={() => { toggleSection('Subscriber') }}>
                <span>Subscriber</span>
              </a>
            </p>
            <p className="profile-side-l-se">
              <a href="#Security" onClick={() => { toggleSection('Security') }}>
                <span>Security</span>
              </a>
            </p>
          </div>
          
          <div className="profile-side-r">
            <div className="section-profile" id="Profile">
              <p style={{ color: 'black', fontWeight: 'bold' }}>Name: {user.name}</p>
              <p style={{ color: 'black', fontWeight: 'bold' }}>Email: {user.email}</p>
              <p style={{ color: 'black', fontWeight: 'bold' }}>Level: {user.lever}</p>
              <p style={{ color: 'black', fontWeight: 'bold' }}>Admin: {user.is_admin ? 'Yes' : 'No'}</p>


            </div>
            <div className="section-profile" id="Subscriber">
              <p style={{ color: 'black', fontWeight: 'bold' }}>Name: {user.name}</p>
              <p style={{ color: 'black', fontWeight: 'bold' }}>Type: {user.email}</p>
              <p style={{ color: 'black', fontWeight: 'bold' }}>Date: {user.date}</p>
                <button  >Cancel Subcriber</button>

            </div>
            <div className="section-profile" id="Security">
            {successMessage && <p style={{ color: 'red', fontWeight:'bold' }}>{successMessage}</p>}

                <p style={{ color: 'black', fontWeight: 'bold' }}>Name: {user.name}</p>
                <p style={{ color: 'black', fontWeight: 'bold' }}>Email: {user.email}</p>
                <p style={{ color: 'black', fontWeight: 'bold' }}>Current Password:
                    <input
                    type="text"
                    style={{ fontSize: '18px' }}
                    placeholder='Current Password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </p>
                <p style={{ color: 'black', fontWeight: 'bold' }}>New Password:
                    <input
                    type="text"
                    style={{ fontSize: '18px' }}
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </p>
                <p style={{ color: 'black', fontWeight: 'bold' }}>Confirm password:
                    <input
                    type="text"
                    style={{ fontSize: '18px' }}
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </p>
                <button onClick={handleResetPassword} >Reset Password</button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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

