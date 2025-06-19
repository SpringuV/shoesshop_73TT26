import utils from './utils.js';

export function load_category() {
  fetch(`/html/AdminManagerFragement/category.html`)
    .then(response => response.text())
    .then(data => {
      document.querySelector(".section-category").innerHTML = data
      // Sample products data for category product selection
      const sampleProducts = [
        { id: 1, name: 'Running Shoes' },
        { id: 2, name: 'Casual Sneakers' },
        { id: 3, name: 'Leather Boots' },
        { id: 4, name: 'Sandals' },
        { id: 5, name: 'Sports Socks' }
      ];

      // Category CRUD
      const categoryForm = document.getElementById('categoryForm');
      const categoryCancelBtn = document.getElementById('categoryCancelBtn');
      const categoryTableBody = document.querySelector('#categoryTable tbody');
      let editingCategoryId = null;

      // Render products as checkboxes for category form
      const categoryProductsDiv = document.getElementById('categoryProducts');
      function renderProductCheckboxes(selectedIds = []) {
        categoryProductsDiv.innerHTML = '';
        sampleProducts.forEach(prod => {
          const idStr = prod.id.toString();
          const label = document.createElement('label');
          label.innerHTML = `
            <input type="checkbox" value="${idStr}" ${selectedIds.includes(idStr) ? 'checked' : ''} />
            ${prod.name}
          `;
          categoryProductsDiv.appendChild(label);
        });
      }

      function renderCategories() {
        categoryTableBody.innerHTML = '';
        categories.forEach(c => {
          const prodNames = c.productIds.map(id => {
            const p = sampleProducts.find(p => p.id === id);
            return p ? p.name : '';
          }).filter(Boolean).join(', ');
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${c.nameCate}</td>
            <td>${prodNames}</td>
            <td class="actions">
              <button onclick="editCategory(${c.id})" aria-label="Edit ${c.nameCate}">Sửa</button>
              <button class="delete" onclick="deleteCategory(${c.id})" aria-label="Delete ${c.nameCate}">Xóa</button>
            </td>
          `;
          categoryTableBody.appendChild(tr);
        });
      }

      window.editCategory = (id) => {
        const c = categories.find(c => c.id === id);
        if (!c) return;
        editingCategoryId = id;
        categoryForm.categoryName.value = c.nameCate;
        const selectedIds = c.productIds.map(String);
        renderProductCheckboxes(selectedIds);
        categoryCancelBtn.style.display = 'inline-block';
        categoryForm.querySelector('button[type="submit"]').textContent = 'Cập nhật danh mục';
      };

      window.deleteCategory = (id) => {
        if (confirm('Bạn chắc chắn muốn xóa danh mục này chứ?')) {
          categories = categories.filter(c => c.id !== id);
          if (editingCategoryId === id) {
            resetCategoryForm();
          }
          renderCategories();
        }
      };

      function resetCategoryForm() {
        editingCategoryId = null;
        categoryForm.reset();
        renderProductCheckboxes([]);
        categoryCancelBtn.style.display = 'none';
        categoryForm.querySelector('button[type="submit"]').textContent = 'Thêm danh mục';
      }

      categoryCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetCategoryForm();
      });

      categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameCate = categoryForm.categoryName.value.trim();
        if (!nameCate) {
          alert('Category name is required');
          return;
        }
        const selectedCheckboxes = Array.from(categoryProductsDiv.querySelectorAll('input[type="checkbox"]:checked'));
        const selectedIds = selectedCheckboxes.map(chk => parseInt(chk.value));

        if (editingCategoryId) {
          const c = categories.find(c => c.id === editingCategoryId);
          if (c) {
            c.nameCate = nameCate;
            c.productIds = selectedIds;
          }
        } else {
          categories.push({ id: categoryIdSeq++, nameCate, productIds: selectedIds });
        }
        resetCategoryForm();
        renderCategories();
      });

      renderProductCheckboxes([]);
      // End Category CRUD
    })
}

export default {load_category}