// Data stores simulate DB (id increment)
// let roles = [];
let users = [];
let categories = [];
let permissions = [];


// let roleIdSeq = 1;
let userIdSeq = 1;
let categoryIdSeq = 1;
let permissionIdSeq = 1;


// Dummy data for Orders and OrderItems readonly
const orders = [
    { id: 1, orderDate: '2024-05-01', status: 'Pending', price: 120, paymentStatus: 'Paid', userId: 101 },
    { id: 2, orderDate: '2024-05-02', status: 'Shipped', price: 200, paymentStatus: 'Paid', userId: 102 },
    { id: 3, orderDate: '2024-05-05', status: 'Delivered', price: 350, paymentStatus: 'Paid', userId: 101 },
];
const orderItems = [
    { orderId: 1, productId: 1, quantity: 2, price: 40 },
    { orderId: 1, productId: 5, quantity: 1, price: 40 },
    { orderId: 2, productId: 2, quantity: 4, price: 50 },
    { orderId: 3, productId: 3, quantity: 3, price: 80 },
    { orderId: 3, productId: 4, quantity: 2, price: 35 },
];

// Dummy data for Ratings readonly
const ratings = [
    { userId: 101, productId: 1, content: 'Very comfortable shoes.', ratepoint: 5, create_at: '2024-05-03', update_at: '2024-05-04' },
    { userId: 102, productId: 2, content: 'Good value for money.', ratepoint: 4, create_at: '2024-05-06', update_at: '2024-05-06' },
    { userId: 103, productId: 3, content: 'Stylish but a bit tight.', ratepoint: 3, create_at: '2024-05-07', update_at: '2024-05-08' },
];




// Orders & Ratings Readonly
const ordersTableBody = document.querySelector('#ordersTable tbody');
const ratingsTableBody = document.querySelector('#ratingsTable tbody');
const orderItemsModal = document.getElementById('orderItemsModal');
const orderItemsTableBody = document.querySelector('#orderItemsTable tbody');
const orderItemsModalCloseBtn = orderItemsModal.querySelector('.close-btn');

function renderOrders() {
    ordersTableBody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.orderDate}</td>
            <td>${order.status}</td>
            <td>$${order.price.toFixed(2)}</td>
            <td>${order.paymentStatus}</td>
            <td>${order.userId}</td>
            <td><button class="viewItemsBtn" data-order-id="${order.id}">Xem</button></td>
          `;
        ordersTableBody.appendChild(tr);
    });
    document.querySelectorAll('.viewItemsBtn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.orderId);
            openOrderItemsModal(id);
        });
    });
}

function openOrderItemsModal(orderId) {
    const items = orderItems.filter(item => item.orderId === orderId);
    orderItemsTableBody.innerHTML = '';
    if (items.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="3" style="text-align:center;">No items for this order.</td>';
        orderItemsTableBody.appendChild(tr);
    } else {
        items.forEach(i => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${i.productId}</td>
              <td>${i.quantity}</td>
              <td>$${i.price.toFixed(2)}</td>
            `;
            orderItemsTableBody.appendChild(tr);
        });
    }
    orderItemsModal.classList.add('active');
}
orderItemsModalCloseBtn.addEventListener('click', () => {
    orderItemsModal.classList.remove('active');
});
orderItemsModal.addEventListener('click', (e) => {
    if (e.target === orderItemsModal) {
        orderItemsModal.classList.remove('active');
    }
});

function renderRatings() {
    ratingsTableBody.innerHTML = '';
    ratings.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.userId}</td>
            <td>${r.productId}</td>
            <td>${r.content}</td>
            <td>${r.ratepoint}</td>
            <td>${r.create_at}</td>
            <td>${r.update_at}</td>
          `;
        ratingsTableBody.appendChild(tr);
    });
}
// END Orders & Ratings Readonly