export function openModel(idModal) {
    const modal = document.getElementById(idModal)
    modal.style.display = "block"
}

export function closeModel(idModal) {
    const modal = document.getElementById(idModal)
    modal.style.display = "none"
}

export function resetPreviewImage(previewId) {
    const img = document.getElementById(previewId);
    img.src = "";
    img.style.display = "none";
}

export function setupOutsideClickToCloseModal(modalId, callback) {
    const modal = document.getElementById(modalId)
    if (!modal) return;

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"
            // nếu có call back thì sẽ thực hiện
            if (callback && typeof callback === "function") {
                callback();
            }
        }
    })
}

// click vào dấu x
export function click_X_toCloseModal(id_X, modalId, callback) {
    const btn_X = document.getElementById(id_X);
    btn_X.addEventListener("click", () => {
        closeModel(modalId)
        // nếu có call back thì sẽ thực hiện
        if (callback && typeof callback === "function") {
            callback();
        }
    })
}

// Hiển thị ảnh hiện tại
export function showImageFromAPI(previewId, imagePath) {
    const previewImg = document.getElementById(previewId);
    if (imagePath) {
        previewImg.src = imagePath;
        previewImg.style.display = "block";
    } else {
        previewImg.src = "";
        previewImg.style.display = "none";
    }
}

export function previewImage(inputId, previewId) {
    const fileInput = document.getElementById(inputId);
    const previewImage = document.getElementById(previewId);
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                console.log(event)
                previewImage.src = event.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = "";
            previewImage.style.display = "none";
        }
    })
}

export default { openModel, showImageFromAPI, closeModel, resetPreviewImage, setupOutsideClickToCloseModal, previewImage, click_X_toCloseModal }