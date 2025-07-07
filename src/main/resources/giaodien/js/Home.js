import auth from "./authToken.js"

/* Slider */
export function setupSlider() {
    const imgPosition = document.querySelectorAll(".aspect-ratio-169 img");
    const imgContainer = document.querySelector(".aspect-ratio-169");
    const dotItem = document.querySelectorAll(".dot");

    if (!imgContainer || imgPosition.length === 0 || dotItem.length === 0) return;

    let index = 0;
    let imgNumber = imgPosition.length;

    imgPosition.forEach((img, i) => {
        img.style.left = i * 100 + "%";
        dotItem[i]?.addEventListener("click", () => slider(i));
    });

    function slider(i) {
        index = i;
        imgContainer.style.transform = `translateX(-${index * 100}%)`;
        document.querySelector(".dot.active")?.classList.remove("active");
        dotItem[index]?.classList.add("active");
    }

    function autoSlide() {
        index = (index + 1) % imgNumber;
        slider(index);
    }

    setInterval(autoSlide, 5000);
}
/* End Slider */

/* Product Scroll */
export function setupScrollButton() {
    const wrapper = document.querySelector(".products-wrapper");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const productWidth = 250;

    if (!wrapper || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener("click", () => {
        wrapper.scrollLeft -= productWidth;
    });
    nextBtn.addEventListener("click", () => {
        wrapper.scrollLeft += productWidth;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu > ul");
    const overlay = document.querySelector(".menu-overlay");
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    if (!toggle || !menu || !overlay) return;

    function closeMenu() {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        overlay.classList.remove("active");
    }

    function openMenu() {
        menu.classList.add("active");
        toggle.classList.add("active");
        overlay.classList.add("active");
    }

    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        if (menu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".menu > ul > li > a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    mediaQuery.addEventListener("change", (e) => {
        if (!e.matches) {
            closeMenu();
        }
    });
});
// -----------------------------------------------------------------------------------------------------
function displayNewProduct(productList) {
    const wrapper = document.querySelector(".products-wrapper")
    wrapper.innerHTML = "";
    const isLoggedIn = auth.checkUserLogin()
    productList.forEach(product => {
        const item = document.createElement('div')
        item.classList.add("product-item")

        item.innerHTML = `
            <div class = "image-item-home">
                <a href="/html/Product_detail.html?id=${product.productId}">
                    <img class = "image-new-product" src="http://localhost:8080${product.imagePath}" alt="Sản phẩm 1">
                </a>
            </div>
            <h3>${product.nameProduct}</h3>
            <p>${product.brand}</p>
            <p>${product.prices.toLocaleString()} đ</p>
            <div class= "item-action">
                ${isLoggedIn ? `<button class="favorite" data-id="${product.productId}"><i class="fa-solid fa-heart"></i></button>
                <button class="color-btn" data-id="${product.productId}">Thêm vào giỏ hàng</button>` : `<p class = "not-logged-in">Đăng nhập để mua hàng</p>`}
            </div>
        `;
        wrapper.appendChild(item)
    })
}

async function addProductToWishList(productId) {
    const isLoggedIn = auth.checkUserLogin();
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
        return;
    }
    const userId = auth.getUserId()
    const dataRequest = {
        userId: userId,
        productId: productId
    }
    try {
        const response = await fetch(`http://localhost:8080/api/wish-lists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        })
        if (response.ok) {
            const data = await response.json()
            if (data.result.liked) {
                alert("Đã thêm vào mục yêu thích")
            } else {
                alert("Đã xóa khỏi mục yêu thích")
            }
        } else {
            alert("Lỗi thực hiện addProductToWishList - 1")
        }
    } catch (error) {
        console.log("Không thêm được vào Yêu thích")
        alert("Lỗi thực hiện addProductToWishList - 2")
    }
}

async function addProductToCart(productId, quantity, size) {
    const isLoggedIn = auth.checkUserLogin();
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
        return;
    }

    const userId = auth.getUserId()
    const dataRequest = {
        userId: userId,
        productId: productId,
        quantity: quantity ? quantity : 1,
        size: size ? size : 40
    }

    try {
        const response = await fetch(`http://localhost:8080/api/cart-items`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        })

        if (response.status === 409) {
            alert("Sản phẩm đã tồn tại trong giỏ hàng")
        } else if (response.status == 401) {
            confirm("Phiên đăng nhập đã hết hạn, bạn cần đăng nhập lại")
        } else if (response.ok) {
            alert("Đã thêm vào giỏ hàng")
        } else {
            alert("Lỗi thực hiện addProductToCart - 1")
        }
    } catch (error) {
        console.log("Không thêm được vào giỏ hàng")
        alert("Lỗi thực hiện addProductToCart - 2")
    }
}


async function loadNewProducts() {
    try {
        const response = await fetch(`http://localhost:8080/api/products/new-products`, {
            method: "GET",
        })

        if (response.ok) {
            const data = await response.json()
            displayNewProduct(data.result)
        } else {
            console.error("Error loading new products");
            return;
        }
    } catch (error) {
        alert("Lỗi khi thực hiện loadNewProducts")
        console.error("Lỗi khi loadNewProducts: ", error)
    }
}

export function setUpHomepageEvent() {
    document.addEventListener("DOMContentLoaded", () => {
        loadNewProducts()

        // xử lý thêm giỏ hàng và yêu thích
        const wrapper = document.querySelector(".products-wrapper")
        wrapper.addEventListener("click", async (event) => {
            console.log(event)
            if (event.target.classList.contains("color-btn")) {
                const productId = event.target.dataset.id
                await addProductToCart(productId)
            } else if (event.target.closest(".favorite")) {
                const productId = event.target.closest(".favorite").dataset.id
                await addProductToWishList(productId)
            }
        })
    })
}
export default { loadNewProducts, addProductToCart, addProductToWishList }

