document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. INTERACTIVE MAP SECTION (Runs ONLY on Contact Page)
    // ==========================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Map initializes safely only if the container exists
        const map = L.map('map').setView([-26.1611, 28.3283], 15); 

        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>'
        }).addTo(map);

        L.marker([-26.1611, 28.3283]).addTo(map)
            .bindPopup('<b>Khumalo Rental Backrooms</b><br>115 Main Road, Rynfield, Benoni.')
            .openPopup();
            
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
    }

    // ==========================================
    // 2. LIGHTBOX GALLERY SECTION (Runs ONLY on Gallery Page)
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const thumbnails = document.querySelectorAll('.gallery-thumb');

    // Only set up the loops if the gallery lightbox markup is found on the page
    if (lightbox && thumbnails.length > 0) {
        
        // Loop through and listen for image click actions
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                lightboxImg.src = thumb.src;
               lightbox.style.setProperty('display', 'flex', 'important');
            });
        });

        // Click handler to shut off popup overlay via (X) symbol
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

        // Click handler to shut off popup overlay if clicking dark background empty space
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
