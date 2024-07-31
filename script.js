document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f634c741dfd24c3789d2080abda31baa'; // Replace with your News API key
    const form = document.getElementById('news-form');
    const queryInput = document.getElementById('query');
    const newsContainer = document.getElementById('news-container');

    async function fetchNews(query) {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';
        if (articles.length === 0) {
            newsContainer.innerHTML = '<p>No news found.</p>';
            return;
        }
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                    </div>
                </div>
            `;
            newsContainer.appendChild(card);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = queryInput.value.trim();
        if (query) {
            fetchNews(query);
        }
    });
});
