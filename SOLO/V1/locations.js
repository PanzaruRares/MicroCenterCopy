const stores = [
    { name: "Phoenix, AZ", address: "4531 E Thomas Rd, Phoenix, AZ 85018", coordinates: [33.475805, -111.984084] },
    { name: "Santa Clara, CA", address: "5201 Stevens Creek Blvd, Santa Clara, CA 95051", coordinates: [37.323954, -121.993669] },
    { name: "Tustin, CA", address: "1100 Edinger Ave, Tustin, CA 92780", coordinates: [33.724546, -117.8329] },
    { name: "Denver, CO", address: "8000 E Quincy Ave, Denver, CO 80237", coordinates: [39.637391, -104.896051] },
    { name: "Miami, FL", address: "7795 W Flagler St, Miami, FL 33144", coordinates: [25.772609, -80.322194] },
    { name: "Duluth, GA", address: "2340 Pleasant Hill Rd, Duluth, GA 30096", coordinates: [33.964359, -84.13767] },
    { name: "Marietta, GA", address: "1275 Powers Ferry Rd SE, Marietta, GA 30067", coordinates: [33.921908, -84.466249] },
    { name: "Chicago, IL", address: "2645 N Elston Ave, Chicago, IL 60647", coordinates: [41.930763, -87.682728] },
    { name: "Westmont, IL", address: "80 E Ogden Ave, Westmont, IL 60559", coordinates: [41.811264, -87.972638] },
    { name: "Indianapolis, IN", address: "5702 E 86th St, Indianapolis, IN 46250", coordinates: [39.913333, -86.071256] },
    { name: "Overland Park, KS", address: "9294 Metcalf Ave, Overland Park, KS 66212", coordinates: [38.960625, -94.670429] },
    { name: "Cambridge, MA", address: "730 Memorial Dr, Cambridge, MA 02139", coordinates: [42.35713, -71.114273] },
    { name: "Parkville, MD", address: "1957 E Joppa Rd, Parkville, MD 21234", coordinates: [39.397068, -76.545167] },
    { name: "Rockville, MD", address: "1776 E Jefferson St, Rockville, MD 20852", coordinates: [39.057546, -77.12442] },
    { name: "Madison Heights, MI", address: "32800 Concord Dr, Madison Heights, MI 48071", coordinates: [42.533029, -83.114466] },
    { name: "St. Louis Park, MN", address: "3710 Wooddale Ave S, St. Louis Park, MN 55416", coordinates: [44.935944, -93.352123] },
    { name: "Brentwood, MO", address: "87 Brentwood Promenade Ct, Brentwood, MO 63144", coordinates: [38.626151, -90.343259] },
    { name: "Paterson, NJ", address: "263 McLean Blvd, Paterson, NJ 07504", coordinates: [40.90687, -74.13328] },
    { name: "Brooklyn, NY", address: "850 3rd Ave, Brooklyn, NY 11232", coordinates: [40.658748, -74.00395] },
    { name: "Queens, NY", address: "71-43 Kissena Blvd, Flushing, NY 11367", coordinates: [40.72909, -73.814648] },
    { name: "Westbury, NY", address: "655 Merrick Ave, Westbury, NY 11590", coordinates: [40.739588, -73.585641] },
    { name: "Yonkers, NY", address: "750A Central Park Ave, Yonkers, NY 10704", coordinates: [40.924866, -73.856263] },
    { name: "Charlotte, NC", address: "4744 S Boulevard, Charlotte, NC 28217", coordinates: [35.174698, -80.877718] },
    { name: "Columbus, OH", address: "747 Bethel Rd, Columbus, OH 43220", coordinates: [40.06087, -83.040348] },
    { name: "Mayfield Heights, OH", address: "1349 Eastgate Dr, Mayfield Heights, OH 44124", coordinates: [41.524162, -81.437195] },
    { name: "Sharonville, OH", address: "11755 Mosteller Rd, Sharonville, OH 45241", coordinates: [39.288222, -84.430213] },
    { name: "St. Davids, PA", address: "550 E Lancaster Ave, St. Davids, PA 19087", coordinates: [40.039551, -75.368784] },
    { name: "Dallas, TX", address: "13929 N Central Expy, Dallas, TX 75243", coordinates: [32.937296, -96.750274] },
    { name: "Houston, TX", address: "5305 S Rice Ave, Houston, TX 77081", coordinates: [29.724956, -95.46661] },
    { name: "Fairfax, VA", address: "3089 Nutley St, Fairfax, VA 22031", coordinates: [38.869232, -77.261555] }
];

const mapElement = document.querySelector("#store-map");
const storeList = document.querySelector("#store-list");
const storeCount = document.querySelector("#store-count");
const storeSearch = document.querySelector("#store-search");
const markers = new Map();
let map;

if (typeof L !== "undefined") {
    map = L.map(mapElement, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    stores.forEach((store) => {
        const marker = L.marker(store.coordinates, { title: store.name, alt: store.name }).addTo(map);
        const popup = document.createElement("div");
        const title = document.createElement("strong");
        const address = document.createElement("p");
        const directions = document.createElement("a");

        title.textContent = store.name;
        address.textContent = store.address;
        directions.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
        directions.target = "_blank";
        directions.rel = "noopener noreferrer";
        directions.textContent = "Get directions";
        popup.append(title, address, directions);
        marker.bindPopup(popup);
        markers.set(store.name, marker);
    });

    map.fitBounds(stores.map((store) => store.coordinates), { padding: [24, 24] });
} else {
    mapElement.textContent = "The interactive map could not load. Use a store listing to open its address in a map.";
    mapElement.style.display = "grid";
    mapElement.style.placeItems = "center";
    mapElement.style.padding = "1rem";
    mapElement.style.boxSizing = "border-box";
}

function renderStores(query = "") {
    const normalizedQuery = query.trim().toLowerCase();
    const filteredStores = stores.filter((store) =>
        `${store.name} ${store.address}`.toLowerCase().includes(normalizedQuery)
    );

    storeCount.textContent = `${filteredStores.length} of ${stores.length} locations`;
    storeList.replaceChildren();

    if (filteredStores.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "store-empty";
        emptyMessage.textContent = "No locations match your search.";
        storeList.append(emptyMessage);
    }

    filteredStores.forEach((store) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const name = document.createElement("strong");
        const address = document.createElement("span");
        const marker = markers.get(store.name);

        button.type = "button";
        name.textContent = store.name;
        address.textContent = store.address;
        button.append(name, address);
        button.addEventListener("click", () => {
            if (map && marker) {
                map.flyTo(store.coordinates, Math.max(map.getZoom(), 11));
                marker.openPopup();
            } else {
                window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            }

            storeList.querySelectorAll("button").forEach((storeButton) => {
                storeButton.removeAttribute("aria-current");
            });
            button.setAttribute("aria-current", "true");
        });
        item.append(button);
        storeList.append(item);
    });

    markers.forEach((marker, name) => {
        if (filteredStores.some((store) => store.name === name)) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    });

    if (map && !normalizedQuery) {
        map.fitBounds(stores.map((store) => store.coordinates), { padding: [24, 24] });
    }
}

storeSearch.addEventListener("input", () => renderStores(storeSearch.value));
renderStores();
