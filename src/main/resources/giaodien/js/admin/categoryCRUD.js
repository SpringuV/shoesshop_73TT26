import utils from './utils.js';

// function getListProduct


export function load_category() {
  fetch(`/html/AdminManagerFragement/category.html`)
    .then(response => response.text())
    .then(data => {
      document.querySelector(".section-category").innerHTML = data
      
      utils.click_X_toCloseModal("closeAddModel", "modalAddCategory")
      utils.setupOutsideClickToCloseModal("modalAddCategory")

      document.getElementById("btnAddNewCategoryModal")?.addEventListener("click", ()=>{
        utils.openModel("modalAddCategory")
      })
    })
}

export default {load_category}