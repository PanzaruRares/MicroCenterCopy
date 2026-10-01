const fs = require("node:fs");
const path = require("node:path");

const rootDirectory = __dirname;
const outputDirectory = path.join(rootDirectory, ".pages-build");
const publicFiles = [
    "avatar.svg",
    "cart.js",
    "catalog.js",
    "channels4_profile.jpg",
    "cpus.html",
    "gpus.html",
    "index.html",
    "locations.js",
    "memory.html",
    "power-supplies.html",
    "style.css",
    "account.js"
];

function buildPages(config = {}) {
    const supabaseUrl = typeof config.url === "string" ? config.url.trim() : "";
    const anonKey = typeof config.anonKey === "string" ? config.anonKey.trim() : "";
    if ((supabaseUrl && !anonKey) || (!supabaseUrl && anonKey)) {
        throw new Error("Set both SUPABASE_URL and SUPABASE_ANON_KEY, or leave both empty.");
    }
    if (supabaseUrl && !/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/.*)?$/i.test(supabaseUrl)) {
        throw new Error("SUPABASE_URL must be an HTTPS URL.");
    }

    fs.rmSync(outputDirectory, { recursive: true, force: true });
    fs.mkdirSync(outputDirectory, { recursive: true });
    publicFiles.forEach((file) => {
        fs.copyFileSync(path.join(rootDirectory, file), path.join(outputDirectory, file));
    });
    const publicConfig = {
        url: supabaseUrl,
        anonKey
    };
    fs.writeFileSync(
        path.join(outputDirectory, "supabase-config.js"),
        `window.STOREFRONT_SUPABASE_CONFIG = ${JSON.stringify(publicConfig)};\n`,
        "utf8"
    );
    return outputDirectory;
}

if (require.main === module) {
    const destination = buildPages({
        url: process.env.SUPABASE_URL || "",
        anonKey: process.env.SUPABASE_ANON_KEY || ""
    });
    console.log(`GitHub Pages site prepared in ${destination}`);
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        console.warn("Supabase is not configured; account login and online cart sync will be unavailable.");
    }
}

module.exports = { buildPages };
