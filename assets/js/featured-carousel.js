const track = document.getElementById('recommended');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const newsTrack = document.getElementById('news');
const prevBtnNews = document.getElementById('prevBtnNew');
const nextBtnNews = document.getElementById('nextBtnNew');


let position = 0;

/* Cargar productos destacados */
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


        const news = products.filter(p => p.recommended).slice(0, 6);
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

        //////// Brands
        // const news = products.filter(p => p.new).slice(0, 6);
        // news.forEach(p => {
        //     const div = document.createElement('div');
        //     const img = p.images[0] || 'https://via.placeholder.com/400x300';
        //     div.className = 'product';
        //     div.innerHTML = `
        //         <img src="${img}">
        //         <div class="product-info">
        //             <h3>${p.name}</h3>
        //             <p>${p.description}</p>
        //         </div>`;
        //     div.onclick = () => location.href = `producto.html?id=${p.id}`;
        //     track.appendChild(div);
        // });
    });

/* Movimiento */
nextBtn.addEventListener('click', () => move(-1));
prevBtn.addEventListener('click', () => move(1));

function move(direction) {
    const cardWidth = track.querySelector('.product').offsetWidth + 16;
    const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

    position += direction * cardWidth;

    position = Math.min(0, position);
    position = Math.max(position, -maxScroll);

    track.style.transform = `translateX(${position}px)`;
}
