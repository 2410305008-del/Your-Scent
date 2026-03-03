/* ============================================
   YOUR SCENT — Global JavaScript
   ============================================ */

// ── Image Paths ──────────────────────────────
const IMG_BASE = 'images/';

// ── Product Data ─────────────────────────────
const products = [
  {
    id: 1,
    name: 'Rose Bloom',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2499,
    originalPrice: 3200,
    desc: 'A bouquet of fresh roses with hints of peony and white musk.',
    badge: 'Bestseller',
    badgeClass: 'badge-new',
    stars: 4.9,
    reviews: 312,
    bestseller: true,
    img: IMG_BASE + 'perfume-rose.png',
    size: '50ml',
    notes: 'Rose, Peony, Musk'
  },
  {
    id: 2,
    name: 'Lavender Dreams',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2199,
    originalPrice: 2800,
    desc: 'Soft lavender and violet with a warm vanilla base note.',
    badge: 'New',
    badgeClass: 'badge-fave',
    stars: 4.8,
    reviews: 198,
    bestseller: true,
    img: IMG_BASE + 'perfume-lavender.png',
    size: '50ml',
    notes: 'Lavender, Violet, Vanilla'
  },
  {
    id: 3,
    name: 'Jasmine Noir',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2699,
    originalPrice: 3400,
    desc: 'Intoxicating jasmine petals layered with sandalwood and amber.',
    badge: 'Hot',
    badgeClass: 'badge-hot',
    stars: 4.7,
    reviews: 145,
    bestseller: false,
    img: IMG_BASE + 'perfume-jasmine.png',
    size: '50ml',
    notes: 'Jasmine, Sandalwood, Amber'
  },
  {
    id: 4,
    name: 'Citrus Glow',
    category: 'fresh',
    categoryLabel: 'Fresh Citrus',
    price: 1999,
    originalPrice: 2600,
    desc: 'Zesty lemon and orange blossom for a vibrant, uplifting aura.',
    badge: 'Sale',
    badgeClass: 'badge-sale',
    stars: 4.9,
    reviews: 276,
    bestseller: true,
    img: IMG_BASE + 'perfume-citrus.png',
    size: '50ml',
    notes: 'Lemon, Orange Blossom, Green Tea'
  },
  {
    id: 5,
    name: 'Lemonade Fizz',
    category: 'fresh',
    categoryLabel: 'Fresh Citrus',
    price: 1799,
    originalPrice: 2400,
    desc: 'Sparkling grapefruit and yuzu with a clean, breezy dry-down.',
    badge: 'New',
    badgeClass: 'badge-new',
    stars: 4.6,
    reviews: 89,
    bestseller: false,
    img: IMG_BASE + 'perfume-citrus.png',
    size: '30ml',
    notes: 'Grapefruit, Yuzu, White Cedar'
  },
  {
    id: 6,
    name: 'Ocean Mist',
    category: 'aquatic',
    categoryLabel: 'Aquatic',
    price: 2299,
    originalPrice: 2900,
    desc: 'Cool sea breeze and fresh driftwood for an effortless, clean scent.',
    badge: 'Bestseller',
    badgeClass: 'badge-new',
    stars: 4.8,
    reviews: 231,
    bestseller: true,
    img: IMG_BASE + 'perfume-aquatic.png',
    size: '50ml',
    notes: 'Sea Breeze, Driftwood, Musk'
  },
  {
    id: 7,
    name: 'Aqua Serenity',
    category: 'aquatic',
    categoryLabel: 'Aquatic',
    price: 2099,
    originalPrice: 2700,
    desc: 'Fresh mint and cool water notes with a soft powdery finish.',
    badge: 'Hot',
    badgeClass: 'badge-hot',
    stars: 4.7,
    reviews: 117,
    bestseller: false,
    img: IMG_BASE + 'perfume-aquatic.png',
    size: '30ml',
    notes: 'Mint, Water Lily, Powder'
  },
  {
    id: 8,
    name: 'Cherry Blossom',
    category: 'floral',
    categoryLabel: 'Floral',
    price: 2599,
    originalPrice: 3100,
    desc: 'Delicate sakura blossoms paired with lychee and soft musk.',
    badge: 'New',
    badgeClass: 'badge-new',
    stars: 4.9,
    reviews: 164,
    bestseller: false,
    img: IMG_BASE + 'perfume-rose.png',
    size: '50ml',
    notes: 'Sakura, Lychee, Soft Musk'
  }
];

// ── Cart State ────────────────────────────────
let cart = JSON.parse(localStorage.getItem('ys_cart') || '[]');

function saveCart() {
  localStorage.setItem('ys_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`🛒 ${product.name} added to your bag!`);
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
  const cartTotalEl = document.getElementById('cartTotal');
  if (cartTotalEl) cartTotalEl.textContent = '₹' + getCartTotal().toLocaleString('en-IN');
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <p>Your bag is empty</p>
        <p style="margin-top:8px;font-size:.8rem">Add some beautiful fragrances!</p>
        <a href="shop.html" class="btn-primary" style="margin-top:20px;font-size:.82rem;padding:10px 22px">Browse Perfumes</a>
      </div>`;
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img"
        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2268%22 height=%2268%22><rect fill=%22%23fce4ec%22 width=%2268%22 height=%2268%22 rx=%2210%22/><text x=%2250%25%22 y=%2255%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2228%22>🌸</text></svg>'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.categoryLabel}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">🗑️</button>
      </div>
    </div>
  `).join('');
}

// ── Wishlist ──────────────────────────────────
let wishlist = JSON.parse(localStorage.getItem('ys_wish') || '[]');
function toggleWishlist(productId, btn) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    btn.classList.remove('active');
    btn.textContent = '🤍';
    showToast('💔 Removed from wishlist');
  } else {
    wishlist.push(productId);
    btn.classList.add('active');
    btn.textContent = '❤️';
    showToast('❤️ Added to wishlist!');
  }
  localStorage.setItem('ys_wish', JSON.stringify(wishlist));
}

// ── Render Products ───────────────────────────
function renderProducts(containerId, productList, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = limit ? productList.slice(0, limit) : productList;
  if (list.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:40px">No products found.</p>';
    return;
  }
  container.innerHTML = list.map(p => `
    <div class="product-card animate-in" data-id="${p.id}">
      <div class="product-img-wrap">
        <span class="product-badge ${p.badgeClass}">${p.badge}</span>
        <img src="${p.img}" alt="${p.name}"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22260%22><rect fill=%22%23fce4ec%22 width=%22200%22 height=%22260%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2250%22>🌸</text></svg>'">
        <button class="product-wishlist ${wishlist.includes(p.id) ? 'active' : ''}"
          onclick="toggleWishlist(${p.id},this)">${wishlist.includes(p.id) ? '❤️' : '🤍'}</button>
        <div class="product-overlay">
          <button onclick="addToCart(${p.id})">Add to Bag 🛒</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryLabel}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}<span>₹${p.originalPrice.toLocaleString('en-IN')}</span></span>
          <span class="product-stars">★ ${p.stars} <em>(${p.reviews})</em></span>
        </div>
      </div>
    </div>
  `).join('');
  observeAnimations();
}

// ── Toast ─────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Cart Sidebar Open/Close ───────────────────
function openCart() {
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  renderCartItems();
  updateCartUI();
}
function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
}

// ── Checkout ─────────────────────────────────
function handleCheckout() {
  if (cart.length === 0) {
    showToast('🛍️ Your bag is empty!');
    return;
  }
  showToast('🎉 Order placed! Thank you for shopping with Your Scent.');
  cart = [];
  saveCart();
  updateCartUI();
  renderCartItems();
  closeCart();
}

// ── Scroll Animations ─────────────────────────
function observeAnimations() {
  const els = document.querySelectorAll('.animate-in:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

// ── Navbar ────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);

  document.getElementById('searchBtn')?.addEventListener('click', () => {
    const q = prompt('Search for a perfume:');
    if (q) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
  });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  updateCartUI();
  observeAnimations();
});
