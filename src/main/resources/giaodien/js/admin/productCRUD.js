import utils from './utils.js';

// load product site
export function loadProduct() {
	fetch(`/html/AdminManagerFragement/Product.html`)
		.then(response => response.text())
		.then(data => {
			document.querySelector(".section-product").innerHTML = data

			const productForm = document.getElementById('productForm');
			const productTableBody = document.querySelector('#tbody');
			// ckeditor
			CKEDITOR.replace("description");
			CKEDITOR.replace("editDescription");
			// ADD PRODUCT
			async function addProduct() {
				const idProduct = document.getElementById("idProduct").value.trim();
				const nameProduct = document.getElementById("nameProduct").value.trim();
				const description = CKEDITOR.instances.description.getData().trim();
				const price = document.getElementById("price").value.trim();
				// xu ly them size
				const selectedSize = Array.from(document.querySelectorAll('#sizeCheckboxAdd input[type=checkbox]:checked')).map(cbvalue => cbvalue.value)
				const brand = document.getElementById("brand").value;
				const stock_quantity = document.getElementById("quantity_stock").value.trim();
				const gender = document.getElementById("gender").value;
				const fileInput = document.getElementById("fileInputAddProduct");
				if (!idProduct || !nameProduct || !description || !price || !size || brand === "NONE" || !stock_quantity || gender === "NONE") {
					alert("Bạn vui lòng nhập đầy đủ dữ liệu");
					return;
				}

				if (fileInput.files.length === 0) {
					alert("Vui lòng chọn ảnh");
					return;
				}

				const formData = new FormData();
				formData.append("productId", idProduct)
				formData.append("nameProduct", nameProduct)
				formData.append("description", description)
				formData.append("prices", price)
				selectedSize.forEach(value => {
					formData.append("size", value)
				})
				formData.append("brand", brand)
				formData.append("stock_quantity", stock_quantity)
				formData.append("gender", gender)
				formData.append("image", fileInput.files[0]); // tên phải khớp @RequestParam("image") trong backend

				try {
					const response = await fetch(`http://localhost:8080/api/products`, {
						method: "POST",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						body: formData,
					})
					if (response.ok) {
						alert("Thêm sản phẩm thành công");
						const data = await response.json();
						const tr = document.createElement("tr")
						tr.innerHTML = `
					<td>${data.result.productId}</td>
					<td>${data.result.nameProduct}</td>
					<td>${data.result.prices}</td>
					<td>${data.result.stock_quantity}</td>
					<td>${data.result.brand}</td>
					<td>${data.result.gender}</td>
					<td>${Array.isArray(data.result.sizeResponseSet) ? data.result.sizeResponseSet.join(", ") : data.result.sizeResponseSet}</td>
					<td class= "description">${data.result.description}</td>
					<td>
						<img class = "img-product" src="http://localhost:8080${data.result.imagePath}" width="100" height="100" alt="product image">
					</td>
					<td class="actions">
							<button class="edit-btn" data-id="${data.result.productId}">Sửa</button>
							<button class="delete-btn" data-id="${data.result.productId}">Xóa</button>
					</td>
					`;
						productTableBody.appendChild(tr);
						// reset lại form
						productForm.reset();
						CKEDITOR.instances.description.setData("");
					} else {
						alert("Thêm sản phẩm thất bại")
					}

				} catch (error) {
					console.error("Lỗi khi thêm sản phẩm: ", error)
				}
			}
			// END ADD PRODUCT

			// btn add product
			function openAddModel() {
				document.getElementById("idProduct").value = "";
				document.getElementById("nameProduct").value = "";
				document.getElementById("description").value = "";
				document.getElementById("price").value = "";
				document.getElementById("brand").value = "NONE";
				document.getElementById("quantity_stock").value = "";
				document.getElementById("gender").value = "NONE";

				utils.resetPreviewImage("previewImageAddProduct")
				// Hiển thị modal
				utils.openModel("addProductModal")
			}

			const btn_add = document.getElementById('callModalAddNewProduct');
			btn_add.addEventListener("click", () => {
				openAddModel();
				utils.previewImage("fileInputAddProduct", "previewImageAddProduct");
			})

			// click x to close modal add
			utils.click_X_toCloseModal("closeAddModal", "addProductModal")

			// Đóng modal khi nhấn bên ngoài nội dung modal
			utils.setupOutsideClickToCloseModal("addProductModal")
			// end btn add product

			// Load to product data
			async function loadProductData() {
				try {
					const response = await fetch(`http://localhost:8080/api/products`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					})

					if (response.ok) {
						const data = await response.json()
						productTableBody.innerHTML = ""; // XÓA DÒNG CŨ
						data.result.forEach(product => {
							const tr = document.createElement("tr")
							tr.innerHTML = `
						<td style= "height: 130px; width: 80px; ">${product.productId}</td>
						<td style= "height: 130px; width: 80px; ">${product.nameProduct}</td>
						<td style= "height: 130px; width: 80px; ">${product.prices}</td>
						<td style= "height: 130px; width: 80px; ">${product.stock_quantity}</td>
						<td style= "height: 130px; width: 80px; ">${product.brand}</td>
						<td>${product.gender}</td>
						<td>${Array.isArray(product.sizeResponseSet) ? product.sizeResponseSet.join(", ") : product.sizeResponseSet}</td>
						<td class="td-description">${product.description}</td>
						<td>
							<img class = "img-product" src="http://localhost:8080${product.imagePath}" width="100" height="100" alt="product image">
						</td>
						<td style= "height: 130px; width: 130px; " class="actions">
							<button class="edit-btn" data-id="${product.productId}">Sửa</button>
							<button class="delete-btn" data-id="${product.productId}">Xóa</button>
						</td>
					`;
							productTableBody.appendChild(tr);
						})
					} else {
						console.error("Không thể tải sản phẩm. Mã lỗi: ", response.status);
					}
				} catch (error) {
					console.error("Lỗi khi lấy danh sách sản phẩm: ", error)
				}
			}
			// end Load to product data

			// delete product
			async function deleteProduct(idProduct) {
				try {
					if (!confirm(`Bạn chắc chắn muốn xóa sản phẩm có id ${idProduct} không ?`)) {
						return;
					}
					const response = await fetch(`http://localhost:8080/api/products/${idProduct}`, {
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							"Content-Type": "application/json"
						},
					})

					if (response.ok) {
						alert("Xóa sản phẩm thành công")
						loadProductData(); // tải lại danh sách
					} else {
						alert("Xóa sản phẩm thất bại")
					}
				} catch (error) {
					console.error("Lỗi khi xóa sản phẩm: ", error)
				}

			}
			// end delete product

			// update product
			function updateRowInTable(updatedProduct) {
				const row = [...productTableBody.querySelectorAll("tr")].find(tr =>
					tr.children[0].textContent === updatedProduct.productId
				);

				if (!row) return;

				row.children[1].textContent = updatedProduct.nameProduct;
				row.children[2].textContent = updatedProduct.prices;
				row.children[3].textContent = updatedProduct.stock_quantity;
				row.children[4].textContent = updatedProduct.brand;
				row.children[5].textContent = updatedProduct.gender;
				row.children[6].textContent = updatedProduct.sizeResponseSet;
				row.children[7].innerHTML = updatedProduct.description;
				const imgElement = row.children[8].querySelector("img");
				if (imgElement && updatedProduct.imagePath) {
					imgElement.src = `http://localhost:8080${updatedProduct.imagePath}`;
				}
			}

			//end add sự kiện preview ảnh khi chọn

			async function updateProduct() {
				const idProduct = document.getElementById("editIdProduct").value.trim();
				const nameProduct = document.getElementById("editNameProduct").value.trim();
				// lấy description từ ckeditor
				const description = CKEDITOR.instances.editDescription.getData();
				const price = document.getElementById("editPrice").value.trim();
				// xu ly size
				const selectedSize = Array.from(document.querySelectorAll('#sizeCheckboxEdit input[type="checkbox"]:checked')).map(cbvalue => cbvalue.value)
				const brand = document.getElementById("editBrand").value;
				const stock_quantity = document.getElementById("editStock").value.trim();
				const gender = document.getElementById("editGender").value;
				const fileInput = document.getElementById("fileInputEditProduct");


				const formData = new FormData();
				formData.append("productId", idProduct)
				formData.append("nameProduct", nameProduct)
				formData.append("description", description)
				formData.append("prices", price)
				selectedSize.forEach(value => {
					formData.append("size", value)
				})
				formData.append("brand", brand)
				formData.append("stock_quantity", stock_quantity)
				formData.append("gender", gender)
				if (fileInput.files.length > 0) {
					formData.append("image", fileInput.files[0]);
				}

				try {
					const response = await fetch(`http://localhost:8080/api/products`, {
						method: "PUT",
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
						body: formData,
					})

					if (response.ok) {
						const updatedProduct = await response.json();
						updateRowInTable(updatedProduct.result || formData);
					}
				} catch (error) {
					console.error("Lỗi khi sửa sản phẩm: ", error)
				}
			}

			const formEdit = document.getElementById("editProductForm");
			formEdit.addEventListener("submit", (event) => {
				event.preventDefault();
				updateProduct();
				utils.closeModel("editProductModal") // đóng modal
			})
			// end update product

			// click sửa xóa
			function openEditModal(product) {
				console.log({product})
				document.getElementById("editIdProduct").value = product.productId;
				document.getElementById("editNameProduct").value = product.nameProduct;
				// gán description vào modal sửa
				CKEDITOR.instances.editDescription.setData(product.description)
				document.getElementById("editPrice").value = product.prices;
				product.size.forEach(sizeValue =>{
					const checkbox = document.querySelector(`#sizeCheckboxEdit input[value="${sizeValue}"`)
					if(checkbox){
						checkbox.checked = true;
					}
				})
				document.getElementById("editStock").value = product.stock_quantity;
				document.getElementById("editBrand").value = product.brand;
				document.getElementById("editGender").value = product.gender;
				// Hiển thị ảnh hiện tại
				utils.showImageFromAPI("previewImageEditProduct", product.imagePath)

				// Hiển thị modal
				utils.openModel("editProductModal")
			}

			productTableBody.addEventListener("click", (event) => {
				const target = event.target
				if (target.classList.contains("edit-btn")) {
					const row = target.closest("tr"); closeAddModel
					const productId = row.children[0].textContent;
					const nameProduct = row.children[1].textContent;
					const prices = row.children[2].textContent;
					const stock_quantity = row.children[3].textContent;
					const brand = row.children[4].textContent;
					const gender = row.children[5].textContent;
					const size = row.children[6].textContent.split(", ").map(s => s.trim());
					const description = row.children[7].innerHTML;
					const imgElement = row.children[8].querySelector("img");
					const imagePath = imgElement ? imgElement.getAttribute("src") : null;

					const product = {
						productId: productId,
						nameProduct: nameProduct,
						prices: prices,
						stock_quantity: stock_quantity,
						brand: brand,
						gender: gender,
						size: size,
						description: description,
						imagePath: imagePath
					}
					utils.previewImage("fileInputEditProduct", "previewImageEditProduct");
					openEditModal(product);
				}

				if (target.classList.contains("delete-btn")) {
					const id = target.dataset.id;
					deleteProduct(id);
				}
			})

			const closeEditModalBtn = document.getElementById("closeEditModal");
			closeEditModalBtn.addEventListener("click", () => {
				utils.closeModel("editProductModal")
			});

			// Đóng modal khi nhấn bên ngoài nội dung modal
			utils.setupOutsideClickToCloseModal("editProductModal")
			// end click sửa xóa

			// load to table
			loadProductData()
			// click add product
			productForm.addEventListener("submit", (event) => {
				event.preventDefault();
				addProduct();
			})
		})
}

export default { loadProduct }