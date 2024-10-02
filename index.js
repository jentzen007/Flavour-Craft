
const fetchRecipe = async (ingredients) => {
    const apiKey = 'a5ee2bc00dmshea4fbcd4f7edccbp1e5085jsnc038c0da330f';
    const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${encodeURIComponent(ingredients)}`;

    try {
        console.log(apiUrl);
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to load the recipe');
        }

        const data = await response.json();
        return data.results;
    }
    catch(error) {
        console.error('Error', error);
    }
};

const getRecipe = async () => {
    const ingredients = document.getElementById('pantryDescription').value.trim().replace(/\s+/g, '');

    if(ingredients) {
        const meals = await fetchRecipe((ingredients));
        if(meals) {
            display(meals);
        } else {
            console.log('No meals found');
        }
    } else {
        console.log('Please enter ingredients');
    }
};

const display = (meals) => {
    const recipies = document.getElementById('recipies');
    recipies.innerHTML = '';

    meals.forEach((meal) => {
        const recipeCard = `
        <div class="card" style="width: 80%;" id="Cards">
            <img src="${meal.thumbnail_url}" alt="${meal.name} class="card-img-top"">
            <div class="card-body">
                <h5 class="card-title">${meal.name}</h5>
                <p class="card-text">${meal.description || 'No description available'}</p>
                <a href="${meal.original_video_url || '#'}" target="_blank" class"btn btn-primary">View Recipe Video</a>
            </div>
        </div>
        <br>
        `;
        recipies.innerHTML += recipeCard;
    });
};