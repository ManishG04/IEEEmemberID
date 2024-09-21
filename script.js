document.getElementById('search-button').addEventListener('click', searchByName);
function searchByName() {
    const searchValue = document.getElementById('search-box').value.trim();
    if (searchValue) {
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: searchValue })
        })
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = '';
            if (data && data.length > 0) {
                data.forEach(item => {
                    const result = document.createElement('p');
                    result.textContent = `Name: ${item.name}, Favorite Cookie: ${item.favoriteCookie}`;
                    resultsDiv.appendChild(result);
                });
            } else {
                const noResults = document.createElement('p');
                noResults.textContent = 'No results found';
                resultsDiv.appendChild(noResults);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}