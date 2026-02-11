document.addEventListener('click', e => {
    const wa = e.target.closest('.whatsapp-float, .btn-whatsapp');

    if (!wa) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: 'whatsapp_click',
        location: window.location.pathname
    });

});