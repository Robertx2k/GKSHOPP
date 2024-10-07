// Variables
const products = [
    {
        id: 1,
        name: "Product 1",
        price: "$10",
        description: "Description for Product 1.",
        icon: "⭐",
        comingSoon: false,
    },
    {
        id: 2,
        name: "Product 2",
        price: "$20",
        description: "Description for Product 2.",
        icon: "🌟",
        comingSoon: false,
    },
    {
        id: 3,
        name: "Product 3",
        price: "$30",
        description: "Description for Product 3.",
        icon: "✨",
        comingSoon: false,
    },
    {
        id: 4,
        name: "Product 4",
        price: "$40",
        description: "Description for Product 4.",
        icon: "🌈",
        comingSoon: false,
    },
    {
        id: 5,
        name: "Product 5",
        price: "$50",
        description: "Description for Product 5.",
        icon: "🎉",
        comingSoon: true,
    },
    {
        id: 6,
        name: "Product 6",
        price: "$60",
        description: "Description for Product 6.",
        icon: "🚀",
        comingSoon: true,
    },
    {
        id: 7,
        name: "Product 7",
        price: "$70",
        description: "Description for Product 7.",
        icon: "🌌",
        comingSoon: true,
    },
    {
        id: 8,
        name: "Product 8",
        price: "$80",
        description: "Description for Product 8.",
        icon: "🌟",
        comingSoon: true,
    },
    {
        id: 9,
        name: "Product 9",
        price: "$90",
        description: "Description for Product 9.",
        icon: "✨",
        comingSoon: true,
    },
    {
        id: 10,
        name: "Product 10",
        price: "$100",
        description: "Description for Product 10.",
        icon: "🌈",
        comingSoon: true,
    },
];

// Selectors
const productContainer = document.querySelector("#products .product-grid");
const passwordModal = document.getElementById("password-modal");
const passwordInput = document.getElementById("password-input");
const submitPasswordBtn = document.querySelector(".submit-password");
const closePasswordModalBtn = document.querySelector(".close-password-modal");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close");
const orderIdInput = document.getElementById("order-id-input");
const transactionIdInput = document.querySelector(".transaction-id input");
const cashtagInput = document.querySelector(".cashtag-id input");
const confirmPaymentBtn = document.querySelector(".confirm-payment");
const paymentMessage = document.getElementById("payment-message");

// Password for access
const validPassword = "keion12!";
let isPasswordEntered = false;

// Load Products
function loadProducts() {
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <button class="buy-button" ${product.comingSoon ? 'disabled' : ''}>Buy Now</button>
            <p class="description">${product.description}</p>
        `;

        // Show description on product click
        productDiv.querySelector(".buy-button").addEventListener("click", () => {
            showProductModal(product);
        });

        productContainer.appendChild(productDiv);
    });
}

// Show Product Modal
function showProductModal(product) {
    const modalContent = `
        <span class="close" onclick="closeProductModal()">&times;</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price">${product.price}</div>
        <h3>Payment Options:</h3>
        <p>Send your payment to:</p>
        <p><strong>CashApp Cashtag:</strong> $yourcashtag</p>
        <p><strong>Bitcoin Address:</strong> your_btc_address</p>
        <div class="transaction-id">
            <label for="transaction-id">Transaction ID:</label>
            <input type="text" id="transaction-id" placeholder="Enter Transaction ID" />
        </div>
        <div class="cashtag-id">
            <label for="cashtag-id">CashApp Cashtag:</label>
            <input type="text" id="cashtag-id" placeholder="Enter your CashApp Cashtag" />
        </div>
        <button class="confirm-payment">Confirm Payment</button>
        <p id="payment-message"></p>
    `;
    modal.querySelector(".modal-content").innerHTML = modalContent;
    modal.style.display = "block";

    // Handle payment confirmation
    confirmPaymentBtn.onclick = () => {
        const transactionId = transactionIdInput.value;
        const cashtag = cashtagInput.value;

        if (transactionId && cashtag) {
            paymentMessage.textContent = "Payment details confirmed. Thank you!";
        } else {
            paymentMessage.textContent = "Please enter valid payment details.";
        }
    };
}

// Close Product Modal
function closeProductModal() {
    modal.style.display = "none";
    resetPaymentFields();
}

// Reset Payment Fields
function resetPaymentFields() {
    transactionIdInput.value = "";
    cashtagInput.value = "";
    paymentMessage.textContent = "";
}

// Open Password Modal
function openPasswordModal() {
    passwordModal.style.display = "block";
}

// Close Password Modal
function closePasswordModal() {
    if (isPasswordEntered) {
        passwordModal.style.display = "none";
    } else {
        alert("Please enter the correct password first!");
    }
}

// Submit Password
submitPasswordBtn.onclick = () => {
    const enteredPassword = passwordInput.value;

    if (enteredPassword === validPassword) {
        isPasswordEntered = true;
        passwordModal.style.display = "none";
        loadProducts();
    } else {
        alert("Incorrect password!");
    }
};

// Close Modal
closeModalBtn.onclick = () => {
    if (isPasswordEntered) {
        closeProductModal();
    } else {
        alert("Please enter the correct password first!");
    }
};

// Close Password Modal on click
closePasswordModalBtn.onclick = closePasswordModal;

// Load Products on Page Load
window.onload = openPasswordModal;
