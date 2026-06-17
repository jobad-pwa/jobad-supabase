// ============================================================
// locations.js - Location Data (Stored in GitHub)
// ============================================================

// Telangana Zones with IDs matching your schema
const LOCATION_DATA = {
    zones: [
        { zone_id: 100, zone_name: "Hyderabad" },
        { zone_id: 200, zone_name: "North Telangana" },
        { zone_id: 300, zone_name: "East Telangana" },
        { zone_id: 400, zone_name: "South Telangana" }
    ],
    areas: [
        // Hyderabad (zone_id: 100)
        { area_id: 100001, zone_id: 100, area_name: "Kukatpally" },
        { area_id: 100002, zone_id: 100, area_name: "Madhapur" },
        { area_id: 100003, zone_id: 100, area_name: "Kondapur" },
        { area_id: 100004, zone_id: 100, area_name: "Gachibowli" },
        { area_id: 100005, zone_id: 100, area_name: "Hitech City" },
        { area_id: 100006, zone_id: 100, area_name: "Miyapur" },
        { area_id: 100007, zone_id: 100, area_name: "Uppal" },
        { area_id: 100008, zone_id: 100, area_name: "LB Nagar" },
        { area_id: 100009, zone_id: 100, area_name: "Dilsukhnagar" },
        // North Telangana (zone_id: 200)
        { area_id: 200001, zone_id: 200, area_name: "Nizamabad" },
        { area_id: 200002, zone_id: 200, area_name: "Karimnagar" },
        { area_id: 200003, zone_id: 200, area_name: "Adilabad" },
        { area_id: 200004, zone_id: 200, area_name: "Mancherial" },
        { area_id: 200005, zone_id: 200, area_name: "Jagtial" },
        // East Telangana (zone_id: 300)
        { area_id: 300001, zone_id: 300, area_name: "Warangal" },
        { area_id: 300002, zone_id: 300, area_name: "Hanumakonda" },
        { area_id: 300003, zone_id: 300, area_name: "Khammam" },
        { area_id: 300004, zone_id: 300, area_name: "Mahabubabad" },
        // South Telangana (zone_id: 400)
        { area_id: 400001, zone_id: 400, area_name: "Mahabubnagar" },
        { area_id: 400002, zone_id: 400, area_name: "Nalgonda" },
        { area_id: 400003, zone_id: 400, area_name: "Suryapet" },
        { area_id: 400004, zone_id: 400, area_name: "Nagarkurnool" }
    ]
};

// ============================================================
// Helper Functions
// ============================================================

function getZones() {
    return LOCATION_DATA.zones;
}

function getAreas(zoneId) {
    return LOCATION_DATA.areas.filter(a => a.zone_id === zoneId);
}

function getZoneName(zoneId) {
    const zone = LOCATION_DATA.zones.find(z => z.zone_id === zoneId);
    return zone ? zone.zone_name : 'Unknown Zone';
}

function getAreaName(areaId) {
    const area = LOCATION_DATA.areas.find(a => a.area_id === areaId);
    return area ? area.area_name : 'Unknown Area';
}

function searchZones(query) {
    if (!query || query.trim() === '') {
        return LOCATION_DATA.zones;
    }
    const q = query.toLowerCase().trim();
    return LOCATION_DATA.zones.filter(zone => 
        zone.zone_name.toLowerCase().includes(q)
    );
}

// ============================================================
// Searchable Zone Dropdown - MAIN FUNCTION
// ============================================================
function createZoneSearchInput() {
    const container = document.getElementById('zone-search-container');
    if (!container) {
        console.error('zone-search-container not found');
        return;
    }
    
    // Get selected zone ID if already set
    const hiddenInput = document.getElementById('selected-zone-id');
    const currentZoneId = hiddenInput ? parseInt(hiddenInput.value) : null;
    const currentZoneName = currentZoneId ? getZoneName(currentZoneId) : null;
    
    container.innerHTML = `
        <div class="zone-search-wrapper">
            <div class="zone-display" id="zone-display" onclick="toggleZoneDropdown()">
                <span id="zone-selected-label">${currentZoneName ? '📍 ' + currentZoneName : '📍 Select Zone'}</span>
                <span class="zone-arrow" id="zone-arrow">▼</span>
            </div>
            <div class="zone-dropdown" id="zone-dropdown">
                <input type="text" id="zone-search-input" placeholder="Search zone..." oninput="filterZones()" autofocus>
                <div class="zone-list" id="zone-list"></div>
            </div>
        </div>
    `;
    
    // Populate zone list
    renderZoneList(LOCATION_DATA.zones);
    
    // If zone already selected, show it
    if (currentZoneName) {
        const label = document.getElementById('zone-selected-label');
        if (label) label.textContent = '📍 ' + currentZoneName;
    }
}

function renderZoneList(zones) {
    const list = document.getElementById('zone-list');
    if (!list) return;
    
    // Get currently selected zone
    const hiddenInput = document.getElementById('selected-zone-id');
    const selectedId = hiddenInput ? parseInt(hiddenInput.value) : null;
    
    if (zones.length === 0) {
        list.innerHTML = '<div class="zone-item no-result">No zones found</div>';
        return;
    }
    
    list.innerHTML = zones.map(zone => {
        const isSelected = (selectedId === zone.zone_id);
        const checkmark = isSelected ? ' ✅' : '';
        return `
            <div class="zone-item ${isSelected ? 'selected' : ''}" onclick="selectZone(${zone.zone_id}, '${zone.zone_name}')">
                📍 ${zone.zone_name}${checkmark}
            </div>
        `;
    }).join('');
}

function toggleZoneDropdown() {
    const dropdown = document.getElementById('zone-dropdown');
    const arrow = document.getElementById('zone-arrow');
    if (dropdown) {
        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
            dropdown.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        } else {
            dropdown.classList.add('open');
            if (arrow) arrow.classList.add('open');
            setTimeout(() => {
                const input = document.getElementById('zone-search-input');
                if (input) {
                    input.focus();
                    input.select();
                }
            }, 100);
        }
    }
}

function filterZones() {
    const input = document.getElementById('zone-search-input');
    if (!input) return;
    
    const query = input.value;
    const filtered = searchZones(query);
    renderZoneList(filtered);
}

function selectZone(zoneId, zoneName) {
    const display = document.getElementById('zone-selected-label');
    if (display) {
        display.textContent = '📍 ' + zoneName;
    }
    
    // Store selected zone
    const hiddenInput = document.getElementById('selected-zone-id');
    if (hiddenInput) {
        hiddenInput.value = zoneId;
    }
    
    // Close dropdown
    const dropdown = document.getElementById('zone-dropdown');
    const arrow = document.getElementById('zone-arrow');
    if (dropdown) {
        dropdown.classList.remove('open');
        if (arrow) arrow.classList.remove('open');
    }
    
    // Update list to show selection
    renderZoneList(LOCATION_DATA.zones);
    
    // Trigger change event
    const event = new Event('change');
    document.dispatchEvent(event);
}

function getSelectedZoneId() {
    const hidden = document.getElementById('selected-zone-id');
    return hidden ? parseInt(hidden.value) : null;
}

// ============================================================
// Detect location via IP
// ============================================================
async function detectLocation() {
    const display = document.getElementById('zone-selected-label');
    if (!display) return;
    
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const city = data.city || '';
        
        // Find matching zone
        let matchedZone = null;
        for (const zone of LOCATION_DATA.zones) {
            if (city.toLowerCase().includes(zone.zone_name.toLowerCase()) || 
                zone.zone_name.toLowerCase().includes(city.toLowerCase())) {
                matchedZone = zone;
                break;
            }
        }
        
        if (matchedZone) {
            selectZone(matchedZone.zone_id, matchedZone.zone_name);
            display.textContent = '📍 ' + matchedZone.zone_name + ' (Detected)';
        } else {
            // Default to Hyderabad
            selectZone(100, 'Hyderabad');
            display.textContent = '📍 Hyderabad (Default)';
        }
    } catch (err) {
        console.log('Location detection failed:', err);
        selectZone(100, 'Hyderabad');
        display.textContent = '📍 Hyderabad (Default)';
    }
}

// ============================================================
// Save location to user profile
// ============================================================
async function saveUserLocation(mobile, zoneId, supabase) {
    if (!zoneId) {
        console.log('No zone selected');
        return false;
    }
    
    try {
        const { error } = await supabase
            .from('active_users')
            .update({ 
                zone_id: zoneId,
                last_active: new Date().toISOString() 
            })
            .eq('mobile', mobile);
        
        if (error) {
            console.error('Location save error:', error);
            return false;
        }
        
        console.log('✅ Location saved:', { zoneId });
        return true;
    } catch (err) {
        console.error('Save error:', err);
        return false;
    }
}

// ============================================================
// Get location display string
// ============================================================
function getLocationDisplay(zoneId) {
    return getZoneName(zoneId);
}

// ============================================================
// Close dropdown on outside click
// ============================================================
document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.zone-search-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        const dropdown = document.getElementById('zone-dropdown');
        const arrow = document.getElementById('zone-arrow');
        if (dropdown) {
            dropdown.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        }
    }
});

// ============================================================
// Enter key support for search
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('zone-search-input');
        if (input && document.activeElement === input) {
            const firstItem = document.querySelector('.zone-item:not(.no-result)');
            if (firstItem) {
                firstItem.click();
            }
        }
    }
});

// Expose globally
window.LOCATION = {
    getZones,
    getAreas,
    getZoneName,
    getAreaName,
    searchZones,
    createZoneSearchInput,
    selectZone,
    getSelectedZoneId,
    detectLocation,
    saveUserLocation,
    getLocationDisplay,
    LOCATION_DATA
};

console.log('✅ locations.js loaded (Complete with searchable zone)');
