import utils from './admin/utils.js';

function initPayment() {
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get("orderId")
    const total = urlParams.get("total")

    if (orderId && total) {
        document.querySelector(".title p").textContent = orderId;
        console.log("Order ID:", orderId);
        console.log(document.querySelector(".title p"))
        document.getElementById("amount").textContent = `${parseInt(total).toLocaleString()}đ`;
        console.log(document.getElementById("amount"))
        console.log(document.getElementById("content"))
        document.getElementById("content").textContent = `TT-${orderId}`;
    } else {
        alert("Thiếu thông tin đơn hàng!");
    }

    // Gán sự kiện click "Tôi đã thanh toán"
    const btn = document.getElementById("btn-confirm-payment");
    btn.addEventListener("click", async () => {
        try {
            alert("Cảm ơn bạn đã thanh toán! Đơn hàng đã được xác nhận.");
            window.location.href = "/html/order-history.html"; // hoặc chuyển đến lịch sử đơn hàng
        } catch (error) {
            console.error("Lỗi xác nhận thanh toán:", error);
            alert("Lỗi hệ thống khi xác nhận thanh toán!");
        }
    })
}

function setUpInit() {
    // Chỉ chạy initPayment nếu đang ở trang payment.html
    initPayment();
}

export default {setUpInit}