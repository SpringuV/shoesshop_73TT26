import auth from "./authToken.js"
import cart from "./Home.js"
function displayProduct(product) {
	const isloggedIn = auth.checkUserLogin()

	// xoa noi dung cu
	const section_kiosk = document.querySelector(".section-item-products")
	section_kiosk.innerHTML = ""

	const emptyProduct = document.querySelector(".empty")
	if(product.productInCategoryResponseSet.length === 0 ){
		emptyProduct.innerHTML = "Không có sản phẩm phù hợp."
		return
	} else if(product.search){
		emptyProduct.innerHTML = `Kết quả tìm kiếm cho: <i class = "value-search">${product.search}</i>`
	}
	product.productInCategoryResponseSet.forEach(productItem => {
		const div_product_item = document.createElement('div')
		div_product_item.classList.add("product-item")

		div_product_item.innerHTML = `
			<a href = "/html/Product_detail.html?id=${productItem.productId}"><img src="http://localhost:8080${productItem.imagePath}" alt="Ảnh sản phẩm giày"></a>
			<h4>${productItem.nameProduct}</h4>
			<p class = "prices">${productItem.prices.toLocaleString()}₫</p>
			<div class= "item-action">
                ${isloggedIn ? `<button class="favorite" data-id="${productItem.productId}"><i class="fa-solid fa-heart"></i></button>
				<button class="btn-add-to-cart" data-id="${productItem.productId}">Thêm vào giỏ hàng</button>` : `<p class = "not-logged-in">Đăng nhập để mua hàng</p>`}
            </div>
		`;

		// add to display
		section_kiosk.appendChild(div_product_item);
	})
}

function filterByPrices(selectedValue) {
	const allProducts = document.querySelectorAll(".product-item")
	allProducts.forEach(itemProduct => {
		const priceText = itemProduct.querySelector(".prices").textContent.replace(/[^\d]/g, "")  // bỏ dấu chấm, ₫
		const price = parseInt(priceText, 10)

		let show = true // mặc định là show hết

		if (selectedValue === "< 2000000") {
			show = price < 2000000
		} else if (selectedValue === "2000000 - 3000000") {
			show = price >= 2000000 && price <= 3000000
		} else if (selectedValue === "3000000 - 4000000") {
			show = price > 3000000 && price <= 4000000;
		} else if (selectedValue === "> 4000000") {
			show = price > 4000000;
		}
		itemProduct.style.display = show ? "block" : "none";
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
			renderProducts(1) // 1 là currentPage
		} else {
			alert("Lỗi khi thực hiện loadProductMenList - 1")
		}
	} catch (error) {
		alert("Lỗi khi thực hiện loadProductMenList - 2")
		console.error("Lỗi khi thực hiện loadProductMenList - 2", error)
	}
}


const productsPerPage = 20; // so sản phẩm mỗi trang
let currentPage = 1; // để dùng được ở mọi nơi
window.changePage = changePage;
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
	renderProducts(currentPage);
}

async function searchProductsByName(nameProduct) {
	try{
		const response = await fetch(`http://localhost:8080/api/products/search-name/${encodeURIComponent(nameProduct)}`,{
			method: "GET"
		})
		if (response.ok) {
            const data = await response.json();
            const result = {
                productInCategoryResponseSet: data.result,
                search: `${nameProduct}`
            };
            displayProduct(result);
			renderProducts(1) // 1 là currentPage
        } else {
            alert("Không tìm thấy sản phẩm");
        }
	} catch (error) {
        alert("Lỗi khi tìm kiếm sản phẩm");
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    }
}

// get data-name cate from url
function getNameCateFromUrl() {
	const params = new URLSearchParams(window.location.search);
	return {
		nameCate: params.get("nameCate"),
		search: params.get("search")
	}
}
export function kiosk_Product() {
	document.addEventListener("DOMContentLoaded", () => {
		const { nameCate, search } = getNameCateFromUrl()
		if (search) {
			searchProductsByName(search)
		} else if (nameCate) {
			loadKioskProductList(nameCate) // Mỗi lần gọi thì truyền nameCate để query
		}

		// xu ly them vao gio hang
		const wrapper = document.querySelector(".section-item-products")
		wrapper.addEventListener("click", async (event) => {
			if (event.target.classList.contains("btn-add-to-cart")) {
				const productId = event.target.dataset.id
				await cart.addProductToCart(productId)
			} else if (event.target.closest(".favorite")) {
				const productId = event.target.closest(".favorite").dataset.id
				await cart.addProductToWishList(productId)
			}
		})

		// lọc theo giá thành
		const select = document.querySelector(".select")
		select.addEventListener("change", (e) => {
			const selectedValue = e.target.value
			filterByPrices(selectedValue)
		})
	})
}