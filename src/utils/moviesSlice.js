import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {nowPlayingMovies: null, trendingMovies: null, popularMovies: null, upcomingMovies: null, topRatedMovies: null, trailerVideo: null},
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies =  action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies =  action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies =  action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies =  action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies =  action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo =  action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrendingMovies, addPopularMovies, addUpcomingMovies, addTopRatedMovies, addTrailerVideo } = moviesSlice.actions;

export default moviesSlice.reducer;
