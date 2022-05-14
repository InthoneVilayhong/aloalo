import { useState, useEffect } from "react";
import axios from "axios";
import "./Comics.scss";
import Pagination from "../../components/Pagination/Pagination";

const Comics = () => {
    const [data, setData] = useState(); //! Request State
    const [isLoading, setIsLoading] = useState(true); //! Request State
    const [title, setTitle] = useState("");
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLimit, setpageLimit] = useState();

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
