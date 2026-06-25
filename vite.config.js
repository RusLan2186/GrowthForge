import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { imagetools } from "vite-imagetools"; // Замена устаревшего vite-plugin-imagemin
import postcssPxToRem from "postcss-pxtorem";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getHtmlInputs() {
  const devDir = path.resolve(__dirname, "dev");
  const files = [];

  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, name);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) walk(fullPath);
      else if (name.toLowerCase().endsWith(".html")) files.push(fullPath);
    }
  }

  walk(devDir);

  const input = {};
  files.forEach((f) => {
    const rel = path.relative(devDir, f).replace(/\\/g, "/");
    const key = rel.replace(/\.html$/, "");
    input[key] = f;
  });

  return input;
}

export default defineConfig(({ command }) => ({
  root: "dev",
  base: "./",
  build: {
    outDir: "../src",
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/chunks/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/i.test(name ?? ""))
            return "images/[name]-[hash][extname]";
          if (/\.css$/i.test(name ?? "")) return "css/[name]-[hash][extname]";
          if (/\.(woff2?|ttf|eot|otf)$/i.test(name ?? ""))
            return "fonts/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  css: {
    postcss: {
      plugins:
        command === "build"
          ? [
              postcssPxToRem({
                rootValue: 16,

                propList: [
                  "font-size",
                  "margin",
                  "margin-top",
                  "margin-right",
                  "margin-bottom",
                  "margin-left",
                  "padding",
                  "padding-top",
                  "padding-right",
                  "padding-bottom",
                  "padding-left",
                  "width",
                  "height",
                  "max-width",
                  "max-height",
                  "min-width",
                  "min-height",
                  "gap",
                  "line-height",
                  "letter-spacing",
                ],
                replace: true,

                mediaQuery: false,

                minPixelValue: 2,
              }),
            ]
          : [],
    },
  },

  plugins: [imagetools()],
}));
