const http = require("http");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "notes.json");

const server = http.createServer((req, res) => {
  const url = new URL(req.url,'https://${req.headers.host}');
  const method = req.method;
  const pathname = url.pathname;
  console.log(url, method);

  if (req.method === "GET" && pathname === "/notes") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end("Welcome to Notes API");
  }

  if (req.method === "GET" && pathname === "/notes") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error reading notes");
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  }

  else if (req.method === "POST" && pathname === "/notes") {

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newNote = JSON.parse(body);

      fs.readFile(filePath, "utf8", (err, data) => {

        const notes = data ? JSON.parse(data) : [];
        notes.push(newNote);

        fs.writeFile(filePath, JSON.stringify(notes), (err) => {
          if (err) {
            res.writeHead(500);
            return res.end("Error saving note");
          }

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Note added" }));
        });
      });
    });
  }

  else {
    res.writeHead(404);
    res.end("Route Not Found");
  }

});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


  


