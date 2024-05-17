import Anime_PeachBoyRiverside from './components/Anime/Peach Boy Riverside';

import Celebrities_Test_1 from './components/Celebrities/Test_1';
import Test_cel from './components/Celebrities/Test_cel';
import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import PostNewForm from './components/PostNewForm';
import PostDramaForm from './components/PostDramaForm';
import PostCreationForm from './components/PostCreationForm';
import PostTravelForm from './components/PostTravelForm';
import Movie_page from './components/MainPage/Movie_page';
import Anime_page from './components/MainPage/Anime_page';
import Korean_page from './components/MainPage/Korean_page';
import Travel_page from './components/MainPage/Travel_page';
import China_page from './components/MainPage/China_page';
import Japan_page from './components/MainPage/Japan_page';
import Taiwan_page from './components/MainPage/Taiwan_page';
import Thailand_page from './components/MainPage/Thailand_page';
import Other_page from './components/MainPage/Other_page';
import News_page from './components/MainPage/News_page';
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
          <Route path="/MainPage/Movie_page" element={<Movie_page />} />
          <Route path="/MainPage/Anime_page" element={<Anime_page />} />
          <Route path="/MainPage/China_page" element={<China_page />} />
          <Route path="/MainPage/Japan_page" element={<Japan_page />} />
          <Route path="/MainPage/Taiwan_page" element={<Taiwan_page />} />
          <Route path="/MainPage/Thailand_page" element={<Thailand_page />} />
          <Route path="/MainPage/Other_page" element={<Other_page />} />
          <Route path="/MainPage/News_page" element={<News_page />} />
          <Route path="/MainPage/Travel_page" element={<Travel_page />} />
          <Route path="/Celebrities/Test_1/:pageId" element={<Celebrities_Test_1 />} />

          <Route path="/Anime/Peach Boy Riverside/:pageId" element={<Anime_PeachBoyRiverside />} />
          <Route path="/Celebrities/Test_cel/:pageId" element={<Test_cel />} />
        </Routes>
      </Layout>
      <Footer></Footer>
    </Router>
  );
}

export default App;
