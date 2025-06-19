import userCRUD from "./userCRUD.js";
import productCRUD from "./productCRUD.js";
import order_ratingCRUD from "./order_ratingCRUD.js";
import categoryCRUD from "./categoryCRUD.js";

function setupTabSwitching() {
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const welcome = document.querySelector(".welcome")
      welcome.style.display = "none"
      // Bỏ active ở tất cả tab
      tabs.forEach(t => t.classList.remove('active'));
      // Active tab đang click
      tab.classList.add('active');

      // Ẩn tất cả nội dung
      tabContents.forEach(c => c.style.display = 'none');

      // Hiện tab tương ứng
      const targetId = tab.dataset.tab; // ví dụ: data-tab="products"
      const target = document.getElementById(targetId);
      target.style.display = 'block';
    });
  })
}

function returnShop(selectorClass){
  const returnShop = document.querySelector(selectorClass)
  returnShop.addEventListener("click", () => {
    window.location.href = "/html/Home.html"
  })
}


document.addEventListener("DOMContentLoaded", () => {
  setupTabSwitching();
  returnShop(".return-shop")

  // load crud
  userCRUD.load_user()
  categoryCRUD.load_category()
  productCRUD.loadProduct()
  order_ratingCRUD.load_order_rating()
});
