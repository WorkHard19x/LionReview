import Celebrities_Test_1 from './components/Celebrities/Test_1';
import Korena from './components/Korean/Korena';
import Test_korean from './components/Korean/Test_korean';
import Test_cel from './components/Celebrities/Test_cel';
import Test_9 from './components/News/Test_9';
import Test_1 from './components/Korean/Test_1';

import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import PostCreationForm from './components/PostCreationForm';
import Footer from './components/Bottom';
import Profile from './components/Profile'; 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Create_New_Profiles" element={<PostNewForm />} />
          <Route path="/Create_Drama_Profiles" element={<PostDramaForm />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />

          
          <Route path="/Korean/Test_1/:pageId" element={<Test_1 />} />
          <Route path="/News/Test_9/:pageId" element={<Test_9 />} />
          <Route path="/Celebrities/Test_cel/:pageId" element={<Test_cel />} />
          <Route path="/Korean/Test_korean/:pageId" element={<Test_korean />} />
          <Route path="/Korean/Korena/:pageId" element={<Korena />} />
          <Route path="/Celebrities/Test_1/:pageId" element={<Celebrities_Test_1 />} />
    
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
