#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

const [url, target] = process.argv.slice(2);

if (!url || !target) {
  console.error("Usage:");
  console.error("node download.js <url> <output-dir>");
  process.exit(1);
}

console.log(`Downloading ${url} to ${target}`);

const browser = await chromium.launch({
  headless: true
});

console.log(`Launched browser`);

const context = await browser.newContext({
  acceptDownloads: true
});

const page = await context.newPage();


const downloadPromise = page.waitForEvent("download");

console.log(`Open url`);
//await page.goto(url);
await page.setContent(`<a href="${url}" download>Download</a>`);

// Trigger download.
// Replace this selector with your own.
await page.getByRole("link", { name: "Download" }).click();

const download = await downloadPromise;

await fs.mkdir(path.dirname(target), { recursive: true });

await download.saveAs(target);

console.log(`Downloaded to ${target}`);

await browser.close();