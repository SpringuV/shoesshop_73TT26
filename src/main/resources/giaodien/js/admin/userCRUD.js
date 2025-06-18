const userForm = document.getElementById('userForm');
const userCancelBtn = document.getElementById('userCancelBtn');
const productTable = document.querySelector('#productTable tbody');
let editingUserId = null;

function renderUsers() {
  userTableBody.innerHTML = '';
  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.fullname || ''}</td>
            <td>${u.age || ''}</td>
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
  if (!u) return;
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
  if (confirm('Bạn chắc chắn muốn xóa người dùng này chứ?')) {
    users = users.filter(u => u.id !== id);
    if (editingUserId === id) {
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
  if (!username) {
    alert('Username is required');
    return;
  }
  if (!password) {
    alert('Password is required');
    return;
  }
  if (editingUserId) {
    const u = users.find(u => u.id === editingUserId);
    if (u) {
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