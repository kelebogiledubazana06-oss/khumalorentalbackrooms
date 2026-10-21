document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. INTERACTIVE MAP SECTION 
    // ==========================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        
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
    // 2. LIGHTBOX GALLERY SECTION 
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const thumbnails = document.querySelectorAll('.gallery-thumb');

    
    if (lightbox && thumbnails.length > 0) {
        
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                lightboxImg.src = thumb.src;
               lightbox.style.setProperty('display', 'flex', 'important');
            });
        });

        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

       
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
