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
    imageContainer.style.anchorName = '--anchor-marker';
    const markerGroup = document.createElement("div")
    markerGroup.classList.add("markerGroup")
    
    for (let i = 1; i < elementCount + 1; i++) {
      let marker = document.createElement("span")
      marker.classList.add("marker")
      markerGroup.appendChild(marker)
    }
    
    imageContainer.appendChild(markerGroup)
    
    
    let currentElement = 0;
    let currentMarker = 0;
    const markers = imageContainer.querySelectorAll(".marker")
    markers.forEach((marker, index, array) => {
      marker.addEventListener("click", () => {
        removeActiveClass(array)
        marker.classList.add("active")
        imageContainer.scrollLeft = imageContainer.clientWidth * index
        
      })
    })
    
    markers[0].classList.add("active")
    this.carouselId = setInterval(() => {
      imageContainer.scrollLeft = imageContainer.clientWidth * currentElement
      removeActiveClass(markers)
      markers[currentMarker].classList.add("active")
      
      if (currentElement == elementCount) {
        imageContainer.scrollLeft = 0
        currentElement = 0
      }
      
      currentElement++
      currentMarker++
      if (currentMarker == markers.length) {
        currentMarker = 0
      }
    }, timeAout)
    
    const removeActiveClass = (elementList) => {
      elementList.forEach(element => {
        element.classList.contains("active") ? element.classList.remove("active") : null
      })
    }
    
  }
  
  
  
}