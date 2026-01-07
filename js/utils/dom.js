function manageNavBar() {
   const mobileMenuButton = document.getElementById("mobileMenuBtn")
   const navBar = document.getElementById("navBar")
   const indicatorIcon = document.getElementById("indicatorIcon")
   if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", ()=>{
         toggleActiveClass(navBar)
         if (navBar.classList.contains("active")) {
            indicatorIcon.classList.replace("fa-bars", "fa-times")
         } else {
            indicatorIcon.classList.replace("fa-times", "fa-bars")
         }
      })
   }
}


function toggleActiveClass(element) {
   element.classList.toggle("active")
}

manageNavBar()