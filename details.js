const apiKey = 'ba77696fdd6845dc8466eb1a8c6be478';

// Get the recipe ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// Fetch recipe details using the ID
if (recipeId) {
    fetchRecipeDetails(recipeId);
}

function fetchRecipeDetails(id) {
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            document.getElementById('recipeDetails').innerHTML = '<p>There was an error fetching the recipe details. Please try again later.</p>';
        });
}

function displayRecipeDetails(recipe) {
    const recipeDetailsContainer = document.getElementById('recipeDetails');
    
    recipeDetailsContainer.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; border-radius: 8px;">
        <h2>${recipe.title}</h2>
        <p>${recipe.summary}</p>
        <h3>Ingredients</h3>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
    `;
}
