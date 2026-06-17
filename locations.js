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

// Get all zones
function getZones() {
    return LOCATION_DATA.zones;
}

// Get areas for a specific zone
function getAreas(zoneId) {
    return LOCATION_DATA.areas.filter(a => a.zone_id === zoneId);
}

// Get zone name from ID
function getZoneName(zoneId) {
    const zone = LOCATION_DATA.zones.find(z => z.zone_id === zoneId);
    return zone ? zone.zone_name : 'Unknown Zone';
}

// Get area name from ID
function getAreaName(areaId) {
    const area = LOCATION_DATA.areas.find(a => a.area_id === areaId);
    return area ? area.area_name : 'Unknown Area';
}

// Populate zone dropdown
function populateZoneDropdown(selectId = 'zone-select') {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Select Zone</option>';
    LOCATION_DATA.zones.forEach(zone => {
        select.innerHTML += `<option value="${zone.zone_id}">📍 ${zone.zone_name}</option>`;
    });
}

// Populate area dropdown based on selected zone
function populateAreaDropdown(zoneId, targetId = 'area-select') {
    const select = document.getElementById(targetId);
    if (!select) return;
    
    const areas = getAreas(zoneId);
    select.innerHTML = '<option value="">Select Area</option>';
    areas.forEach(area => {
        select.innerHTML += `<option value="${area.area_id}">${area.area_name}</option>`;
    });
}

// Detect location via IP
async function detectLocation() {
    const zoneSelect = document.getElementById('zone-select');
    const areaSelect = document.getElementById('area-select');
    const badge = document.getElementById('detected-badge');
    
    if (!zoneSelect) return;
    
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const city = data.city || '';
        
        // Find matching area
        let matchedArea = null;
        for (const area of LOCATION_DATA.areas) {
            if (city.toLowerCase().includes(area.area_name.toLowerCase()) || 
                area.area_name.toLowerCase().includes(city.toLowerCase())) {
                matchedArea = area;
                break;
            }
        }
        
        if (matchedArea) {
            zoneSelect.value = matchedArea.zone_id;
            populateAreaDropdown(matchedArea.zone_id);
            areaSelect.value = matchedArea.area_id;
            
            const zoneName = getZoneName(matchedArea.zone_id);
            if (badge) {
                badge.textContent = `📍 ${zoneName}`;
                badge.className = 'detected';
            }
        } else {
            // Default to Hyderabad
            zoneSelect.value = 100;
            populateAreaDropdown(100);
            if (badge) {
                badge.textContent = '📍 Hyderabad (Default)';
                badge.className = 'detected';
            }
        }
    } catch (err) {
        console.log('Location detection failed:', err);
        zoneSelect.value = 100;
        populateAreaDropdown(100);
        if (badge) {
            badge.textContent = '📍 Hyderabad (Default)';
            badge.className = 'detected';
        }
    }
}

// Save location to user profile (calls Supabase)
async function saveUserLocation(mobile, zoneId, areaId, supabase) {
    if (!zoneId) {
        console.log('No zone selected');
        return false;
    }
    
    try {
        const { error } = await supabase
            .from('active_users')
            .update({ 
                zone_id: zoneId, 
                area_id: areaId || null,
                last_active: new Date().toISOString() 
            })
            .eq('mobile', mobile);
        
        if (error) {
            console.error('Location save error:', error);
            return false;
        }
        
        console.log('✅ Location saved:', { zoneId, areaId });
        return true;
    } catch (err) {
        console.error('Save error:', err);
        return false;
    }
}

// Get location display string
function getLocationDisplay(zoneId, areaId) {
    const zoneName = getZoneName(zoneId);
    const areaName = getAreaName(areaId);
    if (areaId) {
        return `${areaName}, ${zoneName}`;
    }
    return zoneName;
}

// Expose globally
window.LOCATION = {
    getZones,
    getAreas,
    getZoneName,
    getAreaName,
    populateZoneDropdown,
    populateAreaDropdown,
    detectLocation,
    saveUserLocation,
    getLocationDisplay,
    LOCATION_DATA
};

console.log('✅ locations.js loaded (GitHub storage)');
