/* Slider */
const imgPosition = document.querySelectorAll('.aspect-ratio-169 img');
const imgContainer = document.querySelector('.aspect-ratio-169');
const dotItem = document.querySelectorAll('.dot');
let imgNumber = imgPosition.length;
let index = 0;

imgPosition.forEach(function (img, index) {
    img.style.left = index * 100 + '%';
    dotItem[index].addEventListener('click', function () {
        slider(index);
    });
});

function imgSlide() {
    index++;
    if (index >= imgNumber) index = 0;
    slider(index);
}

function slider(index) {
    imgContainer.style.transform = `translateX(-${index * 100}%)`; // dùng transform thay vì left
    const dotActive = document.querySelector('.dot.active');
    if (dotActive) dotActive.classList.remove('active');
    dotItem[index].classList.add('active');
}

setInterval(imgSlide, 5000); /* End Slider */

/* Product Scroll */
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.products-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const productWidth = 250; // Chiều rộng mỗi sản phẩm (bao gồm gap)

    if (!wrapper || !prevBtn || !nextBtn) {
        console.error('Elements .products-wrapper, .prev-btn or .next-btn not found!');
        return;
    }

    prevBtn.addEventListener('click', () => {
        wrapper.scrollLeft -= productWidth;
    });

    nextBtn.addEventListener('click', () => {
        wrapper.scrollLeft += productWidth;
    });
});

/* Hamburger Menu Toggle */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu > ul');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleToggle(e) {
        e.preventDefault(); // Ngăn chặn xung đột sự kiện
        if (menuToggle && menu && mediaQuery.matches) {
            const isActive = menu.classList.contains('active');
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // Đảm bảo trạng thái không bị thay đổi bởi slider
            if (!isActive) {
                setTimeout(() => {
                    menu.classList.add('active');
                    menuToggle.classList.add('active');
                }, 0);
            }
        }
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', handleToggle);
    }

    // Kiểm tra khi thay đổi kích thước màn hình
    mediaQuery.addListener(() => {
        if (!mediaQuery.matches) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu > ul");
    const overlay = document.querySelector(".menu-overlay");

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("active");
        if (isOpen) {
            // Đang mở → đóng
            menu.classList.remove("active");
            toggle.classList.remove("active");
            overlay.classList.remove("active");
        } else {
            // Đang đóng → mở
            menu.classList.add("active");
            toggle.classList.add("active");
            overlay.classList.add("active");
        }
    });

    overlay.addEventListener("click", () => {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        overlay.classList.remove("active");
    });

    document.querySelectorAll(".menu > ul > li > a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            toggle.classList.remove("active");
            overlay.classList.remove("active");
        });
    });
});

// -----------------------------------------------------------------------------------------------------
function displayNewProduct(productList) {
    const wrapper = document.querySelector(".products-wrapper")
    wrapper.innerHTML = "";
    productList.forEach(product =>{
        const item = document.createElement('div')
        item.classList.add("product-item")

        item.innerHTML = `
            <div class = "image-item-home">
                <img class = "image-new-product" src="http://localhost:8080${product.imagePath}" alt="Sản phẩm 1">
            </div>
            <h3>${product.nameProduct}</h3>
            <p>${product.brand}</p>
            <p>${product.prices.toLocaleString()} đ</p>
            <a href="#" class="color-btn">Mua</a>
        `;
        wrapper.appendChild(item)
    })

}

export async function loadNewProducts() {
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
    } catch(error){
        alert("Lỗi khi thực hiện loadNewProducts")
        console.error("Lỗi khi loadNewProducts: ", error)
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadNewProducts()
})

export default {loadNewProducts}

