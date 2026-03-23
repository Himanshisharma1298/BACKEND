const user = {
    username : "Himanshi",
    age: 20
}
const http =require("http");
const server = http.createServer((req, res) => {
    const method = req.method;
    const url =new URL(req.url,`http://${req.headers.host}`);
    const pathname = url.pathname;

    if(method == "GET" && pathname == "/user") {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(user));
    }
});
    server.listen(3000,() => {console.log("server running on port 3000");
    });

