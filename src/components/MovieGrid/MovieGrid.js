// src/components/MovieGrid/MovieGrid.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { useInfiniteQuery } from '@tanstack/react-query';
import URLService from '../../services/URLService';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

function MovieGrid({ fetchUrl }) {
  const [showTopButton, setShowTopButton] = useState(false);
  const urlService = new URLService();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const gridContainerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // 무한 스크롤을 위한 useInfiniteQuery 사용
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', fetchUrl],
    queryFn: ({ pageParam = 1 }) => {
      if (fetchUrl.includes('/movie/popular')) {
        return urlService.fetchPopularMovies(pageParam);
      } else if (fetchUrl.includes('/movie/now_playing')) {
        return urlService.fetchNowPlayingMovies(pageParam);
      } else if (fetchUrl.includes('/discover/movie')) {
        const url = new URL(fetchUrl);
        const genre = url.searchParams.get('with_genres');
        return urlService.fetchMoviesByGenre(genre, pageParam);
      }
      throw new Error('Invalid fetch URL');
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined; // 더 이상 페이지가 없을 경우
      return pages.length + 1;
    },
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
  });

  // 무한 스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '100px' }
    );

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  if (isLoading) {
    return (
      <div className="movie-grid">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="movie-grid">
        <div className="error-message">
          영화를 불러오는 중 오류가 발생했습니다: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className={`grid-container grid`}>
        {data.pages.map((page, pageIndex) =>
          page.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={isInWishlist(movie.id)}
            />
          ))
        )}
      </div>
      <div ref={loadMoreRef} className="load-more">
        {isFetchingNextPage && <div className="loading-spinner">Loading more...</div>}
        {!hasNextPage && <div className="end-message">더 이상 영화가 없습니다.</div>}
      </div>
      {showTopButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          Top
        </button>
      )}
    </div>
  );
}

export default MovieGrid;
