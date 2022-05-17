import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./reset.scss";
import "./App.scss";
import Cookies from "js-cookie";

import Home from "./Pages/Home";
import Header from "./components/Header/Header";
import Personnages from "./Pages/Personnages/Personnages";
import Personnage from "./Pages/Personnage/Personnage";
import Comics from "./Pages/Comics/Comics";
import Favoris from "./Pages/Favoris/Favoris";
import Footer from "./components/Footer/Footer";
import Modalsignup from "./components/Modalsignup/Modalsignup";
import Modallogin from "./components/Modallogin/Modallogin";

function App() {
    const [perso, setperso] = useState([]);
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(Cookies.get("userToken") || null);
    const [showlogin, setShowlogin] = useState(false);
    const [comicFavoris, setComicFavoris] = useState([]);

    //! setUser function is used to create account, login & disconnect
    const setUser = (token) => {
        if (token !== null) {
            Cookies.set("userToken", token, { expires: 10 });
        } else {
            Cookies.remove("userToken");
        }
        setToken(token);
    };

    return (
        <Router>
            <div className="test">
                <div>
                    {login ? (
                        <Modalsignup
                            setUser={setUser}
                            setLogin={setLogin}
                            login={login}
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div>
                    {showlogin ? (
                        <Modallogin
                            setShowlogin={setShowlogin}
                            setUser={setUser}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <Header
                login={login}
                setLogin={setLogin}
                setShowlogin={setShowlogin}
                token={token}
                setUser={setUser}
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/personnages"
                    element={
                        <Personnages
                            perso={perso}
                            setperso={setperso}
                            token={token}
                        />
                    }
                />
                <Route path="/personnage/:id" element={<Personnage />} />
                <Route
                    path="/comics"
                    element={
                        <Comics
                            comicFavoris={comicFavoris}
                            setComicFavoris={setComicFavoris}
                        />
                    }
                />
                <Route path="/favoris" element={<Favoris token={token} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
