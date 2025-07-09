import auth from './authToken.js';
import utils from './admin/utils.js';

function openAndSetValueForDetailOrder(orderResponse) {
    utils.openModel("modal-detail-order")
    const modalDetail = document.querySelector('#modal-detail-order')

    const orderId = modalDetail.querySelector('#order-id')
    const orderDate = modalDetail.querySelector('#order-date')
    const totalPrice = modalDetail.querySelector('#order-total')
    const paymentStatus = modalDetail.querySelector('#order-status')

    orderId.textContent = orderResponse.idOrder;
    orderDate.textContent = new Date(orderResponse.orderDate*1000).toLocaleString() //  nhân với 1000 để đổi sang mili giây trước khi dùng new Date()
    totalPrice.textContent = `${orderResponse.totalPrice.toLocaleString()} VND`
    paymentStatus.textContent = orderResponse.paymentStatus

    const idTableDetailProductOrder = document.querySelector("#order-items-list")
    idTableDetailProductOrder.innerHTML = ''; // Clear existing rows
    let i = 0;
    orderResponse.orderItemResponseList.forEach(item => {
        
        const row = document.createElement('tr');
        if(i%2==0){
            row.classList.add('sole-row')
        } else {
            row.classList.remove('sole-row')
        }
        row.innerHTML = `
        <td>
            <div class="product-item-detail">
                <div class="image-detail">
                    <img src="http://localhost:8080${item.itemProductResponse.imagePath}" alt="Product Image">
                </div>
                <div class="info-product-detail">
                    <label>Tên: <span class="name-product-detail">${item.itemProductResponse.nameProduct}</span></label>
                    <label>Kích thước:<span class="size">${item.size}</span></label>
                    <label>Thương hiệu:<span class="brand">${item.itemProductResponse.brand}</span></label>
                </div>
            </div>
        </td>
        <td>${item.discount}</td>
        <td>${item.itemProductResponse.prices.toLocaleString()} VND</td>
        <td>${item.quantity}</td>
        <td>${(item.itemProductResponse.prices * item.quantity).toLocaleString()} VND</td>
        `;
        idTableDetailProductOrder.appendChild(row);
        i++;
    })
}

function registerButtonDetailOrder(row, orderResponse) {
    const detailButton = row.querySelector('.view-details-btn');
    if (detailButton) {
        detailButton.addEventListener('click', () => {
            openAndSetValueForDetailOrder(orderResponse)
        })
    }
}

function displayDetailOrder(orderResponseList) {
    const tableBody = document.querySelector('#order-history-list');
    tableBody.innerHTML = ''; // Clear existing rows
    orderResponseList.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.idOrder}</td>
            <td>${new Date(order.orderDate*1000).toLocaleString()}</td>
            <td>${order.totalPrice.toLocaleString()} VND</td>
            <td>${order.paymentStatus}</td>
            <td><button data-order="${order}" class="view-details-btn">Chi tiết</button></td>
        `;
        registerButtonDetailOrder(row, order);
        tableBody.appendChild(row);
    })
    // Close the modal when clicking outside of it
    utils.setupOutsideClickToCloseModal("modal-detail-order")
    utils.click_X_toCloseModal("close-detail-order", "modal-detail-order");
}

async function loadHistory() {
    const userId = auth.getUserId();
    if (!userId) {
        console.error('User not found. Please log in.');
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/orders/${userId}/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.error('Failed to fetch order history:', response.statusText);
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json()
            displayDetailOrder(data.result);
        }
    } catch (error) {
        console.error('Error loading order history:', error);
    }
}

function setUPLoadOrderHistory() {
    const modalDetail = document.querySelector('#modal-detail-order');
    loadHistory()

}

export default { setUPLoadOrderHistory };