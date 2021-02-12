export default function useGlobal(){
    const popURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
    const bg = 'https://image.tmdb.org/t/p/w1280';
    const searchURL = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

    return{
        popURL,
        bg,
        searchURL
    }
}