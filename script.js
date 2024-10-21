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

// Daftar 200 pertanyaan yang bisa dijawab oleh chatbot
const bananaQuestions = {
    "apa itu banana store?": "Banana Store adalah toko yang menyediakan berbagai jenis pisang segar dari berbagai daerah.",
    "jenis pisang apa yang dijual?": "Kami menjual pisang cavendish, pisang kepok, pisang raja, dan banyak lagi.",
    "di mana lokasi banana store?": "Banana Store berlokasi di Jl. Pisang No. 123, Jakarta.",
    "apakah banana store buka setiap hari?": "Ya, kami buka setiap hari dari pukul 08:00 hingga 21:00.",
    "bagaimana cara pemesanan online?": "Anda bisa memesan melalui situs web kami atau melalui aplikasi mobile Banana Store.",
    "metode pembayaran apa yang diterima?": "Kami menerima pembayaran melalui kartu kredit, debit, dan e-wallet seperti GoPay dan OVO.",
    "apakah ada diskon?": "Kami sering mengadakan diskon khusus pada hari-hari tertentu atau untuk pembelian dalam jumlah besar.",
    "apakah pisang yang dijual organik?": "Beberapa varietas pisang yang kami jual adalah pisang organik. Silakan cek ketersediaan di toko kami.",
    "berapa lama pengiriman online?": "Pengiriman biasanya memakan waktu antara 1 hingga 3 hari kerja, tergantung lokasi Anda.",
    "apakah ada garansi kesegaran?": "Ya, kami menjamin kesegaran pisang kami. Jika Anda tidak puas, Anda dapat menghubungi layanan pelanggan kami.",
    "berapa minimal pembelian untuk pengiriman gratis?": "Pengiriman gratis untuk pembelian minimal Rp100.000.",
    "bagaimana cara membatalkan pesanan?": "Anda dapat membatalkan pesanan dengan menghubungi layanan pelanggan sebelum pesanan dikirim.",
    "bisakah saya mengambil pesanan di toko?": "Ya, Anda bisa memesan online dan mengambil pesanan langsung di toko kami.",
    "apakah banana store memiliki program loyalitas?": "Kami sedang mengembangkan program loyalitas untuk pelanggan setia kami. Tunggu kabar lebih lanjut!",
    "bisakah saya memesan pisang dalam jumlah besar untuk acara?": "Ya, kami menerima pesanan dalam jumlah besar untuk acara. Hubungi layanan pelanggan untuk informasi lebih lanjut.",
    "jenis pisang apa yang cocok untuk bayi?": "Pisang cavendish dan pisang ambon adalah pilihan yang bagus untuk bayi karena teksturnya yang lembut dan rasanya yang manis.",
    "apakah pisang bisa dipesan untuk dikirim ke luar kota?": "Ya, kami melayani pengiriman ke seluruh wilayah Indonesia.",
    "berapa harga pisang cavendish per kilogram?": "Harga pisang cavendish adalah Rp25.000 per kilogram.",
    "apakah banana store memiliki cabang lain?": "Saat ini kami hanya memiliki satu cabang di Jakarta, tetapi kami sedang merencanakan ekspansi ke kota lain.",
    "bisakah saya mengembalikan pisang yang sudah dibeli?": "Jika Anda tidak puas dengan kualitas pisang yang diterima, Anda dapat mengembalikannya dalam waktu 24 jam.",
    "bagaimana cara menyimpan pisang agar tahan lama?": "Simpan pisang di tempat sejuk dan kering, atau di lemari pendingin untuk memperpanjang kesegarannya.",
    "apa perbedaan pisang cavendish dan pisang kepok?": "Pisang cavendish memiliki tekstur yang lebih lembut dan rasa manis, sedangkan pisang kepok lebih padat dan sering digunakan untuk digoreng.",
    "apakah ada pisang yang cocok untuk diet?": "Pisang cavendish sering direkomendasikan untuk diet karena rendah kalori dan kaya serat.",
    "bisakah saya memesan pisang yang sudah matang?": "Ya, Anda dapat memilih pisang yang sudah matang atau yang masih hijau sesuai kebutuhan Anda.",
    "berapa lama pisang bisa bertahan setelah dipanen?": "Pisang biasanya dapat bertahan hingga satu minggu setelah dipanen jika disimpan dengan baik.",
    "apa manfaat makan pisang setiap hari?": "Makan pisang setiap hari dapat membantu meningkatkan energi, menjaga kesehatan jantung, dan meningkatkan pencernaan.",
};

const initialMessage = "Halo! Selamat datang di Banana Store Bot. Saya di sini untuk membantu menjawab pertanyaan Anda tentang Banana Store.";

document.getElementById('chatbot-toggle').addEventListener('click', function () {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (chatbotWindow.style.display === 'flex') {
        chatbotWindow.style.display = 'none';
    } else {
        chatbotWindow.style.display = 'flex';
        displayMessage(initialMessage, 'bot');
    }
});

// Close chatbot window
document.getElementById('chatbot-close').addEventListener('click', function () {
    document.getElementById('chatbot-window').style.display = 'none';
});

// Send message on click or Enter key
document.getElementById('chatbot-send').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('chatbot-input').value.toLowerCase();
    if (userInput) {
        displayMessage(userInput, 'user');

        // Simulasikan respons bot
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            displayMessage(botResponse, 'bot');
        }, 3000);

        // Bersihkan input
        document.getElementById('chatbot-input').value = '';
    }
}

// Fungsi untuk menampilkan pesan
function displayMessage(message, sender) {
    const timestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const messageContainer = document.getElementById('chatbot-messages');

    messageContainer.innerHTML += `
        <div class="message ${sender}">
            <div class="message-content">
                ${message}
                <div class="timestamp">${timestamp}</div>
            </div>
        </div>`;

    messageContainer.scrollTop = messageContainer.scrollHeight;
}


function getBotResponse(userInput) {
    const answer = bananaQuestions[userInput];
    if (answer) {
        return answer;
    }

    return "Maaf, saya tidak paham. Coba tanyakan sesuatu tentang Banana Store.";
}


document.getElementById('confirm-checkout-btn').addEventListener('click', function(event) {
    event.preventDefault();

    var pesan = "halo saya ingin mengkonfirmasi pembayaran saya";

    var nomorWhatsApp = "6287760347478"; // Tanpa tanda plus (+)
    var pesan = "Halo, saya ingin mengonfirmasi pembayaran untuk pesanan saya.";
    var whatsappURL = "https://wa.me/" + nomorWhatsApp + "?text=" + encodeURIComponent(pesan);
    window.location.href = whatsappURL;

});
