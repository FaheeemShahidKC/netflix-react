import React, { useState, useEffect } from 'react';
import './RowPost.css';
import { imageUrl, API_KEY } from '../../constants/constants';
import axios from '../../axios';
import YouTube from 'react-youtube';

function RowPost({ title, isSmall, url }) {
     const [movies, setMovies] = useState([]);
     const [youtubeTrailer, setYoutubeTrailer] = useState();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchMovies = async () => {
               try {
                    const response = await axios.get(url);
                    setMovies(response.data.results);
                    setLoading(false);
               } catch (error) {
                    console.error('Error fetching movies:', error);
                    setLoading(false);
               }
          };

          fetchMovies();
     }, [url])

     const handleYoutubeVideo = async (id) => {
          try {
               const response = await axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
               if (response.data.results.length > 0) {
                    setYoutubeTrailer(response.data.results[0]);
               } else {
                    console.log("No trailers available for this movie.");
               }
          } catch (error) {
               console.error('Error fetching YouTube video:', error);
          }
     }

     const opts = {
          height: '390',
          width: '100%',
          playerVars: {
               autoplay: 1,
          },
     }

     return (
          <div className='row'>
               {
                    loading ? (
                         <div id="loader" class="nfLoader"></div>
                    ) : (
                         <>
                              <h2>{title}</h2>
                              <div className='posters'>
                                   {movies.map((movie, index) => (
                                        <img
                                             key={index}
                                             onClick={() => handleYoutubeVideo(movie.id)}
                                             className={isSmall ? 'small-poster' : 'poster'}
                                             alt='poster'
                                             src={movie.backdrop_path ? `${imageUrl + movie.backdrop_path}` : 'https://example.com/alternative-image.jpg'}
                                        />
                                        
                                   ))}
                              </div>
                         </>
                    )
               }
               {
                    youtubeTrailer && <YouTube opts={opts} videoId={youtubeTrailer.key} />
               }
          </div>
     )
}

export default RowPost