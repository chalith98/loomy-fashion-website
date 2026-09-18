// Dynamic Gallery Data Sets
const galleryData = {
    'custom-tees': [
        "image/card-01/G-01.jpg",
        "image/card-01/G-02.jpg",
        "image/card-01/G-03.jpg",
        "image/card-01/G-04.jpg",
        "image/card-01/G-05.jpg",
        "image/card-01/G-06.jpg",
        "image/card-01/G-07.jpg",
        "image/card-01/G-08.jpg"
    ],
    'heat-press': [
        "image/card-02/G-01.jpg",
        "image/card-02/G-02.jpg",
        "image/card-02/G-03.jpg",
        "image/card-02/G-04.jpg",
        "image/card-02/G-05.jpg",
        "image/card-02/G-06.jpg",
        "image/card-02/G-07.jpg",
        "image/card-02/G-08.jpg"
    ],
    'graphic-tees': [
        "image/card-03/G-01.jpg",
        "image/card-03/G-02.jpg",
        "image/card-03/G-03.jpg",
        "image/card-03/G-04.jpg",
        "image/card-03/G-05.jpg",
        "image/card-03/G-06.jpg",
        "image/card-03/G-07.jpg",
        "image/card-03/G-08.jpg"
    ],
    'loomy-signature': [
        "image/card-04/G-01.jpg",
        "image/card-04/G-02.jpg",
        "image/card-04/G-03.jpg",
        "image/card-04/G-04.jpg",
        "image/card-04/G-05.jpg",
        "image/card-04/G-06.jpg",
        "image/card-04/G-07.jpg",
        "image/card-04/G-08.jpg"
    ]
};

// Cart State Management
let cart = [];

function toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    let backdrop = document.querySelector(".cart-backdrop");

    sidebar.classList.toggle("active");
    if (backdrop) backdrop.classList.toggle("active");
}

let currentGalleryList = []; // Denata thiyena category eke image URLs
let currentImageIndex = 0;   // Innasna image eke index eka

// Open Dynamic Gallery Popup
function openGallery(categoryKey) {
    const modal = document.getElementById("gallery-modal");
    const gridContainer = document.getElementById("gallery-grid-items");

    currentGalleryList = galleryData[categoryKey] || [];

    gridContainer.innerHTML = currentGalleryList.map((imgUrl, index) => `
        <div class="gallery-item">
            <img src="${imgUrl}" alt="Gallery Showcase Image" loading="lazy" onclick="openFullsizeModal(${index})">
        </div>
    `).join('');

    modal.style.display = "flex";
}

// Fullsize Image Lightbox Functions
function openFullsizeModal(index) {
    currentImageIndex = index;
    updateFullsizeImage();

    const fullsizeModal = document.getElementById("fullsize-modal");
    fullsizeModal.style.display = "flex";
}

function updateFullsizeImage() {
    if (currentGalleryList.length === 0) return;

    const fullsizeImg = document.getElementById("fullsize-img");
    const counter = document.getElementById("image-counter");

    fullsizeImg.src = currentGalleryList[currentImageIndex];
    counter.innerText = `${currentImageIndex + 1} / ${currentGalleryList.length}`;
}

function nextImage() {
    if (currentGalleryList.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentGalleryList.length;
    updateFullsizeImage();
}

function prevImage() {
    if (currentGalleryList.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateFullsizeImage();
}

function closeFullsizeModal() {
    document.getElementById("fullsize-modal").style.display = "none";
}

// Keyboard arrow navigation support
document.addEventListener('keydown', function (event) {
    const fullsizeModal = document.getElementById("fullsize-modal");
    if (fullsizeModal.style.display === "flex") {
        if (event.key === "ArrowRight") {
            nextImage();
        } else if (event.key === "ArrowLeft") {
            prevImage();
        } else if (event.key === "Escape") {
            closeFullsizeModal();
        }
    }
});

function closeFullsizeModal() {
    document.getElementById("fullsize-modal").style.display = "none";
}

// Fullsize Image Lightbox Functions
function openFullsizeModal(imageSrc) {
    const fullsizeModal = document.getElementById("fullsize-modal");
    const fullsizeImg = document.getElementById("fullsize-img");

    fullsizeImg.src = imageSrc;
    fullsizeModal.style.display = "flex";
}

function closeFullsizeModal() {
    document.getElementById("fullsize-modal").style.display = "none";
}

function closeGallery() {
    document.getElementById("gallery-modal").style.display = "none";
}

// Close Modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("gallery-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// WhatsApp Quick Order Redirection
function sendToWhatsApp(event) {
    event.preventDefault();

    const phoneNumber = "94781183434";
    const name = document.getElementById("custName").value;
    const service = document.getElementById("serviceType").value;
    const message = document.getElementById("custMsg").value;

    const text = `Hello Loomy Fashion! 👋%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Service Needed:* ${encodeURIComponent(service)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
}

// Scroll Intersection Observer for Smooth Reveal Animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
        revealObserver.observe(el);
    });

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll(`.desktop-nav a[href*=${sectionId}], .mobile-bottom-nav a[href*=${sectionId}]`)
                    .forEach(a => a.classList.add("active"));
            } else {
                document.querySelectorAll(`.desktop-nav a[href*=${sectionId}], .mobile-bottom-nav a[href*=${sectionId}]`)
                    .forEach(a => a.classList.remove("active"));
            }
        });
    });
});

// Tab Switcher Logic for Login / Register
function switchTab(tab) {
    const indicator = document.getElementById('tab-indicator');
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (tab === 'login') {
        indicator.style.transform = 'translateX(0)';
        loginForm.classList.add('active-form');
        regForm.classList.remove('active-form');
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
    } else {
        indicator.style.transform = 'translateX(100%)';
        regForm.classList.add('active-form');
        loginForm.classList.remove('active-form');
        tabBtns[1].classList.add('active');
        tabBtns[0].classList.remove('active');
    }
}

// Password Visibility Toggle
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Dummy Login Form Submission
function handleLogin(e) {
    e.preventDefault();
    alert("Welcome Back to Loomy Fashion!");
    window.location.href = "index.html";
}

// Dummy Register Form Submission
function handleRegister(e) {
    e.preventDefault();
    alert("Account Created Successfully!");
    window.location.href = "index.html";
}

// Actual Backend Login Request
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert("Welcome Back to Loomy Fashion!");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Please try again later.");
    }
}

// Actual Backend Register Request
async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            alert("Account Created Successfully! Please Sign In.");
            switchTab('login');
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Please try again later.");
    }
}