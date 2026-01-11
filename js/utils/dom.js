class UtilFunction {
  constructor() {
    
  }
  toggleActiveClass(element) {
    element.classList.toggle("active")
  }
  goUp() {
    window.scrollTo(0, 0)
  }
}

const util = new UtilFunction()


document.addEventListener("DOMContentLoaded", () => {
  writePageFooter()
  navBarManager()
  
  
  //Événements 
  const reviewButton = document.getElementById("reviewBtn")
  if (reviewButton) {
    reviewButton.addEventListener("click", util.goUp)
  } 
  
  const detail = document.querySelector(".datail")
  const summary = document.querySelector(".summary")
  
  if (detail && summary) {
    summary.addEventListener("click", () => {
      detail.classList.toggle("open")
    })
  }
  
  
  //close	
})






function writePageHeader() {
  const headerContent = `
		<div class="header-container">
      <a href="../index.html" class="header-logo-container flex center">
        <p class="header-logo">MAT<span>AWI</span></p>
      </a>
      <button class="mobile-menu-btn" id="mobileMenuBtn">
        <i class="fas fa-bars" id="indicatorIcon"></i>
      </button>
      
      <nav class="header-nav-bar" id="navBar">
        <ul class="header-nemu">
          <li class="active"><a href="./index.html">Accueil</a></li>
          <li><a href="../pages/about.html">À-propos</a></li>
          <li><a href="../pages/contact.html">Contact</a></li>
          <li><a href="../pages/product.html">Produits</a></li>
        </ul>
      </nav>
      
    </div>
									
					`
  
  const pageHead = document.getElementById("pageHead")
  if (pageHead) {
    return
  } else {
    const header = document.createElement("header")
    header.classList.add("header")
    header.id = "pageHead"
    header.innerHTML = headerContent
    const mainContent = document.getElementById("mainContent")
    if (mainContent) {
      document.body.insertBefore(header, mainContent)
    }
    
  }
}



function writePageFooter() {
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
    return
  } else {
    const footerElement = document.createElement("footer")
    footerElement.classList.add('page-footer')
    footerElement.id = "pageFooter"
    footerElement.innerHTML = footerContent
    
    
    const reviewBtn = document.createElement("div")
    reviewBtn.classList.add("review-btn", "flex", "d-column", "center")
    reviewBtn.innerHTML = reviewBtnCont
    
    document.body.appendChild(reviewBtn)
    document.body.appendChild(footerElement)
  }
}



function navBarManager() {
  const mobileMenuButton = document.getElementById("mobileMenuBtn")
  const navBar = document.getElementById("navBar")
  const indicatorIcon = document.getElementById("indicatorIcon")
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      util.toggleActiveClass(navBar)
      if (navBar.classList.contains("active")) {
        indicatorIcon.classList.replace("fa-bars", "fa-times")
      } else {
        indicatorIcon.classList.replace("fa-times", "fa-bars")
      }
    })
  }
}



