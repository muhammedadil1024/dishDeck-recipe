import React, { useContext, useEffect, useReducer, useState } from 'react'
import "../components/recepie-item//recepie.css";
import { Link } from 'react-router-dom';
import { ThemeContext } from "../App";
import { SPOONACULAR_API_KEY, SPOONACULAR_RECIPE_INFO_API } from '../config';
import Modal from '../components/Modal';

const reducer = (state, action) => {
    switch (action.type) {
        case "filterFavorites":
            return {
                ...state,
                filteredValue: action.value,
            };

        default:
            return state;
    }
};

const initialState = {
    filteredValue: "",
};

const Favorites = () => {
    // favorites data storing state
    const [favorites, setFavorites] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [recipeData, setRecipeData] = useState(null);

    // for changing theme using useContext
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const getFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(getFavorites);
    }, []);

    // using useReducer hook
    const [filteredState, dispatch] = useReducer(reducer, initialState);

    // Filtered favorites based on the search input
    const filteredFavorites = favorites.filter((item) =>
        item.title.toLowerCase().includes(filteredState.filteredValue.toLowerCase())
    );

    // for remove items from favorite list
    const removeFromFav = (currentId) => {
        const copyFavorites = favorites.filter((item) => item.id !== currentId);
        setFavorites(copyFavorites);
        localStorage.setItem("favorites", JSON.stringify(copyFavorites));
        alert("Removed from Favorites");
    };

    const viewRecipe = async (recipeId) => {
        try {
            const response = await fetch(
                `${SPOONACULAR_RECIPE_INFO_API}${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
            );
            if (!response.ok) {
                throw new Error("Something went wrong, Failed to load the data");
            }
            const data = await response.json();
            setRecipeData(data);
            setModalOpen(true);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            {favorites && favorites.length > 0 ? (
                <div className="favorites-wrapper">
                    <h1 className="favorites-title">My Favorites</h1>
                    <div className="search-favorites">
                        <input
                            onChange={(event) => dispatch({ type: "filterFavorites", value: event.target.value })}
                            value={filteredState.filteredValue}
                            type="text"
                            name="searchFavorites"
                            placeholder="Search Favorites"
                        />
                    </div>
                    <div className="favorites">
                        {filteredFavorites.length > 0 ? (
                            filteredFavorites.map((item) => (
                                <div className="recipe-card" key={item.id}>
                                    <img className="card-image" src={item.image} alt="favorite images" />
                                    <div className="card-content">
                                        <h3>{item.title}</h3>
                                        <div className="card-buttons-favorite">
                                            <button
                                                className="button favorite"
                                                style={theme ? { backgroundColor: "#4caf50" } : {}}
                                                type="button"
                                                onClick={() => removeFromFav(item.id)}
                                            >
                                                Remove From Favorites
                                            </button>
                                            <button
                                                className="button view"
                                                style={theme ? { backgroundColor: "#ff6b6b" } : {}}
                                                type="button"
                                                onClick={() => viewRecipe(item.id)}
                                            >
                                                View Recipe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No favorites match your search!</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="no-items">
                    <h2 style={theme ? { color: "white" } : {}}>No Favorites Found</h2>
                    <Link className="button view link" to="/">
                        Back to Home
                    </Link>
                </div>
            )}
            {isModalOpen && <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} contentData={recipeData} />}
        </>
    );
};

export default Favorites;