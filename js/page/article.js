const DATA_SRC = "/data/articles.json"
const sectionArticle = document.getElementById("sectionArticle")

async function loadData(dataSrc) {
  try {
    const response = await fetch(dataSrc)
    if (!response.ok) {
      throw new Error("status incorrect")
    } else {
      const data = await response.json()
      return data
    }
  } catch (err) {
    throw err
  }
}


function organizeData(results, articleSection, filter) {
  const data = results.articles
  const datalen = data.length
  let articlelen = 3
  if (articlelen > datalen) {
    const missedData = articlelen - datalen
    articlelen = datalen
  }
  if (datalen == 0) {
    return
  }
  const articleItems = {}
  if (filter) {
    for (let i = 0; i < datalen; i++) {
      if (data[i].type === filter.filter) {
        articleItems.title = data[i].name
        articleItems.type = data[i].type
        articleItems.action = data[i].action
        articleItems.longDescription = data[i].longDescription
        articleItems.shortDescription = data[i].shortDescription
        articleItems.imageSrc = data[i].src.imageSrc
        articleItems.articlesrc = data[i].src.articleSrc
        displayArticle(articleItems, articleSection)
      } else {
        continue
      }
    }
  }
  else {
    for (let i = 0; i < articlelen; i++) {
      articleItems.title = data[i].name
      articleItems.type = data[i].type
      articleItems.action = data[i].action
      articleItems.longDescription = data[i].longDescription
      articleItems.shortDescription = data[i].shortDescription
      articleItems.imageSrc = data[i].src.imageSrc
      articleItems.articlesrc = data[i].src.articleSrc
      displayArticle(articleItems, articleSection)
    }
  }
  
}


function displayArticle(content, articleSection) {
  const article = content
  const articleContent = `
        <div class="card neo-card">
          <div class="article-image">
            <img src="${article.imageSrc[0]}" alt="image de l'article" />
          </div>
          
          <div class="article-detail">
            <h2 class="article-title poppins-medium">Titre: ${article.title}</h2>
            <p class="poppins-medium">Type: ${article.type}</p>
            <div class="article-description flex d-column space-between">
              <h3 class="poppins-medium">Description</h3>
              <p>
                ${article.shortDescription}
              </p>
            </div>
          </div>
                   
          <div class="article-buttons flex center space-evenly">
            <a href="${article.articlesrc}">
              <button class="actionBtn btn btn-bg">${article.action}</button>
            </a>
            <a href="#">
              <button class="readMoreBtn btn btn-bd">Lire plus</button>
            </a>
          </div>
        </div>
          
          `
  
  const articleTag = document.createElement("article")
  articleTag.classList.add("article", "card-wrapper")
  articleTag.id = "article"
  articleTag.innerHTML = articleContent
  articleSection.appendChild(articleTag)
  
  
}







function search() {
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    const formData = {}
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      formData.keyWord = document.getElementById("searchBar").value
      formData.filter = document.getElementById("filter").value
      loadData("/data/articles.json")
        .then(data => {
          organizeData(data, sectionArticle, formData)
        })
      
    })
    
  }
}


function onError(err) {
  const errElem = document.createElement("p")
  errElem.textContent = `Erreur de récupération des articles pour la raison : ${err.message} touché pour ressayer`
  document.body.appendChild(errElem)
  errElem.addEventListener("click", () => {
    //loadData(DATA_SRC)
  })
}




if (sectionArticle) {
  loadData(DATA_SRC)
    .then(data => {
      organizeData(data, sectionArticle)
    })
  
}


search()