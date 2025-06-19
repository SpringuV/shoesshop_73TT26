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
    console.log(fileInput)

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
            alert("Thêm người dùng thành công")
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${data.result.userId}</td>
                <td>
                    <img class = "img-product" src="http://localhost:8080${data.result.imagePath}" width="100" height="100" alt="product image">
                </td>
                <td>${data.result.username}</td>
                <td>${data.result.fullname}</td>
                <td>${data.result.email}</td>
                <td>
                    <button class="detail-btn">Detail</button>
                    <button class="delete-btn" data-id="${data.result.userId}">Xóa</button>
                </td>
            `;
            // event detail button
            tr.querySelector(".detail-btn").addEventListener("click", () => {
                const User = {
                    userId: data.result.userId,
                    username: data.result.username,
                    email: data.result.email,
                    fullname: data.result.fullname,
                    age: data.result.age,
                    phone: data.result.phone,
                    address: data.result.address,
                    imagePath: `http://localhost:8080${data.result.imagePath}`,
                }
                // open detail
                openDetailUser(User)
                utils.click_X_toCloseModal("closeDetailModal", "modalDetail")
                utils.setupOutsideClickToCloseModal("modalDetail")
            })
            // hiển thị row
            document.getElementById(idTableUserBody).appendChild(tr)
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

async function loadListUserToTable(idTableUserBody) {
    const response = await fetch(`http://localhost:8080/api/users/list-user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })

    if (response.ok) {
        const data = await response.json()
        data.result.forEach(user => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${user.userId}</td>
                <td>
                    <img class = "img-product" src="http://localhost:8080${user.imagePath}" width="100" height="100" alt="product image">
                </td>
                <td>${user.username}</td>
                <td>${user.fullname}</td>
                <td>${user.email}</td>
                <td>
                    <button class="detail-btn" data-id="${user.userId}">Detail</button>
                    <button class="delete-btn" data-id="${user.userId}">Xóa</button>
                </td>
            `;
            // event detail button
            tr.querySelector(".detail-btn").addEventListener("click", () => {
                const User = {
                    userId: `${user.userId}`,
                    username: `${user.username}`,
                    email: `${user.email}`,
                    fullname: `${user.fullname}`,
                    age: `${user.age}`,
                    phone: `${user.phone}`,
                    address: `${user.address}`,
                    imagePath: `http://localhost:8080${user.imagePath}`,
                }
                console.log("User: ", User)
                // open detail
                openDetailUser(User)
                utils.click_X_toCloseModal("closeDetailModal", "modalDetail")
                utils.setupOutsideClickToCloseModal("modalDetail")
            })
            // hiển thị row
            document.getElementById(idTableUserBody).appendChild(tr)
        });
    }
}

export function load_user() {
    fetch(`/html/AdminManagerFragement/User.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".section-user").innerHTML = data
            const userFormAdd = document.getElementById("userFormAdd");
            const userFormEdit = document.getElementById("userFormEdit")
            const bodyUserTable = document.getElementById("userTableBody");
            const btnAddNewUserModal = document.getElementById("btnAddNewUserModal");
            const userAddModal = document.getElementById("addUserModal");
            const userEditModal = document.getElementById("editUserModal");
            // -------------------------Load List user from Api --------------------------------------
            loadListUserToTable("userTableBody")
            // -------------------------END: Load List user from Api --------------------------------------

            // -------------------------- modal add and process add new user --------------------------
            btnAddNewUserModal.addEventListener('click', () => {
                addUserModalDisplay()
            })

            // click dấu x hoặc click ra ngoài modal sẽ đóng form
            utils.setupOutsideClickToCloseModal("addUserModal");
            utils.click_X_toCloseModal("closeAddModel", "addUserModal")
            // -------------------------- end modal add and process add new user --------------------------

            // process add user
            userFormAdd.addEventListener("submit", (event) => {
                event.preventDefault()
                addStaffUserFromModalAdd("userTableBody")
            })
            // end process add user

            //-------------------------- detail user--------------------------

            //-------------------------- END: detail user--------------------------
        })
}

export default { load_user }