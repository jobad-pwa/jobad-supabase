// api/data/zones.js
// Centralized zone and area data - update once, use everywhere

export const ZONES = [
  { zone_id: 100, zone_name: "Hyderabad" },
  { zone_id: 200, zone_name: "North Telangana" },
  { zone_id: 300, zone_name: "East Telangana" },
  { zone_id: 400, zone_name: "South Telangana" }
];

export const AREAS = [
  { area_id: 100000, zone_id: 100, area_name: "All Hyderabad" },
  { area_id: 200000, zone_id: 200, area_name: "All North Telangana" },
  { area_id: 300000, zone_id: 300, area_name: "All East Telangana" },
  { area_id: 400000, zone_id: 400, area_name: "All South Telangana" },
  { area_id: 100001, zone_id: 100, area_name: "Kukatpally" },
  { area_id: 100002, zone_id: 100, area_name: "Madhapur" },
  { area_id: 100003, zone_id: 100, area_name: "Kondapur" },
  { area_id: 100004, zone_id: 100, area_name: "Gachibowli" },
  { area_id: 100005, zone_id: 100, area_name: "Hitech City" },
  { area_id: 100006, zone_id: 100, area_name: "Miyapur" },
  { area_id: 100007, zone_id: 100, area_name: "Uppal" },
  { area_id: 100008, zone_id: 100, area_name: "LB Nagar" },
  { area_id: 100009, zone_id: 100, area_name: "Dilsukhnagar" },
  { area_id: 100995, zone_id: 100, area_name: "Shamshabad" },
  { area_id: 100996, zone_id: 100, area_name: "Jadcharla" },
  { area_id: 100997, zone_id: 100, area_name: "Medak" },
  { area_id: 100998, zone_id: 100, area_name: "Sangareddy" },
  { area_id: 100999, zone_id: 100, area_name: "Zahirabad" },
  { area_id: 200001, zone_id: 200, area_name: "Adilabad" },
  { area_id: 200002, zone_id: 200, area_name: "Asifabad" },
  { area_id: 200003, zone_id: 200, area_name: "Mancherial" },
  { area_id: 200004, zone_id: 200, area_name: "Nirmal" },
  { area_id: 200005, zone_id: 200, area_name: "Nizamabad" },
  { area_id: 200006, zone_id: 200, area_name: "Jagtial" },
  { area_id: 200007, zone_id: 200, area_name: "Peddapalli" },
  { area_id: 200008, zone_id: 200, area_name: "Karimnagar" },
  { area_id: 200009, zone_id: 200, area_name: "Sircilla" },
  { area_id: 200010, zone_id: 200, area_name: "Kamareddy" },
  { area_id: 200011, zone_id: 200, area_name: "Siddipet" },
  { area_id: 300001, zone_id: 300, area_name: "Warangal" },
  { area_id: 300002, zone_id: 300, area_name: "Hanumakonda" },
  { area_id: 300003, zone_id: 300, area_name: "Khammam" },
  { area_id: 300004, zone_id: 300, area_name: "Bhupalpally" },
  { area_id: 300005, zone_id: 300, area_name: "Mulugu" },
  { area_id: 300006, zone_id: 300, area_name: "Mahabubabad" },
  { area_id: 300007, zone_id: 300, area_name: "Kothagudem" },
  { area_id: 300008, zone_id: 300, area_name: "Bhuvanagiri" },
  { area_id: 300009, zone_id: 300, area_name: "Jangaon" },
  { area_id: 400001, zone_id: 400, area_name: "Mahabubnagar" },
  { area_id: 400002, zone_id: 400, area_name: "Nalgonda" },
  { area_id: 400003, zone_id: 400, area_name: "Suryapet" },
  { area_id: 400004, zone_id: 400, area_name: "Nagarkurnool" },
  { area_id: 400005, zone_id: 400, area_name: "Vikarabad" },
  { area_id: 400006, zone_id: 400, area_name: "Narayanpet" },
  { area_id: 400007, zone_id: 400, area_name: "Wanaparthy" },
  { area_id: 400008, zone_id: 400, area_name: "Gadwal" }
];

export function getZoneName(id) {
  const z = ZONES.find(z => z.zone_id === id);
  return z ? z.zone_name : 'Unknown';
}

export function getAreaName(id) {
  const a = AREAS.find(a => a.area_id === id);
  return a ? a.area_name : '';
}

export function getAreasByZone(zoneId) {
  return AREAS.filter(a => a.zone_id === zoneId);
}

export function getLocationName(zoneId, areaId) {
  const zoneName = getZoneName(zoneId);
  const areaName = getAreaName(areaId);
  return areaName ? `${areaName}, ${zoneName}` : zoneName;
}
