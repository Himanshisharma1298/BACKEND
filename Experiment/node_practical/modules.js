const os = require('os');
const path = require('path');
const url = require('url');

console.log("Operating System:", os.platform());
console.log("Home Directory:", os.homedir());
console.log("CPU Architecture:", os.arch());

const filePath = path.join('students','notes','data.txt');
console.log("Joined Path:", filePath);

const myUrl = new URL('https://example.com/course?id=101');

console.log("Host:", myUrl.host);
console.log("Pathname:", myUrl.pathname);
console.log("Query Parameter id:", myUrl.searchParams.get('id'));