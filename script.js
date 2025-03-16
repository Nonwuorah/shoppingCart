// Cart data
let cartItems = [
    {
        id: 1,
        name: "Classic Sneakers",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=300",
        quantity: 1,
        liked: false
    },
    {
        id: 2,
        name: "Leather Backpack",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300",
        quantity: 1,
        liked: false
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300",
        quantity: 1,
        liked: false
    }
];

// SVG icons
const icons = {
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    minus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
};

// DOM elements
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');

// Render cart items
function renderCart() {
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus-btn">${icons.minus}</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus-btn">${icons.plus}</button>
                </div>
            </div>
            <div class="item-actions">
                <button class="action-btn heart-btn ${item.liked ? 'active' : ''}">${icons.heart}</button>
                <button class="action-btn delete-btn">${icons.trash}</button>
            </div>
        </div>
    `).join('');

    updateTotal();
    attachEventListeners();
}

// Update total price
function updateTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Event listeners
function attachEventListeners() {
    // Plus button
    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = cartItems.find(item => item.id === id);
            item.quantity++;
            renderCart();
        });
    });

    // Minus button
    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = cartItems.find(item => item.id === id);
            if (item.quantity > 1) {
                item.quantity--;
                renderCart();
            }
        });
    });

    // Delete button
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            cartItems = cartItems.filter(item => item.id !== id);
            renderCart();
        });
    });

    // Like button
    document.querySelectorAll('.heart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = cartItems.find(item => item.id === id);
            item.liked = !item.liked;
            renderCart();
        });
    });
}

// Initial render
renderCart();
