import CostumePeriod from './components/Korean/Costume Period';
import Korean_1 from './components/Korean/Korean_1';

import News_Test_1 from './components/News/Test_1';


import Test_cel from './components/Celebrities/Test_cel';
import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import PostCreationForm from './components/PostCreationForm';
import Korean_page from './components/Korean_page';
import China_page from './components/China_page';
import Japan_page from './components/Japan_page';
import Taiwan_page from './components/Taiwan_page';
import Thailand_page from './components/Thailand_page';
import Other_page from './components/Other_page';
import News_page from './components/News_page';
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
          <Route path="/Korean_page" element={<Korean_page />} />
          <Route path="/China_page" element={<China_page />} />
          <Route path="/Japan_page" element={<Japan_page />} />
          <Route path="/Taiwan_page" element={<Taiwan_page />} />
          <Route path="/Thailand_page" element={<Thailand_page />} />
          <Route path="/Other_page" element={<Other_page />} />
          <Route path="/News_page" element={<News_page />} />
          <Route path="/News/Test_1/:pageId" element={<News_Test_1 />} />
          <Route path="/Korean/Korean_1/:pageId" element={<Korean_1 />} />
          <Route path="/Korean/Costume Period/:pageId" element={<CostumePeriod />} />
          <Route path="/Celebrities/Test_cel/:pageId" element={<Test_cel />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
