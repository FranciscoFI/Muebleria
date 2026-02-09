/* ===============================
   CARGAR MENÚ DINÁMICO
=============================== */

fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {

        const menu = document.getElementById('main-menu');
        if (!menu) return;

        categories.forEach(cat => {

            const catItem = document.createElement('div');
            catItem.className = 'menu-item';

            const catLink = document.createElement('a');
            catLink.href = `categorias.html?cat=${cat.id}`;
            catLink.textContent = cat.name;

            catItem.appendChild(catLink);

            /* ===== SUBCATEGORÍAS ===== */

            if (cat.subcategories && cat.subcategories.length > 0) {

                // icono + para mobile
                const icon = document.createElement('span');
                icon.className = 'menu-toggle-icon';
                icon.textContent = '+';
                catLink.appendChild(icon);

                const mega = document.createElement('div');
                mega.className = 'megamenu';

                const ul = document.createElement('ul');

                cat.subcategories.forEach(sub => {

                    const li = document.createElement('li');
                    const subLink = document.createElement('a');

                    subLink.href = `categorias.html?sub=${sub.id}`;
                    subLink.textContent = sub.name;

                    // tracking
                    subLink.dataset.category = cat.id;
                    subLink.dataset.subcategory = sub.id;

                    li.appendChild(subLink);
                    ul.appendChild(li);
                });

                mega.appendChild(ul);
                catItem.appendChild(mega);
            }

            menu.appendChild(catItem);
        });

        activarAcordeonMobile();

    });


/* ===============================
   ACORDEÓN MOBILE
=============================== */

function activarAcordeonMobile() {

    document.querySelectorAll('.menu-item').forEach(item => {

        const mainLink = item.querySelector(':scope > a');

        if (!mainLink) return;

        mainLink.addEventListener('click', e => {

            if (window.innerWidth > 768) return;

            const mega = item.querySelector('.megamenu');
            if (!mega) return;

            e.preventDefault();

            // cerrar otros abiertos
            document.querySelectorAll('.menu-item.active')
                .forEach(open => {
                    if (open !== item) {
                        open.classList.remove('active');

                        const icon = open.querySelector('.menu-toggle-icon');
                        if (icon) icon.textContent = '+';
                    }
                });

            item.classList.toggle('active');

            const icon = item.querySelector('.menu-toggle-icon');
            if (icon) {
                icon.textContent =
                    item.classList.contains('active') ? '–' : '+';
            }

        });

    });

}



/* ===============================
   MENÚ HAMBURGUESA
=============================== */

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('main-menu');

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}


/* ===============================
   BÚSQUEDA GLOBAL
=============================== */

const searchInput = document.getElementById('menu-search-input');

if (searchInput) {
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            const value = e.target.value.trim();
            if (value.length > 0) {
                window.location.href =
                    `categorias.html?search=${encodeURIComponent(value)}`;
            }
        }
    });
}


/* ===============================
   TRACKING GTM
=============================== */

document.addEventListener('click', function (e) {

    const link = e.target.closest('a[data-category][data-subcategory]');
    if (!link) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: 'category_click',
        category: link.dataset.category,
        subcategory: link.dataset.subcategory,
        page_url: window.location.href
    });

});
