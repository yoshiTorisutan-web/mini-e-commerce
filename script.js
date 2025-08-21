// ==== DATA ====
const products = [
  {
    id: 1,
    name: "T-shirt noir Premium",
    price: 19.99,
    category: "Vêtements",
    rating: 4.5,
    popularity: 92,
    isNew: true,
    isPromo: false,
    discount: 0,
    createdAt: "2025-08-01",
    image: "/assets/T-shirt_noir_premium.jpg",
  },
  {
    id: 2,
    name: "Casque Bluetooth Pro",
    price: 79.9,
    category: "Électronique",
    rating: 4.7,
    popularity: 98,
    isNew: true,
    isPromo: true,
    discount: 15,
    createdAt: "2025-07-20",
    image: "/assets/Casque_bluetooth_pro.jpg",
  },
  {
    id: 3,
    name: "Mug céramique design",
    price: 12.5,
    category: "Maison",
    rating: 4.2,
    popularity: 70,
    isNew: false,
    isPromo: false,
    discount: 0,
    createdAt: "2025-05-12",
    image: "/assets/Mug_ceramique_design.jpg",
  },
  {
    id: 4,
    name: "Sweat à capuche Unisexe",
    price: 34.9,
    category: "Vêtements",
    rating: 4.6,
    popularity: 85,
    isNew: false,
    isPromo: true,
    discount: 20,
    createdAt: "2025-06-02",
    image: "/assets/Sweat_a_capuche_unisexe.png",
  },
  {
    id: 5,
    name: "Lampe de bureau LED",
    price: 29.99,
    category: "Maison",
    rating: 4.1,
    popularity: 64,
    isNew: false,
    isPromo: false,
    discount: 0,
    createdAt: "2025-02-10",
    image: "/assets/Lampe_de_bureau_LED.jpg",
  },
  {
    id: 6,
    name: "Montre connectée Sport",
    price: 99.0,
    category: "Électronique",
    rating: 4.4,
    popularity: 90,
    isNew: true,
    isPromo: false,
    discount: 0,
    createdAt: "2025-08-05",
    image: "/assets/Montre_connectee_sport.jpg",
  },
  {
    id: 7,
    name: "Chaussures running Air",
    price: 59.0,
    category: "Vêtements",
    rating: 4.3,
    popularity: 76,
    isNew: false,
    isPromo: true,
    discount: 10,
    createdAt: "2025-03-29",
    image: "/assets/Chaussures_running_air.jpg",
  },
  {
    id: 8,
    name: "Enceinte portable",
    price: 39.99,
    category: "Électronique",
    rating: 4.0,
    popularity: 73,
    isNew: false,
    isPromo: false,
    discount: 0,
    createdAt: "2025-04-14",
    image: "/assets/Enceinte_portable.jpg",
  },
  {
    id: 9,
    name: "Housse de coussin",
    price: 14.9,
    category: "Maison",
    rating: 4.1,
    popularity: 58,
    isNew: true,
    isPromo: false,
    discount: 0,
    createdAt: "2025-07-30",
    image: "/assets/Housse_de_coussin.jpg",
  },
  {
    id: 10,
    name: "Sac à dos urbain",
    price: 44.9,
    category: "Accessoires",
    rating: 4.5,
    popularity: 82,
    isNew: true,
    isPromo: true,
    discount: 25,
    createdAt: "2025-06-25",
    image: "/assets/Sac_a_dos_urbain.jpg",
  },
  {
    id: 11,
    name: "Bouteille isotherme",
    price: 24.0,
    category: "Accessoires",
    rating: 4.2,
    popularity: 60,
    isNew: false,
    isPromo: false,
    discount: 0,
    createdAt: "2025-01-18",
    image: "/assets/Bouteille_isotherme.jpg",
  },
  {
    id: 12,
    name: "Tapis décoratif",
    price: 69.0,
    category: "Maison",
    rating: 4.6,
    popularity: 88,
    isNew: false,
    isPromo: true,
    discount: 30,
    createdAt: "2025-05-22",
    image: "/assets/Tapis_décoratif.jpg",
  },
];

// ==== STATE ====
const els = {
  products: document.getElementById("products"),
  resultCount: document.getElementById("result-count"),
  search: document.getElementById("search"),
  category: document.getElementById("category"),
  priceMin: document.getElementById("priceMin"),
  priceMax: document.getElementById("priceMax"),
  filterNew: document.getElementById("filterNew"),
  filterPromo: document.getElementById("filterPromo"),
  sort: document.getElementById("sort"),
  year: document.getElementById("year"),
  cartBtn: document.getElementById("cart-button"),
  cartCount: document.getElementById("cart-count"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartOverlay: document.getElementById("cart-overlay"),
  cartPanel: document.getElementById("cart-panel"),
  cartClose: document.getElementById("cart-close"),
  cartItems: document.getElementById("cart-items"),
  subtotal: document.getElementById("subtotal"),
  cartTotal: document.getElementById("cart-total"),
  catLinks: document.querySelectorAll(".cat-link"),
};

const state = {
  filters: {
    q: "",
    category: "all",
    priceMin: 0,
    priceMax: Infinity,
    onlyNew: false,
    onlyPromo: false,
  },
  sort: "relevance",
  cart: [], // {id, qty}
};

// Utilities
const formatEUR = (n) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const parsePrice = (v) => (isNaN(parseFloat(v)) ? undefined : parseFloat(v));

// Init price bounds
const minPrice = Math.min(
  ...products.map((p) =>
    p.isPromo ? p.price * (1 - p.discount / 100) : p.price
  )
);
const maxPrice = Math.max(...products.map((p) => p.price));
els.priceMin.placeholder = Math.floor(minPrice).toString();
els.priceMax.placeholder = Math.ceil(maxPrice).toString();

// Render stars
function stars(r) {
  const full = Math.floor(r),
    half = r - full >= 0.5;
  let out = "";
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      out += `<svg class="w-4 h-4 inline text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else if (i === full && half) {
      out += `<svg class="w-4 h-4 inline text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="g"><stop offset="50%"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.164L12 18.896 4.666 23.16l1.4-8.164L.132 9.21l8.2-1.192L12 .587z"/></svg>`;
    } else {
      out += `<svg class="w-4 h-4 inline text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
  }
  return out;
}

// ==== RENDER PRODUCTS ====
function applyFilters(list) {
  const f = state.filters;
  return list.filter((p) => {
    const q = f.q ? p.name.toLowerCase().includes(f.q) : true;
    const cat = f.category === "all" ? true : p.category === f.category;
    const effPrice = p.isPromo ? p.price * (1 - p.discount / 100) : p.price;
    const min = f.priceMin !== undefined ? effPrice >= f.priceMin : true;
    const max = f.priceMax !== undefined ? effPrice <= f.priceMax : true;
    const onlyNew = f.onlyNew ? p.isNew : true;
    const onlyPromo = f.onlyPromo ? p.isPromo : true;
    return q && cat && min && max && onlyNew && onlyPromo;
  });
}

function applySort(list) {
  const s = state.sort;
  const arr = [...list];
  switch (s) {
    case "priceAsc":
      arr.sort(
        (a, b) =>
          (a.isPromo ? a.price * (1 - a.discount / 100) : a.price) -
          (b.isPromo ? b.price * (1 - b.discount / 100) : b.price)
      );
      break;
    case "priceDesc":
      arr.sort(
        (a, b) =>
          (b.isPromo ? b.price * (1 - b.discount / 100) : b.price) -
          (a.isPromo ? a.price * (1 - a.discount / 100) : a.price)
      );
      break;
    case "popularity":
      arr.sort((a, b) => b.popularity - a.popularity);
      break;
    case "newest":
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      /* relevance: popularity then newest */ arr.sort(
        (a, b) =>
          b.popularity - a.popularity ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
  }
  return arr;
}

function renderProducts() {
  const list = applySort(applyFilters(products));
  els.resultCount.textContent = list.length.toString();
  els.products.innerHTML = "";
  list.forEach((p) => {
    const eff = p.isPromo ? p.price * (1 - p.discount / 100) : p.price;
    const card = document.createElement("article");
    card.className =
      "group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col";
    card.innerHTML = `
          <div class="relative">
            <img src="${p.image}" alt="${
      p.name
    }" class="w-full h-60 object-cover object-center">
            <div class="absolute top-3 left-3 flex gap-2">
              ${
                p.isNew
                  ? '<span class="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">Nouveau</span>'
                  : ""
              }
              ${
                p.isPromo
                  ? '<span class="bg-rose-600 text-white text-xs px-2 py-1 rounded-full">-' +
                    p.discount +
                    "%</span>"
                  : ""
              }
            </div>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="font-semibold leading-snug group-hover:text-indigo-600">${
              p.name
            }</h3>
            <div class="mt-1 text-xs text-gray-500">${p.category}</div>
            <div class="mt-2">${stars(p.rating)}</div>
            <div class="mt-3 flex items-center gap-2">
              ${
                p.isPromo
                  ? `<span class="text-lg font-bold text-rose-600">${formatEUR(
                      eff
                    )}</span><span class="text-sm text-gray-400 line-through">${formatEUR(
                      p.price
                    )}</span>`
                  : `<span class="text-lg font-bold text-indigo-700">${formatEUR(
                      p.price
                    )}</span>`
              }
            </div>
            <div class="mt-auto pt-4">
              <button data-add="${
                p.id
              }" class="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700">Ajouter au panier</button>
            </div>
          </div>`;
    els.products.appendChild(card);
  });
}

// ==== CART ====
function openCart() {
  els.cartDrawer.classList.remove("hidden");
  requestAnimationFrame(() => {
    els.cartPanel.classList.remove("translate-x-full");
  });
}
function closeCart() {
  els.cartPanel.classList.add("translate-x-full");
  setTimeout(() => els.cartDrawer.classList.add("hidden"), 200);
}

function addToCart(id) {
  const item = state.cart.find((i) => i.id === id);
  if (item) item.qty++;
  else state.cart.push({ id, qty: 1 });
  updateCart();
}
function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  updateCart();
}
function setQty(id, qty) {
  const it = state.cart.find((i) => i.id === id);
  if (!it) return;
  it.qty = Math.max(1, qty);
  updateCart();
}

function updateCart() {
  els.cartItems.innerHTML = "";
  let total = 0;
  state.cart.forEach(({ id, qty }) => {
    const p = products.find((x) => x.id === id);
    const unit = p.isPromo ? p.price * (1 - p.discount / 100) : p.price;
    const line = unit * qty;
    total += line;
    const li = document.createElement("li");
    li.className = "flex items-center gap-3 border rounded-xl p-3";
    li.innerHTML = `
          <img src="${p.image}" alt="${
      p.name
    }" class="w-16 h-16 object-cover rounded-lg">
          <div class="flex-1">
            <div class="font-medium">${p.name}</div>
            <div class="text-sm text-gray-500">${formatEUR(unit)} · ${
      p.category
    }</div>
            <div class="mt-2 flex items-center gap-2">
              <button data-dec="${
                p.id
              }" class="w-8 h-8 rounded-lg border flex items-center justify-center">–</button>
              <input data-qty="${
                p.id
              }" type="number" min="1" value="${qty}" class="w-14 text-center border rounded-lg py-1">
              <button data-inc="${
                p.id
              }" class="w-8 h-8 rounded-lg border flex items-center justify-center">+</button>
            </div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div class="font-semibold">${formatEUR(line)}</div>
            <button data-remove="${
              p.id
            }" class="text-rose-600 hover:underline text-sm">Retirer</button>
          </div>`;
    els.cartItems.appendChild(li);
  });
  els.subtotal.textContent = formatEUR(total);
  els.cartTotal.textContent = formatEUR(total);
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  els.cartCount.textContent = count;
}

// ==== EVENTS ====
// Header category quick links
els.catLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.getAttribute("data-cat");
    state.filters.category = cat;
    els.category.value = cat === "all" ? "all" : cat;
    renderProducts();
    window.scrollTo({
      top: document.getElementById("catalogue").offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Filters
els.search.addEventListener("input", () => {
  state.filters.q = els.search.value.trim().toLowerCase();
  renderProducts();
});
els.category.addEventListener("change", () => {
  state.filters.category = els.category.value;
  renderProducts();
});
els.priceMin.addEventListener("input", () => {
  state.filters.priceMin = parsePrice(els.priceMin.value);
  renderProducts();
});
els.priceMax.addEventListener("input", () => {
  state.filters.priceMax = parsePrice(els.priceMax.value);
  renderProducts();
});
els.filterNew.addEventListener("change", () => {
  state.filters.onlyNew = els.filterNew.checked;
  renderProducts();
});
els.filterPromo.addEventListener("change", () => {
  state.filters.onlyPromo = els.filterPromo.checked;
  renderProducts();
});
els.sort.addEventListener("change", () => {
  state.sort = els.sort.value;
  renderProducts();
});

// Delegate Add to cart from product grid
els.products.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-add]");
  if (!btn) return;
  const id = parseInt(btn.getAttribute("data-add"), 10);
  addToCart(id);
  openCart();
});

// Cart drawer
els.cartBtn.addEventListener("click", openCart);
els.cartOverlay.addEventListener("click", closeCart);
els.cartClose.addEventListener("click", closeCart);

// Delegate cart actions
els.cartItems.addEventListener("click", (e) => {
  const dec = e.target.closest("button[data-dec]");
  const inc = e.target.closest("button[data-inc]");
  const rm = e.target.closest("button[data-remove]");
  if (dec) {
    const id = +dec.getAttribute("data-dec");
    const it = state.cart.find((i) => i.id === id);
    if (it) {
      it.qty = Math.max(1, it.qty - 1);
      updateCart();
    }
  }
  if (inc) {
    const id = +inc.getAttribute("data-inc");
    const it = state.cart.find((i) => i.id === id);
    if (it) {
      it.qty = it.qty + 1;
      updateCart();
    }
  }
  if (rm) {
    const id = +rm.getAttribute("data-remove");
    removeFromCart(id);
  }
});
els.cartItems.addEventListener("input", (e) => {
  const qtyInput = e.target.closest("input[data-qty]");
  if (qtyInput) {
    const id = +qtyInput.getAttribute("data-qty");
    setQty(id, parseInt(qtyInput.value || "1", 10));
  }
});

// Footer year
els.year.textContent = new Date().getFullYear();

// Initial render
renderProducts();
