import Suspicious_Partner from './components/Korean/Suspicious_Partner';
import TheMidnightRomanceinHagwon from './components/Korean/The Midnight Romance in Hagwon';
import Kdrama_1 from './components/Korean/Kdrama_1';
import Test_korean10 from './components/Korean/Test_korean10';
import Test_korean from './components/Korean/Test_korean';
import Korean_korean2 from './components/Korean/Korean_korean2';
import Korean_korean1 from './components/Korean/Korean_korean1';
import Korean_test2 from './components/Korean/Korean_test2';
import Korean_test from './components/Korean/Korean_test';
import Korean_50 from './components/Korean/Korean_50';
import Korean_30 from './components/Korean/Korean_30';
import Korean_3 from './components/Korean/Korean_3';
import Korean_1 from './components/Korean/Korean_1';
import Korean_5 from './components/Korean/Korean_5';

import Celebrities_Test_1 from './components/Celebrities/Test_1';

import Korean_10 from './components/Korean/Korean_10';


import News_Test_1 from './components/News/Test_1';
import Test_cel from './components/Celebrities/Test_cel';
import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import PostCreationForm from './components/PostCreationForm';
import PostTravelForm from './components/PostTravelForm';
import Korean_page from './components/MainPage/Korean_page';
import Travel_page from './components/MainPage/Travel_page';
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
          <Route path="/Create_Travel_Profiles" element={<PostTravelForm />} />
          <Route path="/Create_Celebrities_Profiles" element={<PostCreationForm />} />
          <Route path="/MainPage/Korean_page" element={<Korean_page />} />
          <Route path="/China_page" element={<China_page />} />
          <Route path="/Japan_page" element={<Japan_page />} />
          <Route path="/Taiwan_page" element={<Taiwan_page />} />
          <Route path="/Thailand_page" element={<Thailand_page />} />
          <Route path="/Other_page" element={<Other_page />} />
          <Route path="/News_page" element={<News_page />} />
          <Route path="/MainPage/Travel_page" element={<Travel_page />} />
          <Route path="/News/Test_1/:pageId" element={<News_Test_1 />} />
          <Route path="/Korean/Korean_10/:pageId" element={<Korean_10 />} />
          <Route path="/Celebrities/Test_1/:pageId" element={<Celebrities_Test_1 />} />

          <Route path="/Korean/Korean_5/:pageId" element={<Korean_5 />} />
          <Route path="/Korean/Korean_1/:pageId" element={<Korean_1 />} />
          <Route path="/Korean/Korean_3/:pageId" element={<Korean_3 />} />
          <Route path="/Korean/Korean_30/:pageId" element={<Korean_30 />} />
          <Route path="/Korean/Korean_50/:pageId" element={<Korean_50 />} />
          <Route path="/Korean/Korean_test/:pageId" element={<Korean_test />} />
          <Route path="/Korean/Korean_test2/:pageId" element={<Korean_test2 />} />
          <Route path="/Korean/Korean_korean1/:pageId" element={<Korean_korean1 />} />
          <Route path="/Korean/Korean_korean2/:pageId" element={<Korean_korean2 />} />
          <Route path="/Korean/Test_korean/:pageId" element={<Test_korean />} />
          <Route path="/Korean/Test_korean10/:pageId" element={<Test_korean10 />} />
          <Route path="/Korean/Kdrama_1/:pageId" element={<Kdrama_1 />} />
          <Route path="/Korean/The Midnight Romance in Hagwon/:pageId" element={<TheMidnightRomanceinHagwon />} />
          <Route path="/Korean/Suspicious_Partner/:pageId" element={<Suspicious_Partner />} />
          <Route path="/Celebrities/Test_cel/:pageId" element={<Test_cel />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
