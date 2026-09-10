import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("production page renders the Persian storefront and bundled font", async () => {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /lang="fa"/);
  assert.match(html, /dir="rtl"/);
  assert.match(html, /پت‌اوکیو/);
  assert.match(html, /پرفروش‌ترین محصولات/);
  assert.doesNotMatch(html, /Your site is taking shape/);
  assert.match(html, /\/fonts\/Vazirmatn\.woff2/);
  const font = await readFile(new URL("../public/fonts/Vazirmatn.woff2", import.meta.url));
  assert.equal(font.subarray(0, 4).toString(), "wOF2");
});
