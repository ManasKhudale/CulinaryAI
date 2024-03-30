function suggestRecipe(userType) {
    const openaiApiKey = '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';
    const openaiApiUrl = `https://api.openai.com/v1/recipes`;

    const databaseApiKey = 'e10f5353adc747c78f865f54cb822f77';
    const databaseApiUrl = 'https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey=e10f5353adc747c78f865f54cb822f77';

    const openaiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
    };

    const databaseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${databaseApiKey}`
    };

    
    fetch(openaiApiUrl, {
        method: 'POST',
        headers: openaiHeaders,
        body: JSON.stringify({ userType: userType })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching recipe from OpenAI API');
        }
        return response.json();
    })
    .then(data => {
        console.log('Recipe suggestion from OpenAI:', data);

        return fetch(databaseApiUrl, {
            method: 'GET',
            headers: databaseHeaders
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching recipe details from database API');
        }
        return response.json();
    })
    .then(data => {
        console.log('Additional recipe details from database:', data);

        updateDOM(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateDOM(recipeData) {
    console.log('Updating DOM with recipe suggestion and details:', recipeData);
}

document.getElementById("suggestRecipeButton").addEventListener("click", function() {
    suggestRecipe("gym enthusiast"); 
});

