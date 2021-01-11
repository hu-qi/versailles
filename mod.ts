#!/usr/bin/env -S deno run --unstable --allow-net --allow-read
import { Application } from "https://deno.land/x/abc@v1.2.4/mod.ts";
import createHtml from "./createHtml.ts";

const file = await Deno.open("data.txt", { read: true });
const data = await Deno.readAll(file);
Deno.close(file.rid);

const decoder = new TextDecoder("utf-8");
const content = decoder.decode(data).trim();

const words = content.split("\n");
const count = words.length;

const app = new Application();

app.static("/assets", "./assets");

app
  .get("/", (c) => {
    const index = Math.floor(Math.random() * count);
    const body = createHtml(words[index]);
    return body
  })
  .start({ port: 8000 });

console.log(`🦕 abc server running at http://127.0.0.1:8000/ 🦕`);
