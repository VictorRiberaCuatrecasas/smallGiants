const products = [
  { id: 1, title: "Merino Crew", category: "Tops", price: 89, color: "Navy", inStock: true },
  { id: 2, title: "Cargo Pants", category: "Bottoms", price: 129, color: "Khaki", inStock: true },
  { id: 3, title: "Linen Shirt", category: "Tops", price: 75, color: "White", inStock: false },
  { id: 4, title: "Track Jacket", category: "Outerwear", price: 159, color: "Olive", inStock: true },
  { id: 5, title: "Swim Shorts", category: "Bottoms", price: 55, color: "Navy", inStock: true },
  { id: 6, title: "Puffer Vest", category: "Outerwear", price: 199, color: "Black", inStock: false },
  { id: 7, title: "Henley Tee", category: "Tops", price: 49, color: "White", inStock: true },
  { id: 8, title: "Chino Shorts", category: "Bottoms", price: 69, color: "Khaki", inStock: true }
];

const categories = ["All", ...new Set(products.map((product) => product.category))];
const maxPrice = Math.max(...products.map((product) => product.price));
const minPrice = Math.min(...products.map((product) => product.price));
const defaults = { category: "All", maxPrice, inStock: false, sort: "default" };

const state = readStateFromUrl();
const refs = {
  category: document.getElementById("category"),
  maxPrice: document.getElementById("max-price"),
  priceValue: document.getElementById("price-value"),
  stock: document.getElementById("stock"),
  sort: document.getElementById("sort"),
  count: document.getElementById("count"),
  grid: document.getElementById("grid")
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function readStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const parsedMaxPrice = Number(params.get("maxPrice"));
  const sort = params.get("sort");

  return {
    category: categories.includes(category) ? category : defaults.category,
    maxPrice: Number.isFinite(parsedMaxPrice) ? Math.min(Math.max(parsedMaxPrice, minPrice), maxPrice) : defaults.maxPrice,
    inStock: params.get("inStock") === "true",
    sort: ["default", "price-asc", "price-desc", "title-asc"].includes(sort) ? sort : defaults.sort
  };
}

function populateControls() {
  refs.category.innerHTML = categories.map((category) => `
    <option value="${category}">${category === "All" ? "All categories" : category}</option>
  `).join("");

  refs.maxPrice.min = String(minPrice);
  refs.maxPrice.max = String(maxPrice);
  refs.maxPrice.step = "1";

  syncInputs();

  refs.category.addEventListener("change", () => setState({ category: refs.category.value }));
  refs.maxPrice.addEventListener("input", () => setState({ maxPrice: Number(refs.maxPrice.value) }));
  refs.stock.addEventListener("change", () => setState({ inStock: refs.stock.checked }));
  refs.sort.addEventListener("change", () => setState({ sort: refs.sort.value }));
}

function syncInputs() {
  refs.category.value = state.category;
  refs.maxPrice.value = String(state.maxPrice);
  refs.priceValue.textContent = formatPrice(state.maxPrice);
  refs.stock.checked = state.inStock;
  refs.sort.value = state.sort;
}

function setState(patch) {
  Object.assign(state, patch);
  syncInputs();
  syncUrl();
  render();
}

function syncUrl() {
  const params = new URLSearchParams();

  if (state.category !== defaults.category) {
    params.set("category", state.category);
  }

  if (state.maxPrice !== defaults.maxPrice) {
    params.set("maxPrice", String(state.maxPrice));
  }

  if (state.inStock) {
    params.set("inStock", "true");
  }

  if (state.sort !== defaults.sort) {
    params.set("sort", state.sort);
  }

  const query = params.toString();
  window.history.replaceState({}, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
}

function getVisibleProducts() {
  const filtered = products.filter((product) => {
    const categoryMatch = state.category === "All" || product.category === state.category;
    const priceMatch = product.price <= state.maxPrice;
    const stockMatch = !state.inStock || product.inStock;

    return categoryMatch && priceMatch && stockMatch;
  });

  const sorted = [...filtered];

  switch (state.sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return sorted;
}

function renderProducts(list) {
  if (!list.length) {
    refs.grid.innerHTML = `
      <div class="empty">
        <p>No products match the current filters.</p>
        <p>Try widening the price or removing one filter.</p>
      </div>
    `;
    return;
  }

  refs.grid.innerHTML = list.map((product) => `
    <article class="card ${product.inStock ? "card--in" : "card--out"}">
      <div class="card__media">
        <div class="card__placeholder" aria-hidden="true"></div>
      </div>
      <div class="card__body">
        <p class="card__eyebrow">${product.category}</p>
        <h3>${product.title}</h3>
        <p class="card__meta">${product.color}</p>
      </div>
      <div class="card__footer">
        <span class="card__price">${formatPrice(product.price)}</span>
        <span class="stock ${product.inStock ? "stock--in" : "stock--out"}">${product.inStock ? "In stock" : "Sold out"}</span>
      </div>
    </article>
  `).join("");
}

function render() {
  const list = getVisibleProducts();
  refs.count.textContent = `Showing ${list.length} of ${products.length} products`;
  renderProducts(list);
}

populateControls();
syncUrl();
render();
