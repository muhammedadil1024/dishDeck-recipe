import { useContext, useState } from "react";
import Theme from "./theme-button/Theme";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    return (
        <header className="nav-container">
            <div className="lef-section">
                <div className="navbar">
                    <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                        <div
                            className={`line ${isOpen ? "rotate1" : ""}`}
                            style={theme ? { background: "#fff" } : {}}
                        ></div>
                        <div className={`line ${isOpen ? "fade" : ""}`} style={theme ? { background: "#fff" } : {}}></div>
                        <div
                            className={`line ${isOpen ? "rotate2" : ""}`}
                            style={theme ? { background: "#fff" } : {}}
                        ></div>
                    </div>
                    <nav className={`menu-container ${isOpen ? "show" : ""}`}>
                        <Link to={"/"} className="menu-item" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link to={"favorites"} className="menu-item" onClick={() => setIsOpen(false)}>
                            Favorites ❤️
                        </Link>
                    </nav>
                </div>
                <h2>
                    <Link style={theme ? {color: "#fff", textDecoration: "none",} : {color: "#000", textDecoration: "none",}} to="/">DishDeck</Link>
                </h2>
            </div>
            <div className="">
                <Theme />
            </div>
        </header>
    );
};

export default Navbar;
