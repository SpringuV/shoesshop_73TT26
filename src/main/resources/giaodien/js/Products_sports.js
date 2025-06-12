  let currentPage = 1;
    const productsPerPage = 20;
    const products = document.querySelectorAll('.product');

    function renderProducts() {
      products.forEach((product, index) => {
        const start = (currentPage - 1) * productsPerPage;
        const end = currentPage * productsPerPage;
        product.style.display = (index >= start && index < end) ? "block" : "none";
      });
      document.getElementById("page-indicator").textContent = currentPage;
    }

    function changePage(direction) {
      const totalPages = Math.ceil(products.length / productsPerPage);
      currentPage += direction;
      if (currentPage < 1) currentPage = 1;
      if (currentPage > totalPages) currentPage = totalPages;
      renderProducts();
    }

    renderProducts();