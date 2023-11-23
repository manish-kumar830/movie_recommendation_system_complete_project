import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function Recommendation() {

    const [movieList, setMovieList] = useState(null);
    const [recommendList, setRecommendList] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/movie_title").then((response) => {
            setMovieList(response.data.title)
        });
    }, []);

    function recommendMovie() {
        // const url = `http://localhost:8000/recommend-movie/${selectedOptions.value}`
        axios.get(`http://localhost:8000/recommend-movie/${selectedOptions.value}`).then((response) => {
            setRecommendList(response.data.recommendation)
            console.log(response.data.recommendation);
        });
        
    }

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    return (

        <>
            <div className="recommendation_page">

                <div className="div_layout">

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh' }}>
                        <h2>Select Movie For Recommendation</h2>
                    </div>

                    <div className="dropdown-container" style={{ marginLeft: '25vw', marginRight: '25vw', marginTop:'3vh' }}>
                        <Select
                            options={movieList}
                            placeholder="Select Movie"
                            value={selectedOptions}
                            onChange={handleSelect}
                            isSearchable={true}
                        />
                    </div>

                    <div className="d-flex justify-content-center" style={{marginTop:'3vh'}}>
                        <button type="button" className="btn btn-primary" onClick={recommendMovie}>Recommend</button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh' }}>
                        {
                    recommendList ? (
                        recommendList?.map((e) => {
                            return (
                                <>
                                    <div key={e.imdb_id} className="card" style={{ width: '150px', height: '250px', marginTop: '15px', marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}>
                                        <img className="card-img-top" src={e.poster_path} alt="Card image" style={{ width: '100%', height: '200px' }} />
                                        <div style={{ marginTop: '3px', textAlign: 'center' }}>
                                            <p style={{ fontSize: "12px", fontWeight: 'bold' }}>{e.movie_name}</p>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    ) : (

                        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height:'30vh' }}>
                            
                        </div>
                        
                    )
                }
                    </div>

                </div>

            </div>
        </>
    );
}

export default Recommendation;
