import utils from './utils.js';

export function load_order_rating() {
    fetch(`/html/AdminManagerFragement/orderAndRating.html`)
        .then(response => response.text())
        .then(async (data) => {
            document.querySelector(".section-order-rating").innerHTML = data;

            const ordersTableBody = document.querySelector('#ordersTable tbody');
            const orderItemsModal = document.getElementById('orderItemsModal');
            const orderItemsTableBody = document.querySelector('#orderItemsTable tbody');
            const orderItemsModalCloseBtn = orderItemsModal?.querySelector('.close-btn');

            let orders = []; // Dữ liệu thật

            // === Gọi API để lấy danh sách đơn hàng có paymentStatus = PENDING ===
            try {
                const res = await fetch("http://localhost:8080/api/orders/PENDING/paymentStatus", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    }
                });
                const json = await res.json();
                if (res.ok && json.result) {
                    orders = json.result;
                } else {
                    alert("Không thể tải danh sách đơn hàng từ server.");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API lấy orders:", error);
                alert("Lỗi hệ thống khi tải đơn hàng!");
            }

            // ======= Render Orders =======
            function renderOrders() {
                ordersTableBody.innerHTML = '';
                orders.forEach(order => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${new Date(order.orderDate).toLocaleString()}</td>
                        <td>${order.status}</td>
                        <td>${order.totalPrice.toLocaleString()}đ</td>
                        <td>
                            <select class="payment-select" data-order-id="${order.idOrder}">
                                <option value="Pending" ${order.paymentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Paid" ${order.paymentStatus === 'Paid' ? 'selected' : ''}>Paid</option>
                            </select>
                        </td>
                        <td>${order.userOrderResponse?.id || 'N/A'}</td>
                        <td><button class="viewItemsBtn" data-order-id="${order.idOrder}">Xem</button></td>
                    `;
                    ordersTableBody.appendChild(tr);
                });

                document.querySelectorAll('.payment-select').forEach(select => {
                    select.addEventListener('change', e => {
                        const orderId = e.target.getAttribute('data-order-id');
                        const newStatus = e.target.value;
                        updatePaymentStatus(orderId, newStatus);
                    });
                });

                document.querySelectorAll('.viewItemsBtn').forEach(btn => {
                    btn.addEventListener('click', e => {
                        const id = e.target.dataset.orderId;
                        openOrderItemsModal(id);
                    });
                });
            }

            // ======= Chi tiết sản phẩm của đơn hàng =======
            function openOrderItemsModal(orderId) {
                const order = orders.find(o => o.idOrder === orderId);
                const items = order?.orderItemResponseList || [];

                orderItemsTableBody.innerHTML = '';
                if (items.length === 0) {
                    orderItemsTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Không có sản phẩm.</td></tr>';
                } else {
                    items.forEach(i => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${i.productId}</td>
                            <td>${i.quantity}</td>
                            <td>${i.price.toLocaleString()}đ</td>
                        `;
                        orderItemsTableBody.appendChild(tr);
                    });
                }

                orderItemsModal.classList.add('active');
            }

            // ======= Đóng modal =======
            if (orderItemsModalCloseBtn) {
                orderItemsModalCloseBtn.addEventListener('click', () => {
                    orderItemsModal.classList.remove('active');
                });
                orderItemsModal.addEventListener('click', (e) => {
                    if (e.target === orderItemsModal) {
                        orderItemsModal.classList.remove('active');
                    }
                });
            }

            // ======= Cập nhật trạng thái thanh toán =======
            async function updatePaymentStatus(orderId, status) {
                try {
                    const response = await fetch(`http://localhost:8080/api/orders/${orderId}/confirm-payment`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ paymentStatus: status })
                    });

                    if (response.ok) {
                        alert(`Cập nhật đơn hàng #${orderId} thành ${status} thành công!`);
                        const order = orders.find(o => o.idOrder === orderId);
                        if (order) order.paymentStatus = status;
                        renderOrders();
                    } else {
                        alert("Không thể cập nhật trạng thái thanh toán.");
                    }
                } catch (err) {
                    console.error("Lỗi khi cập nhật trạng thái:", err);
                    alert("Lỗi hệ thống khi cập nhật!");
                }
            }

            renderOrders();
        });
}

export default { load_order_rating };
