// src/components/MovieInfiniteScroll/MovieInfiniteScroll.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { useInfiniteQuery } from '@tanstack/react-query';
import URLService from '../../services/URLService';
import './MovieInfiniteScroll.css';

function MovieInfiniteScroll({ genreCode, sortingOrder, voteEverage }) {
  const urlService = new URLService();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const gridContainerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const [rowSize, setRowSize] = useState(4);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentView] = useState('grid');
  const [showTopButton, setShowTopButton] = useState(false);

  // **1. Declare useInfiniteQuery hook before useEffect hooks**
  const {
    data,
    isLoading: loading,
    isError: error,
    error: fetchError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', genreCode, sortingOrder, voteEverage],
    queryFn: ({ pageParam = 1 }) => {
      return urlService.fetchMoviesByFilters({
        page: pageParam,
        genreCode,
        sortingOrder,
        voteEverage,
      });
    },
    getNextPageParam: (lastPage) => {
      // lastPage가 없거나 results가 비어있으면 더 이상 데이터를 가져오지 않음
      if (!lastPage || !lastPage.results || lastPage.results.length === 0) {
        return undefined;
      }
      
      // 현재 페이지가 총 페이지 수보다 작으면 다음 페이지 가져오기
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  // **2. Declare handleResize and handleScroll functions before useEffect hooks**
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    if (gridContainerRef.current) {
      const containerWidth = gridContainerRef.current.offsetWidth;
      const movieCardWidth = isMobile ? 120 : 200;
      const horizontalGap = isMobile ? 10 : 20;
      const newRowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      setRowSize(newRowSize);
    }
  }, [isMobile]);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowTopButton(scrollTop > 300);
  };

  // **3. useEffect hooks**
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize]);

  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef && hasNextPage && !isFetchingNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { rootMargin: '100px' }
      );
      observer.observe(currentLoadMoreRef);

      return () => {
        if (currentLoadMoreRef) {
          observer.unobserve(currentLoadMoreRef);
        }
      };
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Rest of your code remains unchanged

  const scrollToTopAndReset = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // If needed, reset movie list here
  };

  const toggleWishlistHandler = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  if (loading) {
    return (
      <div className="movie-grid">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-grid">
        <div className="error-message">Failed to load movies: {fetchError.message}</div>
      </div>
    );
  }

  const movies = data.pages.flatMap((page) => page.results);

  const visibleMovieGroups = movies.reduce((resultArray, item, index) => {
    const groupIndex = Math.floor(index / rowSize);
    if (!resultArray[groupIndex]) {
      resultArray[groupIndex] = [];
    }
    resultArray[groupIndex].push(item);
    return resultArray;
  }, []);

  const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
  };

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className={`grid-container ${currentView}`}>
        {visibleMovieGroups.map((movieGroup, i) => (
          <div key={i} className={`movie-row ${movieGroup.length === rowSize ? 'full' : ''}`}>
            {movieGroup.map((movie) => (
              <div
                key={movie.id}
                className="infinite-scroll-movie-card" // 클래스 이름 변경
                onClick={() => toggleWishlistHandler(movie)}
              >
                <img src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="infinite-scroll-movie-poster"/>
                <div className="infinite-scroll-movie-title">{movie.title}</div>
                {isInWishlist(movie.id) && (
                  <div className="wishlist-indicator">👍</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={loadMoreRef} className="loading-trigger">
        {isFetchingNextPage && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
      {showTopButton && (
        <button onClick={scrollToTopAndReset} className="top-button">
          Top
        </button>
      )}
    </div>
  );
}

export default MovieInfiniteScroll;
