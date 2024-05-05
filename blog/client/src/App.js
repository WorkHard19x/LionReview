import Korean_7 from './components/Korean/Korean_7';
import Other_2 from './components/Other/Other_2';
import Thailand_2 from './components/Thailand/Thailand_2';
import Taiwan_2 from './components/Taiwan/Taiwan_2';
import Japan_2 from './components/Japan/Japan_2';
import Chinese_4 from './components/China/Chinese_4';
import Korean_2 from './components/Korean/Korean_2';
import Chinese_3 from './components/China/Chinese_3';
import Chinese_2 from './components/China/Chinese_2';
import Cel_1 from './components/Celebrities/Cel_1';
import Test_1 from './components/News/Test_1';
import Thailand_1 from './components/Thailand/Thailand_1';
import Japan_1 from './components/Japan/Japan_1';
import Other_1 from './components/Other/Other_1';
import Taiwan_1 from './components/Taiwan/Taiwan_1';
import Chinese_1 from './components/China/Chinese_1';
import Korean_1 from './components/Korean/Korean_1';
import Home from './components/Home';
import Layout from './components/Layout';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import PostCreationForm from './components/PostCreationForm';
import Footer from './components/Bottom';
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
          <Route path="/Create_New_Profiles" element={<PostNewForm />} />
          <Route path="/Create_Drama_Profiles" element={<PostDramaForm />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />

          <Route path="/Korean/Korean_1/:pageId" element={<Korean_1 />} />
          <Route path="/China/Chinese_1/:pageId" element={<Chinese_1 />} />
          <Route path="/Taiwan/Taiwan_1/:pageId" element={<Taiwan_1 />} />
          <Route path="/Other/Other_1/:pageId" element={<Other_1 />} />
          <Route path="/Japan/Japan_1/:pageId" element={<Japan_1 />} />
          <Route path="/Thailand/Thailand_1/:pageId" element={<Thailand_1 />} />
          <Route path="/News/Test_1/:pageId" element={<Test_1 />} />
          <Route path="/Celebrities/Cel_1/:pageId" element={<Cel_1 />} />
          <Route path="/China/Chinese_2/:pageId" element={<Chinese_2 />} />
          <Route path="/China/Chinese_3/:pageId" element={<Chinese_3 />} />
          <Route path="/Korean/Korean_2/:pageId" element={<Korean_2 />} />
          <Route path="/China/Chinese_4/:pageId" element={<Chinese_4 />} />
          <Route path="/Japan/Japan_2/:pageId" element={<Japan_2 />} />
          <Route path="/Taiwan/Taiwan_2/:pageId" element={<Taiwan_2 />} />
          <Route path="/Thailand/Thailand_2/:pageId" element={<Thailand_2 />} />
          <Route path="/Other/Other_2/:pageId" element={<Other_2 />} />
          <Route path="/Korean/Korean_7/:pageId" element={<Korean_7 />} />
    
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
