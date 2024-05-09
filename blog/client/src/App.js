import News_Test_1 from './components/News/Test_1';


import Test_cel from './components/Celebrities/Test_cel';
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

          <Route path="/News/Test_1/:pageId" element={<News_Test_1 />} />
          <Route path="/Celebrities/Test_cel/:pageId" element={<Test_cel />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
