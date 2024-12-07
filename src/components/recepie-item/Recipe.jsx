import React, { useCallback, useContext, useState } from 'react'
import './recepie.css'
import { ThemeContext } from '../../App';
import { SPOONACULAR_API_KEY, SPOONACULAR_RECIPE_INFO_API } from '../../config';
import Modal from '../Modal';

const Recipe = ({ item, id, image, title }) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [recipeData, setRecipeData] = useState(null);

    // for changing theme using useContext
    const { theme } = useContext(ThemeContext);

    // for add to favorite functionality it will converted to useCallback hook later
    const addToFav = useCallback((recipeItem) => {
        try {
            const prevFavorite = JSON.parse(localStorage.getItem("favorites")) || [];
            const alreadyExists = prevFavorite.some((item) => item.id === recipeItem.id);
            if (!alreadyExists) {
                const updatedFavorites = [...prevFavorite, { ...recipeItem }];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                alert("Added to Favorite ❤️");
            } else {
                alert("Item is already added to favorites ❤️");
            }
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }, []);

    const viewRecipe = async (recipeId) => {
        try {
            const response = await fetch(
                `${SPOONACULAR_RECIPE_INFO_API}${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
            );
            if (!response.ok) {
                throw new Error("Something went wrong, Failed to load the data")
            }
            const data = await response.json();
            setRecipeData(data)
            setModalOpen(true)
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            <div className="recipe-card">
                <img className="card-image" src={image} alt="Recipe images" />
                <div className="card-content">
                    <h3>{title}</h3>
                    <div className="card-buttons">
                        <button
                            className="button favorite"
                            style={theme ? { backgroundColor: "#4caf50" } : {}}
                            type="button"
                            onClick={() => addToFav(item)}
                        >
                            Add to Favorite
                        </button>
                        <button
                            className="button view"
                            style={theme ? { backgroundColor: "#ff6b6b" } : {}}
                            type="button"
                            onClick={() => viewRecipe(id)}
                        >
                            View Recipe
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} contentData={recipeData} />}
        </>
    );
};

export default Recipe;