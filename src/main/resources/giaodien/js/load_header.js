function loadHeader(){
    fetch('/html/header.html')
    .then(response => response.text())
    .then(
        data => {
            document.querySelector(".header").innerHTML = data
        }
    )
    .catch(error => console.error("Lỗi khi tải header:", error))
}

document.addEventListener("DOMContentLoaded", ()=>{
    // load header
    loadHeader();

    const userInfo = document.querySelector('.info-user');
})