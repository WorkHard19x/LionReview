
import Yoon_Shi_Yoon from './components/Celebrities/Yoon_Shi_Yoon';
import Layout from './components/Layout';
import Home from './components/Home';
import News from './components/News';
import Test from './components/Test';
import PostNewForm from './components/PostNewForm';

import Footer from './components/Bottom';
import A1Cel from './components/Celebrities/A1Cel';

import News_Yon from './components/News/News_Yon';

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
          <Route path="/News" element={<News />} />
          <Route path="/News_Yon" element={<News_Yon />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Yoon_Shi_Yoon" element={<Yoon_Shi_Yoon />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />



          <Route path="/Create_New_Profiles" element={<PostNewForm />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
