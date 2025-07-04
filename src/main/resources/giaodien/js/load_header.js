import auth from './authToken.js';

function searchInput() {
    const searchInput = document.getElementById("search-input")
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const keyWord = searchInput.value.trim()
            if (keyWord) {
                window.location.href = `/html/kiosk_product.html?search=${encodeURIComponent(keyWord)}`
            }
        }
    })
}

function loadHeader() {
    fetch('/html/header.html')
        .then(response => response.text())
        .then(
            data => {
                document.querySelector(".header").innerHTML = data
                setTimeout(() => {
                    const userName = auth.getUserName()
                    const area_login = document.querySelector(".btn.login-btn")

                    // lấy account_menu
                    const adminManager = document.querySelector(".btn.admin-manager")
                    const account_menu = document.querySelector(".account-menu")
                    const userSection = document.querySelector(".user-icon")

                    // mặc định account menu là ẩn
                    area_login.style.display = "inline-block"
                    userSection.style.display = "none"
                    // nếu đã đăng nhập
                    if (userName != null) {
                        userSection.style.display = "inline-block"
                        area_login.style.display = "none"
                        // lấy icon user và set click thì mới hiện
                        userSection.addEventListener('click', () => {
                            // toggle menu
                            if (account_menu.style.display == "none") {
                                account_menu.style.display = "block"
                            } else {
                                account_menu.style.display = "none"
                            }
                        })
                        // hiển thị label username
                        const labelUserName = document.querySelector(".label-username")
                        if (labelUserName) labelUserName.textContent = "Chào " + userName
                    } else {
                        account_menu.style.display = "none"
                        userSection.style.display = "none"
                        area_login.style.display = "inline-block"
                        const btn_login = document.querySelector(".login");
                        btn_login.addEventListener("click", () => {
                            window.location.href = "/html/index.html"
                        })
                    }

                    // cart shop
                    const cartManager = document.getElementById("cart-manager")
                    cartManager.addEventListener('click', (event) => {
                        // checklogin
                        const logined = auth.checkUserLogin();
                        if (!logined) {
                            alert("Bạn cần phải đăng nhập")
                            event.preventDefault()
                        }
                    })

                    // wishlist
                    const wishList = document.getElementById("favorite")
                    wishList.addEventListener('click', (event) => {
                        // checklogin
                        const logined = auth.checkUserLogin();
                        if (!logined) {
                            alert("Bạn cần phải đăng nhập")
                            event.preventDefault()
                        }
                    })

                    // logout
                    const logoutBtn = document.querySelector(".logout")
                    logoutBtn.addEventListener("click", () => {
                        auth.logout();
                    })

                    // admin manager
                    const roleUser = auth.getRoleUser()
                    if (roleUser == "ROLE_ADMIN") {
                        adminManager.style.display = "inline-block"
                        adminManager.addEventListener("click", () => {
                            // Chuyển đến trang quản lý hoặc mở giao diện quản trị
                            window.location.href = "/html/Admin.html";
                        })
                    } else {
                        adminManager.addEventListener("click", () => {
                            alert("Bạn không có quyền truy cập chức năng này.");
                        })
                    }

                    // sau khi header duoc truyen vao dom
                    const links = document.querySelectorAll('a[data-name]')
                    links.forEach(link => {
                        link.addEventListener("click", (e) => {
                            e.preventDefault()
                            const nameCate = e.currentTarget.dataset.name;
                            if (nameCate) {
                                window.location.href = `/html/kiosk_product.html?nameCate=${encodeURIComponent(nameCate)}`
                            }
                        })
                    })
                    searchInput()
                }, 0); // chờ DOM render xong
            }
        )
    // .catch(error => console.error("Lỗi khi tải header:", error))
}

export function setUpHeader() {
    document.addEventListener("DOMContentLoaded", () => {
        // load header
        loadHeader()
    })
}