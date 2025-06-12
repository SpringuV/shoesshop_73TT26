const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

/* Hamburger Menu Toggle */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu > ul');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleToggle(e) {
        e.preventDefault(); // Ngăn chặn xung đột sự kiện
        if (menuToggle && menu && mediaQuery.matches) {
            const isActive = menu.classList.contains('active');
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            if (!isActive) {
                setTimeout(() => {
                    menu.classList.add('active');
                    menuToggle.classList.add('active');
                }, 0);
            }
        }
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', handleToggle);
    }

    // Kiểm tra khi thay đổi kích thước màn hình
    mediaQuery.addListener(() => {
        if (!mediaQuery.matches) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
      const toggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector(".menu > ul");
      const overlay = document.querySelector(".menu-overlay");

      toggle.addEventListener("click", () => {
  const isOpen = menu.classList.contains("active");
  if (isOpen) {
    // Đang mở → đóng
    menu.classList.remove("active");
    toggle.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    // Đang đóng → mở
    menu.classList.add("active");
    toggle.classList.add("active");
    overlay.classList.add("active");
  }
});

overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  toggle.classList.remove("active");
  overlay.classList.remove("active");
});

  document.querySelectorAll(".menu > ul > li > a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
});

// start exex add user to db
let username = document.querySelector("#ip_txt_username");
let pass = document.querySelector("#ip_txt_password");
let email = document.querySelector("ip_txt_email");




// end exex add user to db