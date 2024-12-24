// src/hooks/useFetch.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * useFetch 훅 (react-query v5 호환)
 * @param {string} url - 데이터 패칭을 위한 URL
 * @param {object} params - API 요청 시 사용할 쿼리 파라미터
 * @returns {object} - react-query의 useQuery 반환값
 */
function useFetch(url, params = {}) {
  return useQuery({
    queryKey: [url, params],
    queryFn: async () => {
      const { data } = await axios.get(url, { params });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
    keepPreviousData: true,
  });
}

export default useFetch;
