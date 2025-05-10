let qty = 1;
const basePrice = 249.0;

function updateQty(change) {
  qty += change;
  if (qty < 1) qty = 1;
  document.getElementById("qty").textContent = qty;
  document.getElementById("price").textContent = (basePrice * qty).toFixed(2);
}

function changeImage(thumb) {
  const main = document.getElementById("main-img");
  main.src = thumb.src;
}

let cart = [];

function toggleCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("drawerOverlay");
  drawer.classList.toggle("open");
  overlay.classList.toggle("show");
}

function addToCart(
  productName = "Helio Pet Device",
  price = 249,
  imageUrl = "https://i.ibb.co/2M8Q2Ct/helio.png"
) {
  const existing = cart.find((item) => item.name === productName);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: productName, price: price, qty: 1, image: imageUrl });
  }

  updateCartDisplay();
  toggleCartDrawer();
}

function updateCartDisplay() {
  const drawerContent = document.getElementById("drawerContent");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  drawerContent.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
  <div class="cart-item">
    <div class="item-left">
      <img src="../asstes/CRV_9601 2.png" alt="${item.name}" class="cart-img" />
    </div>
    <div class="item-center">
      <p class="item-name">${item.name}</p>
      <p class="item-price-small">$${item.price.toFixed(2)}</p>
      <p class="item-detail">Color: MidnightBlue</p>
      <p class="item-detail">Size: S</p>
      <div class="qty-box">
        <button onclick="changeQty(${index}, -1)">−</button>
        <input type="text" value="${item.qty}" readonly>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
    </div>
    <div class="item-right">
      <p class="item-total">$${(item.price * item.qty).toFixed(2)}</p>
      <button class="delete-btn" onclick="removeItem(${index})">
        🗑️
      </button>
    </div>
  </div>
`;

    drawerContent.appendChild(itemDiv);

    total += item.price * item.qty;
    count += item.qty;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;
}
// quantity functionality here

function changeQty(index, delta) {
  const newQty = cart[index].qty + delta;

  if (newQty < 1) {
    alert("Quantity can't be less than 1.");
    return;
  }

  if (newQty > 10) {
    alert("You can't add more than 10 items.");
    return;
  }

  cart[index].qty = newQty;
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

document.querySelector(".add-to-cart").addEventListener("click", () => {
  addToCart();
});

// navbar hamburger

const hamburgerBtn = document.querySelector(".navbar-toggle");
const mobileOverlay = document.getElementById("mobileNavOverlay");
const closeBtn = document.getElementById("mobileCloseBtn");

if (hamburgerBtn && mobileOverlay && closeBtn) {
  hamburgerBtn.addEventListener("click", () => {
    mobileOverlay.classList.add("show-mobile-nav");
  });

  closeBtn.addEventListener("click", () => {
    mobileOverlay.classList.remove("show-mobile-nav");
  });
}
