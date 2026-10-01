const productCatalog = {
    cpus: [
        { id: "cpu-intel-i5-14400f", name: "Intel Core i5-14400F", description: "10 cores, 16 threads; discrete graphics card required.", price: 174.99, emblem: "i5" },
        { id: "cpu-intel-i5-14600k", name: "Intel Core i5-14600K", description: "14 cores, 20 threads with unlocked multiplier.", price: 279.99, emblem: "i5" },
        { id: "cpu-intel-i7-14700k", name: "Intel Core i7-14700K", description: "20 cores, 28 threads for gaming and productivity.", price: 379.99, emblem: "i7" },
        { id: "cpu-intel-i9-14900k", name: "Intel Core i9-14900K", description: "24 cores, 32 threads for high-end desktop systems.", price: 499.99, emblem: "i9" },
        { id: "cpu-ryzen-5-5600", name: "AMD Ryzen 5 5600", description: "6 cores, 12 threads for AM4 desktop builds.", price: 119.99, emblem: "RYZEN 5" },
        { id: "cpu-ryzen-5-7600", name: "AMD Ryzen 5 7600", description: "6 cores, 12 threads for AM5 desktop builds.", price: 189.99, emblem: "RYZEN 5" },
        { id: "cpu-ryzen-5-9600x", name: "AMD Ryzen 5 9600X", description: "6 cores, 12 threads from the Ryzen 9000 Series.", price: 249.99, emblem: "RYZEN 5" },
        { id: "cpu-ryzen-7-5700x3d", name: "AMD Ryzen 7 5700X3D", description: "8 cores, 16 threads with 3D V-Cache for AM4.", price: 229.99, emblem: "RYZEN 7" },
        { id: "cpu-ryzen-7-7800x3d", name: "AMD Ryzen 7 7800X3D", description: "8 cores, 16 threads with 3D V-Cache for AM5.", price: 379.99, emblem: "RYZEN 7" },
        { id: "cpu-ryzen-7-9700x", name: "AMD Ryzen 7 9700X", description: "8 cores, 16 threads from the Ryzen 9000 Series.", price: 329.99, emblem: "RYZEN 7" },
        { id: "cpu-ryzen-9-7900x", name: "AMD Ryzen 9 7900X", description: "12 cores, 24 threads for demanding AM5 workloads.", price: 379.99, emblem: "RYZEN 9" },
        { id: "cpu-ryzen-9-9900x", name: "AMD Ryzen 9 9900X", description: "12 cores, 24 threads from the Ryzen 9000 Series.", price: 429.99, emblem: "RYZEN 9" }
    ],
    gpus: [
        { id: "gpu-rtx-4060", name: "NVIDIA GeForce RTX 4060 8GB", description: "Efficient Ada Lovelace graphics for 1080p gaming.", price: 299.99, emblem: "RTX 4060" },
        { id: "gpu-rtx-4060-ti", name: "NVIDIA GeForce RTX 4060 Ti 8GB", description: "Ada Lovelace graphics with DLSS 3 support.", price: 399.99, emblem: "RTX 4060 Ti" },
        { id: "gpu-rtx-4070-super", name: "NVIDIA GeForce RTX 4070 SUPER 12GB", description: "High-performance graphics for 1440p gaming.", price: 599.99, emblem: "RTX 4070 SUPER" },
        { id: "gpu-rtx-4070-ti-super", name: "NVIDIA GeForce RTX 4070 Ti SUPER 16GB", description: "16 GB graphics memory for high-resolution gaming.", price: 799.99, emblem: "RTX 4070 Ti SUPER" },
        { id: "gpu-rtx-4080-super", name: "NVIDIA GeForce RTX 4080 SUPER 16GB", description: "Enthusiast-class graphics for 4K gaming and creation.", price: 999.99, emblem: "RTX 4080 SUPER" },
        { id: "gpu-rtx-5070", name: "NVIDIA GeForce RTX 5070 12GB", description: "Blackwell graphics with 12 GB of GDDR7 memory.", price: 549.99, emblem: "RTX 5070" },
        { id: "gpu-rtx-5070-ti", name: "NVIDIA GeForce RTX 5070 Ti 16GB", description: "Blackwell graphics with 16 GB of GDDR7 memory.", price: 749.99, emblem: "RTX 5070 Ti" },
        { id: "gpu-rx-7600", name: "AMD Radeon RX 7600 8GB", description: "RDNA 3 graphics designed for 1080p gaming.", price: 269.99, emblem: "RX 7600" },
        { id: "gpu-rx-7700-xt", name: "AMD Radeon RX 7700 XT 12GB", description: "RDNA 3 graphics with 12 GB of GDDR6 memory.", price: 399.99, emblem: "RX 7700 XT" },
        { id: "gpu-rx-7800-xt", name: "AMD Radeon RX 7800 XT 16GB", description: "16 GB RDNA 3 graphics for high-refresh 1440p.", price: 499.99, emblem: "RX 7800 XT" },
        { id: "gpu-rx-7900-gre", name: "AMD Radeon RX 7900 GRE 16GB", description: "RDNA 3 performance with 16 GB of GDDR6 memory.", price: 549.99, emblem: "RX 7900 GRE" },
        { id: "gpu-rx-7900-xtx", name: "AMD Radeon RX 7900 XTX 24GB", description: "Flagship RDNA 3 graphics with 24 GB of GDDR6 memory.", price: 899.99, emblem: "RX 7900 XTX" }
    ],
    memory: [
        { id: "memory-corsair-vengeance-ddr4-16", name: "Corsair Vengeance LPX 16GB DDR4-3200", description: "2 x 8 GB kit · 3200 MT/s.", price: 39.99, emblem: "16 GB" },
        { id: "memory-gskill-ripjaws-ddr4-32", name: "G.Skill Ripjaws V 32GB DDR4-3600", description: "2 x 16 GB desktop kit · 3600 MT/s.", price: 64.99, emblem: "32 GB" },
        { id: "memory-corsair-vengeance-ddr5-32", name: "Corsair Vengeance 32GB DDR5-6000", description: "2 x 16 GB DDR5 kit · 6000 MT/s.", price: 99.99, emblem: "32 GB" },
        { id: "memory-gskill-flare-x5-ddr5-32", name: "G.Skill Flare X5 32GB DDR5-6000", description: "2 x 16 GB AMD EXPO kit · 6000 MT/s.", price: 104.99, emblem: "32 GB" },
        { id: "memory-gskill-trident-z5-ddr5-32", name: "G.Skill Trident Z5 RGB 32GB DDR5-6400", description: "2 x 16 GB RGB kit · 6400 MT/s.", price: 124.99, emblem: "32 GB" },
        { id: "memory-kingston-fury-beast-ddr5-32", name: "Kingston FURY Beast 32GB DDR5-6000", description: "2 x 16 GB desktop kit · 6000 MT/s.", price: 94.99, emblem: "32 GB" },
        { id: "memory-corsair-vengeance-ddr5-64", name: "Corsair Vengeance 64GB DDR5-6000", description: "2 x 32 GB kit for multitasking · 6000 MT/s.", price: 184.99, emblem: "64 GB" },
        { id: "memory-gskill-flare-x5-ddr5-64", name: "G.Skill Flare X5 64GB DDR5-6000", description: "2 x 32 GB AMD EXPO kit · 6000 MT/s.", price: 189.99, emblem: "64 GB" },
        { id: "memory-kingston-fury-beast-ddr5-64", name: "Kingston FURY Beast 64GB DDR5-6000", description: "2 x 32 GB desktop kit · 6000 MT/s.", price: 179.99, emblem: "64 GB" },
        { id: "memory-corsair-dominator-titanium-ddr5-64", name: "Corsair Dominator Titanium 64GB DDR5-6400", description: "2 x 32 GB premium RGB kit · 6400 MT/s.", price: 239.99, emblem: "64 GB" },
        { id: "memory-gskill-trident-z5-neo-ddr5-96", name: "G.Skill Trident Z5 Neo 96GB DDR5-6000", description: "2 x 48 GB AMD EXPO kit · 6000 MT/s.", price: 279.99, emblem: "96 GB" },
        { id: "memory-corsair-vengeance-ddr5-96", name: "Corsair Vengeance 96GB DDR5-5600", description: "2 x 48 GB kit for large workloads · 5600 MT/s.", price: 269.99, emblem: "96 GB" }
    ],
    "power-supplies": [
        { id: "psu-corsair-cv550", name: "Corsair CV550 550W 80+ Bronze", description: "Compact non-modular ATX PSU · 80 PLUS Bronze certified.", price: 59.99, emblem: "550W" },
        { id: "psu-evga-600-br", name: "EVGA 600 BR 600W 80+ Bronze", description: "600 W desktop PSU · 80 PLUS Bronze certified.", price: 64.99, emblem: "600W" },
        { id: "psu-msi-mag-a650bn", name: "MSI MAG A650BN 650W 80+ Bronze", description: "650 W non-modular PSU · 80 PLUS Bronze certified.", price: 69.99, emblem: "650W" },
        { id: "psu-corsair-rm750e", name: "Corsair RM750e 750W 80+ Gold", description: "Fully modular ATX 3.0 PSU · 80 PLUS Gold certified.", price: 99.99, emblem: "750W" },
        { id: "psu-msi-mag-a750gl", name: "MSI MAG A750GL PCIE5 750W 80+ Gold", description: "Modular with 12VHPWR · 80 PLUS Gold certified.", price: 99.99, emblem: "750W" },
        { id: "psu-seasonic-focus-gx-750", name: "Seasonic FOCUS GX-750 750W 80+ Gold", description: "Fully modular, 10-year warranty · 80 PLUS Gold certified.", price: 119.99, emblem: "750W" },
        { id: "psu-corsair-rm850x", name: "Corsair RM850x 850W 80+ Gold", description: "Fully modular, low-noise ATX PSU · 80 PLUS Gold certified.", price: 139.99, emblem: "850W" },
        { id: "psu-bequiet-pure-power-12m-850", name: "be quiet! Pure Power 12 M 850W 80+ Gold", description: "Fully modular ATX 3.0 PSU · 80 PLUS Gold certified.", price: 139.99, emblem: "850W" },
        { id: "psu-thermaltake-toughpower-gf-a3-850", name: "Thermaltake Toughpower GF A3 850W 80+ Gold", description: "Fully modular ATX 3.0 PSU · 80 PLUS Gold certified.", price: 119.99, emblem: "850W" },
        { id: "psu-seasonic-focus-gx-850", name: "Seasonic FOCUS GX-850 850W 80+ Gold", description: "Fully modular performance PSU · 80 PLUS Gold certified.", price: 139.99, emblem: "850W" },
        { id: "psu-corsair-rm1000x", name: "Corsair RM1000x 1000W 80+ Gold", description: "Fully modular, high-capacity PSU · 80 PLUS Gold certified.", price: 189.99, emblem: "1000W" },
        { id: "psu-msi-mpg-a1000g", name: "MSI MPG A1000G PCIE5 1000W 80+ Gold", description: "Fully modular ATX 3.0 PSU · 80 PLUS Gold certified.", price: 179.99, emblem: "1000W" }
    ]
};

const category = document.body.dataset.category;
const categoryProducts = productCatalog[category];
const productGrid = document.querySelector("#product-grid");
const sortControl = document.querySelector("#product-sort");
const filterControl = document.querySelector("#product-filter");
const resultsStatus = document.querySelector("#catalog-results");
const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

if (!categoryProducts || !productGrid || !sortControl || !filterControl || !resultsStatus) {
    throw new Error("The product catalog page is missing a valid category.");
}

const getFilterValue = (product) => {
    if (category === "cpus") {
        return product.name.startsWith("AMD") ? "AMD" : "Intel";
    }
    if (category === "gpus") {
        return product.name.startsWith("AMD") ? "AMD" : "NVIDIA";
    }
    if (category === "memory") {
        return product.name.match(/DDR[45]-(\d+)/)?.[1] ?? "";
    }
    if (category === "power-supplies") {
        return product.name.match(/80\+ (Bronze|Silver|Gold|Platinum)/i)?.[1] ?? "";
    }
    return "";
};

const filterLabels = {
    cpus: "manufacturer",
    gpus: "manufacturer",
    memory: "memory speed",
    "power-supplies": "efficiency rating"
};

const filterLabel = filterLabels[category];
const filterValues = [...new Set(categoryProducts.map(getFilterValue).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));
const allOption = document.createElement("option");
allOption.value = "";
allOption.textContent = `All ${filterLabel}s`;
filterControl.append(allOption);

filterValues.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = category === "memory" ? `${value} MT/s` : value;
    filterControl.append(option);
});

const productCards = new Map();

categoryProducts.forEach((product) => {
    const card = document.createElement("article");
    const art = document.createElement("div");
    const artEmblem = document.createElement("span");
    const info = document.createElement("div");
    const label = document.createElement("p");
    const name = document.createElement("h3");
    const description = document.createElement("p");
    const buyRow = document.createElement("div");
    const price = document.createElement("span");
    const addButton = document.createElement("button");

    card.className = "product-card";
    art.className = "product-art";
    artEmblem.className = "product-art-emblem";
    artEmblem.textContent = product.emblem;
    art.append(artEmblem);

    if (category === "memory") {
        const speed = product.name.match(/DDR[45]-(\d+)/)?.[1];
        if (speed) {
            const spec = document.createElement("span");
            spec.className = "product-art-spec";
            spec.textContent = `${speed} MT/s`;
            art.append(spec);
        }
    } else if (category === "power-supplies") {
        const certification = product.name.match(/80\+ (Bronze|Silver|Gold|Platinum)/i)?.[1];
        if (certification) {
            const spec = document.createElement("span");
            spec.className = "product-art-spec";
            spec.textContent = `80 PLUS ${certification}`;
            art.append(spec);
        }
    }

    info.className = "product-info";
    label.className = "product-category";
    label.textContent = category.replace("-", " ");
    name.textContent = product.name;
    description.className = "product-description";
    description.textContent = product.description;
    buyRow.className = "product-buy-row";
    price.className = "product-price";
    price.textContent = priceFormatter.format(product.price);
    addButton.className = "add-to-cart";
    addButton.type = "button";
    addButton.textContent = "Add to cart";
    addButton.setAttribute("aria-label", `Add ${product.name} to cart`);
    addButton.addEventListener("click", async () => {
        if (typeof window.addToCart !== "function") {
            throw new Error("The shared cart is unavailable.");
        }

        addButton.disabled = true;
        const wasSaved = await window.addToCart(product);
        addButton.textContent = wasSaved ? "Added" : "Not saved";
        window.setTimeout(() => {
            addButton.textContent = "Add to cart";
            addButton.disabled = false;
        }, 1200);
    });

    buyRow.append(price, addButton);
    info.append(label, name, description, buyRow);
    card.append(art, info);
    productCards.set(product.id, card);
});

const renderProducts = () => {
    const selectedFilter = filterControl.value;
    const visibleProducts = categoryProducts.filter((product) => (
        !selectedFilter || getFilterValue(product) === selectedFilter
    ));

    if (sortControl.value === "price-ascending") {
        visibleProducts.sort((first, second) => first.price - second.price);
    } else if (sortControl.value === "price-descending") {
        visibleProducts.sort((first, second) => second.price - first.price);
    } else if (sortControl.value === "name") {
        visibleProducts.sort((first, second) => first.name.localeCompare(second.name, undefined, { numeric: true }));
    }

    productGrid.replaceChildren(...visibleProducts.map((product) => productCards.get(product.id)));
    resultsStatus.textContent = `Showing ${visibleProducts.length} of ${categoryProducts.length} products`;

    if (visibleProducts.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "catalog-empty";
        emptyMessage.textContent = "No products match this filter.";
        productGrid.append(emptyMessage);
    }
};

sortControl.addEventListener("change", renderProducts);
filterControl.addEventListener("change", renderProducts);
renderProducts();
