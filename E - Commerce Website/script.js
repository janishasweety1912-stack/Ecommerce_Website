// =========================================
// MOBILE MENU
// =========================================

function toggleMenu() {

    const navMenu =
        document.querySelector(".nav-menu");

    navMenu.classList.toggle("active");
}

// =========================================
// TOAST MESSAGE
// =========================================

const toastMessage =
    document.getElementById("toast-message");

function showToast(message){

    if(!toastMessage) return;

    toastMessage.innerText = message;

    toastMessage.classList.add("show");

    setTimeout(() => {

        toastMessage.classList.remove("show");

    }, 2000);
}

// =========================================
// CART SYSTEM
// =========================================

let cartCount = 0;

const cartCounter =
    document.getElementById("cart-count");

function addToCart(product){

    cartCount++;

    if(cartCounter){

        cartCounter.innerText = cartCount;
    }

    showToast(product + " added to cart");
}

// =========================================
// WISHLIST SYSTEM
// =========================================

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");

const wishlistCount =
    document.getElementById("wishlist-count");

const wishlistItems =
    document.getElementById("wishlist-items");

const wishlistPopup =
    document.getElementById("wishlist-popup");

const wishlistHeaderBtn =
    document.getElementById("wishlist-header-btn");

// STORE PRODUCTS

let wishlist = [];

// =========================================
// UPDATE WISHLIST UI
// =========================================

function updateWishlistUI(){

    if(!wishlistCount || !wishlistItems) return;

    wishlistCount.innerText = wishlist.length;

    wishlistItems.innerHTML = "";

    // EMPTY WISHLIST

    if(wishlist.length === 0){

        wishlistItems.innerHTML =
            "<li>No items in wishlist</li>";

        return;
    }

    // DISPLAY PRODUCTS

    wishlist.forEach((item) => {

        const li =
            document.createElement("li");

        li.innerHTML = `

            <div class="wishlist-product">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h4>${item.name}</h4>

                    <p>${item.price}</p>

                </div>

            </div>

        `;

        wishlistItems.appendChild(li);

    });

}

// =========================================
// WISHLIST HEART CLICK
// =========================================

wishlistButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product");

        const productName =
            productCard.querySelector("h3").innerText;

        const productPrice =
            productCard.querySelector(".price").innerText;

        const productImage =
            productCard.querySelector("img").src;

        const icon =
            button.querySelector("i");

        button.classList.toggle("active");

        // ADD TO WISHLIST

        if(button.classList.contains("active")){

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

            wishlist.push({

                name: productName,
                price: productPrice,
                image: productImage

            });

            showToast(productName + " added to wishlist");
        }

        // REMOVE FROM WISHLIST

        else{

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

            wishlist =
                wishlist.filter(
                    item => item.name !== productName
                );

            showToast(productName + " removed from wishlist");
        }

        updateWishlistUI();

    });

});

// =========================================
// HEADER WISHLIST POPUP
// =========================================

if(wishlistHeaderBtn){

    wishlistHeaderBtn.addEventListener("click", () => {

        if(
            wishlistPopup.style.display === "block"
        ){

            wishlistPopup.style.display = "none";

        } else {

            wishlistPopup.style.display = "block";
        }

    });

}

// =========================================
// DARK MODE
// =========================================

const darkModeBtn =
    document.getElementById("dark-mode-toggle");

if(darkModeBtn){

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}

// =========================================
// NEWSLETTER
// =========================================

function subscribe(event){

    event.preventDefault();

    showToast("Thank you for subscribing!");
}

// =========================================
// LOGIN FORM
// =========================================

const loginForm =
    document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        showToast("Login Successful!");

    });

}

// =========================================
// ACTIVE NAVBAR ON SCROLL
// =========================================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-menu li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        if(window.pageYOffset >= sectionTop - 120){

            current =
                section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") === "#" + current
        ){

            link.classList.add("active");
        }

    });

});

// =========================================
// BACK TO TOP BUTTON
// =========================================

const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(!topBtn) return;

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";
    }

});

if(topBtn){

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// =========================================
// DOM CONTENT LOADED
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // CATEGORY FILTER
    // =====================================

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const products =
        document.querySelectorAll(".product");

    categoryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // REMOVE ACTIVE CLASS

            categoryButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            // ADD ACTIVE CLASS

            button.classList.add("active");

            // GET CATEGORY

            const selectedCategory =
                button.getAttribute("data-category");

            // FILTER PRODUCTS

            products.forEach((product) => {

                if(

                    selectedCategory === "all" ||

                    product.getAttribute("data-category")
                    === selectedCategory

                ){

                    product.style.display = "";

                }

                else{

                    product.style.display = "none";
                }

            });

        });

    });

    // =====================================
    // SEARCH FUNCTION
    // =====================================

    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");

    function searchProducts(){

        const searchValue =
            searchInput.value
            .toLowerCase()
            .trim();

        products.forEach((product) => {

            const productName =
                product.querySelector("h3")
                .innerText
                .toLowerCase();

            // SHOW MATCHING PRODUCTS

            if(
                productName.includes(searchValue)
            ){

                product.style.display = "";

            }

            else{

                product.style.display = "none";
            }

        });

        // AUTO SCROLL

        document
            .querySelector("#products")
            .scrollIntoView({

                behavior: "smooth"

            });

    }

    // SEARCH BUTTON CLICK

    if(searchBtn){

        searchBtn.addEventListener(

            "click",
            searchProducts

        );

    }

    // SEARCH WHILE TYPING

    if(searchInput){

        searchInput.addEventListener(

            "keyup",
            searchProducts

        );

    }

});