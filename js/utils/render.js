import Dom from '/js/utils/dom.js';
import LoadData from '/js/utils/loadData.js';
const myDom = new Dom()
const loader = new LoadData()

export default class Rander {
  constructor() {
    this.body = document.body
  }
  
  renderCards(articles) {
    const grid = document.querySelector('#features-grid');
    grid.innerHTML = ""; // On vide la grille
    
    articles.forEach((article, index) => {
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
              <button class="read-more-btn btn-secondary btn-bd" data-index="${index}">Lire plus</button>
            </div>
          </div>
        </article>
        `;
      grid.innerHTML += card;
      
    });
    const readMoreBtns = document.querySelectorAll(".read-more-btn")
    readMoreBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        this.randerModal(articles[btn.dataset.index])
      })
    })
  }
  
  randerPageHeader() {
    const headerContent = `
		<div class="header-container">
      <a href="../index.html" class="header-logo-container flex center">
        <p class="header-logo">MAT<span>AWI</span></p>
      </a>
      <button class="mobile-menu-btn" id="mobileMenuBtn">
        <i class="fas fa-bars" id="indicatorIcon"></i>
      </button>
      
      <nav class="header-nav-bar" id="navBar">
        <ul class="header-menu">
          <li><a href="../index.html">Accueil</a></li>
          <li><a href="../pages/about.html">À-propos</a></li>
          <li><a href="../pages/contact.html">Contact</a></li>
          <li><a href="../pages/product.html">Produits</a></li>
        </ul>
      </nav>
      
    </div>
									
					`
    
    const pageHead = document.getElementById("pageHead")
    if (pageHead) {
      pageHead.innerHTML = headerContent
    }
    
    const headerMenu = document.querySelector(".header-menu")
    const headerMenuChildren = headerMenu.children
    for (let i = 0; i < headerMenuChildren.length; i++) {
      if (this.body.dataset.range == i) {
        headerMenuChildren.item(i).classList.add("active")
      }
      
    }
  }
  
  randerPageFooter() {
    const reviewBtnCont = `
    <i class="fas fa-arrow-up f-size-40 leap-up"></i>
    <button class="btn btn-neo btn-bg" id="reviewBtn">Revoir</button>
					`
    const footerContent = `
    <div class="bg-element"></div>
    <div class="page-footer-content p-20">
      
      <div class="flex space-between">
        <div class="project-logo">
          <h3>Logo du projet</h3>
          <div class="logo">
            <img src="https://i.postimg.cc/zGN6fMH7/matawi-Logo.png" alt="logo du projet" />
          </div>
        </div>
        <div class="">
          <h3>Notice</h3>
          <p>Ce gogo appartient à ce projet il est interdit de l'utiliser dans d'autres projets</p>
        </div>
      </div>
      
      <div class="flex space-between">
        <nav class="quick-navigation">
          <h3 class="">Liens rapide</h3>
          <ul class="footer-link p-20">
            <li><a href="../index.html">Accueil</a></li>
            <li><a href="../pages/about.html">À-propos</a></li>
            <li><a href="../pages/contact.html">Contact</a></li>
            <li><a href="../pages/product.html">Produits</a></li>
          </ul>
        </nav>
        
        <div class="">
          <h3>fonctionnalités</h3>
          <p>Game</p>
          <p>IA</p>
          <p>Music</p>
          <p>Et plus</p>
        </div>
      </div>
      
      
      <div class="social-media">
        <h3>Nos réseau</h3>
        
        <ul class="social-link flex space-evenly item-center">
          <li class="facebook-item btn-bg">
            <a class="facebook-link" href="#">
              <i class="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
          </li>
          
          <li class="whatsapp-item btn-bg">
            <a class="whatsapp-link" href="#">
              <i class="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
          </li>
          
          <li class="github-item btn-bg">
            <a class="github-link" href="https://github.com/codum-developer">
              <i class="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </li>
        </ul>
        
        
      </div>
      
      <div class="info flex d-column center p-20 text-center">
        <p>Créer par MURHABAZI BISIMWA ALAIN</p>
        <p>RDC Sud-kivu - Bukavu - kadutu - cimpunda - Av. Makasi</p>
        <div class="copyright">
          <p>&COPY; 2026 - MATAWI Project all rights reserved</p>
        </div>
      </div>
      
    </div>
  
					
					`
    
    const pageFooter = document.getElementById("pageFooter")
    if (pageFooter) {
      pageFooter.innerHTML = footerContent
      
      const reviewBtn = document.createElement("div")
      reviewBtn.classList.add("review-btn", "flex", "d-column", "center")
      reviewBtn.innerHTML = reviewBtnCont
      
      this.body.insertBefore(reviewBtn, pageFooter)
    }
    
    
    
    
    
    
  }
  
  async randerModal(article) {
    
    
    const longDescription = article.longDescription == "" ? article.shortDescription : await loader.getLongDescription(article.longDescription)
    
    const modalContent = `
        <div class="modal flex center d-column p-20">
          <button class="close-modal">&times;</button>
          <br />
          <br />
          <div class="modal-content">
            <div class="modal-images ">
              <div class="images-wrap flex id="images-wrap">
   
              </div>
            </div>
            <div class="modal-text p-10">
              <h1>${article.name}</h1>
              <p><strong>Par @${article.author}</strong></p>
              <p><strong>Un ${article.type}</strong></p>
              <h3>Description</h3>
              <p>
              
                ${longDescription}
              
              </p>
            </div>
          </div>
          <a href="${article.src.articleSrc}"  class="btn btn-bg text-center">${article.action}</a>
        </div>
          `
    
    const modalWrap = document.createElement("div")
    modalWrap.classList.add("modal-wrap")
    modalWrap.innerHTML = modalContent
    this.body.appendChild(modalWrap)
    
    const modalImages = document.querySelector(".images-wrap")
    article.src.imageSrc.forEach(src => {
      const img = document.createElement("img")
      img.classList.add("img")
      img.src = src
      modalImages.appendChild(img)
    })
    
    setTimeout(() => {
      modalWrap.classList.add("visible")
    }, 10)
    
    const imageWrap = document.querySelector(".images-wrap")
    myDom.carousel(imageWrap, 3000)
    
    
    document.querySelector(".close-modal").addEventListener("click", (e) => {
      e.preventDefault()
      modalWrap.classList.remove("visible")
      clearInterval(myDom.carouselId)
      setTimeout(() => {
        this.body.removeChild(modalWrap)
      }, 100)
      
    })
    
  }
  
  
  
}