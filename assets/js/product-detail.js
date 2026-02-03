const id = new URLSearchParams(location.search).get('id');

const gallery = document.getElementById('product-gallery');
const title = document.getElementById('product-title');
const price = document.getElementById('product-price');
const desc = document.getElementById('product-description');
const whatsappBtn = document.getElementById('whatsapp-btn');
const relatedGrid = document.getElementById('related-grid');
const specsList = document.getElementById('product-specs');
const colorsWrap = document.getElementById('product-colors');

let currentProduct = null;

/* Cargar datos */
fetch('data/products.json')
    .then(res => res.json())
    .then(products => {

        currentProduct = products.find(p => p.id === id);

        if (!currentProduct) {
            gallery.innerHTML = "<p>Producto no encontrado</p>";
            return;
        }

        /* Título y descripción */
        title.textContent = currentProduct.name;
        desc.textContent = currentProduct.description || '';

        /* Precio */
        if (currentProduct.price) {
            price.textContent = `$ ${currentProduct.price}`;
        }

        /* Galería de imágenes */
        gallery.innerHTML = '';
        currentProduct.images.forEach(img => {
            const i = document.createElement('img');
            i.src = img;
            gallery.appendChild(i);
        });

        /* Especificaciones */
        specsList.innerHTML = ''
        if (currentProduct.specs) {
            if (currentProduct.specs.ancho) {
                specsList.innerHTML += `<li><strong>Ancho:</strong> ${currentProduct.specs.ancho} cm</li>`;
            }
            if (currentProduct.specs.altura) {
                specsList.innerHTML += `<li><strong>Altura:</strong> ${currentProduct.specs.altura} cm</li>`;
            }
            if (currentProduct.specs.largo) {
                specsList.innerHTML += `<li><strong>Largo:</strong> ${currentProduct.specs.largo} cm</li>`;
            }
        // specsList.innerHTML = `
        //     <li><strong>Ancho:</strong> ${currentProduct.specs.ancho} cm</li>
        //     <li><strong>Altura:</strong> ${currentProduct.specs.altura} cm</li>
        //     <li><strong>Largo:</strong> ${currentProduct.specs.largo} cm</li>
        // `;
        }


        /* Colores */
        if (currentProduct.colors) {
            colorsWrap.innerHTML = '<p><strong>Colores disponibles:</strong></p>';

            currentProduct.colors.forEach(c => {
                const swatch = document.createElement('span');
                swatch.className = 'color-swatch';
                swatch.title = c.name;
                swatch.style.backgroundColor = c.hex;
                colorsWrap.appendChild(swatch);
            });
        }

        /* WhatsApp dinámico */
        const message = encodeURIComponent(
            `Hola! Estoy interesado en el producto *${currentProduct.name}*. ¿Está disponible?`
        );
        whatsappBtn.href = `https://wa.me/5210000000000?text=${message}`;

        /* Productos relacionados */
        const related = products.filter(
            p => p.category === currentProduct.category && p.id !== id
        );

        relatedGrid.innerHTML = '';
        related.forEach(p => {
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
            relatedGrid.appendChild(div);
        });

    });
