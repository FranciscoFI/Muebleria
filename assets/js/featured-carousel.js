/* ===============================
   CREAR CARRUSEL REUTILIZABLE
=============================== */

function createCarousel(track, prevBtn, nextBtn) {

    let position = 0;

    function updateArrows() {
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

        prevBtn.style.visibility = position === 0 ? 'hidden' : 'visible';

        nextBtn.style.visibility =
            Math.abs(position) >= maxScroll ? 'hidden' : 'visible';
    }

    function move(direction) {

        const card = track.querySelector('.product');
        if (!card) return;

        const cardWidth = card.offsetWidth + 16;
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

        position += direction * cardWidth;

        position = Math.min(0, position);
        position = Math.max(position, -maxScroll);

        track.style.transform = `translateX(${position}px)`;

        updateArrows();
    }

    prevBtn.addEventListener('click', () => move(1));
    nextBtn.addEventListener('click', () => move(-1));

    // inicializar flechas
    setTimeout(updateArrows, 100);

    return { move };
}


/* ===============================
   REFERENCIAS
=============================== */

const track = document.getElementById('recommended');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const newsTrack = document.getElementById('news');
const prevBtnNews = document.getElementById('prevBtnNew');
const nextBtnNews = document.getElementById('nextBtnNew');


/* ===============================
   CARGAR PRODUCTOS
=============================== */

fetch('data/products.json')
    .then(res => res.json())
    .then(products => {

        const featured = products.filter(p => p.recommended).slice(0, 6);

        featured.forEach(p => {
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
            track.appendChild(div);
        });


        const news = products.filter(p => p.new).slice(0, 6);

        news.forEach(p => {
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
            newsTrack.appendChild(div);
        });


        /* ===============================
           INICIALIZAR CARRUSELES
        =============================== */

        createCarousel(track, prevBtn, nextBtn);
        createCarousel(newsTrack, prevBtnNews, nextBtnNews);

    });
