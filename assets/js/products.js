/* ================================
   PARAMETROS DE URL
================================ */
const params = new URLSearchParams(location.search);
const sub = params.get('sub');        // categoría
const search = params.get('search');  // búsqueda global

/* ================================
   ELEMENTOS DEL DOM
================================ */
const title = document.getElementById('category-title');
const grid = document.getElementById('products');
const sortSelect = document.getElementById('sort');

/* ================================
   ESTADO
================================ */
let allProducts = [];
let currentProducts = [];

/* ================================
   BANNER DE CATEGORÍA / BÚSQUEDA
================================ */
if (search) {
  title.textContent = `Resultados para: "${search}"`;
} else if (sub) {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {
      const found = categories.find(c => c.id === sub);
      if (found) {
        title.textContent = found.name;
      }
    });
}

/* ================================
   CARGA DE PRODUCTOS
================================ */
fetch('data/products.json')
  .then(res => res.json())
  .then(products => {

    if (search) {
      allProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    } else if (sub) {
      allProducts = products.filter(p => p.category === sub);
    } else {
      allProducts = products;
    }

    currentProducts = [...allProducts];
    render(currentProducts);
  });

/* ================================
   RENDER DE PRODUCTOS
================================ */
function render(list) {
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <p style="text-align:center;width:100%">
        No se encontraron productos
      </p>`;
    return;
  }

  list.forEach(p => {
    const div = document.createElement('div');
    const img = p.images[0] || 'https://via.placeholder.com/400x300';
    div.className = 'product';
    div.innerHTML = `
        <img src="${img}">
        <div class="product-info">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <a class="btn" href="https://wa.me/5210000000000">Comprar</a>
        </div>`;
    div.onclick = () => location.href = `producto.html?id=${p.id}`;
    grid.appendChild(div);
  });
}

/* ================================
   ORDEN A–Z / Z–A
================================ */
if (sortSelect) {
  sortSelect.addEventListener('change', e => {
    const order = e.target.value;

    currentProducts.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    render(currentProducts);
  });
}
