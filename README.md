# DishDeck - Recipe Finder app

![Demo App](/public/demo.png)

This is a Recipe finder website using React js and Spoonacular Recipe API.

## Features

* View all Dishes
* User can view Recipe details while clicking `View Recipe` Button.
* User can add Dishes to Wishlist while clicking `Add to Favorite` Button.
* User can Find their Favorite or Wanted Dishes & Recipes through Search functionality.
* Go to Favorites Page and User can view or edit their Favorite Dishes.

## Installation and Setup Locally

To install and run this project Locally: 

* Download Zip or Clone the repository
```shell
    git clone https://github.com/muhammedadil1024/dishDeck-recipe.git
```
```shell
    cd dishDeck-recipe
```
* Install all dependencies:
```js
    npm install
```
* Go to [Spoonacular API Dashboard](https://spoonacular.com/food-api/console#Dashboard) and Get your API Key.
* Setup .env file:
    - Create a .env file in the root of your project directory.
 ```js
    REACT_APP_SPOONACULAR_RANDOM_RECIPE_API=https://api.spoonacular.com/recipes/random?number=15 
    REACT_APP_SPOONACULAR_RECIPE_API=https://api.spoonacular.com/recipes/complexSearch
    REACT_APP_SPOONACULAR_API_KEY=your_api_key
    REACT_APP_SPOONACULAR_RECIPE_INFO_API=https://api.spoonacular.com/recipes/
```
*  Start the app:
```js
    npm start
```