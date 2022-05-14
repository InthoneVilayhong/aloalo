import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Personnage.scss";

const Personnage = () => {
    const location = useLocation();
    const { name, picture, extension, description } = location.state;
    console.log(name);
    const params = useParams();
    // console.log(params.id);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvelbackendinthone.herokuapp.com/comics/${params.id}`
                    // `http://localhost:4001/comics/${params.id}`
                );
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [params.id]);

    return isLoading ? (
        <span>Very Slow ...</span>
    ) : (
        <div className="container-perso">
            <div className="container-top-perso">
                <div className="img-left-perso">
                    <img
                        src={`${picture}.${extension}`}
                        alt="persorepresentation"
                    />
                </div>
                <div className="img-right-perso">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <h1>Apparition dans les comics suivants</h1>
            <div className="container-comics-perso">
                {data.comics.map((comic, index) => {
                    return (
                        <div className="container-comic-perso" key={index}>
                            <h3>{comic.title}</h3>
                            <img
                                src={`${comic.thumbnail.path}.${extension}`}
                                alt="comic"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Personnage;
