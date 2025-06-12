(() => {
      // Sample products data for category product selection
      const sampleProducts = [
        { id: 1, name: 'Running Shoes' },
        { id: 2, name: 'Casual Sneakers' },
        { id: 3, name: 'Leather Boots' },
        { id: 4, name: 'Sandals' },
        { id: 5, name: 'Sports Socks' }
      ];

      // Data stores simulate DB (id increment)
      let roles = [];
      let users = [];
      let categories = [];
      let permissions = [];

      // Dummy data for Orders and OrderItems readonly
      const orders = [
        { id: 1, orderDate: '2024-05-01', status: 'Pending', price: 120, paymentStatus: 'Paid', userId: 101 },
        { id: 2, orderDate: '2024-05-02', status: 'Shipped', price: 200, paymentStatus: 'Paid', userId: 102 },
        { id: 3, orderDate: '2024-05-05', status: 'Delivered', price: 350, paymentStatus: 'Paid', userId: 101 },
      ];
      const orderItems = [
        { orderId: 1, productId: 1, quantity: 2, price: 40 },
        { orderId: 1, productId: 5, quantity: 1, price: 40 },
        { orderId: 2, productId: 2, quantity: 4, price: 50 },
        { orderId: 3, productId: 3, quantity: 3, price: 80 },
        { orderId: 3, productId: 4, quantity: 2, price: 35 },
      ];

      // Dummy data for Ratings readonly
      const ratings = [
        { userId: 101, productId: 1, content: 'Very comfortable shoes.', ratepoint: 5, create_at: '2024-05-03', update_at: '2024-05-04' },
        { userId: 102, productId: 2, content: 'Good value for money.', ratepoint: 4, create_at: '2024-05-06', update_at: '2024-05-06' },
        { userId: 103, productId: 3, content: 'Stylish but a bit tight.', ratepoint: 3, create_at: '2024-05-07', update_at: '2024-05-08' },
      ];

      let roleIdSeq = 1;
      let userIdSeq = 1;
      let categoryIdSeq = 1;
      let permissionIdSeq = 1;

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

      // Role CRUD
      const roleForm = document.getElementById('roleForm');
      const roleCancelBtn = document.getElementById('roleCancelBtn');
      const roleTableBody = document.querySelector('#roleTable tbody');
      let editingRoleId = null;

      function renderRoles() {
        roleTableBody.innerHTML = '';
        roles.forEach(r => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${r.roleName}</td>
            <td>${r.description}</td>
            <td class="actions">
              <button onclick="editRole(${r.id})" aria-label="Edit ${r.roleName}">Sửa</button>
              <button class="delete" onclick="deleteRole(${r.id})" aria-label="Delete ${r.roleName}">Xóa</button>
            </td>
          `;
          roleTableBody.appendChild(tr);
        });
      }

      window.editRole = (id) => {
        const r = roles.find(r => r.id === id);
        if(!r) return;
        editingRoleId = id;
        roleForm.roleName.value = r.roleName;
        roleForm.roleDesc.value = r.description || '';
        roleCancelBtn.style.display = 'inline-block';
        roleForm.querySelector('button[type="submit"]').textContent = 'Cập nhật vai trò';
      };

      window.deleteRole = (id) => {
        if(confirm('Bạn chắc chắn muốn xóa vai trò này chứ?')) {
          roles = roles.filter(r => r.id !== id);
          if(editingRoleId === id) {
            resetRoleForm();
          }
          renderRoles();
        }
      };

      function resetRoleForm() {
        editingRoleId = null;
        roleForm.reset();
        roleCancelBtn.style.display = 'none';
        roleForm.querySelector('button[type="submit"]').textContent = 'Thêm vai trò';
      }

      roleCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetRoleForm();
      });

      roleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleName = roleForm.roleName.value.trim();
        const description = roleForm.roleDesc.value.trim();
        if(!roleName) {
          alert('Role name is required');
          return;
        }
        if(editingRoleId) {
          const r = roles.find(r => r.id === editingRoleId);
          if(r) {
            r.roleName = roleName;
            r.description = description;
          }
        } else {
          roles.push({ id: roleIdSeq++, roleName, description });
        }
        resetRoleForm();
        renderRoles();
      });

      // User CRUD
      const userForm = document.getElementById('userForm');
      const userCancelBtn = document.getElementById('userCancelBtn');
      const userTableBody = document.querySelector('#userTable tbody');
      let editingUserId = null;

      function renderUsers() {
        userTableBody.innerHTML = '';
        users.forEach(u => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.fullname || ''}</td>
            <td>${u.age ?? ''}</td>
            <td>${u.address || ''}</td>
            <td>${u.phone || ''}</td>
            <td>${u.email || ''}</td>
            <td class="actions">
              <button onclick="editUser(${u.id})" aria-label="Edit ${u.username}">Sửa</button>
              <button class="delete" onclick="deleteUser(${u.id})" aria-label="Delete ${u.username}">Xóa</button>
            </td>
          `;
          userTableBody.appendChild(tr);
        });
      }

      window.editUser = (id) => {
        const u = users.find(u => u.id === id);
        if(!u) return;
        editingUserId = id;
        userForm.username.value = u.username;
        userForm.password.value = u.password;
        userForm.fullname.value = u.fullname || '';
        userForm.age.value = u.age ?? '';
        userForm.address.value = u.address || '';
        userForm.phone.value = u.phone || '';
        userForm.email.value = u.email || '';
        userCancelBtn.style.display = 'inline-block';
        userForm.querySelector('button[type="submit"]').textContent = 'Cập nhật người dùng';
      };

      window.deleteUser = (id) => {
        if(confirm('Bạn chắc chắn muốn xóa người dùng này chứ?')) {
          users = users.filter(u => u.id !== id);
          if(editingUserId === id) {
            resetUserForm();
          }
          renderUsers();
        }
      };

      function resetUserForm() {
        editingUserId = null;
        userForm.reset();
        userCancelBtn.style.display = 'none';
        userForm.querySelector('button[type="submit"]').textContent = 'Thêm người dùng';
      }

      userCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetUserForm();
      });

      userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = userForm.username.value.trim();
        const password = userForm.password.value;
        if(!username) {
          alert('Username is required');
          return;
        }
        if(!password) {
          alert('Password is required');
          return;
        }
        if(editingUserId) {
          const u = users.find(u => u.id === editingUserId);
          if(u) {
            u.username = username;
            u.password = password;
            u.fullname = userForm.fullname.value.trim();
            u.age = userForm.age.value ? parseInt(userForm.age.value) : null;
            u.address = userForm.address.value.trim();
            u.phone = userForm.phone.value.trim();
            u.email = userForm.email.value.trim();
          }
        } else {
          users.push({
            id: userIdSeq++,
            username, password,
            fullname: userForm.fullname.value.trim(),
            age: userForm.age.value ? parseInt(userForm.age.value) : null,
            address: userForm.address.value.trim(),
            phone: userForm.phone.value.trim(),
            email: userForm.email.value.trim()
          });
        }
        resetUserForm();
        renderUsers();
      });

      // Category CRUD
      const categoryForm = document.getElementById('categoryForm');
      const categoryCancelBtn = document.getElementById('categoryCancelBtn');
      const categoryTableBody = document.querySelector('#categoryTable tbody');
      let editingCategoryId = null;

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
        if(!c) return;
        editingCategoryId = id;
        categoryForm.categoryName.value = c.nameCate;
        const selectedIds = c.productIds.map(String);
        renderProductCheckboxes(selectedIds);
        categoryCancelBtn.style.display = 'inline-block';
        categoryForm.querySelector('button[type="submit"]').textContent = 'Cập nhật danh mục';
      };

      window.deleteCategory = (id) => {
        if(confirm('Bạn chắc chắn muốn xóa danh mục này chứ?')) {
          categories = categories.filter(c => c.id !== id);
          if(editingCategoryId === id) {
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
        if(!nameCate) {
          alert('Category name is required');
          return;
        }
        const selectedCheckboxes = Array.from(categoryProductsDiv.querySelectorAll('input[type="checkbox"]:checked'));
        const selectedIds = selectedCheckboxes.map(chk => parseInt(chk.value));

        if(editingCategoryId) {
          const c = categories.find(c => c.id === editingCategoryId);
          if(c) {
            c.nameCate = nameCate;
            c.productIds = selectedIds;
          }
        } else {
          categories.push({ id: categoryIdSeq++, nameCate, productIds: selectedIds });
        }
        resetCategoryForm();
        renderCategories();
      });

      // Permission CRUD
      const permissionForm = document.getElementById('permissionForm');
      const permissionCancelBtn = document.getElementById('permissionCancelBtn');
      const permissionTableBody = document.querySelector('#permissionTable tbody');
      let editingPermissionId = null;

      function renderPermissions() {
        permissionTableBody.innerHTML = '';
        permissions.forEach(p => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${p.permissionName}</td>
            <td>${p.description}</td>
            <td class="actions">
              <button onclick="editPermission(${p.id})" aria-label="Edit ${p.permissionName}">Sửa</button>
              <button class="delete" onclick="deletePermission(${p.id})" aria-label="Delete ${p.permissionName}">Xóa</button>
            </td>
          `;
          permissionTableBody.appendChild(tr);
        });
      }

      window.editPermission = (id) => {
        const p = permissions.find(p => p.id === id);
        if(!p) return;
        editingPermissionId = id;
        permissionForm.permissionName.value = p.permissionName;
        permissionForm.permissionDesc.value = p.description || '';
        permissionCancelBtn.style.display = 'inline-block';
        permissionForm.querySelector('button[type="submit"]').textContent = 'Cập nhật quyền';
      };

      window.deletePermission = (id) => {
        if(confirm('Bạn chắc chắn muốn xóa quyền này chứ?')) {
          permissions = permissions.filter(p => p.id !== id);
          if(editingPermissionId === id) {
            resetPermissionForm();
          }
          renderPermissions();
        }
      };

      function resetPermissionForm() {
        editingPermissionId = null;
        permissionForm.reset();
        permissionCancelBtn.style.display = 'none';
        permissionForm.querySelector('button[type="submit"]').textContent = 'Thêm quyền';
      }

      permissionCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetPermissionForm();
      });

      permissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const permissionName = permissionForm.permissionName.value.trim();
        const description = permissionForm.permissionDesc.value.trim();
        if(!permissionName) {
          alert('Permission name is required');
          return;
        }
        if(editingPermissionId) {
          const p = permissions.find(p => p.id === editingPermissionId);
          if(p) {
            p.permissionName = permissionName;
            p.description = description;
          }
        } else {
          permissions.push({ id: permissionIdSeq++, permissionName, description });
        }
        resetPermissionForm();
        renderPermissions();
      });

      // Initialize product checkboxes for category form at start
      renderProductCheckboxes([]);

      // Orders & Ratings Readonly
      const ordersTableBody = document.querySelector('#ordersTable tbody');
      const ratingsTableBody = document.querySelector('#ratingsTable tbody');
      const orderItemsModal = document.getElementById('orderItemsModal');
      const orderItemsTableBody = document.querySelector('#orderItemsTable tbody');
      const orderItemsModalCloseBtn = orderItemsModal.querySelector('.close-btn');

      function renderOrders() {
        ordersTableBody.innerHTML = '';
        orders.forEach(order => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${order.orderDate}</td>
            <td>${order.status}</td>
            <td>$${order.price.toFixed(2)}</td>
            <td>${order.paymentStatus}</td>
            <td>${order.userId}</td>
            <td><button class="viewItemsBtn" data-order-id="${order.id}">Xem</button></td>
          `;
          ordersTableBody.appendChild(tr);
        });
        document.querySelectorAll('.viewItemsBtn').forEach(btn => {
          btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.orderId);
            openOrderItemsModal(id);
          });
        });
      }

      function openOrderItemsModal(orderId) {
        const items = orderItems.filter(item => item.orderId === orderId);
        orderItemsTableBody.innerHTML = '';
        if(items.length === 0) {
          const tr = document.createElement('tr');
          tr.innerHTML = '<td colspan="3" style="text-align:center;">No items for this order.</td>';
          orderItemsTableBody.appendChild(tr);
        } else {
          items.forEach(i => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${i.productId}</td>
              <td>${i.quantity}</td>
              <td>$${i.price.toFixed(2)}</td>
            `;
            orderItemsTableBody.appendChild(tr);
          });
        }
        orderItemsModal.classList.add('active');
      }
      orderItemsModalCloseBtn.addEventListener('click', () => {
        orderItemsModal.classList.remove('active');
      });
      orderItemsModal.addEventListener('click', (e) => {
        if(e.target === orderItemsModal) {
          orderItemsModal.classList.remove('active');
        }
      });

      function renderRatings() {
        ratingsTableBody.innerHTML = '';
        ratings.forEach(r => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${r.userId}</td>
            <td>${r.productId}</td>
            <td>${r.content}</td>
            <td>${r.ratepoint}</td>
            <td>${r.create_at}</td>
            <td>${r.update_at}</td>
          `;
          ratingsTableBody.appendChild(tr);
        });
      }

      // Initial render of all tables
      renderRoles();
      renderUsers();
      renderCategories();
      renderPermissions();
      renderOrders();
      renderRatings();

    })();