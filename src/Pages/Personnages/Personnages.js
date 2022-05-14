import { useEffect, useState } from "react";
import axios from "axios";
import "./Personnages.scss";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Cookies from "js-cookie";

const Personnages = ({ perso, setperso }) => {
    const [data, setData] = useState(); //! Request State
    const [isLoading, setIsLoading] = useState(true); //! Request State
    const [name, setName] = useState("");
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLimit, setpageLimit] = useState();

    const handleClickAdd = async (personnage) => {
        const newArray = [...perso];
        if (newArray.indexOf(personnage) === -1) {
            newArray.push(personnage);
            await setperso(newArray);
            Cookies.set("test", JSON.stringify(perso));
        }
    };

    const handleClickRemove = (personnage) => {
        const newArray = perso.filter((item) => item._id !== personnage._id);
        setperso(newArray);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    // `https://marvelbackendinthone.herokuapp.com/characters/?name=${name}&skip=${skip}`
                    `http://localhost:4001/characters?name=${name}&skip=${skip}`
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
    }, [name, skip]);

    // const test = console.log(JSON.parse(Cookies.get("test")));
    // console.log(test);
    return isLoading ? (
        <div>Very slow ...</div>
    ) : (
        <div className="container-page">
            <h1>Personnages de l'univers Marvel®</h1>
            <div className="container-search-bar">
                <input
                    className="search-bar-character"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Trouve ton héros favori"
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
            <div className="page-style">
                {data.results.map((personnage, index) => {
                    return (
                        <div key={index} className="container-img">
                            <div className="container-favori">
                                {perso.indexOf(personnage) === -1 ? (
                                    <button
                                        onClick={() => {
                                            handleClickAdd(personnage);
                                        }}
                                    >
                                        <i
                                            style={{ color: "red" }}
                                            className="fa-solid fa-heart favori"
                                        ></i>
                                        <span>Ajouter au favori</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleClickRemove(personnage);
                                        }}
                                    >
                                        <i
                                            style={{ color: "red" }}
                                            className="fa-regular fa-heart favori"
                                        ></i>
                                        <span>Retirer des favoris</span>
                                    </button>
                                )}
                            </div>
                            <Link
                                to={`/personnage/${personnage._id}`}
                                state={{
                                    name: personnage.name,
                                    picture: personnage.thumbnail.path,
                                    extension: personnage.thumbnail.extension,
                                    description: personnage.description,
                                }}
                            >
                                <div className="img-style">
                                    <img
                                        src={`${personnage.thumbnail.path}.${personnage.thumbnail.extension}`}
                                        alt="personnage-marvel"
                                    />

                                    <div className="bot-img">
                                        <span className="char-name">
                                            {personnage.name}
                                        </span>
                                        {personnage.description && (
                                            <span className="char-desc">
                                                {personnage.description}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
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

export default Personnages;
