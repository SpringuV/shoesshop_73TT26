import auth  from "./authToken.js"
import cart from "./Home.js"
function displayProduct(product) {
	const isloggedIn = auth.checkUserLogin()

	// xoa noi dung cu
	const section_kiosk = document.querySelector(".section-item-products")
	section_kiosk.innerHTML = ""
	product.productInCategoryResponseSet.forEach(productItem => {
		const div_product_item = document.createElement('div')
		div_product_item.classList.add("product-item")

		div_product_item.innerHTML = `
			<a href = "/html/Product_detail.html?id=${productItem.productId}"><img src="http://localhost:8080${productItem.imagePath}" alt="Ảnh sản phẩm giày"></a>
			<h4>${productItem.nameProduct}</h4>
			<p class = "prices">${productItem.prices.toLocaleString()}₫</p>
			<div class= "item-action">
                ${isloggedIn ? `<button class="favorite"><i class="fa-solid fa-heart"></i></button>
				<button class="btn-add-to-cart" data-id="${productItem.productId}">Thêm vào giỏ hàng</button>` : `<p class = "not-logged-in">Đăng nhập để mua hàng</p>`}
            </div>
		`;

		// add to display
		section_kiosk.appendChild(div_product_item);
	})
}

async function loadKioskProductList(nameCate) {
	try {
		const response = await fetch(`http://localhost:8080/api/categories/products/${nameCate}`, {
			method: "GET"
		})

		if (response.ok) {
			const data = await response.json()
			const product = {
				productId: data.result.id,
				nameCate: data.result.nameCate,
				productInCategoryResponseSet: data.result.productInCategoryResponseSet
			}
			displayProduct(product)
			let currentPage = 1;
			renderProducts(currentPage)
		} else {
			alert("Lỗi khi thực hiện loadProductMenList - 1")
		}
	} catch (error) {
		alert("Lỗi khi thực hiện loadProductMenList - 2")
		console.error("Lỗi khi thực hiện loadProductMenList - 2", error)
	}
}


const productsPerPage = 20; // so sản phẩm mỗi trang
function renderProducts(currentPage) {
	const products = document.querySelectorAll('.product-item'); // lấy lại mỗi lần render
	const start = (currentPage - 1) * productsPerPage;
	const end = currentPage * productsPerPage;
	products.forEach((product, index) => {
		product.style.display = (index >= start && index < end) ? "block" : "none";
	});
	document.getElementById("page-indicator").textContent = currentPage;
}

function changePage(direction) {
	const products = document.querySelectorAll('.product-item'); // lấy lại mỗi lần render
	const totalPages = Math.ceil(products.length / productsPerPage);
	currentPage += direction;
	if (currentPage < 1) currentPage = 1;
	if (currentPage > totalPages) currentPage = totalPages;
	renderProducts();
}

// get data-name cate from url
function getNameCateFromUrl() {
	const params = new URLSearchParams(window.location.search);
	console.log(params)
	return params.get("nameCate");
}
export function kiosk_Product() {
	document.addEventListener("DOMContentLoaded", () => {
		const nameCate = getNameCateFromUrl()
		if (nameCate) {
			loadKioskProductList(nameCate) // Mỗi lần gọi thì truyền nameCate để query
		}

		// xu ly them vao gio hang
		const wrapper = document.querySelector(".section-item-products")
		wrapper.addEventListener("click", async (event) => {
			if (event.target.classList.contains("btn-add-to-cart")) {
				const productId = event.target.dataset.id
				await cart.addProductToCart(productId)
			}
		})
	})

}