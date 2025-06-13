function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
}


// hiển thị thông tin trên header
function showUserInfo(){
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        const payload = parseJwt(token);
        if(payload){
            const payload = parseJwt(token); // Trích xuất payload từ JWT
            const username = payload.sub; // Truy cập thông tin username
            const role = extractRole(payload.scope); // Truy cập thông tin role
            // document.querySelector(".sidebar #info").innerHTML = `Xin chào, ${username} (${role})`;
        } else {
            console.warn("Token không hợp lệ, không thể giải mã!");
            // document.querySelector(".sidebar #info").innerHTML = "Xin chào";
    
        }
    } else {
        // document.querySelector(".sidebar #info").innerHTML = "Xin chào";
    }
}


// xử lý chuỗi để lấy role_*
function extractRole(scope) {
    // Tách chuỗi scope thành một mảng
    const scopeArray = scope.split(" ");

    // Lọc ra phần tử bắt đầu bằng "ROLE_"
    const role = scopeArray.find(item => item.startsWith("ROLE_"));

    return role || "Không xác định"; // Nếu không tìm thấy ROLE_, trả về giá trị mặc định
}

// trích xuất thông tin từ jwt
function parseJwt(token){
    try {
        // Decoding logic
        const base64Url = token.split('.')[1]; // payload nằm ở phần thứ 2, Splits the JWT string on the . delimiter and takes the second part (index 1), which is the Payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
        return JSON.parse(jsonPayload); // Trả về JSON chứa thông tin trong payload
    } catch (error) {
        console.error("Lỗi khi giải mã JWT:", error);
        return null; // Trả về null nếu có lỗi
    }
}


// save jwt khi đăng xuất
async function logout() {
    const token = localStorage.getItem("token");
    console.log(token);

    if(!token){
        window.location.href = "/index.html"; // chuyển hướng về trang index
        return;
    }
    try{
        // gửi yêu cầu tới backend để lưu token
        const response = await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Gửi JWT trong header
            },
            body: JSON.stringify({ token }), // Nếu backend yêu cầu gửi token trong body
        });
        if(response.ok){
            const data = await response.json();
            if(data.code = 100) {
                // backend xu ly thanh công
                alert("Đăng xuất thành công!");
            }
        } else {
            // Xử lý lỗi nếu backend trả về lỗi
            const errorMessage = await response.text();
            console.error("Lỗi khi đăng xuất:", errorMessage);
            alert("Đăng xuất thất bại!");
        }
    } catch (error){
        console.error("Lỗi kết nối đến server:", error);
        alert("Không thể kết nối tới server!");
    } finally {
        // Xóa token khỏi localStorage bất kể backend có xử lý thành công hay không
        localStorage.removeItem("token");
        window.location.href = "/html/index.html"; // Chuyển hướng về trang index search
    }
}


function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
}

function checkSession() {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
        alert("Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
        localStorage.removeItem('token');
        window.href="/html/index.html";  
    }
}

// Gọi hàm kiểm tra khi trang được tải
window.onload = () => {
    checkSession();
};