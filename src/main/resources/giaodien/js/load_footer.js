fetch('/html/footer.html')
    .then(response => response.text())
    .then(
        data => {
            document.querySelector(".footer").innerHTML = data
        }
    )
    .catch(error => console.error("Lỗi khi tải footer:", error))