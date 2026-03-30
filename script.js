const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const CART_KEY = "oneclean-cart";

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const autoplayVideos = document.querySelectorAll(".autoplay-once");

if (autoplayVideos.length > 0) {
  const videoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.boundingClientRect.top > window.innerHeight) {
          return;
        }

        const video = entry.target;
        video.muted = true;
        video.defaultMuted = true;
        video.play().catch(() => {
          // Browsers may still block playback in some cases.
        });

        observer.unobserve(video);
      });
    },
    { threshold: 0 }
  );

  autoplayVideos.forEach((video) => {
    videoObserver.observe(video);
  });
}

function loadCart() {
  try {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

function cartItemCount(cart) {
  return cart.reduce((total, item) => total + Number(item.quantity), 0);
}

function updateCartCount() {
  const cart = loadCart();
  const count = cartItemCount(cart);
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(count);
  });
}

function addToCart(item) {
  const cart = loadCart();
  const existingItem = cart.find(
    (cartItem) =>
      cartItem.productBase === item.productBase &&
      cartItem.option === item.option
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  updateCartCount();
}

document.querySelectorAll(".add-to-cart-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const optionField = form.querySelector('select[name="option"]');
    const quantityField = form.querySelector('input[name="quantity"]');
    const feedback = form.querySelector(".shop-feedback");
    const selectedOption = optionField.options[optionField.selectedIndex];
    const quantity = Math.max(1, Number(quantityField.value) || 1);

    addToCart({
      productBase: form.dataset.productBase,
      category: form.dataset.category,
      option: selectedOption.value,
      price: Number(selectedOption.dataset.price),
      quantity,
    });

    if (feedback) {
      feedback.textContent = `${quantity} item(s) added to cart.`;
    }
  });
});

function renderCart() {
  const cartRoot = document.querySelector("[data-cart-view]");

  if (!cartRoot) return;

  const cart = loadCart();
  const cartItemsContainer = document.querySelector("[data-cart-items]");
  const emptyState = document.querySelector("[data-cart-empty]");
  const itemsTotalNode = document.querySelector("[data-cart-items-total]");
  const grandTotalNode = document.querySelector("[data-cart-grand-total]");
  const clearCartButton = document.querySelector("[data-clear-cart]");
  const checkoutForm = document.querySelector("[data-checkout-form]");

  function refreshCartDisplay() {
    const nextCart = loadCart();
    const totalItems = cartItemCount(nextCart);
    const grandTotal = nextCart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    if (emptyState) {
      emptyState.style.display = nextCart.length === 0 ? "block" : "none";
    }

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";

      nextCart.forEach((item, index) => {
        const row = document.createElement("article");
        row.className = "cart-item";
        row.innerHTML = `
          <div class="cart-item-header">
            <div>
              <h3>${item.productBase}</h3>
              <p class="cart-item-meta">${item.category} · ${item.option}</p>
            </div>
            <p class="cart-item-total">${formatPrice(item.price * item.quantity)}</p>
          </div>
          <div class="cart-item-controls">
            <label class="checkout-label" for="cart-quantity-${index}">Qty</label>
            <input
              class="cart-quantity-input"
              id="cart-quantity-${index}"
              type="number"
              min="1"
              max="12"
              value="${item.quantity}"
              data-cart-quantity="${index}"
            />
            <button class="text-button" type="button" data-remove-item="${index}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(row);
      });
    }

    if (itemsTotalNode) itemsTotalNode.textContent = String(totalItems);
    if (grandTotalNode) grandTotalNode.textContent = formatPrice(grandTotal);

    document.querySelectorAll("[data-cart-quantity]").forEach((input) => {
      input.addEventListener("change", () => {
        const updatedCart = loadCart();
        const itemIndex = Number(input.dataset.cartQuantity);
        updatedCart[itemIndex].quantity = Math.max(1, Number(input.value) || 1);
        saveCart(updatedCart);
        updateCartCount();
        refreshCartDisplay();
      });
    });

    document.querySelectorAll("[data-remove-item]").forEach((button) => {
      button.addEventListener("click", () => {
        const updatedCart = loadCart().filter(
          (_, index) => index !== Number(button.dataset.removeItem)
        );
        saveCart(updatedCart);
        updateCartCount();
        refreshCartDisplay();
      });
    });
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      saveCart([]);
      updateCartCount();
      refreshCartDisplay();
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const currentCart = loadCart();
      if (currentCart.length === 0) return;

      const formData = new FormData(checkoutForm);
      const customerName = formData.get("customerName") || "";
      const customerEmail = formData.get("customerEmail") || "";
      const orderNotes = formData.get("orderNotes") || "";
      const orderLines = currentCart
        .map(
          (item) =>
            `- ${item.productBase} / ${item.option} x${item.quantity} = ${formatPrice(
              item.price * item.quantity
            )}`
        )
        .join("\n");
      const total = currentCart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      );

      const subject = encodeURIComponent("OneClean Order Request");
      const body = encodeURIComponent([
        `Name: ${customerName}`,
        `Email: ${customerEmail}`,
        "",
        "Order:",
        orderLines,
        "",
        `Estimated Total: ${formatPrice(total)}`,
        "",
        `Notes: ${orderNotes}`,
      ]
        .join("\n"));

      window.location.href = `mailto:onecleanyou@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  refreshCartDisplay();
}

updateCartCount();
renderCart();
