export default class Dom {
  constructor() {
    this.body = document.body
  }
  toggleActiveClass(element) {
    element.classList.toggle("active")
  }
  goUp() {
    window.scrollTo(0, 0)
  }
  
  navBarManager() {
    const mobileMenuButton = document.getElementById("mobileMenuBtn")
    const navBar = document.getElementById("navBar")
    const indicatorIcon = document.getElementById("indicatorIcon")
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", () => {
        this.toggleActiveClass(navBar)
        if (navBar.classList.contains("active")) {
          indicatorIcon.classList.replace("fa-bars", "fa-times")
        } else {
          indicatorIcon.classList.replace("fa-times", "fa-bars")
        }
      })
    }
  }
  
  customeMarkupDetail() {
    const detail = document.querySelector(".detail")
    const summary = document.querySelector(".summary")
    if (detail && summary) {
      summary.addEventListener("click", () => {
        detail.classList.toggle("open")
        console.log("summary cliquez")
      })
    }
  }
  
  reviewButtonManager() {
    const reviewButton = document.getElementById("reviewBtn")
    if (reviewButton) {
      reviewButton.addEventListener("click", this.goUp)
    }
  }
  
  carousel(imageContainer, timeAout = 3000) {
    const elementCount = imageContainer.childElementCount
    let currentElement = 0;
    
    this.carouselId = setInterval(() => {
      imageContainer.scrollLeft = imageContainer.clientWidth * currentElement
      if (currentElement == elementCount) {
        imageContainer.scrollLeft = 0
        currentElement = 0
      }
      currentElement++
    }, timeAout)
  }
  
  
  
}