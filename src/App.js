// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SignIn from './components/SignIn/SignIn';
import Home from './views/Home/Home';
import HomeMain from './views/Home/HomeMain/HomeMain';
import HomeWishlist from './views/Home/HomeWishlist/HomeWishlist';
import HomePopular from './views/Home/HomePopular/HomePopular';
import HomeSearch from './views/Search/HomeSearch';
import SearchResults from './views/SearchResults/SearchResults';
import MovieDetails from './views/MovieDetails/MovieDetails';

function App() {
  // 카카오 JavaScript 키 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
      console.log('[App.js] Kakao SDK init:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/signin" element={<SignIn />} />

          {/* 보호된 라우트 예시 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeMain />} />
            <Route path="popular" element={<HomePopular />} />
            <Route path="wishlist" element={<HomeWishlist />} />
            <Route path="search" element={<HomeSearch />} />
            <Route path="movie/:movieId" element={<MovieDetails />} />
          </Route>

          {/* 검색 결과 페이지 */}
          <Route
            path="/search/results"
            element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
