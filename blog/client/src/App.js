import Test_1 from './components/Korean/Test_1';

import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import PostCreationForm from './components/PostCreationForm';
import Footer from './components/Bottom';
import Profile from './components/Profile'; 
import Admin from './components/Admin'; 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Create_New_Profiles" element={<PostNewForm />} />
          <Route path="/Create_Drama_Profiles" element={<PostDramaForm />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />

          
          <Route path="/Korean/Test_1/:pageId" element={<Test_1 />} />
    
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
