import utils from './utils.js';

function openDetailUser(User) {
    document.getElementById("showUserid").textContent = User.userId
    document.getElementById("showUsername").textContent = User.username
    document.getElementById("showEmail").textContent = User.email
    document.getElementById("showFullname").textContent = User.fullname
    document.getElementById("showAge").textContent = User.age
    document.getElementById("showPhone").textContent = User.phone
    document.getElementById("showAddress").textContent = User.address
    utils.showImageFromAPI("showImage", User.imagePath)
    utils.openModel("modalDetail")

    // Khi mở chi tiết -> đăng ký click edit
    const btnEdit = document.querySelector(".edit-btn");
    btnEdit.onclick = () => {
        utils.closeModel("modalDetail");
        editUserModalValue(User);
        utils.openModel("editUserModal");

        // Khi click ngoài để đóng modal edit
        utils.setupOutsideClickToCloseModal("editUserModal", () => {
            utils.openModel("modalDetail");
        });
        // Khi click dấu X để đóng modal edit
        utils.click_X_toCloseModal("closeEditModel", "editUserModal", () => {
            utils.openModel("modalDetail");
        });
    };
}

// Hàm đăng ký event click chi tiết
function registerDetailButton(row, userResponse) {
    const detailBtn = row.querySelector(".detail-btn");
    if (detailBtn) {
        detailBtn.addEventListener("click", () => {
            openDetailUser(userResponse);
            utils.click_X_toCloseModal("closeDetailModal", "modalDetail");
            utils.setupOutsideClickToCloseModal("modalDetail");
        });
    }
}

function registerDeleteButton(row, idUser) {
    // xử lý xóa người dùng
    row.querySelector(".delete-btn")?.addEventListener("click", async () => {
        await deleteUser(idUser)
    })
}

function displayTablerowInTableBody(userResponse, idTableUserBody) {
    // Kiểm tra xem dòng đó có tồn tại chưa
    const existingRow = document.querySelector(`#${idTableUserBody} tr[data-id="${userResponse.userId}"]`);
    const html = `
        <td>${userResponse.userId}</td>
        <td><img class="img-user" src="${userResponse.imagePath}" alt="user image"></td>
        <td>${userResponse.username}</td>
        <td>${userResponse.fullname}</td>
        <td>${userResponse.email}</td>
        <td>
            <button class="detail-btn">Detail</button>
            <button class="delete-btn" data-id="${userResponse.userId}">Xóa</button>
        </td>
    `;

    if (existingRow) {
        existingRow.innerHTML = html
        // Đăng ký lại event nếu cần
        registerDetailButton(existingRow, userResponse)
    } else {
        // Tạo dòng mới nếu chưa tồn tại
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", userResponse.userId)
        tr.innerHTML = html
        registerDetailButton(tr, userResponse)
        registerDeleteButton(tr, userResponse.userId)
        document.getElementById(idTableUserBody).appendChild(tr)
    }
}

async function deleteUser(idUser) {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/users/${idUser}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })

        if (!response.ok) {
            alert("Xóa người dùng không thành công")
        } else {
            alert("Xóa người dùng thành công")
            const deleteRow = document.querySelector(`tr[data-id="${idUser}"]`)
            if (deleteRow) {
                deleteRow.remove()
            }
        }
    } catch (error) {
        console.error("Lỗi xóa người dùng: ", error)
        alert("Có lỗi xảy ra khi xóa người dùng.");
    }
}

async function addStaffUserFromModalAdd(idTableUserBody) {
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    const fullname = document.getElementById("fullname").value.trim()
    const age = document.getElementById("age").value.trim()
    const address = document.getElementById("address").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const email = document.getElementById("email").value.trim()
    const fileInput = document.getElementById("fileInputAddUser")

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("age", age)
    formData.append("fullname", fullname)
    if (fileInput.files.length) {
        formData.append("image", fileInput.files[0]);
    }

    try {
        const response = await fetch(`http://localhost:8080/api/users/staff`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        })

        if (response.ok) {
            const data = response.json();
            const userResponse = {
                userId: data.result.userId,
                imagePath: `http://localhost:8080${data.result.imagePath}`,
                username: data.result.username,
                fullname: data.result.fullname,
                email: data.result.email,
                age: data.result.age,
                phone: data.result.phone,
                address: data.result.address,
            }
            alert("Thêm người dùng thành công")
            displayTablerowInTableBody(userResponse, idTableUserBody)
        } else {
            console.error("Response: Error fetch add staff - " + error);
        }
    } catch (error) {
        console.error("Lỗi khi thêm người dùng: " + error)
    }
}


function addUserModalDisplay() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("fullname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    utils.openModel("addUserModal");
}

function editUserModalValue(User) {
    document.getElementById("userIdEdit").value = User.userId
    document.getElementById("emailEdit").value = User.email
    document.getElementById("fullnameEdit").value = User.fullname
    document.getElementById("ageEdit").value = User.age
    document.getElementById("phoneEdit").value = User.phone
    document.getElementById("addressEdit").value = User.address
    utils.showImageFromAPI("previewImageEditUser", User.imagePath)
    utils.previewImage("fileInputEditUser", "previewImageEditUser");
}

function receiveUserEditValueFromEditModal() {
    const userId = document.getElementById("userIdEdit").value.trim()
    const email = document.getElementById("emailEdit").value.trim()
    const fullname = document.getElementById("fullnameEdit").value.trim()
    const age = document.getElementById("ageEdit").value.trim()
    const phone = document.getElementById("phoneEdit").value.trim()
    const address = document.getElementById("addressEdit").value.trim()
    const imageFileInput = document.getElementById("fileInputEditUser");
    const imageFile = imageFileInput.files.length > 0 ? imageFileInput.files[0] : null
    return {
        userId, email, fullname, age, phone, address,
        imageFileInput: imageFile,
    }
}

async function updateUser(idTableUserBody) {
    // get data
    const userUpdateValue = receiveUserEditValueFromEditModal()
    if (!userUpdateValue) return;
    const userId = userUpdateValue.userId

    const formData = new FormData()
    formData.append("email", userUpdateValue.email)
    formData.append("age", userUpdateValue.age)
    formData.append("fullname", userUpdateValue.fullname)
    formData.append("phone", userUpdateValue.phone)
    formData.append("address", userUpdateValue.address)
    // CHỈ append khi có file
    if (userUpdateValue.imageFileInput && userUpdateValue.imageFileInput instanceof File) {
        formData.append("image", userUpdateValue.imageFileInput);
    }

    // fetch
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        })

        if (response.ok) {
            const data = await response.json()
            alert("Cập nhật người dùng thành công")
            const userResponse = {
                userId: data.result.userId,
                imagePath: `http://localhost:8080${data.result.imagePath}`,
                username: data.result.username,
                fullname: data.result.fullname,
                email: data.result.email,
                age: data.result.age,
                phone: data.result.phone,
                address: data.result.address,
            }
            // show table
            displayTablerowInTableBody(userResponse, idTableUserBody)

            // check detail có đang mở không
            // Kiểm tra nếu chi tiết đó đang mở
            // ?. là Optional Chaining
            // Kiểm tra nếu phần trước đó(document.getElementById("showUserid")) tồn tại thì mới truy cập.textContent.
            // Nếu phần đó null hoặc undefined, kết quả sẽ là undefined thay vì ném ra lỗi.
            const detailId = document.getElementById("showUserid")?.textContent;

            if (detailId && detailId == userResponse.userId) {
                // 👉 Mở lại chi tiết ngay bằng dữ liệu mới
                openDetailUser(userResponse);
                utils.closeModel("editUserModal");
            }
        }
    } catch (error) {
        console.error("Lỗi khi update user", error)
    }
}

async function loadListUserToTable(idTableUserBody) {
    const response = await fetch(`http://localhost:8080/api/users/list-user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    if (!response.ok) {
        console.error("Error load user list");
        return;
    }

    const data = await response.json()
    data.result.forEach(user => {
        const userResponse = {
            userId: user.userId,
            imagePath: `http://localhost:8080${user.imagePath}`,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            age: user.age,
            phone: user.phone,
            address: user.address
        };
        displayTablerowInTableBody(userResponse, idTableUserBody);
    });
}

export function load_user() {
    fetch(`/html/AdminManagerFragement/User.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".section-user").innerHTML = data;
            const userFormAdd = document.getElementById("userFormAdd");
            const btnAddNewUserModal = document.getElementById("btnAddNewUserModal");

            // Load User List
            loadListUserToTable("userTableBody");

            // Mở modal thêm user
            btnAddNewUserModal.addEventListener('click', addUserModalDisplay);

            // Đóng modal thêm user
            utils.setupOutsideClickToCloseModal("addUserModal");
            utils.click_X_toCloseModal("closeAddModel", "addUserModal");

            // Preview ảnh
            utils.previewImage("fileInputAddUser", "previewImageAddUser");

            // Xử lý thêm user
            userFormAdd.addEventListener("submit", (event) => {
                event.preventDefault();
                addStaffUserFromModalAdd("userTableBody");
            });

            // xử lý edit user
            document.getElementById("userFormEdit").addEventListener("submit", (event) => {
                event.preventDefault()
                updateUser("userTableBody")
            })
        })
}

export default { load_user }