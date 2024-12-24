// src/services/URLService.js
import axios from 'axios';

class URLService {
  constructor() {
    this.apiKey = process.env.REACT_APP_TMDB_API_KEY; // 환경 변수 사용
    this.baseURL = 'https://api.themoviedb.org/3';
    this.language = 'ko-KR';
    this.headers = {
      'Content-Type': 'application/json',
    };
    this.imageBaseURL = 'https://image.tmdb.org/t/p/';
    this.posterSize = 'w300'; // 필요에 따라 변경 가능
    this.backdropSize = 'w780'; // 필요에 따라 변경 가능
  }

  // 이미지 URL 생성 메서드
  getPosterUrl(path) {
    return path ? `${this.imageBaseURL}${this.posterSize}${path}` : '/placeholder-image.jpg';
  }

  getBackdropUrl(path) {
    return path ? `${this.imageBaseURL}${this.backdropSize}${path}` : '';
  }

  // 인기 영화 목록 조회 URL 반환 메서드
  getURL4PopularMovies = () => {
    return `${this.baseURL}/movie/popular?api_key=${this.apiKey}&language=${this.language}`;
  };

  // 최신 영화 목록 조회 URL 반환 메서드
  getURL4ReleaseMovies = () => {
    return `${this.baseURL}/movie/now_playing?api_key=${this.apiKey}&language=${this.language}`;
  };

  getURL4TopRatedMovies = () => {
    return `${this.baseURL}/movie/top_rated?api_key=${this.apiKey}&language=${this.language}`;
  };

  getURL4GenreMovies = (genreId) => {
    return `${this.baseURL}/discover/movie?api_key=${this.apiKey}&language=${this.language}&with_genres=${genreId}&sort_by=popularity.desc`;
  };

  // 인기 영화 목록 조회 함수 (react-query용)
  fetchPopularMovies = async (page = 1) => {
    const response = await axios.get(`${this.baseURL}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        language: this.language,
        page,
      },
      headers: this.headers,
    });
    return response.data.results;
  };

  // 현재 상영 중인 영화 목록 조회 함수
  fetchNowPlayingMovies = async (page = 1) => {
    const response = await axios.get(`${this.baseURL}/movie/now_playing`, {
      params: {
        api_key: this.apiKey,
        language: this.language,
        page,
      },
      headers: this.headers,
    });
    return response.data.results;
  };

  // 높은 평점 영화 조회 함수 추가
  fetchTopRatedMovies = async (page = 1) => {
    const response = await axios.get(`${this.baseURL}/movie/top_rated`, {
      params: {
        api_key: this.apiKey,
        language: this.language,
        page,
      },
      headers: this.headers,
    });
    return response.data.results;
  };

  // 장르별 영화 조회 함수 추가
  fetchGenreMovies = async (genreId, page = 1) => {
    const response = await axios.get(`${this.baseURL}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        language: this.language,
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page,
      },
      headers: this.headers,
    });
    return response.data.results;
  };

  // 필터 기반 영화 목록 조회 함수
  fetchMoviesByFilters = async ({ page = 1, genreCode, sortingOrder, voteEverage }) => {
    try {
      const params = {
        api_key: this.apiKey,
        language: this.language,
        page,
        sort_by: sortingOrder || 'popularity.desc'
      };

      if (genreCode && genreCode !== '0') {
        params.with_genres = genreCode;
      }

      if (voteEverage && voteEverage !== -1) {
        params.vote_average_gte = voteEverage;
        params.vote_average_lte = voteEverage + 1;
      }

      const response = await axios.get(`${this.baseURL}/discover/movie`, {
        params,
        headers: this.headers
      });

      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // 영화 상세 정보 조회 함수
  fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`${this.baseURL}/movie/${movieId}`, {
      params: {
        api_key: this.apiKey,
        language: this.language,
      },
      headers: this.headers,
    });
    return response.data;
  };

  // 검색 및 장르 필터링 영화 목록 조회 함수
  searchMovies = async (query, page = 1, genre = '0') => {
    const params = {
      api_key: this.apiKey,
      language: this.language,
      query,
      page,
      include_adult: false,
    };

    if (genre !== '0') {
      params.with_genres = genre;
    }

    const response = await axios.get(`${this.baseURL}/search/movie`, {
      params,
      headers: this.headers,
    });
    return response.data;
  };

  // 장르 목록 조회 함수
  fetchGenres = async () => {
    const response = await axios.get(`${this.baseURL}/genre/movie/list`, {
      params: {
        api_key: this.apiKey,
        language: this.language,
      },
      headers: this.headers,
    });
    return response.data.genres;
  };
}

export default URLService;
