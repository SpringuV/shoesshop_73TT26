import auth from './authToken.js'
import cart from './Home.js'

function displayWishList(productList) {
    const favoriteWrapper = document.querySelector(".wish-list-wrapper")
    const emptyFavorite = document.querySelector(".empty")

    favoriteWrapper.innerHTML = ""  // xóa nội dung cũ
    if (!productList || productList.length === 0) {
        emptyFavorite.innerHTML = '<p style="text-align: center;">Không có sản phẩm yêu thích nào.</p>';
        return;
    }
    productList.forEach(item => {
        const divProductItem = document.createElement("div")
        divProductItem.classList.add("wish-list-item")

        divProductItem.innerHTML = `
            <a href="/html/Product_detail.html?id=${item.productWishListResponse.proId}"><img src="http://localhost:8080${item.productWishListResponse.imagePath}" alt="Ảnh sản phẩm giày"></a>
            <h4 class="name-product">${item.productWishListResponse.nameProduct}</h4>
            <p class="prices">${item.productWishListResponse.prices.toLocaleString()}₫</p>
            <div class="item-action">
                <button class="favorite" data-id="${item.productWishListResponse.proId}"><i class="fa-solid fa-trash"></i></button>
                <button class="color-btn" data-id="${item.productWishListResponse.proId}">Thêm vào giỏ hàng</button>
            </div>
        `;
        favoriteWrapper.appendChild(divProductItem)
    })
}

async function loadWishList() {
    const userId = auth.getUserId();
    if (!userId) {
        alert("Bạn cần phải đăng nhập để thực hiện chức năng này !")
        return
    }
    try {
        const response = await fetch(`http://localhost:8080/api/wish-lists/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
        if (response.ok) {
            const data = await response.json()
            displayWishList(data.result)
        } else {
            alert("Lỗi loadWishList - 1 (API error)")
        }
    } catch (error) {
        console.error("Lỗi loadWishList - 2 (API error)", error)
        alert("Lỗi loadWishList - 2 (API error)")
    }
}

async function setUpLoadPage() {
    document.addEventListener("DOMContentLoaded", () => {
        loadWishList()

        const wishListWrapper = document.querySelector(".wish-list-wrapper")
        wishListWrapper.addEventListener("click", (event) => {
            const favoriteBtn = event.target.closest(".favorite")
            const addToCartBtn = event.target.classList.contains("color-btn");
            if (event.target.classList.contains("color-btn")) {
                const productId = addToCartBtn.dataset.id
                cart.addProductToCart(productId)
            } else if (favoriteBtn) {
                const productId = favoriteBtn.dataset.id
                const parentNode = favoriteBtn.closest(".wish-list-item")

                try{
                    cart.addProductToWishList(productId) // // Toggle API
                    parentNode.remove()
                } catch (error) {
                    console.error("Lỗi khi xóa khỏi wishlist", error);
                    alert("Không thể xóa khỏi danh sách yêu thích.");
                }
            }
        })
    })
}

export default { setUpLoadPage }