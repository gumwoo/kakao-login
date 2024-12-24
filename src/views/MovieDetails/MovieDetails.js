// src/views/MovieDetails/MovieDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import URLService from '../../services/URLService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './MovieDetails.css';

function MovieDetails() {
  const { movieId } = useParams();
  const urlService = new URLService();

  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => urlService.fetchMovieDetails(movieId),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>영화 상세 정보를 불러오는 중 오류가 발생했습니다: {error.message}</p>;

  return (
    <div className="movie-details">
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(${urlService.getBackdropUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="movie-details-content">
          <img
            src={urlService.getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p><strong>개봉일:</strong> {movie.release_date}</p>
            <p><strong>장르:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>평점:</strong> {movie.vote_average} / 10</p>
            <p><strong>줄거리:</strong> {movie.overview}</p>
            <button className="play-btn">재생</button>
            <button className="info-btn">상세 정보</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
