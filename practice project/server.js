const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {

    const time = new Date().toLocaleString();
    console.log(`Time: ${time} | Method: ${req.method} | URL: ${req.url}`);

    //jab /api/data path par get request aayegi tab hume data.json file ko read kar kar uss datat ko response me bhejna hai
    if (req.method === "GET" && req.url === "/api/data") {

        fs.readFile("data.json", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error reading file");
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            }
        });

    } else {

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server chal raha hai...");

    }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//client mujhe jb post request bhjega /api/data maang kr tb woh mujhe user ka data bhjega json format m uss data ko m phle req.on(Event listner) s connect krungi ab iske baad I have to write it in json wali array ki file k andar 

// how to do (STEPS) :
// 1. read the data
// 2. json data ko convert krungi normal js object m
// 3. jo user ka data h usko bhi normal convert krna h normal m
// 4. fir iss data ko uss array m push krna h 





