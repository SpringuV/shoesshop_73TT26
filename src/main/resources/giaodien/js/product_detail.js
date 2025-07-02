import auth from './authToken.js'
import cart from './Home.js'
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function displayProductDetail(product) {
    const product_detail_container = document.querySelector(".product-detail-container")
    product_detail_container.innerHTML = "" // xóa nội dung cũ

    const sizeBtnHtml = product.sizeResponseSet.map(size => {
        return `<div class="btn-size">${size}</div>`
    }).join("")

    product_detail_container.innerHTML = `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${product.imagePath}" alt="Ảnh sản phẩm">
            </div>
        </div>
        <div class="product-detail-info">
            <h1>${product.nameProduct}</h1>
            <p class="price">${product.prices.toLocaleString()}đ</p>

            <form id = "formDetailAddToCart" data-id = "${product.productId}">
                <div class="product-options">
                    <p><strong>Size:</strong></p>
                    <div class="size-buttons">
                        ${sizeBtnHtml}
                    </div>
                    <div class = "quantity-product">
                        <p><strong>Số lượng:</strong></p>
                        <div class="quantity-selector">
                            <div class="minus">
                                <i class="fa-solid fa-minus"></i>
                            </div>
                            <div class="quantity-cart">
                                <input type="number" min="1" max="100" value="1" readonly/>
                            </div>
                            <div class="plus">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <button type = "submit" class="add-to-cart">Thêm vào giỏ</button>
            </form>

            <div class="product-shipping">
                <p><i class="fas fa-truck"></i> Giao hàng nhanh từ 1 - 3 ngày</p>
                <p><i class="fas fa-undo"></i> Đổi trả miễn phí trong 7 ngày</p>
            </div>

            <div class="product-details">
                <h2>Chi tiết sản phẩm</h2>
                <ul>
                    ${product.description}
                </ul>

                <h2>Hướng dẫn bảo quản</h2>
                <ul>
                    <li>Không giặt máy, chỉ giặt tay với nước lạnh</li>
                    <li>Không sử dụng bàn chải cứng hoặc chất tẩy mạnh</li>
                    <li>Phơi nơi thoáng mát, tránh ánh nắng trực tiếp</li>
                </ul>
            </div>
        </div>
    `;
    handleQuantityChange()
    handleSizeSelection()
    handleAddToCart()
}

function handleSizeSelection() {
    const sizeButtons = document.querySelectorAll(".btn-size")
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Bỏ class 'selected' khỏi tất cả button
            sizeButtons.forEach(btn => btn.classList.remove("selected"));
            // Thêm class 'selected' vào button được click
            button.classList.add("selected");
        });
    });
}

async function handleAddToCart() {
    const formAddToCart = document.getElementById("formDetailAddToCart")
    formAddToCart.addEventListener("submit", (e) => {
        e.preventDefault()
        const productId = e.target.dataset.id
        const userId = auth.getUserId()
        const sizeBtnSelected = document.querySelector(".btn-size.selected")
        if (!sizeBtnSelected) {
            alert("Vui lòng chọn size trước khi thêm vào giỏ hàng");
            return;
        }
        const size = sizeBtnSelected.textContent;

        const quantity = parseInt(document.querySelector('.quantity-cart input').value)

        // add to db
        cart.addProductToCart(productId, quantity, size)
    })
}

function handleQuantityChange() {
    const btn_plus = document.querySelector(".plus")
    const btn_minus = document.querySelector(".minus")
    const quantity = document.querySelector('.quantity-cart input[type="number"]')

    btn_plus.addEventListener("click", () => {
        if (parseInt(quantity.value) <= 100) {
            quantity.value = parseInt(quantity.value) + 1;
        }
    })

    btn_minus.addEventListener("click", () => {
        if (parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1;
        }
    })
}

export async function loadProductDetail() {
    const productId = getProductIdFromUrl()
    if (!productId) return alert("Không tìm thấy sản phẩm!")

    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: "GET"
        })

        if (response.ok) {
            const data = await response.json()
            const productResponse = {
                productId: data.result.productId,
                nameProduct: data.result.nameProduct,
                description: data.result.description,
                prices: data.result.prices,
                stock_quantity: data.result.stock_quantity,
                sizeResponseSet: data.result.sizeResponseSet,
                brand: data.result.brand,
                gender: data.result.gender,
                imagePath: `http://localhost:8080${data.result.imagePath}`
            }
            displayProductDetail(productResponse)
        } else {
            alert("Lỗi khi loadProductDetail - 1")
        }
    } catch (error) {
        alert("Lỗi khi loadProductDetail - 2")
        console.error("Lỗi khi loadProductDetail - 2:", error)
    }
}