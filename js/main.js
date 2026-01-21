import Rander from '/js/utils/render.js';
import Dom from '/js/utils/dom.js';

document.addEventListener("DOMContentLoaded", () => {
  const rander = new Rander()
  const dom = new Dom()
  
  rander.randerPageHeader()
  rander.randerPageFooter()
  
  dom.navBarManager()
  dom.customeMarkupDetail()
  dom.reviewButtonManager()
  
})