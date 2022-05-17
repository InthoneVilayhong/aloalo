// import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const Favoris = ({ token }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4001/comics/favoris/get`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [token]);

    return isLoading ? (
        <div>Very Slow ... </div>
    ) : (
        <div>
            {data.map((comic, index) => {
                return <span key={index}>{comic.title}</span>;
            })}
        </div>
    );
};

export default Favoris;
