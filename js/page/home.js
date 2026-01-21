import LoadData from '/js/utils/loadData.js';
import Rander from '/js/utils/render.js';

const dataSrc = '/features/data/features.json'
const loader = new LoadData(dataSrc)
const rander = new Rander()


async function displayArticles () {
  const articles = await loader.fetchAll()
  articles.lenght >= 5? articles.splice(5):
  rander.renderCards(articles)
}

displayArticles()