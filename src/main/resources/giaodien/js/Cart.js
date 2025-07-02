import auth from './authToken.js'

function displayCartItemToTable(dataListResponse, userId) {
    const tableBodyCartItem = document.getElementById("tbody-cart-list")
    // forEach data
    tableBodyCartItem.innerHTML = ""
    dataListResponse.forEach(cartItem => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
                <td class="cart-td-product">
                    <div class="image-cart">
                        <img src="http://localhost:8080${cartItem.productCartItemResponse.imagePath}">
                    </div>
                    <div class="summary-info">
                        <h3>${cartItem.productCartItemResponse.nameProduct}</h3>
                        <p>Thương hiệu: ${cartItem.productCartItemResponse.brand}</p>
                    </div>
                </td>
                <td>
                    <div class = "select-size">
                        <select data-proid="${cartItem.productCartItemResponse.proId}">
                            ${cartItem.productCartItemResponse.sizeResponseSet.map(size => `
                                <option value="${size}" ${size === cartItem.size ? "selected" : ""}>${size}</option>
                            `).join("")}
                        </select>
                    </div>
                </td>
                <td>
                    <div class="cart-price">
                        <span>${cartItem.productCartItemResponse.prices.toLocaleString()}đ</span>
                    </div>
                </td>
                <td>
                    <div class="cart-action">
                        <div class="minus" data-proid = "${cartItem.productCartItemResponse.proId}">
                            <i class="fa-solid fa-minus"></i>
                        </div>
                        <div class="quantity-cart">
                            <input type="number" data-proid = "${cartItem.productCartItemResponse.proId}" min="1" max="100" value="${cartItem.quantity}" readonly/>
                        </div>
                        <div class="plus" data-proid = "${cartItem.productCartItemResponse.proId}">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="total-price">
                        <span>${(cartItem.quantity * cartItem.productCartItemResponse.prices).toLocaleString()}đ</span>
                        <button class="delete-item" data-product-name="${cartItem.productCartItemResponse.nameProduct}" data-proid = "${cartItem.productCartItemResponse.proId}"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </td>
            `;
        tableBodyCartItem.appendChild(tr)
    })

    tableBodyCartItem.addEventListener("click", (event) => {
        const target = event.target.closest('.plus, .minus, .delete-item')
        if (!target) return

        if (target.classList.contains('delete-item')) {
            handleDeleteCartItem(tableBodyCartItem, target, userId)
        } else {
            handleQuantityAndSizeChange(tableBodyCartItem, target, userId);
            updateAllTotals()
        }
    })

    // ✅ Lắng nghe thay đổi size
    tableBodyCartItem.addEventListener("change", (event) => {
        if (event.target.tagName === "SELECT" && event.target.hasAttribute("data-proid")) {
            const proid = event.target.getAttribute("data-proid")
            const quantityInput = tableBodyCartItem.querySelector(`input[data-proid="${proid}"]`)
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1
            const size = event.target.value

            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
                updateProductToDB(userId, proid, quantity, size)
            }, 2000)
        }
    })
}

let debounceTimer;
function handleDeleteCartItem(tableBody, target, userId) {
    const productId = target.getAttribute("data-proid")
    const nameProduct = target.getAttribute("data-product-name")
    deleteCartItemDB(userId, productId, nameProduct, tableBody, target)
}

function handleQuantityAndSizeChange(tableBody, target, userId) {
    const proid = target.getAttribute('data-proid')
    const quantityInput = tableBody.querySelector(`input[data-proid="${proid}"]`)
    if (!quantityInput) {
        console.error("Không tìm thấy input quantity");
        return;
    }
    let quantity = parseInt(quantityInput.value)
    if (target.classList.contains('plus') && quantity < 100) {
        quantityInput.value = ++quantity
    } else if (target.classList.contains('minus') && quantity > 1) {
        quantityInput.value = --quantity
    }

    // cập nhật tổng
    const priceUnit = target.closest('tr').querySelector('.cart-price span')
    const totalPrice = target.closest('tr').querySelector('.total-price span')

    const price = parseFloat(priceUnit.textContent.replace(/\D/g, '')) || 0 // \D = Ký tự KHÔNG phải số (0–9).g = Áp dụng trên toàn bộ chuỗi (global).
    totalPrice.textContent = (quantity * price).toLocaleString() + 'đ' || "0"

    // lấy size chọn
    const sizeSelect = tableBody.querySelector(`select[data-proid="${proid}"]`)
    const size = sizeSelect ? sizeSelect.value : null;

    // DEBOUNCE Cập nhật lên DB
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        updateProductToDB(userId, proid, quantity, size);
    }, 2000) // 1000ms = 1 giây, tuỳ chỉnh
}

function updateAllTotals() {
    const rows = document.querySelectorAll('#tbody-cart-list tr');
    let grandTotal = 0;

    rows.forEach(row => {
        const quantityInput = row.querySelector('.quantity-cart input');
        const priceUnit = row.querySelector('.cart-price span');
        const totalPrice = row.querySelector('.total-price span');

        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceUnit.textContent.replace(/\D/g, ''));

        const lineTotal = quantity * price;

        totalPrice.textContent = lineTotal.toLocaleString() + 'đ';
        grandTotal += lineTotal;
    });

    // Cập nhật tổng toàn bộ
    const cartTotal = document.getElementById('total-price');
    if (cartTotal) {
        cartTotal.textContent = grandTotal.toLocaleString() + 'đ';
    }
}

async function deleteCartItemDB(userId, productId, productName, tableBody, target) {
    if (!confirm(`Bạn có chắc là sẽ xóa sản phẩm ${productName} khỏi giỏ hàng chứ`)) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/cart-items/${userId}/${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.ok) {
            alert(`Xóa sản phẩm ${productName} khỏi giỏ hàng okk!!!`)
            // xóa dòng trên giao diện
            const row = target.closest('tr')
            if (row) {
                row.remove()
            }
            // Cập nhật lại tổng toàn bộ
            updateAllTotals();
        } else {
            alert("Lỗi khi deleteCartItem - 1")
        }
    } catch (error) {
        alert("Lỗi khi deleteCartItem - 2")
        console.error("Lỗi khi deleteCartItem - 2", error)
    }
}

async function updateProductToDB(userId, productId, quantity, size) {
    const dataRequest = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        size: size
    }

    try {
        const response = await fetch(`http://localhost:8080/api/cart-items/update`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        })
        if (response.ok) {
            alert("Cập nhật số lượng sản phẩm trong giỏ hàng okk !!!")
        } else {
            alert("Lỗi khi updateProductToDB - 1")
        }
    } catch (error) {
        alert("Lỗi khi updateProductToDB - 2")
        console.error("Lỗi khi updateProductToDB - 2", error)
    }
}

export async function loadCartItem() {
    const userId = auth.getUserId()
    try {
        const response = await fetch(`http://localhost:8080/api/cart-items/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (response.ok) {
            const dataResponse = await response.json()
            displayCartItemToTable(dataResponse.result, userId)
            // load luôn để tính tổng
            updateAllTotals()
        } else {
            alert("Lỗi khi loadCartItem - 1")
        }
    } catch (error) {
        alert("Lỗi khi loadCartItem - 2")
        console.error("Lỗi khi loadCartItem - 2", error)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartItem();
})

export default loadCartItem