import logomarvel from "../../assets/logomarvel.png";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ login, setLogin, setShowlogin }) => {
    const HandleClick = () => {
        setLogin(true);
        setShowlogin(false);
    };

    const HandleClickLogin = () => {
        setShowlogin(true);
        setLogin(false);
    };

    return (
        <div>
            <nav>
                <div className="container-nav">
                    <div className="container-logo">
                        <Link to="/">
                            <img
                                className="logo-marvel"
                                src={logomarvel}
                                alt="logo marvel"
                            />
                        </Link>
                    </div>
                    <div className="btn-login-container">
                        <button
                            className="btn-login"
                            onClick={HandleClickLogin}
                        >
                            Se Connecter
                        </button>
                        <button className="btn-login" onClick={HandleClick}>
                            Rejoins nous
                        </button>
                    </div>
                    <div className="container-btn-nav">
                        <Link to="/comics">
                            <button>Comics</button>
                        </Link>

                        <Link to="/personnages">
                            <button>Personnages</button>
                        </Link>
                        <Link to="/favoris">
                            <button>Favoris</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
