(() => {
  // Tab switching logic
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tabContents.forEach(c => c.style.display = 'none');
      document.getElementById(tab.dataset.tab).style.display = 'block';
    });
  });

  const returnShop = document.querySelector(".return-shop")
  returnShop.addEventListener("click", ()=>{
    window.location.href = "/html/Home.html"
  })

  // Initial render of all tables
  // renderUsers();
  // renderCategories();
  // renderOrders();
  // renderRatings();

})();