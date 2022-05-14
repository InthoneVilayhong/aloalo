import { useState } from "react";
import axios from "axios";
import "./Modallogin.scss";
import logom from "../../assets/logomarvelM.png";

const Modallogin = ({ setShowlogin, setUser }) => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const close = () => {
        setShowlogin(false);
    };

    const response = async () => {
        try {
            //! la constante user prendra en valeurs les valeurs des inputs correspondants
            const user = {
                email: email,
                password: password,
            };
            //! requete envoyé en post avec la constante user après la virgule (Cf line25-26)
            const response = await axios.post(
                "http://localhost:4001/user/login",
                user
            );
            setUser(response.data.token);
            setShowlogin(false);
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            }
            console.log(error.response);
        }
    };

    const test = (e) => {
        e.preventDefault();
        response();
    };

    return (
        <div className="inscription-container">
            <div className="container-close">
                <img className="logom-img" src={logom} alt="" />

                <div>
                    <span>Close</span>
                    <button className="btn-close" onClick={close}>
                        <i className="fa-solid fa-circle-xmark fa-xl"></i>
                    </button>
                </div>
            </div>
            <div className="container-form">
                <h1>Connexion</h1>
                <form onSubmit={test}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ton mail"
                    />
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe "
                    />
                    <span style={{ color: "red" }}>{errorMessage}</span>
                    <input
                        className="btn-submit"
                        type="submit"
                        value="Connexion"
                    />
                </form>
            </div>
        </div>
    );
};
export default Modallogin;
