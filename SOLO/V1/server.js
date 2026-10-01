const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const rootDirectory = __dirname;
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml"
};
const publicFiles = new Set([
    "account.js",
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
    "supabase-config.js"
]);

function sendError(response, statusCode, message) {
    response.writeHead(statusCode, {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff"
    });
    response.end(message);
}

function serveStatic(request, response, pathname) {
    if (request.method !== "GET" && request.method !== "HEAD") {
        sendError(response, 405, "Method not allowed.");
        return;
    }

    let decodedPath;
    try {
        decodedPath = decodeURIComponent(pathname);
    } catch {
        sendError(response, 400, "Invalid path.");
        return;
    }
    const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
    const filePath = path.resolve(rootDirectory, `.${requestedPath}`);
    const relativePath = path.relative(rootDirectory, filePath);
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath) || !publicFiles.has(relativePath)) {
        sendError(response, 404, "File not found.");
        return;
    }

    let fileInfo;
    try {
        fileInfo = fs.statSync(filePath);
    } catch (error) {
        if (error.code === "ENOENT" || error.code === "ENOTDIR") {
            sendError(response, 404, "File not found.");
            return;
        }
        throw error;
    }
    if (!fileInfo.isFile()) {
        sendError(response, 404, "File not found.");
        return;
    }

    response.writeHead(200, {
        "Cache-Control": "no-cache",
        "Content-Length": fileInfo.size,
        "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "Referrer-Policy": "same-origin",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY"
    });
    if (request.method === "HEAD") {
        response.end();
        return;
    }
    fs.createReadStream(filePath).pipe(response);
}

function createServer() {
    return http.createServer((request, response) => {
        const host = request.headers.host || "";
        let hostname;
        let requestUrl;
        try {
            requestUrl = new URL(request.url || "/", `http://${host}`);
            hostname = new URL(`http://${host}`).hostname;
        } catch {
            sendError(response, 400, "Invalid request.");
            return;
        }
        if (!["localhost", "127.0.0.1", "[::1]", "::1"].includes(hostname)) {
            sendError(response, 403, "This local preview only accepts loopback connections.");
            return;
        }

        serveStatic(request, response, requestUrl.pathname);
    });
}

if (require.main === module) {
    const server = createServer();
    server.listen(port, "127.0.0.1", () => {
        console.log(`Micro Center static preview running at http://localhost:${port}`);
    });
}

module.exports = { createServer };
