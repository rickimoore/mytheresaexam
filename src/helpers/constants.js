const BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MEDIA_TYPE = {
    MOVIE: 'MOVIE',
    TV: 'TV'
}

const CAROUSEL_TYPES = {
    UPCOMING: 'UPCOMING',
    POPULAR: 'POPULAR',
    TV: 'TV',
}

const LANDING_CAROUSELS = [
    {
        type: MEDIA_TYPE.MOVIE,
        category: CAROUSEL_TYPES.UPCOMING,
        header: 'Upcoming Movies',
        text: 'Be the first to see the hottest movies coming out soon!',
        apiUrl: `${BASE_API_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
        tileSize: 'big',
        timeImage: 'backdrop_path',
        interval: 2000,
        delay: 500
    },
    {
        type: MEDIA_TYPE.MOVIE,
        category: CAROUSEL_TYPES.POPULAR,
        header: 'Popular Movies',
        text: 'Watch the very best movies right now.',
        apiUrl: `${BASE_API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        tileSize: 'small',
        timeImage: 'poster_path',
        isDisableRotate: true
    },
    {
        type: MEDIA_TYPE.TV,
        category: CAROUSEL_TYPES.TV,
        header: 'TV Shows',
        text: 'Binge watch the best shows around the world.',
        apiUrl: `${BASE_API_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
        tileSize: 'small',
        isDisableRotate: true
    },
]

export {
    API_KEY,
    MEDIA_TYPE,
    BASE_API_URL,
    CAROUSEL_TYPES,
    LANDING_CAROUSELS
}