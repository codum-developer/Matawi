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
    const detail = document.querySelector(".datail")
    const summary = document.querySelector(".summary")
    if (detail && summary) {
      summary.addEventListener("click", () => {
        detail.classList.toggle("open")
      })
    }
  }
  
  reviewButtonManager() {
    const reviewButton = document.getElementById("reviewBtn")
    if (reviewButton) {
      reviewButton.addEventListener("click", this.goUp)
    }
  }
  
  carousel(){
    const container = document.querySelector(".modal-images")
    const imageWrap = document.querySelector(".images-wrap")
    const imageCount = imageWrap.childElementCount
    
    setInterval(()=>{
      
    })
    
  }
  
}