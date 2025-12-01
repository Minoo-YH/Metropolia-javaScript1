// =====================
// CONFIG & SAFETY CHECK
// =====================

// DIGITRANSIT_API_KEY is defined in config.js (which is ignored by git).
if (typeof DIGITRANSIT_API_KEY === "undefined") {
  console.error(
    "DIGITRANSIT_API_KEY is not defined. Create config.js based on config.example.js."
  );
}

// Karaportti 2 (Metropolia Karamalmi campus)
const SCHOOL = {
  name: "Karaportti 2, Espoo",
  lat: 60.22388,
  lon: 24.75806
};

const GEOCODING_BASE_URL = "https://api.digitransit.fi/geocoding/v1/search";
const ROUTING_BASE_URL =
  "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

// =====================
// LEAFLET MAP SETUP
// =====================

const map = L.map("map").setView([SCHOOL.lat, SCHOOL.lon], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const routeLayerGroup = L.layerGroup().addTo(map);

// Destination marker
L.marker([SCHOOL.lat, SCHOOL.lon])
  .addTo(map)
  .bindPopup(SCHOOL.name);

console.log("✅ Leaflet initialized");

// =====================
// DOM ELEMENTS
// =====================

const form = document.getElementById("route-form");
const addressInput = document.getElementById("address-input");
const startTimeEl = document.getElementById("start-time");
const endTimeEl = document.getElementById("end-time");
const statusEl = document.getElementById("status");

// =====================
// HELPERS
// =====================

function formatMillisTime(ms) {
  const d = new Date(ms);
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

// Polyline decoder (Google polyline)
function decodePolyline(encoded) {
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lon = 0;
  const coords = [];

  while (index < len) {
    let result = 0;
    let shift = 0;
    let b;

    // lat
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLat = (result & 1) ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    // lon
    result = 0;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLon = (result & 1) ? ~(result >> 1) : result >> 1;
    lon += deltaLon;

    coords.push([lat / 1e5, lon / 1e5]);
  }

  return coords;
}

// =====================
// API CALLS
// =====================

async function geocodeAddress(address) {
  const url =
    `${GEOCODING_BASE_URL}?text=${encodeURIComponent(address)}` +
    `&size=1&digitransit-subscription-key=${encodeURIComponent(
      DIGITRANSIT_API_KEY
    )}`;

  const res = await fetch(url);
  console.log("ℹ️ Geocoding status:", res.status);

  if (!res.ok) {
    throw new Error("Geocoding request failed (status " + res.status + ")");
  }

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("No address found for that search term.");
  }

  const feature = data.features[0];
  const [lon, lat] = feature.geometry.coordinates;
  const label = feature.properties.label || address;

  return { lat, lon, label };
}

async function fetchRoute(fromLat, fromLon) {
  const query = `
    {
      plan(
        fromPlace: "Origin::${fromLat},${fromLon}"
        toPlace: "${SCHOOL.name}::${SCHOOL.lat},${SCHOOL.lon}"
        numItineraries: 1
      ) {
        itineraries {
          startTime
          endTime
          legs {
            legGeometry {
              points
            }
          }
        }
      }
    }
  `;

  const url =
    `${ROUTING_BASE_URL}?digitransit-subscription-key=` +
    encodeURIComponent(DIGITRANSIT_API_KEY);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  console.log("ℹ️ Routing status:", res.status);

  if (!res.ok) {
    const txt = await res.text();
    console.error("Routing raw error:", txt);
    throw new Error("Routing request failed (status " + res.status + ")");
  }

  const json = await res.json();

  if (
    !json.data ||
    !json.data.plan ||
    !json.data.plan.itineraries ||
    json.data.plan.itineraries.length === 0
  ) {
    console.error("Routing response:", json);
    throw new Error("No route found.");
  }

  return json.data.plan.itineraries[0];
}

// =====================
// DRAW ROUTE
// =====================

function drawRoute(itinerary, origin) {
  routeLayerGroup.clearLayers();

  const allLatLngs = [];

  const startMarker = L.marker([origin.lat, origin.lon]).bindPopup(
    origin.label || "Start"
  );
  routeLayerGroup.addLayer(startMarker);
  allLatLngs.push([origin.lat, origin.lon]);

  itinerary.legs.forEach((leg) => {
    if (!leg.legGeometry || !leg.legGeometry.points) return;
    const coords = decodePolyline(leg.legGeometry.points);
    const polyline = L.polyline(coords, { weight: 5, opacity: 0.85 });
    routeLayerGroup.addLayer(polyline);
    coords.forEach((c) => allLatLngs.push(c));
  });

  allLatLngs.push([SCHOOL.lat, SCHOOL.lon]);

  if (allLatLngs.length) {
    map.fitBounds(allLatLngs, { padding: [30, 30] });
  }
}

// =====================
// FORM HANDLER
// =====================

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const address = addressInput.value.trim();
  if (!address) return;

  startTimeEl.textContent = "–";
  endTimeEl.textContent = "–";
  statusEl.textContent = "Searching address and planning route...";

  try {
    const origin = await geocodeAddress(address);
    const itinerary = await fetchRoute(origin.lat, origin.lon);

    startTimeEl.textContent = formatMillisTime(itinerary.startTime);
    endTimeEl.textContent = formatMillisTime(itinerary.endTime);

    drawRoute(itinerary, origin);

    statusEl.textContent = `Route found from "${origin.label}" to ${SCHOOL.name}.`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error: " + err.message;
  }
});


