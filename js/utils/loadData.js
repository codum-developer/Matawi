export default class LoadData {
  constructor(dataSrc) {
    this.src = dataSrc;
    this.map = new Map()
  }
  
  // On sépare la logique de chargement
  async fetchAll() {
    try {
      const response = await fetch(this.src);
      if (!response.ok) throw new Error("Erreur de chargement du fichier JSON");
      const data = await response.json();
      return data.articles; // On retourne directement la liste des articles
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  
  // Une méthode dédiée uniquement au filtrage
  async getFilteredData(filters) {
    const allArticles = await this.fetchAll();
    
    // Si aucun filtre n'est fourni, on retourne tout
    if (!filters || (!filters.keyWord && !filters.type)) {
      return allArticles;
    }
    
    // On utilise .filter() qui est plus performant et lisible que deux boucles for
    return allArticles.filter(article => {
      const matchKeyWord = filters.keyWord ?
        article.name.toLowerCase().includes(filters.keyWord.toLowerCase()) :
        true;
      
      const matchType = filters.type ?
        article.type === filters.type :
        true;
      
      return matchKeyWord && matchType; // L'article doit valider les deux conditions
    });
  }
  
  async getLongDescription(source) {
    try {
      if (!this.map.has(source)) {
        const response = await fetch(source)
        if (!response.ok) {
          throw new Error("mauvaise réponse")
        }
        const content = await response.text()
        this.setMap(source, content)
        return content
      } else {
        return this.getInMap(source)
      }
      
    } catch (e) {
      console.log(e)
    }
    
  }
  
  setMap(key, value) {
    if (!this.map.has(key)) {
      this.map.set(key, value)
      
    } else {
      return
    }
    
  }
  
  getInMap(key) {
    const data = this.map.get(key)
    return data
  }
  
}