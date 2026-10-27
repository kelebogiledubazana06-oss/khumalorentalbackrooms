document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('search-btn'); //  Matches your HTML id="search-btn"

    
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

    // added a check to ensure that the lightbox and thumbnails exist before adding event listeners
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

       //added an event listener to close the lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});


    // ==========================================
    // 3. ROOM SEARCH AND FILTER SECTION 
    // ==========================================
    const roomsData = [
      {
        title: "1 Bedroom room",
        shortTermPrice: 850,
        shortTermStatus: "available",
        longTermPrice: "R4,500 per month",
        longTermStatus: "Available Now",
        longTermColor: "green",
        includes: "King bed, Kitchenette, Free WiFi, DSTV, Parking",
        amenities: ["king bed", "kitchenette", "free wifi", "wifi", "dstv", "parking"],
        imageSrc: "images/1 Bedroom room — rental picture.png"
      },
      {
        title: "2 Bedroom room",
        shortTermPrice: 1200,
        shortTermStatus: "not-available",
        longTermPrice: "R6,500 per month",
        longTermStatus: "Not Available",
        longTermColor: "red",
        includes: "2 Bedrooms, Full Kitchen, Free WiFi, DSTV, Parking",
        amenities: ["2 bedrooms", "full kitchen", "kitchen", "free wifi", "wifi", "dstv", "parking"],
        imageSrc: "images/2 Bedroom room — rental picture.png"
      },
      {
        title: "3 Bedroom Family room",
        shortTermPrice: 1800,
        shortTermStatus: "available",
        longTermPrice: "R8,500 per month",
        longTermStatus: "Available Now",
        longTermColor: "green",
        includes: "3 Bedrooms, Full Kitchen, Free WiFi, DSTV, Parking, Laundry",
        amenities: ["3 bedrooms", "full kitchen", "kitchen", "free wifi", "wifi", "dstv", "parking", "laundry"],
        imageSrc: "images/3 Bedroom Family room — rental picture.png"
      }
    ];

    // 2. add event listeners to the search input, status filter, and price sort dropdowns
    const roomSearchInput = document.getElementById('room-search');
    const statusFilterSelect = document.getElementById('status-filter');
    const priceSortSelect = document.getElementById('price-sort');
    const searchBtn = document.getElementById('search-btn');
    const roomsDisplayContainer = document.getElementById('rooms-display-container');

    // 3. a function to render the rooms based on the filtered and sorted data
    function renderRooms(rooms) {
      roomsDisplayContainer.innerHTML = '';

      if (rooms.length === 0) {
        roomsDisplayContainer.innerHTML = `<p style="color: white; font-size: 16px; padding: 20px; background: #112233; border-radius: 6px;">No rooms found matching your active criteria.</p>`;
        return;
      }

      rooms.forEach(room => {
        const isAvailableShortTerm = room.shortTermStatus === 'available';
        
        // created a card layout for each room with inline styles for better visual presentation
        const cardHtml = `
          <div class="room-card" style="border: 1px solid #334455; padding: 20px; border-radius: 6px; background-color: #1a2a3a; color: white;">
            <h3>${room.title}</h3>
            <p><b>Short-Term:</b> R${room.shortTermPrice} per night</p>
            <p>Current Status: <strong style="color: ${isAvailableShortTerm ? 'green' : 'red'};">${isAvailableShortTerm ? 'Available Now' : 'Not Available'}</strong></p>
            <p><b>Long-Term:</b> ${room.longTermPrice}</p>
            <p>Current Status: <strong style="color: ${room.longTermColor};">${room.longTermStatus}</strong></p>
            <p><b>Includes:</b> ${room.includes}</p>
            <img src="${room.imageSrc}" width="300" height="200" alt="${room.title}" style="border-radius: 4px; margin-top: 10px; display: block; object-fit: cover;">
          </div>
        `;
        roomsDisplayContainer.insertAdjacentHTML('beforeend', cardHtml);
      });
    }

    // 4. added a function to apply filters and sorting based on user input
    function applyFilters() {
      const searchQuery = roomSearchInput.value.toLowerCase().trim();
      const statusFilter = statusFilterSelect.value;
      const priceSort = priceSortSelect.value;

      // added filtering logic to match the search query and status filter
      let filteredRooms = roomsData.filter(room => {
        const matchesStatus = (statusFilter === 'all') || (room.shortTermStatus === statusFilter);
        const matchesAmenities = searchQuery === '' || 
  room.title.toLowerCase().includes(searchQuery) ||
  room.includes.toLowerCase().includes(searchQuery);
        return matchesStatus && matchesAmenities;
      });

      // added sorting logic to sort the filtered rooms based on the selected price sort option
      if (priceSort === 'low-high') {
        filteredRooms.sort((a, b) => a.shortTermPrice - b.shortTermPrice);
      } else if (priceSort === 'high-low') {
        filteredRooms.sort((a, b) => b.shortTermPrice - a.shortTermPrice);
      }

      renderRooms(filteredRooms);
    }

    // 5. added event listeners to the search button, status filter, and price sort dropdown to trigger the applyFilters function
if (searchBtn) {
    searchBtn.addEventListener('click', applyFilters);
}
if (statusFilterSelect) {
    statusFilterSelect.addEventListener('change', applyFilters);
}
if (priceSortSelect) {
    priceSortSelect.addEventListener('change', applyFilters);
}


    // 6. a function to initialize the page by rendering all rooms initially
    renderRooms(roomsData);

    
  