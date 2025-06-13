fetch('/html/header.html')
    .then(response => response.text())
    .then(
        data => {
            document.querySelector(".header").innerHTML = data
        }
    )
    .catch(error => console.error("Lỗi khi tải header:", error))