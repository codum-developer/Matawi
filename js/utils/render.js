export function renderCards(articles) {
  const grid = document.querySelector('#features-grid');
  grid.innerHTML = ""; // On vide la grille
  
  articles.forEach(article => {
    const card = `
         <article class="card">
          <div class="card-image">
            <img src="${article.src.imageSrc[0]}" alt="Aperçu de la feature">
            <span class="badge-type">${article.type}</span>
          </div>
          <div class="card-content">
            <h3>${article.name}</h3>
            <p class="author">Par <strong>${article.author}</strong></p>
            <p class="description">${article.shortDescription.substring(0 , 100)}...</p>
            <div class="card-actions">
              <a href="${article.src.articleSrc}" class="btn-primary">${article.action}</a>
              <button class="btn-secondary btn-bd">Lire plus</button>
            </div>
          </div>
        </article>
        `;
    grid.innerHTML += card;
  });
}