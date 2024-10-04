// scripts.js

// Encapsulate all functionality within an IIFE to avoid polluting the global scope
(() => {
    // ================================
    // Utility Functions
    // ================================

    /**
     * Selects a single DOM element.
     * @param {string} selector - The CSS selector to query.
     * @returns {Element|null} - The first matching element or null.
     */
    const $ = (selector) => document.querySelector(selector);

    /**
     * Selects multiple DOM elements.
     * @param {string} selector - The CSS selector to query.
     * @returns {NodeList} - A list of matching elements.
     */
    const $$ = (selector) => document.querySelectorAll(selector);

    /**
     * Generates a unique order ID.
     * @returns {string} - A unique order ID.
     */
    const generateOrderId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let orderId = 'ORD-';
        for (let i = 0; i < 8; i++) {
            orderId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return orderId;
    };

    /**
     * Validates a Cash App cashtag.
     * @param {string} cashtag - The cashtag to validate.
     * @returns {boolean} - True if valid, else false.
     */
    const validateCashtag = (cashtag) => {
        const cashtagRegex = /^\$[A-Za-z0-9]{1,15}$/;
        return cashtagRegex.test(cashtag);
    };

    /**
     * Validates a Bitcoin transaction ID.
     * @param {string} txId - The transaction ID to validate.
     * @returns {boolean} - True if valid, else false.
     */
    const validateBTCtxId = (txId) => {
        const btcTxIdRegex = /^[A-Fa-f0-9]{64}$/;
        return btcTxIdRegex.test(txId);
    };

    // ================================
    // Password Modal Functionality
    // ================================

    /**
     * Handles the password protection modal.
     */
    const PasswordModal = (() => {
        const password = 'Glasskilla23'; // Set the desired password
        const modal = $('#password-modal');
        const passwordInput = $('#password-input');
        const submitButton = $('#submit-password');
        const mainContent = $('main');

        let attemptCount = 0;
        const maxAttempts = 3;

        /**
         * Initializes the password modal by displaying it on page load.
         */
        const init = () => {
            // Display the modal on page load
            window.addEventListener('load', () => {
                modal.style.display = 'block';
                mainContent.style.display = 'none';
                passwordInput.focus();
            });

            // Handle password submission
            submitButton.addEventListener('click', handlePasswordSubmission);
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handlePasswordSubmission();
                }
            });

            // Prevent closing the modal by clicking outside
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    // Do nothing to prevent closing
                }
            });

            // Prevent closing the modal via the Esc key
            document.addEventListener('keydown', function(event) {
                if (event.key === "Escape") {
                    if (modal.style.display === 'block') {
                        event.preventDefault();
                    }
                }
            });
        };

        /**
         * Validates the entered password and grants access if correct.
         */
        const handlePasswordSubmission = () => {
            const enteredPassword = passwordInput.value.trim();
            if (enteredPassword === password) {
                modal.style.display = 'none';
                mainContent.style.display = 'block';
            } else {
                attemptCount++;
                if (attemptCount >= maxAttempts) {
                    alert('Maximum attempts reached. You will now be redirected.');
                    // Redirect to the Access Denied page
                    window.location.href = 'access-denied.html'; // Change to desired URL
                } else {
                    alert(`Incorrect password. You have ${maxAttempts - attemptCount} attempt(s) left.`);
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            }
        };

        return { init };
    })();

    // ================================
    // Payment Modal Functionality
    // ================================

    /**
     * Handles the payment modal interactions.
     */
    const PaymentModal = (() => {
        const modal = $('#payment-modal');
        const closeButtons = $$('.close');
        const buyButtons = $$('.buy-button');
        const productNameElem = $('#product-name');
        const productPriceElem = $('#product-price');
        const confirmPaymentButton = $('.confirm-payment');
        const paymentOptions = $$('input[name="payment"]');
        const transactionIdLabel = $('#transaction-id-label');
        const transactionIdInput = $('#transaction-id');

        let selectedProduct = null;

        /**
         * Initializes the payment modal by setting up event listeners.
         */
        const init = () => {
            // Attach event listeners to all Buy Now buttons
            buyButtons.forEach(button => {
                button.addEventListener('click', handleBuyButtonClick);
            });

            // Attach event listeners to all close buttons within the modal
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    closeModal();
                });
            });

            // Handle clicks outside the modal content to close the modal
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Handle payment method selection
            paymentOptions.forEach(option => {
                option.addEventListener('change', handlePaymentOptionChange);
            });

            // Handle payment confirmation
            confirmPaymentButton.addEventListener('click', handleConfirmPayment);
        };

        /**
         * Handles the click event on a Buy Now button.
         * @param {Event} event - The click event.
         */
        const handleBuyButtonClick = (event) => {
            const productCard = event.currentTarget.closest('.product');
            if (productCard) {
                selectedProduct = {
                    name: productCard.dataset.name,
                    price: productCard.dataset.price
                };
                populateModal(selectedProduct);
                openModal();
            }
        };

        /**
         * Populates the payment modal with the selected product's details.
         * @param {Object} product - The selected product.
         */
        const populateModal = (product) => {
            productNameElem.textContent = `Product: ${product.name}`;
            productPriceElem.textContent = `Price: $${product.price}`;
            // Reset payment options
            paymentOptions.forEach(option => option.checked = false);
            transactionIdInput.style.display = 'none';
            transactionIdLabel.style.display = 'none';
            transactionIdInput.value = '';
        };

        /**
         * Opens the payment modal.
         */
        const openModal = () => {
            modal.style.display = 'block';
        };

        /**
         * Closes the payment modal.
         */
        const closeModal = () => {
            modal.style.display = 'none';
        };

        /**
         * Handles the change event when a payment option is selected.
         * @param {Event} event - The change event.
         */
        const handlePaymentOptionChange = (event) => {
            const selectedValue = event.target.value;
            if (selectedValue === 'cashapp') {
                transactionIdLabel.style.display = 'block';
                transactionIdInput.style.display = 'block';
                transactionIdInput.placeholder = 'Enter Your Cashtag (e.g., $YourCashtag)';
                transactionIdInput.focus();
            } else if (selectedValue === 'bitcoin') {
                transactionIdLabel.style.display = 'block';
                transactionIdInput.style.display = 'block';
                transactionIdInput.placeholder = 'Enter Bitcoin Transaction ID';
                transactionIdInput.focus();
            }
        };

        /**
         * Handles the payment confirmation process.
         */
        const handleConfirmPayment = () => {
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            const transactionId = transactionIdInput.value.trim();

            if (!selectedPayment) {
                alert('Please select a payment method.');
                return;
            }

            if (selectedPayment.value === 'cashapp') {
                if (!validateCashtag(transactionId)) {
                    alert('Please enter a valid Cash App Cashtag (e.g., $YourCashtag).');
                    transactionIdInput.focus();
                    return;
                }
            } else if (selectedPayment.value === 'bitcoin') {
                if (!validateBTCtxId(transactionId)) {
                    alert('Please enter a valid Bitcoin Transaction ID (64 hexadecimal characters).');
                    transactionIdInput.focus();
                    return;
                }
            }

            // Generate Order ID
            const orderId = generateOrderId();

            // Display confirmation to the user
            alert(`Payment confirmed!\nOrder ID: ${orderId}\nThank you for your purchase.`);

            // Optionally, you can redirect the user or reset the form
            closeModal();
        };

        return { init };
    })();

    // ================================
    // Initialization
    // ================================

    /**
     * Initializes all components when the DOM is fully loaded.
     */
    const init = () => {
        PasswordModal.init();
        PaymentModal.init();
    };

    // Wait for the DOM to be fully loaded before initializing
    document.addEventListener('DOMContentLoaded', init);
})();
