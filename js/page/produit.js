import { LoadData } from "./js/utils/loadData.js"




async function fname() {
  const DATA_SRC = "/data/articles.json"
  const d = await new LoadData(DATA_SRC, { keyWord: "Kwepa", type: "Outil" })
  console.log(d)
}
fname()