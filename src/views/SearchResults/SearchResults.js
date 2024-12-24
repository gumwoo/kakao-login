// src/views/SearchResults/SearchResults.js

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import URLService from '../../services/URLService';
import MovieCard from '../../components/MovieCard/MovieCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import './SearchResults.css';

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const queryParams = useQueryParams();
  const query = queryParams.get('query') || '';
  const genre = queryParams.get('genre') || '0'; // '0'은 모든 장르
  const urlService = new URLService();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const loadMoreRef = React.useRef(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchMovies', query, genre],
    queryFn: ({ pageParam = 1 }) => urlService.searchMovies(query, pageParam, genre),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined;
      return lastPage.page + 1;
    },
    enabled: query.trim() !== '',
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  // 무한 스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    if (!hasNextPage) return;

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

  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  // 검색어가 비어있는 경우 메시지 표시
  if (!query.trim()) {
    return (
      <div className="search-results">
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>검색 결과를 불러오는 중 오류가 발생했습니다: {error.message}</p>;

  return (
    <div className="search-results">
      <h2>"{query}" 검색 결과</h2>
      <div className="grid-container">
        {data.pages.map((page, pageIndex) =>
          page.results.map((movie) => (
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
        {isFetchingNextPage && <LoadingSpinner />}
        {!hasNextPage && <p>더 이상 검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
}

export default SearchResults;
