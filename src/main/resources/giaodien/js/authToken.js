 function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
}

 function checkUserLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    // Khi backend sẵn sàng:
    // try {
    //     const resp = await fetch("/api/auth/me", {
    //         headers: { "Authorization": `Bearer ${token}` }
    //     });
    //     return resp.ok;
    // } catch (error) {
    //     return false;
    // }

    return true;
}

// hiển thị thông tin trên header
 function getUserName() {
    const token = localStorage.getItem("token");
    if (token) {
        const payload = parseJwt(token);
        if (payload) {
            const username = payload.sub; // Truy cập thông tin username
            // const role = extractRole(payload.scope); // Truy cập thông tin role
            // document.querySelector(".sidebar #info").innerHTML = `Xin chào, ${username} (${role})`;
            return username;
        } else {
            console.warn("Token không hợp lệ, không thể giải mã!");
            // document.querySelector(".sidebar #info").innerHTML = "Xin chào";

        }
    } else {
        console.log("Bạn chưa đăng nhập, vui lòng đăng nhập")
    }
}

 function getRoleUser() {
    const token = localStorage.getItem("token");
    if (token) {
        const payload = parseJwt(token);
        if (payload) {
            const role = extractRole(payload.scope)
            console.log(role)
            return role;
        }
        else {
            console.warn("Token không hợp lệ, không thể giải mã!");
        }
    } else {
        console.warn("Người dùng chưa đăng nhập hoặc lỗi khi get ROLE");
    }
    return null;
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
 function parseJwt(token) {
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

 function getUserId() {
    const token = localStorage.getItem("token");
    const payload = parseJwt(token)
    const userId = payload.userId
    return userId
}


// save jwt khi đăng xuất
 async function logout() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.replace("/html/Home.html"); // chuyển hướng về trang index
        return;
    }
    try {
        // gửi yêu cầu tới backend để lưu token
        const response = await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Gửi JWT trong header
            },
            body: JSON.stringify({ token }), // Nếu backend yêu cầu gửi token trong body
        });
        if (response.ok) {
            const data = await response.json();
            if (data.code === 100) {
                // backend xu ly thanh công
                alert("Đăng xuất thành công!");
                // xóa trong localStorage
                localStorage.removeItem("token")
            }
        } else {
            // Xử lý lỗi nếu backend trả về lỗi
            const errorMessage = await response.text();
            console.error("Lỗi khi đăng xuất:", errorMessage);
            alert("Đăng xuất thất bại!");
        }
    } catch (error) {
        console.error("Lỗi kết nối đến server:", error);
        alert("Không thể kết nối tới server!");
    } finally {
        // Xóa token khỏi localStorage bất kể backend có xử lý thành công hay không
        localStorage.removeItem("token");
        window.location.replace("/html/Home.html"); // Chuyển hướng về trang index search
    }
}


 function checkSession() {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
        alert("Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
        localStorage.removeItem('token');
        window.location.replace("/html/Home.html"); // không thể quay lại trang
    }
}

 function isTokenNearExpired(token, seconds = 120) {
    try {
        const payload = parseJwt(token);
        const now = Math.floor(Date.now() / 1000)
        const timeLeft = payload.exp - now;
        return timeLeft < seconds; // true nếu còn dưới 120s
    } catch (error) {
        console.error("Không thể kiểm tra token:", error);
        return true; // coi như gần hết hạn nếu lỗi
    }
}


 async function refreshAccessToken(userIsActive) {
    const token = localStorage.getItem("token");
    if (!token) return false;
    if (userIsActive) {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(token)
            })

            if (response.ok) {
                const data = await response.json();
                // xóa token cũ
                localStorage.removeItem("token");
                // add token mới 
                localStorage.setItem('token', data.result.token)
                console.log("token đã được làm mới")
            } else {
                console.warn("Refresh token thất bại")
                return false;
            }
        } catch (error) {
            console.error("Lỗi khi refresh token")
            return false;
        }
    } else {
        console.warn("Người dùng không hoạt động => không refresh")
        return false;
    }
}

 function scheduleTokenRefresh() {
    const token = localStorage.getItem("token")
    if (!token) return;

    const payload = parseJwt(token);
    if (!payload) return;

    const now = Math.floor(Date.now() / 1000)
    const expireTime = payload.exp;
    const timeLeft = expireTime - now;
    // Nếu thời gian còn lại > 2 phút thì đợi đến lúc còn 2 phút mới bắt đầu kiểm tra định kỳ
    const delay = Math.max((timeLeft - 120) * 1000, 0)
    setTimeout(() => {
        console.log("Bắt đầu kiểm tra token gần hết hạn...");
        startMonitoringUserActivity();
    }, delay)
}

 function startMonitoringUserActivity() {
    let userActive = false;

    function setUserActive() {
        userActive = true;
    }

    ['mousemove', 'click', 'scroll', 'keydown'].forEach(
        event => {
            window.addEventListener(event, setUserActive)
        }
    )
    // kiểm tra định kì mỗi 30s
    setInterval(async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return;
        }

        if (isTokenNearExpired(token, 120)) {
            if (userActive) {
                await refreshAccessToken(true)
            } else {
                console.warn("Không hoạt động và token sắp hết => auto logout");
                await logout(); // gọi hàm logout bạn đã viết sẵn
            }
        }
        userActive = false // reset trang thai sau moi vong
    }, 15000);
}



// // Gọi hàm kiểm tra khi trang được tải
window.onload = () => {
    const protectedPage = ["/html/Admin.html"];
    const currentPage = window.location.pathname;
    if (protectedPage.includes(currentPage)) {
        checkSession();
    }

    scheduleTokenRefresh(); // vẫn dùng ở mọi trang nếu bạn muốn tự refresh token
};

export default {
    checkUserLogin, getUserId,
    isTokenNearExpired, checkSession, logout, parseJwt, extractRole, isTokenExpired,
    getUserName, getRoleUser, isTokenExpired, startMonitoringUserActivity, scheduleTokenRefresh, refreshAccessToken
}