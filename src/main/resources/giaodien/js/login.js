document.addEventListener("DOMContentLoaded", function(){
    const form_login = document.querySelector(".form-login")

    form_login.addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn form submit mặc định

        let username = document.getElementById("login-username").value.trim();
        let password = document.getElementById("login-password").value.trim();

        const dataRequest = {
            username: username,
            password: password
        }

        console.log(dataRequest)
        try{
            const response = await fetch(`http://localhost:8080/api/auth/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataRequest)
            });

            if(response.ok){
                const dataResponse = await response.json();
                localStorage.setItem("token", dataResponse.result.token);
                window.location.href = "/html/Home.html";
            }
        } catch (error){
            const errorData = await response.json();
            alert(`Đăng nhập thất bại: ${errorData.message || "Lỗi đăng nhập không xác định"}`);  
        }
    })
});