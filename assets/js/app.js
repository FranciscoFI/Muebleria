// fetch('partials/header.html').then(r => r.text()).then(t => document.getElementById('header').innerHTML = t);
// fetch('partials/footer.html').then(r => r.text()).then(t => document.getElementById('footer').innerHTML = t);


fetch('data/products.json')
    .then(r => r.json())
    .then(products => {
        const grid = document.getElementById('recommended');
        products.filter(p => p.recommended).forEach(p => {
            const div = document.createElement('div');
            const img = p.images[0] || 'https://via.placeholder.com/400x300';
            div.className = 'product';
            div.innerHTML = `<img src="${img}"><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p>
                </div>`;
            div.onclick = () => {
                window.dataLayer = window.dataLayer || [];

                window.dataLayer.push({
                    event: 'product_click',
                    product_id: p.id,
                    product_name: p.name,
                    category: p.category
                });

                location.href = `producto.html?id=${p.id}`;
            };
            grid.appendChild(div);
        });
    });

document.addEventListener('click', e => {
    const wa = e.target.closest('.whatsapp-float, .btn-whatsapp');

    if (!wa) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: 'whatsapp_click',
        location: window.location.pathname
    });

});