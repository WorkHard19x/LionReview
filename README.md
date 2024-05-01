<h1>Relax is a Blog for Entertainment</h1>

``


## Goals
- An easy way to create a simple, secure website with a blog
- Support for text-based and photo-based blog formats
- Easy authoring in react
- Easy customization of site layout and formatting
- Support for Windows and Linux hosting Flask
- Quick search of post content, including simple search queries
  
## Structure
- `blog-web\blog\backend\app.py` Entry point for the application, configures the server and static content
- `blog-web\blog\client\npm start` Handles image slideshows, post dates, and dropdown menus
- `blog-web\blog\client\src\components` directory manages the layout of the webpage
- `blog-web\blog\client\src\styles/CSS` directory manages the styling and formatting of the HTML conten

## Instructions

1. Install react, Python, .NET SDK, Flask, MongoDB, Node.js
1. cd (your folder)\blog-web\blog\client
1. npm install react-bootstrap, react-icons, react-router-dom.
 

# Front-End Stack
- React: Defines the structure and content of your web pages
- CSS: Styles, defining layout, colors, typography, and other visual aspects to enhance presentation
- React: Adds interactivity and dynamic functionality to your web pages, including features such as real-time timestamp updates (e.g., updateTimeAgo), dropdown menus, and more

# Back-End Stack
- Server-side Languages (Python Flask): Handles server-side logic, data processing, and communication with databases. Flask, a Python web framework, provides a lightweight and flexible platform for building web applications, allowing you to create dynamic content, handle user requests, and manage session data effectively
- Databases(MongoDB): Stores user registration information in a NoSQL document database
- MongoDB (handled by Flask-PyMongo): Store user information such as name, email, hashed password, registration, time, etc
- Flask_mail:
    - Integrates email functionality into your Flask application, enabling the sending of emails such as visitor's contracts to Gmail
    - Implement email verification with registration, ensuring active and valid user emails
    - Forget-password feature with two-factor authentication (2FA), requiring users to enter a verification code for added security
- Flask sessions: Store user authentication state and information between requests
- Bcrypt (handled by Passlib): Securely hash user passwords before storing them in the database

#AI Help
- Explore Python and Flask framework for backend development and familiarize with MongoDB.
- Receive guidance on Python syntax, registration, login, and contracts.
- Establish backend-to-frontend connectivity.
- Collaborate on JavaScript concepts and brainstorm ideas.
## License

[CD](LICENSE)
