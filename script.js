const apiKey = 'ba77696fdd6845dc8466eb1a8c6be478';

document.getElementById('searchButton').addEventListener('click', function () {
    const ingredients = document.getElementById('ingredients').value.trim();
    if (!ingredients) {
        alert('Please enter some ingredients.');
        return;
    }
    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredients}&cuisine=Indian&number=9`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                document.getElementById('recipes').innerHTML = '<p>No recipes found. Please try different ingredients.</p>';
            } else {
                displayRecipes(data.results);
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            document.getElementById('recipes').innerHTML = '<p>There was an error fetching the recipes. Please try again later.</p>';
        });
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipes');
    recipeContainer.innerHTML = '';  // Clear previous results

    recipes.forEach(recipe => {
        const recipeBox = document.createElement('div');
        recipeBox.className = 'recipe-box';
        
        recipeBox.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><a href="recipe_details.html?id=${recipe.id}" target="_blank">View Recipe</a></p>
        `;
        
        recipeContainer.appendChild(recipeBox);
    });
}


function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipes');
    recipeContainer.innerHTML = '';  // Clear previous results

    recipes.forEach(recipe => {
        const recipeBox = document.createElement('div');
        recipeBox.className = 'recipe-box';
        
        recipeBox.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><a href="recipe_details.html?id=${recipe.id}" target="_blank">View Recipe</a></p>
        `;
        
        recipeContainer.appendChild(recipeBox);
    });
}
