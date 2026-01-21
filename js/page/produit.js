import LoadData from '/js/utils/loadData.js';
import Rander from '/js/utils/render.js'

const dataSrc = '/features/data/features.json'
const loader = new LoadData(dataSrc)
const rander = new Rander()


async function displayArticles () {
  const articles = await loader.fetchAll()
  rander.renderCards(articles)
}



function displayFilteredArticles() {
  const filterForm = document.getElementById("searchForm")
  const searchBar = document.getElementById("searchBar")
  const filter = document.getElementById("filter")
  
  filterForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    if (searchBar.value === "" && filter.value === "") {
      displayArticles()
    }
    
    const formData = {
      keyWord: searchBar.value, 
      type: filter.value
    }
    const filteredArticle = await loader.getFilteredData(formData)
    rander.renderCards(filteredArticle)
    
  })
  
}


displayArticles()
displayFilteredArticles()
