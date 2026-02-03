fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {
        const menu = document.getElementById('main-menu');

        // Agrega el botón de Inicio
        const home = document.createElement('div');
        home.className = 'menu-item';
        home.innerHTML = '<a href="index.html">Inicio</a>';
        menu.appendChild(home);
        //////////////////////////////////
        categories.forEach(cat => {
            const catItem = document.createElement('div');
            catItem.className = 'menu-item';
            catItem.innerHTML = `<a href="categorias.html?sub=${cat.id}">${cat.name}</a>`;
            menu.appendChild(catItem);
        });
        //////////////////////////////////

        // Agrega Categorías con megamenu
        const catItem = document.createElement('div');
        catItem.className = 'menu-item';
        catItem.innerHTML = `<span>Categorías</span>`;

        const mega = document.createElement('div');
        mega.className = 'megamenu';

        let html = `<h4>Categorías</h4><ul>`;
        categories.forEach(cat => {
            html += `<li><span>${cat.name}</span><ul>`;
            cat.subcategories.forEach(sub => {
                html += `<li><a href="categorias.html?sub=${sub.id}">${sub.name}</a></li>`;
            });
            html += `</ul></li>`;
        });
        html += `</ul>`;
        mega.innerHTML = html;

        catItem.appendChild(mega);
        menu.appendChild(catItem);

        // Agrega Contacto fijo
        const contact = document.createElement('div');
        contact.className = 'menu-item';
        contact.innerHTML = '<a href="contacto.html">Contacto</a>';
        menu.appendChild(contact);
    });

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('main-menu');

if (toggle) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}
// item.addEventListener('click', () => {
//   if (window.innerWidth <= 768) {
//     item.classList.toggle('active');
//   }
// });

const searchInput = document.getElementById('menu-search-input');

if (searchInput) {
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
      if (value.length > 0) {
        window.location.href = `categorias.html?search=${encodeURIComponent(value)}`;
      }
    }
  });
}