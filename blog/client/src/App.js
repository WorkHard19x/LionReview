

import Test_3 from './components/News/Test_3';




import Leo_DN from './components/Celebrities/Leo_DN';
import Yoon_Shi_Yoon from './components/Celebrities/Yoon_Shi_Yoon';
import It_Beautiful_Now from './components/Korean/It_Beautiful_Now';
import Layout from './components/Layout';
import Home from './components/Home';
import News from './components/News';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import Footer from './components/Bottom';
import A1Cel from './components/Celebrities/A1Cel';
import News_Yon from './components/News/News_Yon';
import Admin from './components/Admin'; // Import the Admin component
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
          <Route path="/Yoon_Shi_Yoon" element={<Yoon_Shi_Yoon />} />
          <Route path="/Create_New_Profiles" element={<PostNewForm />} />
          <Route path="/Create_Drama_Profiles" element={<PostDramaForm />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />
          <Route path="/Celebrities/Leo_DN/:pageId" element={<Leo_DN />} />
          <Route path="/korean/It-Beautiful-Now/:pageId" element={<It_Beautiful_Now />} />
          <Route path="/News/Test_3/:pageId" element={<Test_3 />} />

     

          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
