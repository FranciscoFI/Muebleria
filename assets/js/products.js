/* ================================
   PARAMETROS DE URL
================================ */
const params = new URLSearchParams(location.search);
const cat = params.get('cat');        // categoría
const sub = params.get('sub');        // subcategoría
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
} else if (cat) {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {
      const found = categories.find(c => c.id === cat);
      if (found) {
        title.textContent = found.name;
      }
    });
} else if (sub) {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {

      let foundSub = null;

      categories.forEach(c => {
        const match = c.subcategories?.find(s => s.id === sub);
        if (match) {
          foundSub = match;
        }
      });

      if (foundSub) {
        title.textContent = `${foundSub.name}`;
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
    } else if (cat) {
      allProducts = products.filter(p => p.category === cat);
    } else if (sub) {
      allProducts = products.filter(p => p.subcategory === sub);
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
