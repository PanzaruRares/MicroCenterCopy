const assert = require("node:assert/strict");
const { once } = require("node:events");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { buildPages } = require("./build-pages.js");
const { createServer } = require("./server.js");

const rootDirectory = __dirname;
const buildDirectory = path.join(rootDirectory, ".pages-build");

test("Pages build publishes only frontend assets and emits public Supabase config", (t) => {
    t.after(() => fs.rmSync(buildDirectory, { recursive: true, force: true }));
    const output = buildPages({
        url: "https://project-example.supabase.co",
        anonKey: "sb_publishable_example"
    });

    assert.equal(output, buildDirectory);
    assert.ok(fs.existsSync(path.join(output, "index.html")));
    assert.ok(fs.existsSync(path.join(output, "avatar.svg")));
    assert.ok(fs.existsSync(path.join(output, "supabase-config.js")));
    assert.equal(fs.existsSync(path.join(output, "server.js")), false);
    assert.equal(fs.existsSync(path.join(output, "server.test.js")), false);
    assert.equal(fs.existsSync(path.join(output, "data")), false);
    const config = fs.readFileSync(path.join(output, "supabase-config.js"), "utf8");
    assert.match(config, /https:\/\/project-example\.supabase\.co/);
    assert.match(config, /sb_publishable_example/);
});

test("Pages build rejects a service configuration missing one public setting", () => {
    assert.throws(
        () => buildPages({ url: "https://project-example.supabase.co", anonKey: "" }),
        /Set both SUPABASE_URL and SUPABASE_ANON_KEY/
    );
});

test("local preview serves the storefront but not backend or repository files", async (t) => {
    const server = createServer();
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    t.after(async () => {
        server.close();
        await once(server, "close");
    });
    const address = server.address();
    const baseUrl = `http://localhost:${address.port}`;

    const home = await fetch(baseUrl);
    assert.equal(home.status, 200);
    assert.match(await home.text(), /Create an account/);

    const stylesheet = await fetch(`${baseUrl}/style.css`);
    assert.equal(stylesheet.status, 200);
    assert.match(stylesheet.headers.get("content-type"), /text\/css/);

    for (const privatePath of ["/server.js", "/server.test.js", "/supabase/schema.sql", "/data/storefront.sqlite", "/api/cart"]) {
        const response = await fetch(`${baseUrl}${privatePath}`);
        assert.equal(response.status, 404, `${privatePath} should not be served`);
    }
});
