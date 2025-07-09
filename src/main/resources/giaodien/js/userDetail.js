import utils from '../js/admin/utils.js'
import auth from './authToken.js'

let userFromDb = {};

function displayToPage(user) {
    document.querySelector("#fullname").textContent = user.fullname
    document.querySelector("#username").textContent = user.username
    document.querySelector("#age").textContent = user.age
    document.querySelector("#address").textContent = user.address
    document.querySelector("#phone").textContent = user.phone
    document.querySelector("#email").textContent = user.email
    document.querySelector("#imageUser").src = user.imagePath
}

async function loadUserToPage() {
    try {
        const response = await fetch(`http://localhost:8080/api/users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.ok) {
            const data = await response.json()
            const user = {
                fullname: data.result.fullname,
                username: data.result.username,
                age: data.result.age,
                address: data.result.address,
                phone: data.result.phone,
                email: data.result.email,
                imagePath: `http://localhost:8080${data.result.imagePath}`
            }
            userFromDb = user
            displayToPage(user)
        }


    } catch (error) {
        console.log("Không thực hiện được loadUserToPage")
        alert("Lỗi thực hiện loadUserToPage - 2")
    }
}

function editUser(user) {
    document.querySelector("#fullnameEdit").value = user.fullname
    document.querySelector("#usernameEdit").value = user.username
    document.querySelector("#ageEdit").value = user.age
    document.querySelector("#addressEdit").value = user.address
    document.querySelector("#phoneEdit").value = user.phone
    document.querySelector("#emailEdit").value = user.email
    document.querySelector("#previewImageEditUser").src = user.imagePath

    utils.previewImage("fileInputEditUser", "previewImageEditUser")
}


async function processEditUser() {
    const userId = auth.getUserId()
    const imagePath = document.querySelector("#fileInputEditUser").files.length > 0 ? document.querySelector("#fileInputEditUser").files[0] : null

    const formData = new FormData()
    formData.append("fullname", document.querySelector("#fullnameEdit").value.trim())
    formData.append("address", document.querySelector("#addressEdit").value.trim())
    formData.append("phone", document.querySelector("#phoneEdit").value.trim())
    formData.append("email", document.querySelector("#emailEdit").value.trim())
    formData.append("age", document.querySelector("#ageEdit").value)
    console.log(document.querySelector("#fileInputEditUser").files[0])
    // CHỈ append khi có file
    if (imagePath && imagePath instanceof File) {
        formData.append("image", imagePath);
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
            displayToPage(userResponse)

            utils.closeModel("editUserModal")
        } else {
            alert("Lỗi khi cập nhật người dùng -1")
        }
    } catch (error) {
        console.error("Lỗi khi update user", error)
        alert("Lỗi khi cập nhật người dùng -2")
    }
}

async function changePassword() {
    const oldPassword = document.querySelector("#oldPassword").value.trim()
    console.log(oldPassword)
    const newPassword = document.querySelector("#newPassword").value.trim()
    console.log(newPassword)
    const confirmPassword = document.querySelector("#confirmPassword").value.trim()
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
        alert("Vui lòng điền đầy đủ thông tin")
        return
    }
    console.log(confirmPassword)
    if (newPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp")
        return
    }
    const dataRequest = {
        oldPassword: oldPassword,
        newPassword: newPassword
    }
    try {
        const response = await fetch(`http://localhost:8080/api/users/changePass`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        })

        if (response.ok) {
            alert("Đổi mật khẩu thành công")
        } else {
            alert("Lỗi khi đổi mật khẩu -1")
        }
    } catch (error) {
        console.error("Lỗi khi đổi mật khẩu", error)
        alert("Lỗi khi đổi mật khẩu -2")
    }
}

export function setUploadPage() {
    loadUserToPage()
    document.querySelector(".btn-edit").addEventListener("click", () => {
        editUser(userFromDb)
        utils.openModel("editUserModal")
        utils.click_X_toCloseModal("closeEditModel", "editUserModal")
        utils.setupOutsideClickToCloseModal("editUserModal")
    })

    document.querySelector(".btn-change").addEventListener("click", () => {
        utils.openModel("changePasswordModal")
        utils.click_X_toCloseModal("closeChangePasswordModal", "changePasswordModal")
        utils.setupOutsideClickToCloseModal("changePasswordModal")
    })

    document.querySelector("#userFormEdit").addEventListener("submit", (e) => {
        e.preventDefault()
        processEditUser()
    })

    const changePasswordForm = document.querySelector("#changePasswordForm");
    changePasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        changePassword();
        utils.closeModel("changePasswordModal")
    });

    // toggle active display password
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', () => {
            const inputId = icon.getAttribute('data-target')
            const input = document.getElementById(inputId)
            if (input.type === "password") {
                input.type = "text"
                icon.classList.remove("fa-eye")
                icon.classList.add("fa-eye-slash")
            } else {
                input.type = "password"
                icon.classList.remove("fa-eye-slash")
                icon.classList.add("fa-eye")
            }
        })
    })
}
