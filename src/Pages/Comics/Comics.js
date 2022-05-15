import { useState, useEffect } from "react";
import axios from "axios";
import "./Comics.scss";
import Pagination from "../../components/Pagination/Pagination";

const Comics = ({ comicFavoris, setComicFavoris }) => {
    const [data, setData] = useState(); //! Request State
    const [isLoading, setIsLoading] = useState(true); //! Request State
    const [title, setTitle] = useState("");
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLimit, setpageLimit] = useState();
    // const [disable, setDisable] = useState(false);
    //! add favori comics
    const fetchFavoriComics = async (comic) => {
        try {
            const newFavoris = [...comicFavoris];
            newFavoris.push(comic);
            setComicFavoris(newFavoris);
            const response = await axios.post(
                "http://localhost:4001/comics/favoris/post",
                comic
            );
            console.log("toDb", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    //!remove favori comics

    const deleteFavoriComics = async (comic) => {
        try {
            const response = await axios.post(
                "http://localhost:4001/comics/favoris/delete",
                comic
            );
            console.log("toDb", response.data);

            const newFavoris = [...comicFavoris];

            let result = newFavoris.filter((fav) => fav._id !== comic._id);
            setComicFavoris(result);
        } catch (error) {
            console.log(error.message);
        }
    };
    ///////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvelbackendinthone.herokuapp.com/comics/?title=${title}&skip=${skip}`
                    // `http://localhost:4001/comics/?title=${title}&skip=${skip}`
                );
                setData(response.data);
                setpageLimit(
                    Math.ceil(response.data.count / response.data.limit)
                );
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [title, skip]);

    return isLoading ? (
        <div>Very slow ...</div>
    ) : (
        <div className="big-container">
            <h1>Comics de l'univers Marvel®</h1>
            <div className="container-bar-comic">
                <input
                    className="search-bar-comic"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Trouve ton comic préféré"
                />
                <div className="container-fa">
                    <i className="fa-solid fa-magnifying-glass loupe"></i>
                </div>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                data={data}
                setSkip={setSkip}
                pageLimit={pageLimit}
                setpageLimit={setpageLimit}
            />

            <div id="container-page">
                {data.results.map((comic, index) => {
                    return (
                        <div className="container-comics-page" key={index}>
                            <button
                                // disabled={disable}
                                onClick={() => {
                                    fetchFavoriComics(comic);
                                    // setDisable(true);
                                }}
                            >
                                add
                            </button>

                            <button
                                onClick={() => {
                                    deleteFavoriComics(comic);
                                }}
                            >
                                remove
                            </button>
                            <div>
                                <img
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt=""
                                />
                            </div>
                            <div>
                                <h2>{comic.title}</h2>
                                <p>{comic.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Pagination
                page={page}
                setPage={setPage}
                data={data}
                setSkip={setSkip}
                pageLimit={pageLimit}
                setpageLimit={setpageLimit}
            />
        </div>
    );
};

export default Comics;
