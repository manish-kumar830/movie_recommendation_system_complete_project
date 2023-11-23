import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {

    const navigate = useNavigate();

    const [movieList, setMovieList] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:8000/movie_title_poster_path").then((response) => {
            console.log(response.data.movie_list);
            setMovieList(response.data.movie_list)
        });
    }, []);

    return (
        <>

            <div style={{ marginTop: '20px' }}></div>

            <div className="home" style={{ display: 'flex', marginLeft: '20px', marginRight: '20px', justifyContent: 'center', flexWrap: "wrap" }}>

                {
                    movieList ? (
                        movieList?.map((e) => {
                            return (
                                <>
                                    <div className="card" style={{ width: '150px', height: '250px', marginTop: '15px', marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}>
                                        <img className="card-img-top" src={e.poster_path} alt="Card image" style={{ width: '100%', height: '200px' }} />
                                        <div style={{ marginTop: '3px', textAlign: 'center' }}>
                                            <p style={{ fontSize: "12px", fontWeight: 'bold' }}>{e.original_title}</p>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    ) : (

                        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height:'70vh' }}>
                            <h1>Loading...</h1>
                        </div>
                        
                    )
                }

            </div>

            <div style={{ marginBottom: '20px' }}></div>
        </>
    );
}

export default Home;
