import React, { useContext, useEffect, useState } from 'react'
import './homepage.css'
import { ThemeContext } from '../App'
import Recipe from '../components/recepie-item/Recipe';
import { SPOONACULAR_API_KEY, SPOONACULAR_RANDOM_RECIPE_API, SPOONACULAR_RECIPE_API } from '../config';

const Homepage = () => {
    // random recipe state
    const [randomRecipe, setRandomRecipe] = useState([]);
    // loading state
    const [loading, setLoading] = useState(false);
    // save results that receive from api
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    // using react useContext hook
    const { theme } = useContext(ThemeContext);

    // using useEffect hook for rendering favorite items in page
    useEffect(() => {

        const getRandomRecipe = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${SPOONACULAR_RANDOM_RECIPE_API}&apiKey=${SPOONACULAR_API_KEY}`);
                if (!response.ok) {
                    throw new Error("Something went wrong, Failed to load the data")
                }
                const data = await response.json();
                setRandomRecipe(data?.recipes);
                setLoading(false);
            } catch (e) {
                alert(e.message)
            }
        }
        getRandomRecipe();
    }, []);

    // for getting the data from search box
    const handleSubmit = (e) => {
        e.preventDefault();

        // calling the api
        const getRecipes = async () => {
            try {
                setLoading(true);
                const apiResponse = await fetch(
                    `${SPOONACULAR_RECIPE_API}?apiKey=${SPOONACULAR_API_KEY}&query=${searchQuery}`
                );
                if (!apiResponse.ok) {
                    throw new Error("Something went wrong, Failed to load the data");
                }
                const result = await apiResponse.json();

                const { results } = result;
                
                if (results && results.length > 0) {
                    // set the loading state as false
                    // set the recipes state
                    setLoading(false);
                    setRecipes(results);
                    setSearchQuery("");
                } else {
                    alert('Something went wrong, Check your Recipe Spelling and try again!');
                    setLoading(false);
                }
            } catch (e) {
                alert(e.message)
            }
        };
        getRecipes();
    };

    return (
        <main className="home-container">
            <div>
                <form action="" onSubmit={handleSubmit} className="search">
                    <input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        name="search"
                        id="search-inp"
                        placeholder="What do you want to cook today?, find here"
                        value={searchQuery}
                        required
                    />
                    <button style={theme ? { backgroundColor: "#ff4d4d" } : {}} type="submit">
                        Search
                    </button>
                </form>
            </div>
            {/* show loading state */}
            {loading && (
                <div className="loading" style={theme ? { color: "#white" } : {}}>
                    Loading Recipes, Please Wait
                </div>
            )}
            {/* Map(render) through all recipes  */}
            <div className="items">
                {recipes && recipes.length > 0 ? (
                    recipes.map((item) => (
                        <Recipe key={item.id} item={item} id={item.id} image={item.image} title={item.title} />
                    ))
                ) : randomRecipe && randomRecipe.length > 0 ? (
                    randomRecipe.map((item) => (
                        <Recipe key={item.id} item={item} id={item.id} image={item.image} title={item.title} />
                    ))
                ) : (
                    <div>....</div> // Fallback message
                )}
            </div>
        </main>
    );
}

export default Homepage