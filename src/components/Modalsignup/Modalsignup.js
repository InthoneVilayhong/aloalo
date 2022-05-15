import "./Modalsignup.scss";
import logom from "../../assets/logomarvelM.png";
import { useState } from "react";
import axios from "axios";

const Modalsignup = ({ login, setLogin, setUser }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signUp = async () => {
        try {
            const user = {
                email: email.toLowerCase(),
                username: username,
                password: password,
                confirm: confirm,
            };
            const response = await axios.post(
                `https://marvelbackendinthone.herokuapp.com/user/signup`,
                user
            );

            setUser(response.data.token);
            setLogin(false);
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            }

            console.log(error.response);
        }
    };
    //Close the modal
    const close = () => {
        setLogin(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp();
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
                <h1>Deviens un Super Héros</h1>
                <form action="submit" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ton mail"
                    />
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ton nom de super héro"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe "
                    />
                    <input
                        type="password"
                        name="confirmpassword"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Confirme ton mot de passe"
                    />
                    <span style={{ color: "red" }}>{errorMessage}</span>
                    <input
                        className="btn-submit"
                        type="submit"
                        value="Confirmer"
                    />
                </form>
            </div>
        </div>
    );
};

export default Modalsignup;
