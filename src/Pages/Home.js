import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/comics1.jpeg";
import img2 from "../assets/comics2.jpeg";
import img3 from "../assets/comics3.jpeg";
import "./Home.scss";

const Home = () => {
    return (
        <div>
            <Carousel autoPlay interval={3000} infiniteLoop showStatus={false}>
                <div className="container-slider">
                    <img className="img" src={img1} alt="" />
                </div>
                <div className="container-slider">
                    <img className="img" src={img2} alt="" />
                </div>
                <div className="container-slider">
                    <img className="img" src={img3} alt="" />
                </div>
            </Carousel>
        </div>
    );
};

export default Home;
