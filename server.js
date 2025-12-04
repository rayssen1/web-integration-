const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
};

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  let filePath;
  let isHtmlPage = false;

  if (url === "/") {
    filePath = path.join(__dirname, "src", "index.html");
    isHtmlPage = true;
  }
  else if (url.startsWith("/node_modules/")) {
    filePath = path.join(__dirname, url.substring(1));
  }
  else if (url.startsWith("/public/")) {
    filePath = path.join(__dirname, "public", url.substring(8));
  }
  else if (url.endsWith(".html")) {
    filePath = path.join(__dirname, "src", url);
    isHtmlPage = true;
  }
  else {
    const potentialHtmlPath = path.join(__dirname, "src", url + ".html");
    if (fs.existsSync(potentialHtmlPath)) {
      filePath = potentialHtmlPath;
      isHtmlPage = true;
    } else {
      filePath = path.join(__dirname, "public", url);
    }
  }

  const extname = isHtmlPage ? ".html" : path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - File Not Found</h1>", "utf-8");
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, "utf-8");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving files from public/ and node_modules/`);
});
