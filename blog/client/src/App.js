import Yoon_Shi_Yoon from './components/Celebrities/Yoon_Shi_Yoon';

import Layout from './components/Layout';
import Home from './components/Home';
import Footer from './components/Bottom';
import A1Cel from './components/Celebrities/A1Cel';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostCreationForm from './components/PostCreationForm';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Celebrities_Form" element={<A1Cel />} />
          <Route path="/Yoon_Shi_Yoon" element={<Yoon_Shi_Yoon />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
