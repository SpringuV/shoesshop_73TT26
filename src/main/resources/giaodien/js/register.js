
// start exex add user to db
document.addEventListener("DOMContentLoaded", function (){
    const form_register = document.querySelector(".form-registration");

    form_register.addEventListener("submit", async function (event){
        event.preventDefault(); // ngăn reload page
        let username = document.getElementById("ip_txt_username").value.trim();
        let pass = document.getElementById("ip_txt_password").value.trim();
        let email = document.getElementById("ip_txt_email").value.trim();
        if(!username || !email || !pass){
            alert("Vui lòng điền đúng thông tin");
            return;
        }

        const userData = {
            username: username,
            password: pass,
            email: email
        }
        console.log(userData)
        try{
            const response = await fetch(`http://localhost:8080/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })

            if(response.ok){
                alert("Bạn đã đăng kí thành công, vui lòng đăng nhập");
            }

        } catch (error){
            const errorData = await response.json();
            alert(`Đăng kí thất bại: ${errorData.message || "Lỗi không xác định"}`);  
        }
    });
});

// end exex add user to db