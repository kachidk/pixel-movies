import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import { HomeIcon, SearchIcon, StarIcon, ChartBarIcon, ArrowCircleUp, UserGroup } from '../assets/svg/Index'
import useGlobal from '../global';

function Home() {
  
    const{ searchURL, popURL, bg } = useGlobal();
    
    const [imgs, setImgs] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');


    function parseImgResponse(movies){
      return movies.results.reduce((acc, movie)=> {
          if(!movie.poster_path){
            return acc
          }
          acc.push({
            poster: `${bg}${movie.poster_path}`,
            date: movie.release_date,
            title: movie.title,
            overview: movie.overview,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            popularity: movie.popularity
          })
          return acc;
        },[]);
    }

    useEffect(() => {
      fetch(popURL).then(
        (info)=> info.json()
      ).then(
        (movies)=> {
           setImgs(parseImgResponse(movies));
        })
    },[])


    function search(){
      if(searchTerm === ""){
        return;
      }
      setLoading(true);
      fetch(`${searchURL}${searchTerm}`).then(
        (val)=>  val.json())
      .then(
        (movies)=> {
          setImgs(parseImgResponse(movies));
        }
      )
      .then( 
        setLoading(false)
        )
    }

    function seeHome(){
      fetch(popURL).then(
        (info)=> info.json()
      ).then(
        (movies)=> {
           setImgs(parseImgResponse(movies));
        })
       .then(
         setSearchTerm('')
       ) 
    }

    function handleKeyPress(event) {
      if(event.key === 'Enter'){
        event.preventDefault();
        search()
      }
    }

    function topFunction(){
      document.body.scrollTo({ top: 0, behavior: 'smooth' }); // For Safari
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); // For Chrome, Firefox, IE and Opera
    }

    return (
        <>
        {loading && <Loader/>}
          <main className="md:p-10">
            <form onSubmit={e => { e.preventDefault() }}>
              <div className="flex flex-row items-center justify-center m-auto md:flex-row">
              <button onClick={seeHome} className="h-full p-2 mr-2 text-2xl text-gray-100 uppercase bg-blue-500 rounded-md w-min md:mr-4"><HomeIcon/></button>
                <input type="text" placeholder="SEARCH" className="h-10 pl-4 my-1 bg-gray-100 rounded-md lg:w-2/12 md:h-12 md:my-0"
                  value={searchTerm}
                  onKeyPress={handleKeyPress}
                  onChange={event => setSearchTerm(event.target.value)}
                />
                <button onClick={search} className="h-full p-2 ml-2 text-2xl text-gray-100 uppercase bg-blue-500 rounded-md w-min md:ml-4"><SearchIcon/></button>
              </div>
            </form>
              <div className="flex flex-wrap justify-around text-gray-100">
                {imgs.map((img, index) => 
                  <div key={index} className="w-64 p-3 mx-2 mt-4 rounded-md bg-dark2">
                  <img src={img.poster} alt="" />
                  <h3 className="text-xl font-extrabold text-blue-500">{img.title}</h3>
                    <p>{img.date}</p>
                  <div className="flex items-center">
                    <span className="flex mr-2"><div className="w-6 h-6 text-yellow-400"><StarIcon/></div> {img.voteAverage}</span>
                    <span className="flex mr-2"><div className="w-6 h-6 text-blue-500 mr-0.5"><UserGroup/></div>{img.voteCount}</span>
                    <span className="flex"><div className="w-6 h-6 text-blue-500"><ChartBarIcon/></div>{img.popularity}</span>
                  </div>
                  {img.overview ?
                  <p className="p-1 mt-2 overflow-auto border border-blue-500 rounded-md max-h-52 md:max-h-full">{img.overview}</p> :
                  null }
                  
                </div>
                )}
              </div>
          </main>  
          <footer className="flex justify-end mb-4 mr-5">
            <div className="w-16 h-16 text-blue-500 animate-bounce" onClick={topFunction}>
              <ArrowCircleUp/>
            </div>
          </footer>
        </>
    )
}

export default Home
