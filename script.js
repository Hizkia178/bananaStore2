function showProfile() {
    document.getElementById("profileModal").style.display = "block";
}

function closeProfile() {
    document.getElementById("profileModal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("profileModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


let cart = [];
let cartCount = 0;
let totalPrice = 0;

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId, productName, productPrice, productImage) {
    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    };

    cart.push(cartItem);
    cartCount++;
    totalPrice += productPrice;

    // Perbarui tampilan cart count
    document.getElementById('cart-count').innerText = cartCount;

    // Tambahkan produk ke list di modal keranjang
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItemsList.innerHTML = '';
    totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price;
        const newCartItem = document.createElement('li');
        newCartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            ${item.name} - Rp. ${item.price}
            <button class="remove-item" data-index="${index}"><i class="fas fa-times"></i></button>
        `;
        cartItemsList.appendChild(newCartItem);
    });

    // Perbarui total harga
    cartTotal.innerText = `Total: Rp. ${totalPrice}`;

    // Event listener untuk menghapus item
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(index) {
    const itemToRemove = cart[index];
    cartCount--;
    totalPrice -= itemToRemove.price;
    cart.splice(index, 1);

    // Perbarui tampilan keranjang dan cart count
    document.getElementById('cart-count').innerText = cartCount;
    updateCart();
}

// Event listener untuk tombol tambah
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.product-card');
        const productId = productCard.getAttribute('data-product-id');
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = parseInt(productCard.querySelector('.price').innerText.replace('Rp. ', '').replace('.', ''));
        const productImage = productCard.getAttribute('data-image');

        addToCart(productId, productName, productPrice, productImage);
    });
});

// Event listener untuk membuka modal keranjang
document.getElementById('cart-link').addEventListener('click', function (e) {
    e.preventDefault();
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'none' || cartModal.style.display === '') ? 'block' : 'none';
});

// Tampilkan modal checkout setelah menekan tombol checkout
document.getElementById('checkout-btn').addEventListener('click', function () {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'block';
    checkoutModal.classList.add('active');

    // Perbarui total harga di form checkout
    document.getElementById('total-price').value = document.getElementById('cart-total').innerText;
});

// Tombol konfirmasi pembayaran
document.getElementById('confirm-checkout-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Mencegah form submit default
    alert("Pembayaran berhasil dikonfirmasi!");
    document.getElementById('checkout-modal').style.display = 'none';
});

// Tutup modal checkout dengan klik di luar modal
window.addEventListener('click', function (event) {
    const checkoutModal = document.getElementById('checkout-modal');
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});


const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// Get the button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show button when scrolled down
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// When the user clicks the button, scroll to the top
scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Toggle chatbot window
document.getElementById('chatbot-toggle').addEventListener('click', function () {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
});

// Close chatbot window
document.getElementById('chatbot-close').addEventListener('click', function () {
    document.getElementById('chatbot-window').style.display = 'none';
});

// Send message logic
document.getElementById('chatbot-send').addEventListener('click', function () {
    sendMessage();
});

document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('chatbot-input').value;
    if (userInput) {
        const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Mengaktifkan format 12 jam dengan AM/PM
        });
        const messageContainer = document.getElementById('chatbot-messages');

        // Tambah pesan pengguna
        messageContainer.innerHTML += `
            <div class="message user">
                <div class="message-content">
                    ${userInput}
                    <div class="timestamp">${timestamp}</div>
                </div>
            </div>`;

        // Simulasikan respons bot
        setTimeout(() => {
            const botMessage = "Saya tidak paham, coba lagi!";
            const botTimestamp = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            messageContainer.innerHTML += `
                <div class="message bot">
                    <div class="message-content">
                        ${botMessage}
                        <div class="timestamp">${botTimestamp}</div>
                    </div>
                </div>`;
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }, 1000);

        // Bersihkan input
        document.getElementById('chatbot-input').value = '';
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}