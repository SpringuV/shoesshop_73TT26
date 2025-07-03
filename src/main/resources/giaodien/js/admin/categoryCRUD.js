import utils from './utils.js';

async function fetchAllProduct() {
    try {
        const response = await fetch(`http://localhost:8080/api/products`, {
            method: "GET"
        })

        if (!response.ok) {
            alert("Lỗi khi load danh sách sản phẩm - categoryCRUD - 1")
            return []; // trả về 1 list rỗng
        }
        const data = await response.json()
        return data.result || [];
    } catch (error) {
        alert("Lỗi khi load danh sách sản phẩm - categoryCRUD - 2")
    }
}

function renderProductsToCheckBoxList(productResponseList, selectedProducts) {
    const container = document.getElementById("editCategoryProducts") // lấy từ chỗ danh sách sản phẩm
    container.innerHTML = "" // xóa đi html cũ

    const selectedProductsIds = new Set(selectedProducts.map(productItem => productItem.productId))
    console.log("danh sách productId đã chọn", selectedProductsIds)

    productResponseList.forEach(product => {
        const isChecked = selectedProductsIds.has(product.productId) // check xem những product nào đã được thêm vào
        const div = document.createElement('div')
        div.classList.add("checkbox-item")
        div.innerHTML = `
            <label>
                <input type = "checkbox" value ="${product.productId}" ${isChecked ? "checked" : ""}>
                ${product.nameProduct}
            </label>
            `;
        container.appendChild(div)
    })
}

function openDetailCategory(category) {
    console.log("data chuẩn bị hiển thị", { category })
    document.getElementById("categoryIdDetail").value = category.id
    document.getElementById("categoryNameDetail").value = category.nameCate
    const tableBodyDetail = document.getElementById("tbodyProductOfCategoryDetail")
    // xoa noi dung truoc khi them
    tableBodyDetail.innerHTML = ""
    if (category.productInCategoryResponseSet.length == 0) {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td colspan="3" style="height: 50px; padding: 0;">Category chưa có sản phẩm !</td>`;
        tableBodyDetail.appendChild(tr)
    } else {
        category.productInCategoryResponseSet.forEach(product => {
            const tr = document.createElement('tr')
            tr.classList.add("table-row")
            const html = `
                <td>${product.productId}</td>
                <td>${product.nameProduct}</td>
                <td class= "inner-image-cate-detail">
                    <img class="image-detail" src= "http://localhost:8080${product.imagePath}" alt = "Ảnh sản phẩm">
                </td>
            `;
            tr.innerHTML = html
            tableBodyDetail.appendChild(tr)
        })
    }
    utils.openModel("modalDetailCategory")

    utils.click_X_toCloseModal("closeDetailModel", "modalDetailCategory")
    utils.setupOutsideClickToCloseModal("modalDetailCategory")

    // Khi mở chi tiết -> đăng ký click edit
    const formToOpenEdit = document.getElementById("categoryFormDetail")
    formToOpenEdit.addEventListener("submit", (event) => {
        event.preventDefault()
        openFormEditCategory(category)
        utils.closeModel("modalDetailCategory")
    }, { once: true })
}
// ------------------------------------------------------------------------
async function openFormEditCategory(category) {
    document.getElementById("categoryIdEdit").value = category.id
    document.getElementById("categoryNameEdit").value = category.nameCate
    const allProducts = await fetchAllProduct();

    // render check box
    renderProductsToCheckBoxList(allProducts, category.productInCategoryResponseSet)

    // mở modal
    utils.openModel("modalEditCategory")
    utils.click_X_toCloseModal("closeEditCategoryModel", "modalEditCategory", () => {
        utils.openModel("modalDetailCategory")
    })

    utils.setupOutsideClickToCloseModal("modalEditCategory", () => {
        utils.openModel("modalDetailCategory")
    })

    // // submit
    // const submitCategoryFormEdit = document.getElementById('categoryFormEdit')
    // submitCategoryFormEdit.addEventListener("submit", (event) => {
    //     event.preventDefault()
    //     saveEditCategory();
    // }, { once: true })
}

async function saveEditCategory() {

    const idCategory = document.getElementById("categoryIdEdit").value
    const nameCategory = document.getElementById("categoryNameEdit").value
    const selectedProductIds = Array.from(document.querySelectorAll('#editCategoryProducts input[type="checkbox"]:checked')).map(checkBoxValue => checkBoxValue.value)
    console.log(selectedProductIds)
    const dataUpdateCategoryRequest = {
        nameCate: nameCategory,
        productIds: selectedProductIds
    }

    try {
        const response = await fetch(`http://localhost:8080/api/categories/${idCategory}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUpdateCategoryRequest)
        })
        if (response.ok) {
            alert("Lưu thay đổi thành công")
            // save edit thành công thì mở lại form detail
            const data = await response.json()
            console.log("data new update", { data })
            const categoryIdEdit = document.getElementById("categoryIdEdit").value
            if (categoryIdEdit && categoryIdEdit == data.result.id) {
                openDetailCategory(data.result)
                utils.closeModel("modalEditCategory")
            }
        } else {
            alert("Lỗi khi saveEditCategory - 1")
        }
    } catch (error) {
        alert("Lỗi khi saveEditCategory - 2")
        console.error("Lỗi: ", error)
    }
}

// ------------------------------------------------------------------------
function registerDetailButton(row, categoryResponse) {
    const detailBtn = row.querySelector('.detail-btn')
    if (detailBtn) {
        detailBtn.addEventListener('click', () => {
            openDetailCategory(categoryResponse)
            utils.openModel("modalDetailCategory")
        })
    }
}

function displayCategoryInTableRowInBody(category, tableCateBody) {
    const existingRow = tableCateBody.querySelector(`tr[data-id = "${category.id}"]`)
    const html = `
    <td>${category.id}</td>
    <td>${category.nameCate}</td>
    <td>
        <button class="detail-btn">Detail</button>
        <button class="delete-btn" data-id="${category.id}">Xóa</button>
    </td>
    `;
    if (existingRow) {
        existingRow.innerHTML = html
        registerDetailButton(existingRow, category)
    } else {
        const tr = document.createElement('tr')
        tr.setAttribute("data-id", category.id)
        tr.innerHTML = html
        registerDetailButton(tr, category)
        registerDeleteRow(tr, category.id)
        // hieern thi
        tableCateBody.appendChild(tr)
    }

}


// function getListProduct
async function createCategoryName(idTableBody) {

    const nameCate = document.getElementById("categoryNameAdd").value.trim()
    const dataRequest = {
        nameCate: nameCate
    }
    try {
        const response = await fetch(`http://localhost:8080/api/categories`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataRequest),
        })

        if (response.ok) {
            alert("Tạo category okk !")
            const data = await response.json()
            const categoryResponse = {
                id: data.result.id,
                nameCate: data.result.nameCate,
                productInCategoryResponseSet: data.result.productInCategoryResponseSet ? data.result.productInCategoryResponseSet : []
            }
            displayCategoryInTableRowInBody(categoryResponse, idTableBody)
            // reset input
            document.getElementById("categoryNameAdd").value = ""

            // đóng modal sau khi tạo
            if (document.getElementById("modalAddCategory").style.display === "block") {
                utils.closeModel("modalAddCategory")
            }
        } else {
            alert("Lỗi khi tạo category")
        }
    } catch (error) {
        alert("Lỗi khi tạo createCategoryName")
        console.error("Lỗi khi tạo category: ", error)
    }

}

async function loadListCateFromAPI_ToTable(tableCateBody) {
    try {
        const response = await fetch(`http://localhost:8080/api/categories`, {
            method: "GET",
        })
        if (response.ok) {
            const data = await response.json()
            data.result.forEach(categoryResponse => {
                displayCategoryInTableRowInBody(categoryResponse, tableCateBody)
            })
        }
    } catch (error) {
        alert("Lỗi khi hiển thị danh sách Category")
        console.log("Lỗi khi hiển thị danh sách Category", error)
    }
}

async function deleteCategory(idCategory) {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/categories/${idCategory}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.ok) {
            alert('Xóa category thành công')
            const deleteRow = document.querySelector(`tr[data-id ="${idCategory}"]`)
            if (deleteRow) {
                deleteRow.remove()
            }
        }
    } catch (error) {
        alert("Lỗi khi deleteCategory")
    }
}

function registerDeleteRow(row, idCategory) {
    row.querySelector(".delete-btn").addEventListener('click', async () => {
        await deleteCategory(idCategory)
    })
}

export function load_category() {
    fetch(`/html/AdminManagerFragement/category.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".section-category").innerHTML = data

            utils.click_X_toCloseModal("closeAddModelCate", "modalAddCategory")
            utils.setupOutsideClickToCloseModal("modalAddCategory")

            // add cate gory
            const btn_Start_OpenModal_Add = document.getElementById("btnAddNewCategoryModal");
            btn_Start_OpenModal_Add.addEventListener("click", () => {
                utils.openModel("modalAddCategory")
            })

            // load list cate
            const tableBody = document.getElementById("categoryTableBody")
            loadListCateFromAPI_ToTable(tableBody)

            // process add category
            const formAddSubmit = document.getElementById("categoryFormAdd")
            formAddSubmit.addEventListener("submit", (event) => {
                event.preventDefault()
                createCategoryName(tableBody)
            })
            // end process add category

            utils.click_X_toCloseModal("closeAddModel", "modalAddCategory")
            utils.setupOutsideClickToCloseModal("modalAddCategory")
            
            const formEditSubmit = document.getElementById("categoryFormEdit")
            formEditSubmit.addEventListener("submit", (event) => {
                event.preventDefault()
                saveEditCategory()
            })

        })
}

export default { load_category }