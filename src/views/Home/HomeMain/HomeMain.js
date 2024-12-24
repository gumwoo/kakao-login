// src/views/Home/HomeMain/HomeMain.js

import React from 'react';
import Banner from '../../../components/Banner/Banner';
import MovieRow from '../../../components/MovieRow/MovieRow';
import URLService from '../../../services/URLService';
import { useQuery } from '@tanstack/react-query';
import './HomeMain.css';

function HomeMain() {
  const urlService = new URLService();

  const { data: featuredMovie, isLoading, isError, error } = useQuery({
    queryKey: ['featuredMovies'],
    queryFn: async () => {
      const movies = await urlService.fetchPopularMovies(1);
      return movies[0];
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>영화를 불러오는 중 오류가 발생했습니다: {error.message}</p>;

  return (
    <div className="home-main">
      <Banner movie={featuredMovie} />
      <MovieRow title="현재 인기 콘텐츠" fetchUrl={urlService.getURL4PopularMovies()} />
      <MovieRow title="최신 개봉작" fetchUrl={urlService.getURL4ReleaseMovies()} />
      <MovieRow title="높은 평점 영화" fetchUrl={urlService.getURL4TopRatedMovies()} />
      <MovieRow title="인기 액션 영화" fetchUrl={urlService.getURL4GenreMovies('28')} />
      <MovieRow title="인기 로맨스 영화" fetchUrl={urlService.getURL4GenreMovies('10749')} />
    </div>
  );
}

export default HomeMain;
