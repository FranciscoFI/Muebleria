fetch('partials/header.html').then(r => r.text()).then(t => document.getElementById('header').innerHTML = t);
// fetch('partials/footer.html').then(r => r.text()).then(t => document.getElementById('footer').innerHTML = t);


fetch('data/products.json')
    .then(r => r.json())
    .then(products => {
        const grid = document.getElementById('recommended');
        products.filter(p => p.recommended).forEach(p => {
            const div = document.createElement('div');
            const img = p.images[0] || 'https://via.placeholder.com/400x300';
            div.className = 'product';
            div.innerHTML = `<img src="${img}"><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><a class="btn" href="https://wa.me/5210000000000">Comprar</a>
                </div>`;
            div.onclick = () => location.href = `producto.html?id=${p.id}`;
            grid.appendChild(div);
        });
    });