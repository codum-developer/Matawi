import LoadData from '/js/utils/loadData.js';
import {renderCards} from '/js/utils/render.js'

const dataSrc = '/features/data/features.json'
const loader = new LoadData(dataSrc)

async function displayArticles () {
  const articles = await loader.fetchAll()
  renderCards(articles)
}



function displayFilteredArticles() {
  const filtrerForm = document.getElementById("searchForm")
  const searchBar = document.getElementById("searchBar")
  const filter = document.getElementById("filter")
  
  filtrerForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    if (searchBar.value === "" && filter.value === "") {
      displayArticles()
    }
    
    const formData = {
      keyWord: searchBar.value, 
      type: filter.value
    }
    const filteredArticle = await loader.getFilteredData(formData)
    renderCards(filteredArticle)
    
  })
  
}


displayArticles()
displayFilteredArticles()